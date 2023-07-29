const httpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const getCoordsForAddres = require('../util/location'); 
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.placeId;
    let place;

    try {
        place = await Place.findById(placeId); // exact element of fetched.
    } catch (error) {
        return next(new httpError('Something went wrong, could not find a place.' + error.message, 500));
    }

    if (!place) {
        return next(new httpError('Could not find a place for the provided id.', 404));
    }
    res.json({ place: place.toObject({ getters: true }) });
};


const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    let places;
    try {
        places = await Place.find({ creator: userId }); //provides an array after finding array.

    } catch (error) {
        return new httpError('Fetching places failed, try again!', 500);
    }
    if (!places || places.length === 0) {
        return next(new httpError('Could not find', 404));
    }
    res.json({ places: places.map(place => place.toObject({ getters: true })) });
};


const createPlace = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        next(new httpError('Invalid inputs passed. Please check. ', 422));
    }

    const { title, description, address, creator } = req.body;

    const createdPlace = new Place({
        title,
        description,
        address,
        location: await getCoordsForAddres(address),
        creator,
        image
    });

    let isUserExistsAlready;

    try {
        isUserExistsAlready = await User.findById(creator);
        if (!isUserExistsAlready) {
            return next(new httpError('User doesnot exists already. !', 422))
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPlace.save({ session: session });
        isUserExistsAlready.places.push(createdPlace);
        await isUserExistsAlready.save({ session: session });
        session.commitTransaction();

    } catch (error) {
        return next(new httpError('Creating place is failed. Error : ' + error.message, 500));
    }

    res.status(201).json({ place: createdPlace });
}

const updatePlace = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new httpError('Invalid inputs passed. Please check. ', 422);
    }
    const placeId = req.params.placeId;
    let place;

    try {
        place = await Place.findById(placeId);
        const { title, description } = req.body;
        place.title = title;
        place.description = description;
        await place.save();
    } catch (error) {
        return next(new httpError('Something went wrong, could not update.', 500))
    }

    // const placeIndex = DUMMY_PLACE.findIndex(p => p.id === placeId);
    // DUMMY_PLACE[placeIndex] = place;

    res.status(200).json({ place: place.toObject({ getters: true }) });
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.placeId;
    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
        if (!place) {
            return next(new httpError('Placeid is not present. !'))
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        await place.remove({ session: session });
        place.creator.places.pull(place);
        await place.creator.save({ session: session });
        session.commitTransaction();

    } catch (error) {
        return next(new httpError('Something went wrong, could not delete place. Error: ' + error.message, 500))
    }
    res.status(200).json({ message: 'Deleted' });

}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

const express = require('express');
const { check } = require('express-validator')

const placeController = require('../controllers/places-controller');


const router = express.Router();

router.get('/:placeId', placeController.getPlaceById);

router.get('/user/:userId', placeController.getPlacesByUserId);

router.post('/', [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().notEmpty()
],
    placeController.createPlace);

router.patch('/:placeId', [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
], placeController.updatePlace);

router.delete('/:placeId', placeController.deletePlace);



module.exports = router;
// const axios = require('axios');
// const HttpError = require('../models/http-error');

// const your_apikey = '';

// async const getCoordsForAddres = (address) => {
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${your_apikey}`);
//     const responseData = response.data;

//     if (!responseData || responseData.status === 'ZERO_RESULTS') {
//         const errors = new HttpError('Could not find location.', 422);
//         throw errors;
//     }

//     const coordinates = responseData.results[0].geometry.location;

//     return coordinates;
// }

// exports.getCoordsForAddres = getCoordsForAddres;
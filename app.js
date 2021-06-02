const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const httpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes); //restricting filter with paths
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const error = new httpError('Could not find the route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    };
    res.status(error.code || 500);
    res.json({ message: error.message || 'Not found' });
})

mongoose
    .connect('mongodb+srv://<userName>:<password>@cluster0.msf8w.mongodb.net/<database>?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err)
    });

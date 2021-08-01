const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const categoriesRoutes = require('./routes/categoriesRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
// const userRoutes = require('./routes/users-routes');
const httpError = require('./models/http-error');

const app = express();
app.use(bodyParser.json());

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

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
    .connect('mongodb+srv://Galaxy:ETwrrm4ItBbQYXqd@cluster0.fxlev.mongodb.net/Galaxy?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err)
    });

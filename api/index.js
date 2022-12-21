const express = require('express')
const mongoose = require('mongoose');

const Route = require('./routers/route');

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:admin@cluster0.edjn9ut.mongodb.net/test', false);

// routes
app.use(Route);
app.listen(3000)
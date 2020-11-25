const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const filmCommon = require('./routes/filmCommon');
const filmInfo = require('./routes/filmInfo');
const admin = require('./routes/admin')


const app = express();

const PORT = 5000;


async function start() {
    try {
        await mongoose.connect('mongodb+srv://Long:longlom@cluster0.p0mpm.mongodb.net/Films', {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Подключение успешно.');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`) );


        app.all('*', function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        app.get('/', (req,res) => {

        });

        app.use('/filmCommon', filmCommon);
        app.use('/filmInfo', filmInfo);
        app.use('/admin', admin);



    }catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

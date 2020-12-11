"use strict";

const mongoose = require('mongoose');

const express = require('express');
let router = express.Router();

const Hall = require('../models/Hall');

router
    .route('/')
    .get(async(req, res) => {
        try {
            console.log(req.query.selector);
            const hallInfo = await Hall.findOne(req.query.selector);
            console.log(hallInfo);
            res.status(200).json(hallInfo);
        }catch (e) {
            res.status(500).json({error: e});
        }
    })


module.exports = router;

"use strict";

const mongoose = require('mongoose');

const express = require('express');
let router = express.Router();

const Admin = require('../models/Admin');
const Film = require('../models/Film');
const Info = require('../models/Info');

router
    .route('/')
    .get( async (req, res) => {
        try {
            const infoCollection = await Info.find({});
            const filmCollection = await Film.find({});
            res.status(200).json({
                filmCollection,
                infoCollection
            });
        } catch (e) {
            res.status(500).json({error: e});
        }
    })
    .post((req, res) => {
        Admin.findOne(req.body)
            .exec()
            .then(ex => {
                return  ex ? res.status(200).json({ message: 'Authorized'}) : res.status(403).json({ message: 'Wrong password or login'});
            })
            .catch(err =>  res.status(500).json({error: err}));
    });

module.exports = router;
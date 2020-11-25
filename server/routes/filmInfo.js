"use strict";

const fs = require('fs');
const axios = require('axios');

const express = require('express');
let router = express.Router();

const Info = require('../models/Info');

router
    .route('/')
    .get((req,res) => {
        Info.find({})
            .exec()
            .then(ex => {
                console.log(ex);
            })
            .catch(err => {
                res.status(500).json({error:err});
            });
    })
    .post(async (req,res) => {
        try {
            const selector = {name: req.body.name};
            const response = await axios.get(`http://127.0.0.1:5000/filmCommon`, {params: {selector}});
            console.log(response.data, 'res');
            const filmInfo = new Info({
                _id: response.data[0]._id,
                name: req.body.name,
                description: req.body.description,
                sessions: req.body.sessions,
                path: '',
            });

            filmInfo
                .save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
            res.status(201).json({message:'filmInfo: All is gucci'});
        }catch (e) {
            console.error(e);
        }
    });

module.exports = router;
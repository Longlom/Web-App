"use strict";

const fs = require('fs');
const axios = require('axios');

const express = require('express');
let router = express.Router();

const Info = require('../models/Info');

router
    .route('/')
    .get(async (req, res) => {
        Info.find((req.query.selector) ? JSON.parse(req.query.selector) : {})
            .exec()
            .then(ex => {
                res.status(200).json(ex);
            })
            .catch(err => {
                res.status(500).json({error: err});
            });
    })
    .post(async (req,res) => {
        try {
            const selector = {name: req.body.name};
            const response = await axios.get(`http://127.0.0.1:5000/filmCommon`, {params: {selector}});
            let sessions = req.body.sessions.split('\n');
            sessions = sessions.map((item) => {
                let arr = item.split(' ');
                let obj = {
                    time: arr[0],
                    price: +arr[1],
                    amount: +arr[2],
                };
                return obj;
            });
            req.body.sessions = sessions;
            const filmInfo = new Info({
                _id: response.data[0]._id,
                name: req.body.name,
                description: req.body.description,
                sessions: req.body.sessions,
                path: '',
            });

            filmInfo
                .save()
                // .then(result => console.log(result))
                .catch(err => console.log(err));
            res.status(201).json({message:'filmInfo: All is gucci'});
        }catch (e) {
            console.error(e);
        }
    })
    .put(async (req,res) => {
        try {
            const doc = await Info.findOne({_id: req.body._id});
            for (let i = 0; i < doc.sessions.length; i++) {
                if (doc.sessions[i].time === req.body.time) {
                    doc.sessions[i].amount--;
                    break;
                }
            }
            await doc.save();
        }catch (e) {
            console.error(e);
        }
    })
    .delete(async (req, res) => {
        let data =  await Info.find(JSON.parse(req.query.selector)).exec();
        if (data.length) {
            let result = await Info.deleteOne(JSON.parse(req.query.selector));
            res.status(200).json({message: 'ok'});
        } else {
            res.status(404).json({message: 'there is no such info'});
        }
    });;

router
    .route('/change')
    .put(async (req,res) => {
        try {
            const doc = await Info.findOne({_id: req.body._id});
            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.sessions = req.body.sessions;
            await doc.save();
        }catch (e) {
            console.error(e);
        }
    });

module.exports = router;

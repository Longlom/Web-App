"use strict";

const mongoose = require('mongoose');
const axios = require('axios');

const express = require('express');
let router = express.Router();

const HallAndFilm = require('../models/HallAndFilm');
const Hall = require('../models/Hall');
const Info = require('../models/Info');

router
    .route('/')
    .get(async(req, res) => {
        try {
            const info = await HallAndFilm.findOne({hall: req.query.hall });
            if (!info) {
                const hall = await Hall.findOne({name: req.query.hall});
                const filmInfo = await Info.findOne({name: req.query.name});
                let sessions = filmInfo.sessions.map((item) => {
                    return {
                        time: item.time,
                        seats: hall.seats,
                        price: item.price,
                        bought: 0,
                    }
                });
                const hallAndFilm = new HallAndFilm({
                    hall: req.query.hall,
                    film: req.query.name,
                    sessions,
                })
                hallAndFilm
                    .save();
                res.status(200).json(hallAndFilm);
                return;
            }
            res.status(200).json(info);
        }catch (e) {
            res.status(500).json({error: e});
        }
    })
    .put(async (req,res) => {
        try {
            const info = await HallAndFilm.findOne({hall: req.body.hall });
            for (let i = 0; i < info.sessions.length; i++) {
                if (info.sessions[i].time === req.body.time) {
                    info.sessions[i].seats = req.body.seats;
                    req.body.seats.forEach(item => item? info.sessions[i].bought++ : null);
                }
            }
            await info.save();
        }catch (e) {
            console.error(e);
        }
    })


module.exports = router;

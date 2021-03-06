"use strict";

const fs = require('fs');
const mongoose = require('mongoose');

const express = require('express');
let router = express.Router();

const Film = require('../models/Film');
const multer = require('multer');
const transliteration = require('transliteration');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/assets/images/`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

router
    .route('/')
    .get(async (req, res) => {
        Film.find((req.query.selector) ? JSON.parse(req.query.selector) : {})
            .exec()
            .then(ex => {
                res.status(200).json(ex);
            })
            .catch(err => {
                res.status(500).json({error: err});
            });
    })
    .post(upload.single('img'), (req, res) => {
        let fileType = req.file.path.split('.').reverse()[0];
        const name = transliteration.slugify(req.body.name, {separator: '_'});
        fs.renameSync(`${req.file.path}`, `${req.file.destination}/${name}.${fileType}`);

        const film = new Film({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            img: 'IMG',
            path: `${name}.${fileType}`,
        });
        film
            .save()
            .catch(err => console.log(err));
        res.status(201).json({message: 'All is gucci'});
    })
    .put(upload.single('img'), async (req, res) => {
        try {
            let doc = await Film.findOne({_id: req.body._id});
            for (let key in req.body) {
                if (key === '_id') continue;
                doc[key] = req.body[key];
            }
           doc.save();
        }
        catch (e) {
            console.log(e);
        }
    })
    .delete(async (req, res) => {
        let data =  await Film.find(JSON.parse(req.query.selector)).exec();
        if (data.length) {
            let result = await Film.deleteOne(JSON.parse(req.query.selector));
            res.status(200).json({message: 'ok'});
        } else {
            res.status(404).json({message: 'there is no such film'});
        }
    });
router
    .route('/update')
    .post(async (req,res) => {
        try {

            res.status(201).json({message:'filmInfo: All is gucci'});
        }catch (e) {
            console.error(e);
        }
    })

module.exports = router;

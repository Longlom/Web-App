const {Router}  = require('express');
const Film = require('../models/Film');
const {check, validationResult} = require('express-validator');
const router =  Router();

//Add Film
router.post(
    '/createFilm',
    [
        check('name', 'Неккоректное имя'),
        check('price', 'Invalid price').isNumeric(),

    ],

    async (res,req) => {
try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array(),
            message:'Invalid data',
        })
    }

    const {name, price} = req.body;

    const film = await Film.findOne({name});

    if (film) {
      return res.status(400).json({message:"There's already such film"})
    }

    const newFilm = new Film({name,price})
    await newFilm.save();
    res.status(201).json({message: 'New film created'});



}catch (e) {
    res.status(500).json({message:'Smth is wrong, try again later'});
}
});

module.exports = router;
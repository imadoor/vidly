const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

// Get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// Create a new genre
router.post('/', async (req, res)=>{
    console.log(req)
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

//Update a genre
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate( req.params.id,{name: req.body.name}, {
        new: true
    });

    if(!genre) res.status(404).send('The genere with that given ID does not exits');

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    
    const genre = await Genre.findByIdAndRemove( req.params.id);
    
    if(!genre) res.status(404).send('The genere with that given ID does not exits');
    
    res.send(genre);
});

// Gets genere by Id
router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if(!genre) res.status(404).send('The genere with that given ID does not exits');

    res.send(genre);

});

module.exports = router;
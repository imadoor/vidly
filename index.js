const express = require('express');
const Joi = require('joi');
const app = express();


const port =  3000;
const api = '/api/genres';

const generes = [
    {id: 1, name: 'Sci-fi'}, 
    {id: 2, name: 'Historical'}, 
    {id: 3, name: 'Fantasy'}, 
    {id: 4, name: 'Anime'}, 
    {id: 5, name: 'Western'}
];

// Get all genres
app.get(api, (req, res) => {
     res.json(generes);
});

// Gets genere by Id
app.get(api+'/:id', (req, res) => {
    const genre = generes.find(c => c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The genere with that given ID does not exits');
    }
    else{
        res.send(genre);
    }
});

// Gets genere by name
app.get(api+'/:name', (req, res) => {
    const genre = generes.find(c => c.name.toLowerCase() === req.params.name.toLowerCase());
    if(!genre){
        res.status(404).send('The genere with that given NAME does not exits');
    }
    else{
        res.send(genre);
    }
});

app.post(api, (req, res)=>{
    const { error } = validateCourse(req.body);

    if(error){
        res.status(400).send(error.detail);
    }
    const genere = {
        id: generes.length + 1,
        name: req.body.name
    }
    generes.push(genere);
    res.send(genere);
});






app.listen(port, () => {
    console.log(`Server started on ${port}`);
});


function validateCourse(course){
    //Validating the updated field with Joi
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
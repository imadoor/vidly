const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');
// Note: remember to import the genre schema for embedded documents

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

}));

function validate(movie){
    //Validating the updated field with Joi
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validate;
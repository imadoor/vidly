const mongoose = require('mongoose');
const Joi = require('joi');
// define the schema independently of the model function so it can be used in embedded documents
const genreSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validate(genre){
    //Validating the updated field with Joi
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validate;
exports.genreSchema = genreSchema;
const mongoose = require("mongoose");
const Joi=require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
});

function validateGenre(genre){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(genre);
}

const Genre = mongoose.model("Genres", genreSchema);

module.exports.genreSchema=genreSchema;
module.exports.Genre=Genre;
module.exports.validate=validateGenre;
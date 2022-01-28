const mongoose = require("mongoose");
const Joi=require('joi');
const {genreSchema}=require('./genres');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre:{
      type:genreSchema,
      required: true
  },
  numberInStock:{
      type:Number,
      required:true,
      min:0
  },
  dailyRentalRate:{
    type:Number,
    required:true,
    min:1
}
});

const Movie=mongoose.model('Movies',movieSchema);

function validateMovie(genre){
    const schema=Joi.object({
        title:Joi.string().min(3).required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(1).required(),
    })
    return schema.validate(genre);
}

module.exports.Movie=Movie;
module.exports.validate=validateMovie;
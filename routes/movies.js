const express = require("express");
const { Genre } = require("../models/genres");
const { Movie, validate } = require("../models/movies");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send(`There is no movie with id ${req.params.id}`);
    return res.send(movie);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let result = validate(req.body);
    console.log(result);
    if (result.error)
    return res.status(400).send(result.error.details[0].message);

    let genre=await Genre.findById(req.body.genreId);
    if(!genre)
    return res.status(404).send(`There is no genre with id ${req.body.genreId}`);
    
    console.log(genre);

    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:req.body.genreId,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate,
    });

    result = await movie.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send(`There is no movie with id ${req.params.id}`);
    let result = validate(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);
    
    let genre=await Genre.findById(req.body.genreId);
    if(!genre)
      return res.status(404).send(`There is no genre with id ${req.body.genreId}`);
    movie.set({
        title:req.body.title,
        genre:{
            _id:req.body.genreId,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate,
    });
    result = await movie.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie)
      return res.status(404).send(`There is no movie with id ${req.params.id}`);
    return res.send(movie);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;

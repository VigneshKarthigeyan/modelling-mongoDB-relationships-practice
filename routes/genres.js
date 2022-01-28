const express = require("express");
const { Genre, validate } = require("../models/genres");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send(`There is no genre with id ${req.params.id}`);
    return res.send(genre);
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

    let genre = new Genre(req.body);

    result = await genre.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send(`There is no genre with id ${req.params.id}`);
    let result = validate(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);
    
    genre.set(req.body);
    result = await genre.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res.status(404).send(`There is no genre with id ${req.params.id}`);
    return res.send(genre);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;

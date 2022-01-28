const express=require('express');
const mongoose = require("mongoose");
const movies = require("./routes/movies");
const genres = require("./routes/genres");

const app = express();
mongoose.connect("mongodb://localhost/CourseDB")
    .then(()=>console.log("Mongodb connected successfully.."))
    .catch(error=>console.log(error.message));


app.use(express.json());

app.use("/api/movies", movies);
app.use("/api/genres", genres);

app.listen(3000, () => console.log(`Listening in port 3000...`));

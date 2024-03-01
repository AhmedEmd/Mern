import express from "express";
import { PORT, CONNECTION_STRING } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send("hello");
});

// Post Books
app.post("/books", async (req, res) => {
  try {
    if (   !req.body.title 
        || !req.body.author 
        || !req.body.PublishYear
        ) {
      return res.status(400).send({
        message: "Send all required inputs: title, author, PublishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      PublishYear: req.body.PublishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Get Books
app.get("/books", async (req, res) =>{
try{
    const books = await Book.find({})
    return res.status(200).json({
        count: books.length,
        data: books
    })
}
catch (error){
    console.log(error)
    return res.status(500).send({message: message.error})
}
});

// get specefic book
app.get("/books/:id", async (req, res) =>{
    try{

        const {  id  } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    }
    catch (error){
        console.log(error)
        return res.status(500).send({message: message.error})
    }
    });

// get specefic book
app.put("/books/:id", async (req, res) =>{
    try{
 if (   !req.body.title || !req.body.author || !req.body.PublishYear){
        return res.status(400).send({
            message: "Send all required inputs: title, author, PublishYear"
        })
     }
        const {  id  } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result){
            res.status(404).json({
                message: "invalid"
            })
        }
        return res.status(200).json(
          {Message: "Book Updated Succesfully"}  
        )
    }
    catch (error){
        console.log(error)
        return res.status(500).send({message: message.error})
    }
    });














mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connection to MongoDB successful");

    app.listen(PORT, () => {
      console.log(`App is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

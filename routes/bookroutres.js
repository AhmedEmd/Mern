import { Router } from "express";
import { Book } from "../models/bookmodels.js";

const router = Router();

// Post Books
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) =>{
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
router.get("/:id", async (req, res) =>{
    try{
        const {  id  } = req.params;
        const book = await Book.findById(id);
        if(!book){
          return res.send("Book Not Found")
        }
        return res.status(200).json(book)
    }
    catch (error){
        console.log(error)
        return res.status(500).send({message: message.error})
    }
    });

// update a specefic book
router.put("/:id", async (req, res) =>{
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

// delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Book not found");
    }

    return res.send("Book deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});


export default router;
import express from "express";
import { PORT, CONNECTION_STRING } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import router from "./routes/bookroutres.js"
import cors from "cors"





const app = express();
// Parse express body
app.use(express.json());


app.use("/books", router)
app.use(cors())



// default
app.get("/", (req, res) => {
    return res.status(200).send("hello");
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

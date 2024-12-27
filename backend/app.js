const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./module/data");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/TO-DO")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(cors());

///Add the data into DB
app.post("/add", async (req, res) => {
  const { task, desc, time } = req.body;
  const addData = await userModel.create({
    Task: task,
    Desc: desc,
    time: time,
  });
  console.log(task, desc, time);
  res.send("DATA ADDED");
});

//Get Data From DB
app.get("/Data", async (req, res) => {
  const getData = await userModel.find();
  res.send(getData);
});

//Delete the data from DB
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTask = await userModel.findByIdAndDelete(id);
  if (!deleteTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(3001, function () {
  console.log("CORS-enabled web server listening on port 3001");
});

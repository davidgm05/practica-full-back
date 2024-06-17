const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter")
const app = express();
const PORT = 3000;

require("dotenv").config();

app.use(express.json())
app.use(cors())

const urlMongo = process.env.DATABASE_URL;

mongoose.connect(urlMongo)

const db = mongoose.connection;

db.on("error", (error) =>  {
    console.error("error al conectar")
})

db.once("connected", () =>  {
    console.log("success connected")
})

db.on("dicanected", (error) =>  {
    console.error("error al conectar")
})

app.use("/users" ,userRouter);

app.listen(PORT, () => [
    console.log(`server running in http://localhost:${PORT}`)
])

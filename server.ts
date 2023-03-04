import express, { Request, Response } from 'express';
const app = express()

app.use(express.static('public')); 
const jsonRouter = require("./routes/catchJSON")
app.use("/json", jsonRouter)
app.listen(3000);
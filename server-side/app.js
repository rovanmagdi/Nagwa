const express= require('express');
var cors=require('cors');
const app=express();
require("express-async-errors");
const scoreRouter=require('./src/routes/scoreRouter');
const handleError=require('./src/middlewares/handleError');
app.use(cors());
app.use(express.json());
app.use("/",scoreRouter);
app.use(handleError)

const port= 4200;
app.listen(port, ()=>console.log("Server is running"));

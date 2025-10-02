const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const routes = require('./routes/index');

app.use(routes);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.get("/", (req, res)=>{
    res.send({"message":"welcome to home page"});
});

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server running at port: ", process.env.APP_PORT);
});
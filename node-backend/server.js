const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/index');

app.use('/uploads', express.static(__dirname + '/uploads'));
app.get("/", (req, res)=>{
    res.send({"message":"welcome to home page"});
});
app.use(cors());
app.use(routes);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server running at port: ", process.env.APP_PORT);
});
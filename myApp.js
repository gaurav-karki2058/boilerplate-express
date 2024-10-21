let express = require('express');

let app = express();

console.log("Hello World");

function func2(req,res){
    res.send("Hello Express");
  }

app.get("/",func2);
































 module.exports = app;

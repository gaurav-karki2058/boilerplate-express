let express = require('express');
require('dotenv').config();
let bodyParser=require('body-parser');
let app = express();

// Console.log test
console.log("Hello World");

//Creating a function
function func2(req, res) {
    res.sendFile(absolutePath);
}

let absolutePath = __dirname + "/views/index.html";
let absPath = __dirname + "/public";

//getting static content from server side
app.use("/public", express.static(absPath));

//using func2 for get
app.get("/", func2);

//using env file 
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ message: "Hello json".toUpperCase() });
    } else {
        res.json({ message: "Hello json" });
    }
});

//middleware p2
//If your middleware is defined after your routes, the logger won't execute for those routes.
//app.use will only work if it is placed above the defined routes.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

//adding a new handler to middleware in get method
app.get('/now',function(req,res,next){
    req.time=(new Date()).toString();
    next();
},function(req,res){
    res.json({time:req.time})
} )


//getting request parameters using req.params
app.get('/:fcc/echo',(req,res)=>{
    console.log(req.params)
    res.json({echo:req.params.fcc})
})

//query string in url
app.get('/name',(req,res)=>{
    console.log(req.query,"heyheyhey");
    res.json({name: `${req.query.first} ${req.query.last}` })
})

//getting data from post request http body via bodyparser
app.use('/name',bodyParser.urlencoded({extended:false}))
//getting html page user form data
app.post('/name',(req,res)=>{
    res.json({name: `${req.body.first} ${req.body.last}`})
})

module.exports = app;


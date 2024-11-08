// Importing the necessary modules
let express = require('express');  // Import the Express.js framework
require('dotenv').config();  // Loads environment variables from a .env file into process.env
let bodyParser = require('body-parser');  // Middleware for parsing incoming request bodies
let app = express();  // Create an Express application instance

// Console.log test
console.log("Hello World");  // Outputs "Hello World" to the console to test if the app is running

// Creating a function to handle sending the HTML file
function func2(req, res) {
    res.sendFile(absolutePath);  // Sends the HTML file at `absolutePath` when the route is accessed
}

// Defining file paths for static content
let absolutePath = __dirname + "/views/index.html";  // The absolute path to the index.html file
let absPath = __dirname + "/public";  // The absolute path to the 'public' directory for static assets

// Setting up middleware to serve static files from the '/public' directory
app.use("/public", express.static(absPath));  // This tells Express to serve static files from the '/public' folder when requested via '/public/*'

// Using func2 to handle GET requests to the root route '/'
app.get("/", func2);  // When a GET request is made to '/', call func2 and send the index.html file

// Handling the '/json' route using an environment variable to adjust the response format
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        // If the environment variable MESSAGE_STYLE is set to 'uppercase', send the message in uppercase
        res.json({ message: "Hello json".toUpperCase() });
    } else {
        // Otherwise, send the message as is
        res.json({ message: "Hello json" });
    }
});

// Middleware example to log HTTP requests
// This middleware logs every incoming HTTP request's method, path, and IP address
// `app.use()` is used to apply middleware globally to all routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);  // Logs HTTP method, request path, and the user's IP address
    next();  // Pass control to the next middleware or route handler
});

// Adding a new route '/now' with additional middleware for handling the request
app.get('/now', function(req, res, next) {
    req.time = (new Date()).toString();  // Adding the current date and time to the request object
    next();  // Call the next middleware or route handler
}, function(req, res) {
    res.json({ time: req.time });  // Return the current time in the response as a JSON object
});

// Getting request parameters using `req.params` in the route URL
app.get('/:fcc/echo', (req, res) => {
    console.log(req.params);  // `req.params` contains the dynamic parts of the route (in this case, ':fcc')
    res.json({ echo: req.params.fcc });  // Send back the value of the ':fcc' parameter as part of the JSON response
});

// Handling query string parameters in the URL (e.g., ?first=John&last=Doe)
app.get('/name', (req, res) => {
    console.log(req.query, "heyheyhey");  // `req.query` contains the query string parameters (e.g., first & last)
    // Access the query parameters and return the full name as a JSON response
    res.json({ name: `${req.query.first} ${req.query.last}` });
});

// Middleware to parse URL-encoded data in the request body (for form submissions)
app.use('/name', bodyParser.urlencoded({ extended: false })); 
// `body-parser` middleware parses URL-encoded data (e.g., from HTML forms) and makes it available in `req.body`

// Handling POST requests at the '/name' route (e.g., form submission)
app.post('/name', (req, res) => {
    // `req.body` will contain the form data parsed by `body-parser`
    res.json({ name: `${req.body.first} ${req.body.last}` });  // Access the parsed data from `req.body` and return the full name
});

// Exporting the app instance so it can be used in another file (e.g., for testing or when starting the server)
module.exports = app;

require('dotenv').config(); // Load environment variables from .env file
let express = require('express'); // Import Express
let path = require('path'); // Import Path Module
let bodyParser = require('body-parser'); // Import body-parser
let app = express(); // Create an Express app

// Use body-parser middleware to parse URL-encoded data from POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Root-level request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // Pass control to the next middleware or route handler
});

// Serve static files from the "public" folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Serve the HTML file for GET requests to "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// POST handler at "/name" route
app.post("/name", (req, res) => {
  // Get the first and last name from the request body
  const { first, last } = req.body;

  // Check if both first and last names are provided
  if (first && last) {
    // Respond with the full name in JSON format
    res.json({ name: `${first} ${last}` });
  } else {
    // Respond with an error if names are missing
    res.status(400).json({ error: 'Please provide both first and last name.' });
  }
});

// Export the app for use in server.js
module.exports = app;

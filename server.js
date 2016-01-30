var express = require('express'); // Load the express library (http://expressjs.com/)
var app = express(); // Create an instance of the express server
app.use(express.static('.')); // Tell express to serve up static files relative to our current directory

app.listen(3000, function () { // Start our server listening on port 3000; you should now be able to go to http://localhost:3000 and see `index.html`
  console.log('Navigate to http://localhost:3000 in Google Chrome to see `a-story-in-pomes`!');
});
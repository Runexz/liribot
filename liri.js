//pulls spotify id and keys
require("dotenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);

//create a variable to read files package from node
var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    console.log(dataArr);
  
  });
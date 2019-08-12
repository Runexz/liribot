
require("dotenv").config();

// var util = require("util");

var omdb = require("omdb")

var keys = require("./keys.js");

//pulls spotify id and keys
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

// searches the spotify database
spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(util.inspect(data, {showHidden: false, depth: null}));
    console.log(data);
});

//create a variable to read files package from node
var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error, data) {

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
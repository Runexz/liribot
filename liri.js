
require("dotenv").config();

var axios = require('axios');

// var util = require("util");

var omdb = require("omdb")

var keys = require("./keys.js");

//pulls spotify npm id and keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


//create a variable to read files package from node
var fs = require("fs");

//grabs the third text on the command line ex: concert-this, spotify-this-song, etc.
var command = process.argv[2];
// console.log("This is what was typed after liri.js " + command);

// need to grab 4th text on the command line and loop through it to make it a usable if result is "All the Small Things"
var options = process.argv[3].split(" ").join("+");

// runThings(command, options);

// function runThings(command, options) {

//     options = processOptions();

    //switch is the if/else for all the commands to liri
    switch (command) {

        case "spotify-this-song":

            var songString = options;

        if(songString === ""){
            staticSong();
        }
        else{
                songinfo(songString);
            }

            break;

        case "movie-this":

            break;

        case "do-what-it-says":

            // fs.readFile("random.txt", "utf8", function (error, data) {

            //     // If the code experiences any errors it will log the error to the console.
            //     if (error) {
            //         return console.log(error);
            //     }

            //     // We will then print the contents of data
            //     // console.log(data);

            //     // Then split it by commas (to make it more readable)
            //     var dataArr = data.split(",");

            //     // We will then re-display the content as an array for later use.
            //     // console.log(dataArr);

            // });
            break;

        case "concert-this":

            // var bandsIT = keys.bandsInTown.id;
            // console.log(bandsIT);


            // axios.get('https://rest.bandsintown.com/artists/korn/events?app_id=' + bandsIT + '&date=upcoming')
            //     .then(function (response) {
            //         // handle success
            //         console.log(response.data);
            //     })
            //     .catch(function (error) {
            //         // handle error
            //         console.log(error);
            //     })
            //     .finally(function () {
            //         // always executed
            //     });
            break;

        default:
            break;
    };
// };
//create a function to loop through the array after [2]
// function processOptions() {

//     optionsArray = process.argv;

//     for (var i = 3; i < optionsArray.length; i++) {
//         options += optionsArray[i];
//     }

//     return options;
// }

function songinfo(songString) {
    
    // searches the spotify database
    spotify.search({ type: 'track', query: songString }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(util.inspect(data.tracks, {showHidden: false, depth: null}));
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Artist name: " + data.tracks.items[0].artists[0].name);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("Preview link of the song on Spotify: " + data.tracks.items[0].external_urls.spotify)
        // console.log(data.tracks.items)
        // console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
    });
};

function staticSong() {
spotify.lookup({ type: 'track', query: '3DYVWvPh3kGwPasp7yjahc' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(util.inspect(data.tracks, {showHidden: false, depth: null}));
    console.log("Song name: " + data.tracks.items[0].name);
    console.log("Artist name: " + data.tracks.items[0].artists[0].name);
    console.log("Album name: " + data.tracks.items[0].album.name);
    console.log("Preview link of the song on Spotify: " + data.tracks.items[0].external_urls.spotify)
    // console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
});
};
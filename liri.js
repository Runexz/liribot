//npm dotenv reads .env file
require("dotenv").config();

//npm moment loader
var moment = require('moment');

//npm axios loader
var axios = require('axios');

//retrieve information from keys.js
var keys = require("./keys.js");

//pulls spotify npm id and keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//create a variable to read files package from node
var fs = require("fs");

//grabs the third text on the command line ex: concert-this, spotify-this-song, etc.
var command = process.argv[2];
// console.log("This is what was typed after liri.js " + command);

//grabs the 4th text on the command line starts off as nothing
var options = "";
if (process.argv[3]) {
    // need to grab 4th text on the command line and loop through it to make it a usable if result is "All the Small Things"
    options = process.argv[3].split(" ").join("+");
};

//switch is the if/else for all the commands to liri
switch (command) {

    //if spotify-this-song is typed with a string after then this runs
    case "spotify-this-song":

        //stores var options contents into var songString
        var songString = options;

        //if there is no string after spotify-this-song The sign by Ace of Base is entered
        if (songString === "") {
            songinfo("The Sign ace of base");
        }
        //if there is a string after spotify-this-song then it is entered into function songinfo
        else {
            songinfo(songString);
        }

        break;

    //if movie-this is typed with a string after then this runs
    case "movie-this":

        //stores var options contents into var movieName
        var movieName = options;

        //pulls from keys.js
        var omdbThis = keys.omdbKey.id;

        //if there is no string after movie-this then the response movie info is Mr. Nobody
        if (movieName === "") {
            axios.get('https://www.omdbapi.com/?t=Mr+Nobody&apikey=' + omdbThis)
                .then(function (response) {
                    console.log(response.data);
                    console.log("If you haven't watched Mr. Nobody, then you should: http//www.imdb.com/title/tt0485947");
                    console.log("It's on Netflix!");
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });

            //if a string is entered then axios will pull the information
        } else {
            axios.get('https://www.omdbapi.com/?t=' + movieName + '&apikey=' + omdbThis)
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }

        break;

    //if do-what-it-says is entered then it will run the song info entered in random.txt
    case "do-what-it-says":

        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            console.log(data);

            // // We will then re-display the content as an array for later use.
            songinfo(data);

        });

        break;

    //if concert-this is entered with a string then this runs
    case "concert-this":

        //stores options into var artisName
        var artistName = options;

        //gets info from keys.js
        var bandsIT = keys.bandsInTown.id;

        //uses npm axios and enters artistName to look up the results
        axios.get('https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=' + bandsIT + '&date=upcoming')
            .then(function (response) {
                // handle success
                // console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log("Name of venue: " + response.data[i].venue.name);
                    console.log("Venue location city: " + response.data[i].venue.city);
                    console.log("Venue location state: " + response.data[i].venue.region);
                    console.log("Date of the Event: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'))
                    console.log("\n");
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        break;

    default:
        break;
};

//Function to search for the song in spotify
function songinfo(songString) {

    // searches the spotify database
    spotify.search({ type: 'track', query: songString }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Artist name: " + data.tracks.items[0].artists[0].name);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("Preview link of the song on Spotify: " + data.tracks.items[0].external_urls.spotify)
    });
};

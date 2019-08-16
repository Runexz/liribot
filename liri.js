
require("dotenv").config();

var axios = require('axios');


var keys = require("./keys.js");

//pulls spotify npm id and keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


//create a variable to read files package from node
var fs = require("fs");

//grabs the third text on the command line ex: concert-this, spotify-this-song, etc.
var command = process.argv[2];
// console.log("This is what was typed after liri.js " + command);

var options = "";
if (process.argv[3]) {
    // need to grab 4th text on the command line and loop through it to make it a usable if result is "All the Small Things"
    options = process.argv[3].split(" ").join("+");
};

//switch is the if/else for all the commands to liri
switch (command) {

    case "spotify-this-song":

        var songString = options;

        if (songString === "") {
            songinfo("The Sign ace of base");
        }
        else {
            songinfo(songString);
        }

        break;

    case "movie-this":

        var movieName = options;

        var omdbThis = keys.omdbKey.id;

        if (movieName === "") {
            axios.get('https://www.omdbapi.com/?t=Mr+Nobody&apikey=' + omdbThis)
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    console.log("If you haven't watched Mr. Nobody, then you should: http//www.imdb.com/title/tt0485947");
                    console.log("It's on Netflix!");
                    // console.log(response.data[0].venue.name);
                    // console.log(response.data[0].venue.city);
                    // console.log(response.data[0].venue.region);
                    // console.log(response.data[0].datetime)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });

        } else {
            axios.get('https://www.omdbapi.com/?t=' + movieName + '&apikey=' + omdbThis)
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    // console.log(response.data[0].venue.name);
                    // console.log(response.data[0].venue.city);
                    // console.log(response.data[0].venue.region);
                    // console.log(response.data[0].datetime)
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

    case "do-what-it-says":

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

        break;

    case "concert-this":

        var artistName = options;
        var bandsIT = keys.bandsInTown.id;
        // console.log(bandsIT);


        axios.get('https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=' + bandsIT + '&date=upcoming')
            .then(function (response) {
                // handle success
                // console.log(response.data);
                console.log(response.data[0].venue.name);
                console.log(response.data[0].venue.city);
                console.log(response.data[0].venue.region);
                console.log(response.data[0].datetime)
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

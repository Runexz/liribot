# LIRI Bot

### Whats a LIRI Bot?
LIRI is a _Language_ Interpretation and Recognition Interface.  LIRI is a command line node app that takes in parameters and gives you back data.

### NPM who?
What does NPM stand for?

npm is a command line interface program to manage node.js libraries (it stands for **node package manager**  ). 

You will need to install the following NPM's to run **LIRI Bot**
* npm dotenv
* npm axios
* npm moment
* npm node-spotify-api

## LIRI can search!
LIRI will search **Spotify** for songs, **Bands in Town** for concerts, and **OMDB** for movies!

### concert-this
Type **node liri.js concert-this "artist/band name here"** on the command line and **LIRI** will search the _Bands in Town Events API_ for the following information and display it on the terminal:
* Name of the venue
* Venue location City
* Venue location State
* Date of the Event

[Example of concert-this](https://drive.google.com/open?id=1ME2jXw9--cr76KwSRpU6lSk5lYbf11kc)

### spotify-this-song
Type **node liri.js spotify-this-song "song name here"** on the command line and **LIRI** will search the _Spotify API_ for the following information and display it on the terminal:
* Artist name
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

If no song name is entered then the default response will be the song _The Sign_ by **Ace of Base**.

### movie-this
Type **node liri.js movie-this "movie name here"** on the command line and  **LIRI** will search the _OMDB API_  for the following information and display it on the terminal:
* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

If no movie name is entered then the default response will be the movie _Mr. Nobody_.

### do-what-it-says
Type **node liri.js do-what-it-says** on the command line and **LIRI** will search a _random.txt_ file that contains a song name that **LIRI** will use **spotify-this-song** to locate the song information and display it on the terminal.

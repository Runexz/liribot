// console.log('This is loaded');

//pulls keys from .env 
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.bandsInTown = {
    id: process.env.BANDSINTOWN_ID
};

exports.omdbKey = {
    id: process.env.OMDBKEY_ID
}
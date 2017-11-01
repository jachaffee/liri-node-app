var keys = require('./keys.js');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');

var command = process.argv[2];
var query = process.argv[3];
	for (i = 4; i < process.argv.length; i++) {
		query += '+' process.argv[i];
	}

function commands() {
	switch(command) {
		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		getSong();
		break;

		case 'movie-this':
		getMovie();
		break;

		case 'do-what-it says':
		getRandom();
		break;
	}
};

function getTweets() {

	var client = new Twitter ({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
    	access_token_key: keys.twitterKeys.access_token_key,
    	access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {jachafs: 'nodejs'};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("-------------------------");
	        }
	    };
	});
};

function getSong() {
	var spotify = new Spotify({
  		id: <e137a9bf78dd4fa7845602bee3dc55e9>,
  		secret: <b73562f44881486587d7cb816a8925a1>
	});

	var searchTrack;
	if(query === undefined){
		searchTrack = "Downtown Train";
	}
	else{
		searchTrack = query;
	}

	spotify.search({ type: 'track', query: searchTrack }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 		else {
 			console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
 		}
	});
};

function getMovie() {
	var searchMovie;

	if (query === undefined) {
		searchMovie = "Lo";
	}
	else {
		searchMovie = query;
	}

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};

function getRandom() {

	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}
     	else {
     		var dataArray = data.split(',');
        	command = dataArr[0];
        	query = dataArr[1];	

        	for(i=2; i<dataArray.length; i++){
            query = query + "+" + dataArray[i];
        	};
        	commands();
     	}
     });	
};

commands();
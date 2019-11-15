//auth contains important info such as client id, and api keys
//file is imported and kept seprately and will not be uploaded to github
var auth = require('./json/tokens.json');
var jokes = require('./json/jokes.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const youtubeBase = "https://www.youtube.com/watch?v=";
const Discord = require('discord.js');
const client = new Discord.Client();

//returns a URL from youtube given an ID
function getVideoURL(videoId){
	return youtubeBase + videoId;
}


//Youtube get function
function getYoutube(url){
	var cheat;
	var xHttpRequest = new XMLHttpRequest();
    xHttpRequest.onreadystatechange = function() {
        if (xHttpRequest.readyState == 4 && xHttpRequest.status == 200)
		/*for some reason, this returns a string in JSON format instead of
		a JSON file and JSON.parse() returns me undefined when i try to access
		any of its properties

		As im only getting the top video, I can search for index of
		"videoId" and "snippet" as both strings only appear once.
		The subtraction is to account for the length of extra
		chars infront of each string respectively.

		TODO: CONVERT THE STRING INTO A JSON FILE OR FIND A BETTER WORK AROUND*/
			var vidIndex = xHttpRequest.responseText.indexOf("videoId") + 11;
			var snipIndex = xHttpRequest.responseText.indexOf("\"", vidIndex) - vidIndex;
			cheat = getVideoURL(xHttpRequest.responseText.substr(vidIndex,snipIndex));
	}
    xHttpRequest.open("GET", url, false);
    xHttpRequest.send(null);
	return cheat;
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//ping pong method
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

//YouTube video searcher
//This method sends a HTTP GET request to the youtube page with an authenticated
//Google API key and  a keyword and returns the first video
//Link is in the format:
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q="keyword here"&type=video&key="api key here"
client.on('message', msg=>{
	if(msg.content.substring(0,8).toUpperCase() == "-YOUTUBE"){
		var substr = msg.content.substring(9,msg.content.length);
		var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&" +
			"maxResults=1&q=" + substr + "&type=video&key=" +
			auth.YOUTUBE_API;
		msg.channel.send(getYoutube(url));
	}
});


//Spongebob capitalization meme generator
//This method takes in an input string in the format of <-spongebob> "string"
//and returns another string with randomized capitalization

client.on('message', msg =>{
	if(msg.content.substring(0,10).toUpperCase() == "-SPONGEBOB"){
		var substr = msg.content.substring(11,msg.content.length);
		var out = "";
		for(var i = 0; i < substr.length; i++){
			var rand = Math.floor(Math.random() * 2);
			if(rand == 0){
				out += substr[i].toUpperCase();
			}
			else{
				out += substr[i].toLowerCase()
			}
		}
		msg.channel.send(out);
	}
});

//Gets a random joke from jokes.json and prints it to channel
client.on('message', msg =>{
	if(msg.content.toUpperCase() == "-JOKE"){
		var numJokes = Object.keys(jokes).length;
		var joke = jokes[Math.floor(Math.random() * numJokes)].text;
		msg.channel.send(joke);
	}
});

// Bot method that replies with a reaction when "Good bot" is said
client.on('message', msg =>{
	if(msg.content.toUpperCase() === "GOOD BOT"){
		msg.react('💯')
		.then(console.log)
		.catch(console.error);
	}
});

client.login(auth.TOKEN);

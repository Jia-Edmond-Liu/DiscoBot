//auth contains important info such as client id, and api keys
//file is imported and kept seprately and will not be uploaded to github
var auth = require('./json/tokens.json');
var jokes = require('./json/jokes.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require('discord.js');
const client = new Discord.Client();


//Youtube get function
function getYoutube(url){
	var xHttpRequest = new XMLHttpRequest();
    xHttpRequest.onreadystatechange = function() {
        if (xHttpRequest.readyState == 4 && xHttpRequest.status == 200)
            callback(xHttpRequest.responseText);
			console.log(xHttpRequest.responseText);
    }
    xHttpRequest.open("GET", theUrl); // true for asynchronous
    xHttpRequest.send(null);
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
		var substr = msg.content.substring(11,msg.content.length);
		var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&" +
			"maxResults=20&q=" + substr + "&type=video&key=" +
			auth.YOUTUBE_API;
		getYoutube(url);
		console.log(url);
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

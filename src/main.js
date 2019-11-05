//auth contains important info such as client id, and api keys
//file is imported and kept seprately and will not be uploaded to github
var auth = require('./tokens.json');
var jokes = require('./jokes.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//ping pong method
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
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
			console.log(rand);
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

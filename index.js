﻿const discord = require('discord.js'),
	fs = require('fs'),
	client = new discord.Client(),
	name = 'idale',
	play = require('audio-play'),
	load = require('audio-loader');

function badWord(msg) {
	const bullshit = Array(
		"name", "doc", "core", "idal",
		"handy", "iume2a",
		"rose", "r0s3",
		"borg corp", "borg", "burg",
		"félicia", "jack", "andrew", "anya", "garry", "samia",
		"science",
		"espace", "temps",
		"brèche", "faille", "vortex",
		"tp", "téléporter", "téléportation",
		"médic", "docteur",
		"soin", "soins", "soigner",
		"blessure", "blessé", "blessés",
		"saigne", "saignes", "saignez", "saignent",
		"corruption", "glitch",
		"erreur", "erreurs", "error", "errors",
		"monstre", "monstres", "chose", "choses",
		"jet", "jets",
		"roll", "rolls",
		"micro onde", "micro ondes",
		"lave", "volcan", "volcans", "volcanisme", "volcanique",
		"cratère", "cratères",
		"ennemi", "ennemie", "ennemis", "ennemies",
		"effondrement", "effondrements"
	), handle = fs.openSync("log.log", 'a+');
	
	for(var i = 0; i < bullshit.length; i++) {
		var string = msg.content.toLowerCase();
		if(string === bullshit[i] || ((string.split(bullshit[i]).length > 1) && (string.split('http').length < 2))) { return `${msg.author} : ${msg.content}`; }
	}
}

console.log('Connecting...');
try { client.login('...'); }
catch(e) { console.log(`Connexion Failed !\nERROR : ${e}`); }

var helper = Array( // Arguments de Commandes
	`Bot ${name.toUpperCase()}`,
	"\n\nCommande Système",
	"----------------",
	`\nSyntax : !${name} <arg>`,
	"\n -h\t Affiche l'aide de commande",
	" -p\t Affiche le ping du bot",
	` -d\t Demande à ${name.toUpperCase()} la date d'aujourd'hui`,
	` -t\t Demande à ${name.toUpperCase()} l'heure à la miliseconde`,
	"\n\nCommande Personnelle",
	"--------------------",
	"\nSyntax : !id <arg>",
	`\n patpat\t Applique un blush à ${name.toUpperCase()}`
), arg = '```';
for(var i = 0; i < helper.length; i++) { arg += `${helper[i]}\n`; }
arg += '```';

client
	.on('ready', () => { console.log(`${name.toUpperCase()} was connected to ${client.user.tag} !\n`); })
	.on('error', err => { console.log(err); })
	.on('message', msg => {
		var time = new Date();
		
		switch(msg.content) {
			case `!${name} -h`: msg.reply(arg); break; // Commande Système
			case `!${name} -p`: msg.reply(`:hourglass_flowing_sand: ${client.ping}ms`); break;
			case `!${name} -d`: msg.reply(`:date: ${time.getDay()+21}/${time.getMonth()+1}/20${time.getYear()-100}`); break;
			case `!${name} -t`: msg.reply(`:clock: ${time.getHours()}h ${time.getMinutes()}m ${time.getSeconds()}s ${time.getMilliseconds()}ms`); break;
			case `t!cookie <@555732032320307202>`: msg.channel.send(`Merci ${msg.author} !`); break; // Réponse Humaine
			case `!id patpat`: msg.channel.send(`*${name.toUpperCase()} is blushing.*`); break; // Réponse Perso
			default:
				console.log(`\nSERVER\t: ${msg.guild.id}\nUSER\t: ${msg.author}\nMSG\t: ${msg.content}`);
				
				if(badWord(msg)) {
					// ton msg à envoyé...
					console.log("[ WARN ] - IDALE requise.");
					load(['son.mp3'], { from: './' }).then(function(buffer) { play(buffer[0], { loop: false }) });
				} break;
		}
	});


/**
 * Author      : Anarchy & DOC
 * Name        : index.js
 * Last Update : 25/04/2019
 */

const conf = require('./conf.json'),
      discord = require('discord.js'),
      client = new discord.Client(),
      play = require('audio-play'),
      load = require('audio-loader');

function keyWord(msg) {
	const word = Array(
		`${conf.name}`, "doc", "core", `${conf.name[0]}${conf.name[1]}${conf.name[2]}${conf.name[3]}`,
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
	
	for(var i = 0; i < word.length; i++) {
		var string = msg.content.toLowerCase();
		if(string === word[i] || ((string.split(word[i]).length > 1) && (string.split('http').length < 2))) { return `${msg.author} : ${msg.content}`; }
	}
}

console.log('Connecting...');
try { client.login('NTU1NzMyMDMyMzIwMzA3MjAy.XLz3Dw.jQMFfxpFuk6BAoeS9WfuunbZvnk'); }
catch(e) { console.log(`Connexion Failed !\nERROR : ${e}`); }

var helper = Array( // Arguments de Commandes
	`Bot ${conf.name.toUpperCase()}`,
	`\nSyntax : !${conf.name} <arg>`,
	"\n\nCommande Système",
	"----------------",
	"\n -h\t Affiche l'aide de commande",
	" -p\t Affiche le ping du bot",
	` -d\t Demande à ${conf.name.toUpperCase()} la date d'aujourd'hui`,
	` -t\t Demande à ${conf.name.toUpperCase()} l'heure à la miliseconde`,
	"\n\nCommande Personnelle",
	"--------------------",
	`\n patpat\t Applique un blush à ${conf.name.toUpperCase()}`
), arg = '```';
for(var i = 0; i < helper.length; i++) { arg += `${helper[i]}\n`; }
arg += '```';

client
	.on('ready', () => { console.log(`${conf.name.toUpperCase()} was connected to ${client.user.tag} !\n`); })
	.on('error', err => { console.log(err); })
	.on('message', msg => {
		var time = new Date();
		
		switch(msg.content) {
			case `!${conf.name} -h`: msg.reply(arg); break; // Commande Système
			case `!${conf.name} -p`: msg.reply(`:hourglass_flowing_sand: ${client.ping}ms`); break;
			case `!${conf.name} -d`: msg.reply(`:date: ${time.getDay()+21}/${time.getMonth()+1}/20${time.getYear()-100}`); break;
			case `!${conf.name} -t`: msg.reply(`:clock: ${time.getHours()}h ${time.getMinutes()}m ${time.getSeconds()}s ${time.getMilliseconds()}ms`); break;
			case `t!cookie ${conf.id}`: msg.channel.send(`Merci ${msg.author} !`); break; // Réponse Humaine
			case `!${conf.name} patpat`: msg.channel.send(`*${name.toUpperCase()} is blushing.*`); break; // Réponse Perso
			default:
				console.log(`\nSERVER\t: ${msg.guild.id}\nUSER\t: ${msg.author}\nMSG\t: ${msg.content}`);
				
				if(keyWord(msg)) { // Message à envoyer
					console.log("[ WARN ] - IDALE requise.");
					load(['son.mp3'], { from: './' }).then(function(buffer) { play(buffer[0], { loop: false }) });
				} break;
		}
	});

/**
 * END
 */

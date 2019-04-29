/**
 * Author      : Anarchy & DOC
 * Name        : index.js
 * Last Update : 29/04/2019
 */

const conf = require('./conf.json'),
      discord = require('discord.js'),
      client = new discord.Client(),
      play = require('audio-play'),
      load = require('audio-loader'),
      dev = {
      	0: { name: 'Anarchy', func: 'développeur' },
      	1: { name: 'DOC', func: 'testeur' },
      	lastupt: '29/04/2019'
      }

function keyWord(msg) {
	const word = Array(
		conf.name, "doc", "core", `${conf.name[0]}${conf.name[1]}${conf.name[2]}${conf.name[3]}`,
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
	);
	
	for(var i = 0; i < word.length; i++) {
		var string = msg.content.toLowerCase();
		if(string === word[i] || ((string.split(word[i]).length > 1) && (string.split('http').length < 2))) { return `${msg.author} : ${msg.content}`; }
	}
}

console.log('Connecting...');
try { client.login(conf.token); }
catch(e) { console.log(`Connexion Failed !\nERROR : ${e}`); }

var helper = Array( // Arguments de Commandes
	`Bot ${conf.name.toUpperCase()}`,
	`\n\nCommande Système\t\t[Syntax: !${conf.name} <arg>]`,
	"----------------",
	"\n --help\t Affiche l'aide de commande",
	" --ping\t Affiche le ping du bot",
	` --date\t Demande à ${conf.name.toUpperCase()} la date d'aujourd'hui`,
	` --time\t Demande à ${conf.name.toUpperCase()} l'heure à la miliseconde`,
	"\n\nCommande Jeu de Rôle\t[Syntax: !rp <arg>]",
	"--------------------",
	`\n <x>d<y>\t Demande à ${conf.name.toUpperCase()} de lancer x fois un dé de y faces`,
	`\n\nCommande Personnelle\t[Syntax: !${conf.name} <arg>]`,
	"--------------------",
	`\n patpat\t Applique un blush à ${conf.name.toUpperCase()}`,
	`\n\nConçu par: ${dev[0].name} & ${dev[1].name}`
), about = Array(
	`Bot ${conf.name.toUpperCase()} conçu par:`,
	`\t${dev[0].name} <${dev[0].func}>`,
	`\t${dev[1].name} <${dev[1].func}>`,
	`\ndernière MàJ: ${dev.lastupt}`
), temp = '```';
for(var i = 0; i < helper.length; i++) { temp += `${helper[i]}\n`; }
temp += '```', helper = temp, temp = '```';
for(var i = 0; i < about.length; i++) { temp += `${about[i]}\n`; }
temp += '```', about = temp;

client
	.on('ready', () => { console.log(`${conf.name.toUpperCase()} was connected to ${client.user.tag} !\n`); })
	.on('error', err => { console.log(err); })
	.on('message', msg => {
		var arg = msg.content.split(' '),
		    time = new Date();
		
		if(arg[0] === `!${conf.name}`) {
			switch(arg[1]) {
				case '--help': msg.channel.send(helper); break; // Commande Système
				case '--about': msg.channel.send(about); break;
				case '--ping': msg.channel.send(`:hourglass_flowing_sand: ${client.ping}ms`); break;
				case '--date': msg.channel.send(`:date: ${time.getDay()+21}/${time.getMonth()+1}/20${time.getYear()-100}`); break;
				case '--time': msg.channel.send(`:clock: ${time.getHours()}h ${time.getMinutes()}m ${time.getSeconds()}s ${time.getMilliseconds()}ms`); break;
				case 'patpat': msg.channel.send(`*${conf.name.toUpperCase()} is blushing.*`); break; // Réponse Perso
			}
		}
		else if(arg[0] === '!rp') {
			var x = arg[1].split('d'), y, z = '', result = 0;
			for(var i = 0; i < x[0]; i++) {
				y = Math.floor(Math.random()*Math.floor(parseInt(x[1])+1)), result += y, z += `${y} `;
				if(i < x[0]-1) { z += '; '; }
			} msg.channel.send(`Liste: ${z}\nTotal: ${result}`);
		}
		else if(msg.content === `t!cookie ${conf.id}`) { msg.channel.send(`Merci ${msg.author} !`); } // Réponse Humaine
		else {
			console.log(`\nSERVER\t: ${msg.guild.id}\nUSER\t: ${msg.author}\nMSG\t: ${msg.content}`);
			
			if(keyWord(msg)) { // Message à envoyer
				console.log("[ WARN ] - IDALE requise.");
				load(['son.mp3'], { from: './' }).then(buffer => { play(buffer[0], { loop: false }) });
			}
		}
	});

/**
 * END
 */

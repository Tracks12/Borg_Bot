/**
 * Author      : Anarchy & DOC
 * Name        : index.js
 * Last Update : 30/04/2019
 */

const conf = require('./conf.json'),
      discord = require('discord.js'),
      client = new discord.Client(),
			mysql = require('mysql'),
			bdd = mysql.createConnection({
				host: conf.db.host,
				database: conf.db.name,
				user: conf.db.user,
				password: conf.db.pass
			}),
      play = require('audio-play'),
      load = require('audio-loader'),
      dev = {
      	0: { name: 'Anarchy', func: 'développeur' },
      	1: { name: 'DOC', func: 'testeur' },
      	lastupt: '30/04/2019'
      };

function keyWord(msg) {
	var key = require('./keyWord.json');
	key.word.push(conf.name);
	key.word.push(`${conf.name[0]}${conf.name[1]}${conf.name[2]}${conf.name[3]}`);
	
	for(var i = 0; i < key.word.length; i++) {
		var string = msg.content.toLowerCase();
		if(string === key.word[i] || ((string.split(key.word[i]).length > 1) && (string.split('http').length < 2))) { return `${msg.author} : ${msg.content}`; }
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
	" --about\t Affiche les infos sur l'équipe et la dernière MàJ du bot",
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

bdd.connect(err => {
	if(err) throw err;
	console.log("Connected to DB");
	bdd.query("SELECT usr.name FROM usr", (err, result, fields) => {
		if(err) throw err;
		console.log(result);
	});
});

client
	.on('ready', () => {
		client.user.setPresence({
			game: {
				name: "conversation",
				type: "WATCHING"
			},
			status: "online"
		});
		console.log(`${conf.name.toUpperCase()} was connected to ${client.user.tag} !\n`);
	})
	.on('error', err => { console.log(err); })
	.on('message', msg => {
		var arg = msg.content.split(' '),
		    time = new Date();
		
		if(arg[0] === `!${conf.name}`) {
			switch(arg[1]) {
				case '--help': msg.channel.send(helper); break; // Commande Système
				case '--about': msg.channel.send(about); break;
				case '--ping': msg.channel.send(`:hourglass_flowing_sand: ${client.ping}ms`); break;
				case '--date': msg.channel.send(`:date: ${time.toLocaleDateString()}`); break;
				case '--time': msg.channel.send(`:clock: ${time.getHours()}h ${time.getMinutes()}m ${time.getSeconds()}s ${time.getMilliseconds()}ms`); break;
				case 'patpat': client.user.setActivity("blushing", { type: "PLAYING"}); // Réponse Perso
					msg.channel.send(`*${conf.name.toUpperCase()} is blushing.*`); break;
			}
		}
		else if(arg[0] === '!rp') { // Lancer de dé
			var x = arg[1].toLowerCase().split('d'), y, z = '', result = 0;
			for(var i = 0; i < x[0]; i++) {
				y = Math.floor(Math.random()*Math.floor(parseInt(x[1])+1)), result += y, z += `${y} `;
				if(i < x[0]-1) { z += '; '; }
			} msg.channel.send('```'+`Liste: ${z}\n\nMoyenne: ${result/x[0]}\n\nTotal: ${result}`+'```');
		}
		else if(msg.content === `t!cookie <@${client.user.id}>`) { msg.channel.send(`Merci ${msg.author} !`); } // Réponse Humaine
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

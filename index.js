/**
 * Author      : Anarchy & DOC
 * Name        : index.js
 * Last Update : 31/05/2019
 */

const conf = require('./conf.json'),
	keyList = require('./keyWord.json'),
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
		lastupt: '31/05/2019'
	};

function keyWord(msg) {
	keyList.word.push(conf.name);
	keyList.word.push(`${conf.name[0]}${conf.name[1]}${conf.name[2]}${conf.name[3]}`);
	
	for(var i = 0; i < keyList.word.length; i++) {
		var string = msg.content.toLowerCase();
		if(string === keyList.word[i] || ((string.split(keyList.word[i]).length > 1) && (string.split('http').length < 2))) { return `${msg.author} : ${msg.content}`; }
	}
}

console.log('Connecting...');
try { client.login(conf.token); }
catch(e) { console.log(`Connexion Failed !\nERROR : ${e}`); }

var helper = Array( // Arguments de Commandes
	`Bot ${conf.name.toUpperCase()}`,
	`\n\nCommande Système\t\t[Syntax: !${conf.name} <arg>]`,
	"----------------",
	"\n --help   Affiche l'aide de commande",
	" --about  Affiche les infos sur l'équipe et la dernière MàJ du bot",
	" --ping   Affiche le ping du bot",
	` --date   Demande à ${conf.name.toUpperCase()} la date d'aujourd'hui`,
	` --time   Demande à ${conf.name.toUpperCase()} l'heure à la miliseconde`,
	"\n\nCommande Jeu de Rôle\t[Syntax: !rp <arg>]",
	"--------------------",
	`\n roll0 <x>d<y>   Demande à ${conf.name.toUpperCase()} de lancer x fois un dé de y faces avec le 0 compris`,
	` roll <x>d<y>    Demande à ${conf.name.toUpperCase()} de lancer x fois un dé de y faces en ignorant le 0`,
	`\n\nCommande Personnelle\t[Syntax: !${conf.name} <arg>]`,
	"--------------------",
	`\n boop     C'est un boop (rien à dire de plus)`,
	` hug      Fait un câlin au demandeur`,
	` patpat   Applique un blush à ${conf.name.toUpperCase()}`,
	`\n\nConçu par: ${dev[0].name} & ${dev[1].name}`
), about = Array(
	`Bot ${conf.name.toUpperCase()} conçu par:`,
	`\t${dev[0].name} <${dev[0].func}>`,
	`\t${dev[1].name} <${dev[1].func}>`,
	`\ndernière MàJ: ${dev.lastupt}`
), temp = '```';
for(var i = 0; i < helper.length; i++) temp += `${helper[i]}\n`;
temp += '```', helper = temp, temp = '```';
for(var i = 0; i < about.length; i++) temp += `${about[i]}\n`;
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
			}
			
			if(arg[1]) { // Commande Personnelle Interactive
				for(let [key, value] of Object.entries(keyList.action)) {
					var output = keyList.action[key][1];
					
					if(arg[1] === key) {
						if(arg[1] === "hug") output += ` ${msg.author}`;
						client.user.setActivity(keyList.action[key][0], { type: "PLAYING"}); // Réponse Perso
						msg.channel.send(`*${conf.name.toUpperCase()} ${output}.*`);
					}
				}
				
				setTimeout(() => client.user.setActivity(), 5000);
			}
		}
		else if(arg[0] === '!rp') { // Lancer de dé
			if(!arg[2]) { return false; }
			
			var x = arg[2].toLowerCase().split('d'),
				y = 0,
				z = '',
				moy = '',
				result = 0;
			
			for(var i = 0; i < x[0]; i++) {
				switch(arg[1]) {
					case 'roll0': y = Math.floor(Math.random()*Math.floor(parseInt(x[1])+1)); break;
					case 'roll': do { y = Math.floor(Math.random()*Math.floor(parseInt(x[1])+1)); } while(!y); break;
				}
				
				result += y, z += `${y}`;
				if(i < x[0]-1) z += '; ';
				if(i > 0) moy = `Liste: ${z}\n\nMoyenne: ${result/x[0]}`;
			} msg.channel.send('```'+`${moy}\n\nTotal: ${result}`+'```');
		}
		else if(msg.content === `t!cookie <@${client.user.id}>`) msg.channel.send(`Merci ${msg.author} !`); // Réponse Humaine
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

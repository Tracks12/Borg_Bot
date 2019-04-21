const discord = require('discord.js'),
	fs = require('fs'),
	client = new discord.Client(),
	name = 'idale',
	play = require('audio-play'),
	load = require('audio-loader');

function badWord(msg) {
	const bullshit = [
		"idale", "doc", "core", "idal",
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
	], handle = fs.openSync("log.log", 'a+');
	
	for(var i = 0; i < bullshit.length; i++) {
		var string = msg.content.toLowerCase();
		if(string === bullshit[i] || ((string.split(bullshit[i]).length > 1) && (string.split('http').length < 2))) { return `${msg.author} : ${msg.content}`; }
	}
}

console.log('Connecting...');
try { client.login('...'); }
catch(e) { console.log(`Connexion Failed !\nERROR : ${e}`); }

client
	.on('ready', () => { console.log(`${name.toUpperCase()} was connected to ${client.user.tag} !\n`); })
	.on('message', msg => {
		switch(msg.content) {
			case `!${name} -p`: msg.reply(`${client.ping}ms`); break;
			default:
				console.log(`\nSERVER\t: ${msg.guild.id}\nUSER\t: ${msg.author}\nMSG\t: ${msg.content}`);
				
				if(badWord(msg)) {
					// ton msg à envoyé...
					console.log("[ WARN ] - IDALE requise.");
					load(['son.mp3'], { from: './' }).then(function(buffer) { play(buffer[0], { loop: false }) });
				} break;
		}
	});

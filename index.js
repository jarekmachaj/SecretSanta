var SecretSanta = require('./SecretSanta')

var people = [
	{"name" : "Janusz", "email" : "janusz@gmail.com" },
	{"name" : "Krystyna", "email" : "krystyna@gmail.com"}
];

var santa = new SecretSanta(people, {
	service: "Gmail",
	auth: {
	   user: "gmailUser",
	   pass: "gmailPass"
	}
});

santa.drawAndSend('Secret Santa <gmailUser@gmail.com>', 
	function(obj) {return obj["name"];}, 
	function(obj) {return obj["email"];}
);



var nodemailer = require("nodemailer");
var Randomer = require('./Randomer')

function SecretSanta(peopleArr, smtpTransport){
	this._people = peopleArr;
	this._smtpTransport = nodemailer.createTransport("SMTP", smtpTransport);
}

SecretSanta.prototype.MailTitle = "Hi, you are someone's Secret Santa";

SecretSanta.prototype.drawAndSend = function(from, getObjName, getObjMail){

	var random = new Randomer(this._people);
	var assignments = random.getAssignments();

	for (var i = 0; i < assignments.length; ++i){
		var objName = getObjName(assignments[i]["obj"]);
		var objMail = getObjMail(assignments[i]["obj"]);
		var asgName = getObjName(assignments[i]["assignment"]);
		var asgMail = getObjMail(assignments[i]["assignment"]);

		var mailOptions = {
		    from: from, // sender address
		    to: objName + " <" + objMail +">", // list of receivers
		    subject: this.MailTitle, // Subject line
		    text: asgName + ", " + asgMail, // plaintext body
		    html: "<b>" + asgName + ", " + asgMail + "</b>" // html body
		}

		this._smtpTransport.sendMail(mailOptions, function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + response.message);
		    }
		});
	}
}

module.exports = SecretSanta;
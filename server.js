// Changeable Variables
const userPasscode = "0000";
const scriptPath = process.cwd() + "\\server.js";
const port = 1738;

const express = require("express");
const session = require("express-session");
const app = express();
const server = app.listen(port);

const Service = require("node-windows").Service;

const { exec } = require("child_process");

const fs = require("fs");
const path = require("path");
const body_parser = require("body-parser");

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/install", function(req, res) {
	if(req.body.passcode === userPasscode) {
		let svc = new Service({
			name:"X-Controller",
			description:"Remote Access Tool",
			script:scriptPath
		});

		svc.on("install", function() {
			res.send("The service has been installed.");
			svc.start();
		});

		svc.install();
	}
});

app.post("/uninstall", function(req, res) {
	if(req.body.passcode === userPasscode) {
		let svc = new Service({
			name:"X-Controller",
			description:"Remote Access Tool",
			script:scriptPath
		});

		svc.on("uninstall", function() {
			res.send("The service has been uninstalled.");
			svc.stop();
		});

		svc.uninstall();
	}
});

app.post("/api", function(req, res) {
	let command = "";

	if(req.body.passcode === userPasscode) {
		let valid = true;
		let action = req.body.action;

		if(action === "restart") {
			command = "shutdown /r";
		}
		else if(action === "shutdown") {
			command = "shutdown /s";
		}
		else if(action === "apps") {
			command = "tasklist";
		}
		else if(action === "killapp") {
			if(parseInt(req.body.args)) {
				command = "taskkill /F /PID " + req.body.args;
			}
			else {
				valid = false;
				res.send("You aren't allowed to do that.");
			}
		}

		if(valid && command !== "") {
			try {
				exec(command, (err, stdout, stderr) => {
					if(err) {
						res.send(err);
					}
					if(!err && !stderr) {
						res.send(stdout);
					}
				});
			}
			catch(e) {
				console.log(e);
			}
		}
	}
	else {
		res.send("Invalid credentials.");
	}
});
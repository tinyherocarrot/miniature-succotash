var db = require("../models/");
// res.session

module.exports = function(app) {
	var path = require("path");
	// set up session storage
	var session = require("express-session");
	app.set("trust proxy", 1); // trust first proxy
	app.use(
		session({
			secret: "keyboard cat",
			resave: false,
			saveUninitialized: true,
			cookie: { secure: true }
		})
	);
	// set up handlebars.js
	var exphbs = require("express-handlebars");
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	// and specify a default view engine
	app.set("view engine", "handlebars");

	// GET requests for loading HTML pages
	// ================================================================================
	// root, routes to login.handlebars
	app.get("/", function(req, res) {
		if (req.session.user_id) {
			res.redirect(`/connections/${req.session.user_id}`);
		} else {
			res.render("login", {});
		}
	});
	// signup routes to createaccount.handlebars
	app.get("/signup", function(req, res) {
		res.render("profile_create", {});
	});
	// signin routes to get account information using email and password
	app.post("/signin", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		var email = req.body.email;
		var user_password = req.body.user_password;
		db.User
			.findOne({
				where: {
					email: email,
					user_password: user_password
				}
			})
			.then(results => {
				console.log("look at me! ", results);
				req.session.user_id = results.dataValues.user_id;
				req.session.qlink_code = results.dataValues.qlink_code;
				res.redirect(`/connections`);
			});
	});

	// loads the connections.html page, where all your connections in the db are displayed
	app.get("/connections", function(req, res) {
		// res.render("connections", {});
		console.log("Got: ", req.body, req.method, req.path);

		// Get the user_id of the logged in user
		var user_id = req.session.user_id;

		// Find all connection rows associated with user_id
		db.Connections
			.findAll({
				where: { sender_id: user_id }
			})
			.then(connections => {
				var connectionsArray = [];
				var sender_id;
				var receiver_id;
				// Push the id's of all the users connected with the main user to connectionsArray
				for (var i = 0; i < connections.length; i++) {
					sender_id = connections[i].dataValues.sender_id;
					receiver_id = connections[i].dataValues.receiver_id;
					// Logic that pushes only the corresponding user id's
					if (sender_id === user_id) {
						if (receiver_id) {
							connectionsArray.push(receiver_id);
						}
					} else if (receiver_id === user_id) {
						if (sender_id) {
							connectionsArray.push(sender_id);
						}
					}
				}

				console.log("============");
				console.log(
					"User " + user_id + "'s Connections: ",
					connectionsArray
				);
				console.log("============");

				// Find all users with the corresponding to connectionsArray and display them
				db.User
					.findAll({
						where: {
							user_id: connectionsArray
						}
					})
					.then(data => {
						console.log("right before rendering connections page");
						var userObject = {
							user: data
						};

						res.render("connections", { results: userObject });
					});
			});
	});
	// loads the profile page, where your personal editable profile is displayed
	app.get("/profile", function(req, res) {
		db.User
			.findOne({ where: { user_id: req.session.user_id } })
			.then(results => {
				console.log(req.session.user_id);
				res.render("profile", { results: results });
			});
	});
	// loads the share page, where you can connect with other users
	app.get("/share", function(req, res) {
		res.render("share", { qlink_code: req.session.qlink_code });
	});

	// Routes for 'Users' Table
	// ===============================================================================
	// GET route for viewing *all* the Users
	app.get("/api/all-users", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.User.findAll({}).then(results => res.json(results));
	});

	// POST route for adding a new User profile
	app.post("/signup", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);
		var is_looking;
		if (req.body.hire_me === true) {
			is_looking = true;
		} else {
			is_looking = false;
		}

		db.User
			.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				user_password: req.body.user_password,
				city: req.body.city,
				organization: req.body.organization,
				role: req.body.role,
				bio: req.body.bio,
				user_photo: req.body.user_photo,
				linkedin: req.body.linkedin,
				twitter: req.body.twitter,
				other_website: req.body.other_website,
				hire_me: is_looking
			})
			.then(results => {
				// and save user_id to session storage
				req.session.user_id = results.dataValues.user_id;

				// after user has been added, then assign their unique Qlink code
				db.User
					.update(
						{ qlink_code: 99999 + results.user_id },
						{
							where: { user_id: results.user_id }
						}
					)
					.then(results => {
						res.redirect(`profile/${res.session.user_id}`);
					});
			});
	});

	// PUT route for updating a User profile
	app.put("/api/users/:id", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.User
			.update(
				{},
				{
					where: { id: req.params.id }
				}
			)
			.then(results => {
				console.log("profile successfully updated");
				res.json(results);
				// res.end();
			});
	});

	// DELETE route for deleting a User profile
	app.delete("/api/users/:id", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.User
			.destroy({
				where: { id: req.params.id }
			})
			.then(results => {
				console.log("profile successfully deleted");
				res.json(results);
				// res.end();
			});
	});

	// Routes for 'Connections' Table
	// ===============================================================================
	// GET route for viewing all connections where user is the sender
	app.get("/api/connections/", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		// Get the user_id of the logged in user
		var user_id = req.body.user_id;

		// Find all connection rows associated with user_id
		db.Connections
			.findAll({
				where: { sender_id: user_id }
			})
			.then(connections => {
				var connectionsArray = [];
				var sender_id;
				var receiver_id;
				// Push the id's of all the users connected with the main user to connectionsArray
				for (var i = 0; i < connections.length; i++) {
					sender_id = connections[i].dataValues.sender_id;
					receiver_id = connections[i].dataValues.receiver_id;
					// Logic that pushes only the corresponding user id's
					if (sender_id === user_id) {
						if (receiver_id) {
							connectionsArray.push(receiver_id);
						}
					} else if (receiver_id === user_id) {
						if (sender_id) {
							connectionsArray.push(sender_id);
						}
					}
				}

				console.log("============");
				console.log(
					"User " + user_id + "'s Connections: ",
					connectionsArray
				);
				console.log("============");

				// Find all users with the corresponding to connectionsArray and display them
				db.User
					.findAll({
						where: {
							user_id: connectionsArray
						}
					})
					.then(data => {
						var userObject = {
							user: data
						};

						res.render("index", userObject);
					});
			});
	});

	// POST route for adding a new Connection
	app.post("/api/connections", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		// Get the user_id of the logged in user
		var user_id = req.body.user_id;
		var target_id = req.body.target_id;
		var meeting_place = req.body.meeting_place;
		var user_notes = req.body.user_notes;

		console.log("*******user_id: " + user_id);
		console.log("*******target_id: " + target_id);

		db.Connections
			.create({
				sender_id: user_id,
				receiver_id: target_id,
				meeting_place: meeting_place,
				user_notes: user_notes
			})
			.then(data => {
				console.log("*******data.connection_id: " + data.connection_id);
			});
	});
};

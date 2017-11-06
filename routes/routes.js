var db = require("../models/");
var path = require("path");

module.exports = function(app) {
	// set up handlebars.js
	var exphbs = require("express-handlebars");
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	// and specify a default view engine
	app.set("view engine", "handlebars");

	// GET requests for loading HTML pages
	// ================================================================================
	// root, routes to login.handlebars
	app.get("/", function(req, res) {
		// if user is already logged in,
		if (localStorage.getItem("user_id")) {
			// use stored user_id to login
			var user_id = localStorage.getItem("user_id");
			res.redirect(`/profile/${user_id}`);
			// else redirect to login page
		} else {
			res.render("login", {});
		}
	});
	// signup routes to createaccount.handlebars
	app.get("/signup", function(req, res) {
		res.render("createaccount", {});
	});
	// loads the connections.html page, where all your connections in the db are displayed
	app.get("/connections", function(req, res) {
		res.sendFile(path.join(__dirname, "../views/connections.handlebars"));
	});
	// loads the profile.html page, where your personal editable profile is displayed
	app.get("/profile/:id", function(req, res) {
		db.users
			.findAll({ where: { user_id: req.params.id } })
			.then(results => {
				res.render("profile", results);
			});
	});
	// loads the main.html page, where you can connect with other users
	app.get("/main", function(req, res) {
		res.sendFile(path.join(__dirname, "../views/main.handlebars"));
	});

	// Routes for 'Users' Table
	// ===============================================================================
	// GET route for viewing *all* the Users
	app.get("/api/users", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.users.findAll({}).then(results => res.json(results));
	});

	// POST route for adding a new User profile
	app.post("/api/users", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.users
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
				hire_me: req.body.hire_me
			})
			.then(results => {
				res.json(results);

				// after user has been added, then assign their unique Qlink code
				db.users
					.update(
						{ qlink_code: 99999 + results.user_id },
						{
							where: { user_id: results.user_id }
						}
					)
					// and save user_id to local storage
					.then(results =>
						localStorage.setItem("user_id", results.user_id)
					);
			});
	});

	// PUT route for updating a User profile
	app.put("/api/users/:id", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.users
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

		db.users
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
	app.get("/api/connections/:user_id", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.users
			.findAndCountAll({
				include: [
					{
						model: Connections,
						as: "contacts",
						where: { sender_id: req.params.user_id },
						include: [{ model: User }]
					}
				]
			})
			.then(result => {
				console.log(result.count);
				res.json(result.rows);
			});
	});

	// POST route for adding a new Connection
	app.post("/api/connections", function(req, res) {
		console.log("Got: ", req.body, req.method, req.path);

		db.users.create({}).then(results => {
			res.json(results);
		});
	});
};

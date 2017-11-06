// Event-triggered ajax calls

$(document).ready(function() {
	// Indicates that view.js has been loaded
	console.log("Loaded!");

	// Event Listeners
	// ---------------------------------------------
	$(document).on("click", "sign-in", signIn);
	$(document).on("click", "#create-new-account", createNewAccount);

	// Functions
	// ---------------------------------------------
	var signIn = function(event) {
		event.preventDefault();
		// handle signing in existing user, saving user id to local storage
	};

	// build a new User object, AJAX call to post new user object
	var createNewAccount = function(event) {
		console.log("adding new user");
		event.preventDefault();
		var user_name = $("#inputName")
			.val()
			.trim()
			.split(" ");
		var hire_me;
		if ($(`input[name='optionsRadios']:checked`).val() === "hire-me") {
			hire_me = true;
		} else if (
			$(`input[name='optionsRadios']:checked`).val() === "not-looking"
		) {
			hire_me = false;
		}
		var newAccount = {
			first_name: user_name[0],
			last_name: user_name[1],
			email: $("#inputEmail")
				.val()
				.trim(),
			user_password: $("#inputPassword").val(),
			city: $("#inputCity")
				.val()
				.trim(),
			organization: $("#inputCompany")
				.val()
				.trim(),
			role: $("#inputTitle")
				.val()
				.trim(),
			bio: $("#inputBio").val(),
			user_photo: $("#photoFile").val(),
			linkedin: $("#inputLinkedin")
				.val()
				.trim(),
			twitter: $("#inputTwitter")
				.val()
				.trim(),
			other_website: $("#inputWebsite")
				.val()
				.trim(),
			hire_me: hire_me
		};

		$.post("/api/users", newAccount).done(() => {
			console.log("new user successfully added");
			// reroute to profile.handlebars
		});
	};
});

// Event-triggered ajax calls

$(document).ready(function() {
	// Indicates that view.js has been loaded
	console.log("Loaded!");

	// Event Listeners
	// ---------------------------------------------
	$(document).on("click", "#listNew", listNew);
	$(document).on("click", "#listNew", listAlpha);

	// Functions
	// ---------------------------------------------
	function listNew(event) {
		event.preventDefault();
		$.get({}).done();
	}

	function listAlpha(event) {}
});

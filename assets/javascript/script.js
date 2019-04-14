// When the search button is pressed
$("#search-button").on("click", function () {
    // Targets the input of user through the search bar
    var userInput = $("#search-bar").val();
    // Display user input into console (for test purposes so far)
    console.log(userInput);
    // Empties out the search bar field
    $("#search-bar").val("");
    // Determines whether the input field is empty or unreadable
    if (userInput.length === 0 || userInput === null || userInput === undefined) {
        // Displays instructions to type a name into the search bar
        $("#empty-text").html("Please enter an artist name!");
    }
    // If the user put something into the search bar
    else {
        // Clears div in case instruction is already present on the page
        $("#empty-text").html("");
        // If both divs are empty on the webpage
        if ($("#table-div").is(":empty") || $("#main-display").is(":empty")) {
            //Runs function to build the artist table
            artistTable();
            //Runs function to add the two columns for Spotify and Youtube
            contentDisplay();
        }
    }
})



// Function to build the two main columns to display query content
function contentDisplay() {
    // Create a new div for spotify content
    var spotifyContent = $("<div>");
    // Adds classes to the spotify div
    spotifyContent.attr("class", "column main-content");
    // Adds an id to the spotify div
    spotifyContent.attr("id", "spotify-content");
    // Adds the spotify column to the html
    $("#main-display").append(spotifyContent)
    // Create a new div for the youtube content
    var youTubeContent = $("<div>");
    // Adds classes to the youtube content
    youTubeContent.attr("class", "column main-content");
    // Adds an id to the youtube div
    youTubeContent.attr("id", "youtube-content");
    // Adds the youtube column to the html
    $("#main-display").append(youTubeContent);
    // Adds a new paragraph div
    var spotifyTitle = $("<p>");
    // Adds text to the paragraph div
    spotifyTitle.html("Spotify");
    // Adds the div to the html
    $("#spotify-content").append(spotifyTitle);
    // Adds a new paragraph div
    var youTubeTitle = $("<p>");
    // Adds text to the paragraph div
    youTubeTitle.html("Youtube");
    // Adds the div to the html
    $("#youtube-content").append(youTubeTitle);
}



// Function to build the artist table
function artistTable() {
    // Changes background of container from white to black
    $("#table-container").css("background", "black")
    // Creates a paragraph div
    var tableTitle = $("<p>");
    // Adds an id to the paragraph div
    tableTitle.attr("id", "table-title");
    // Adds text to the paragraph div
    tableTitle.html("Your Artist Searches:")
    // Pushes the paragraph to the front of the table container
    $("#table-container").prepend(tableTitle)
    // Create the main table div
    var bandTable = $("<table>");
    // Add classes to the table div
    bandTable.attr("class", "table is-bordered");
    // Add an id to the table
    bandTable.attr("id", "band-table");
    // Append the table to a div on the html
    $("#table-div").append(bandTable);
    // Create the div for the head of the table
    var tableHead = $("<thead>");
    // Add a class to the head div
    tableHead.attr("class", "head-list");
    // Add the div to the able on the html
    $("#band-table").append(tableHead);
    // Adds a row div to the head div of table
    var tableList = $("<tr>");
    // Adds class to the table row
    tableList.attr("class", "table-list");
    // Adds the row to the able
    $(".head-list").append(tableList);
    // List of text for each cell of table header
    var tableTitles = ["Artist Name", "Music Genre", "Songs", "Band Images", "Spotify Artist Link", "Youtube Artist Link"];
    for (var i = 0; i < tableTitles.length; i++) {
        // Create a new div cell for length of variable list
        var headCell = $("<th>");
        // Adds text into each cell based on variable list
        headCell.html(tableTitles[i]);
        // Appends each cell to the table header
        $(".head-list").append(headCell);
    }
}
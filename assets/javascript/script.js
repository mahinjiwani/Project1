    // When the search button is pressed
    $("#search-button").on("click", function () {
    // Targets the input of user through the search bar
    var userInput = $("#search-bar").val();
    // Empties out the search bar field
    $("#search-bar").val("");
    // Clears all currently loaded youtube content
    $(".youtube-video").remove();
    // Clears all currently loaded spotify content
    $("#player-div").remove();
    // Adds a variable to div class
    var oldSearch = $(".user-query")
    // Chances div class of called variable
    oldSearch.attr("class", "old-query")
    // Removes old div class of variable
    oldSearch.removeClass("user-query")
    // Determines whether the input field is empty or unreadable
    if (userInput.length === 0 || userInput === null || userInput === undefined) {
        // Displays instructions to type a name into the search bar
        $("#empty-text").html("Please enter an artist name!");
    }
    // If the user put something into the search bar
    else {
        // seacrh by keyword
        var apiKey = "AIzaSyCxI37dKTdAqPRZ2ObfcK2M7TaSXtr5F4c"
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + userInput + "&type=video&videoCategoryId=10&key=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (let i = 0; i < response.items.length; i++) {
                var songTitle = response.items[i].snippet.title;//song title
                var videoId = response.items[i].id.videoId;//videoid, which imports the video
                var videoDiv = $("<div>");
                videoDiv.attr("class", "youtube-video");
                var aboutTheVideo = $("<p>").html(songTitle);
                aboutTheVideo.attr("class", "video-title");
                var videoSrc = "https://www.youtube.com/embed/" + videoId;
                var videoFrame = $("<iframe>").attr("src", videoSrc).attr("frameborder", 0).attr("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
                //<iframe width="560" height="315" src="https://www.youtube.com/embed/w8KQmps-Sog" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                videoDiv.append(aboutTheVideo);
                videoDiv.append(videoFrame);
                $("#youtube-content").append(videoDiv);
            }
        });


        // Clears div in case instruction is already present on the page
        $("#empty-text").html("");
        // If both divs are empty on the webpage
        if ($("#table-div").is(":empty") || $("#main-display").is(":empty")) {
            //Runs function to build the artist table
            artistTable();
            //Runs function to add the two columns for Spotify and Youtube
            contentDisplay();
        }
        // Calls function get artist
        getArtists(userInput);
        // Calls function to scroll search result table
        pageScroll();
    }
})
// Function to scroll down to result table
function pageScroll() {
    // A downward horizontal shift
    window.scrollBy(0, 600);
}

// Function to build the two main columns to display query content
function contentDisplay() {
    // Create a new div for spotify content
    var spotifyContent = $("<div>");
    // Adds classes to the spotify div
    spotifyContent.attr("class", "col s6 main-content");
    // Adds an id to the spotify div
    spotifyContent.attr("id", "spotify-content");
    // Adds the spotify column to the html
    $(".row").append(spotifyContent)
    // Create a new div for the youtube content
    var youTubeContent = $("<div>");
    // Adds classes to the youtube content
    youTubeContent.attr("class", "col s6 main-content");
    // Adds an id to the youtube div
    youTubeContent.attr("id", "youtube-content");
    // Adds the youtube column to the html
    $(".row").append(youTubeContent);
    // Adds a new paragraph div
    var spotifyTitle = $("<h4>");
    // Adds text to the paragraph div
    spotifyTitle.html("Spotify");
    // Adds the div to the html
    $("#spotify-content").append(spotifyTitle);
    // Adds a new paragraph div
    var youTubeTitle = $("<h4>");
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
    var tableTitle = $("<h3>");
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
    var searchResults = $("<tbody>")
    searchResults.attr("class", "table-body");
    $("#band-table").append(searchResults);
    // List of text for each cell of table header
    var tableTitles = ["Artist Name", "Music Genre(s)", "Spotify Artist Link", "Youtube Artist Link", "Songs"];
    for (var i = 0; i < tableTitles.length; i++) {
        // Create a new div cell for length of variable list
        var headCell = $("<th>");
        // Adds text into each cell based on variable list
        headCell.html(tableTitles[i]);
        // Adds class is-warning
        $(".head-list").append(headCell);
    }
}

const config = {
    apiKey: "AIzaSyBTcTmFZc0OHm47OPx2Dp8C1s5OwyfW8X0",
    authDomain: "project1ingt.firebaseapp.com",
    databaseURL: "https://project1ingt.firebaseio.com",
    projectId: "project1ingt",
    storageBucket: "project1ingt.appspot.com",
    messagingSenderId: "809078972304"
};
firebase.initializeApp(config);
let sp_oauth_token = '';
const database = firebase.database();
const encode_sp = database.ref('/encode/sp_oauth');
encode_sp.once('value', function (data) {
    sp_oauth_token = data.val();
});
// Spotify Search Artist - SM
const getArtists = function (userInput) {
    // New search clears results
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + userInput + "&type=artist&limit=1",
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sp_oauth_token}`
        }
    }).then(function (response) {
        response.artists.items.forEach(item => {
            // Create result object that stores important query information
            const result = {
                artist: item.name,
                id: item.id,
                sp_link: item.external_urls.spotify,
                images: item.images,
                genres: item.genres
            };
            $(".artist-name").remove();
            // Add single result to results array
            var artistName = $("<div>")
            // Adds artist query text to div
            artistName.html(result.artist)
            // Adds class artist-name to div
            artistName.attr("class", "artist-name");
            // Adds artistName div to called id
            $("#spotify-content").append(artistName);
            // Creats a table row div
            var searchResult = $("<tr>")
            // Adds class user-query to the table row div
            searchResult.attr("class", "user-query");
            // Adds data-class to the div
            searchResult.attr("data-new", "new-result")
            // Adds the table row to the table div
            $(".table-body").prepend(searchResult);
            // Creates a new table data cell
            var tableArtist = $("<td>");
            // Adds artist name to the data cell
            tableArtist.html(result.artist);
            // Adds the cell to the table row
            $(".user-query").append(tableArtist);
            // Create a new table data cell
            var tableGenres = $("<td>");
            // Adds genre text to the data cell
            tableGenres.html(result.genres);
            // Adds the genre cell to the table row
            $(".user-query").append(tableGenres);
            // Creates a new table data cell
            var spotifyPage = $("<td>");
            // Adds an id to the data cell
            spotifyPage.attr("id", "spotify-link");
            // Adds the data cell to the table row
            $(".user-query").append(spotifyPage);
            // Adds an a div to the spotify data cell
            var spotifyLink = $("<a>");
            // Adds the spotify-td to the cell
            spotifyLink.attr("id", "spotify-td");
            // Adds a destination link to the a div
            spotifyLink.attr("href", result.sp_link);
            // Opens the destonation link in a new browser tab
            spotifyLink.attr("target", "_blank");
            // Adds text to the spotify data cell
            spotifyLink.html("Spotify Link");
            // Adds the spotify data cell to the table cell
            $("#spotify-link").append(spotifyLink);
            // Creates a new data cell
            var youTubePage = $("<td>");
            // Adds an id to the data cell
            youTubePage.attr("id", "youtube-link");
            // Adds the data cell to the table row
            $(".user-query").append(youTubePage);
            // Creates an a div
            var youTubeLink = $("<a>");
            // Adds an id to the a div
            youTubeLink.attr("id", "youtube-td");
            // Sets the destination of the a div
            youTubeLink.attr("href", "https://www.youtube.com/results?search_query=" + userInput);
            // Opens the destination link in a new browser tab
            youTubeLink.attr("target", "_blank");
            // Adds text to the youtube data cell
            youTubeLink.html("YouTube Link");
            // Adds the a div to the data cell
            $("#youtube-link").append(youTubeLink);
            // Creates a new table data cell
            var tableSongs = $("<td>");
            // Adds an id to the cell
            tableSongs.attr("id", "top-songs");
            // Adds the cell to the table
            $(".user-query").append(tableSongs);
            // Creates an ordered list
            var topList = $("<ol>");
            // Adds an id to the list
            topList.attr("id", "top-list");
            // Adds the song titles to the list
            $("#top-songs").append(topList)
        });
        let results = [];
        // New search clears results
        var artistId = response.artists.items[0].id;
        $.ajax({
            url: "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=us",
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sp_oauth_token}`
            }
        }).then(function (response) {
            response.tracks.forEach(topTrack => {
                const track = {
                    album: {
                        external_url: topTrack.album.external_urls.spotify,
                        id: topTrack.album.id,
                        image: topTrack.album.images,
                        name: topTrack.album.name,
                        release_date: topTrack.album.release_date
                    },
                    artists: topTrack.artists,
                    duration: topTrack.duration_ms,
                    external_url: topTrack.external_urls.spotify,
                    id: topTrack.id,
                    name: topTrack.name,
                    preview_url: topTrack.preview_url
                }
                results.push(track);
                // Adds variable for track names
                var songList = track.name
                // Adds a list item div for each track name
                var songName = $("<li>");
                // Adds text to the list items
                songName.text(songList);
                // Adds the song list items to the song ordered list
                $("#top-list").append(songName);
            });
            // Creates a new div
            var playerDiv = $("<div>");
            // Adds an id to the div
            playerDiv.attr("id", "player-div");
            // Adds the div to the spotify div
            $("#spotify-content").append(playerDiv);
            // Creates an iframe div
            var songPlayer = $("<iframe>")
            // Adds an id to the iframe
            songPlayer.attr("id", "spotify-player");
            // Adds a content link for the iframe
            songPlayer.attr("src", "https://open.spotify.com/embed/artist/" + artistId);
            // Specifies the width of the player
            songPlayer.attr("width", "300");
            // Specifies the height of the player
            songPlayer.attr("height", "380");
            // Adds a border to the player
            songPlayer.attr("frameborder", "0");
            songPlayer.attr("allowtransparency", "true");
            songPlayer.attr("allow", "encrypted-media");
            // Adds the player to the div
            $("#player-div").append(songPlayer);
        });
        // Return results
        return results;
    });

};
// Global varibles and objecs - SM

// Spotify API - SM
const sp_api = {
  key:'BQDgyHUmy9mvRRcFBO7ftbvtIA12JC_yLE1GNfXUflyh1zVaF_AaFF-wqkozHeVCRiUEZsrLApMfdkDC3yqotH5-iXtiHjO4om81-amhKtJb-2LwIZ7eT4vXEATUuX6sHSMd6cLC3J9SRt-1mb1m9Vlt2iEXkS7Ghw',

  // Search Artist - SM
  getArtists: function(query){
    console.log(`You searched '${query}'`);
    // results array will store searched queries
    let results = [];

    // New search clears results
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${query}&type=artist&offset=5`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sp_api.key}`
      }
    }).then(function(response){
      response.artists.items.forEach(item =>{

        // Create result object that stores important query information
        const result = {
          artist: item.name,
          id: item.id,
          sp_link:item.external_urls.spotify,
          images: item.images,
          genres: item.genres
        };

        // Add single result to results array
        results.push(result);
      });
    });

    // Return results
    return results
  },

  getTopTracks: function(artist_id){
    // results array will store searched queries
    let results = [];

    // New search clears results
    $.ajax({
      url: `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?country=us`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sp_api.key}`
      }
    }).then(function(response){
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
      });
    });
    // Return results
    return results;
  }
}


// seacrh by keyword -- MH
var keyword = "21savage";
// var keyword = $().val().trim()
var apiKey = "AIzaSyCxI37dKTdAqPRZ2ObfcK2M7TaSXtr5F4c"

var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="+keyword+ "&type=video&videoCategoryId=10&key="+apiKey

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response)
            console.log(response.items[0].snippet.title)
            console.log(response.items[0].snippet.publishedAt)
            console.log(response.items[0].snippet.thumbnails.default.url)
            console.log(response.items[0].id.videoId)

             for (let i=0;i<response.items.length;i++){

              //song title
                var songTitle = response.items[i].snippet.title;
              //publish time
                var publishedAt = response.items[i].snippet.publishedAt;
              //videoid, which imports the video
                var videoId = response.items[i].id.videoId;

                var videoDiv = $("<div>");
                var link = "https://youtu.be/"+videoId;
                var aboutTheVideo = $("<a>").attr("href",link).html("<br>"+songTitle+"<br>"+publishedAt+"<br>");

                var videoSrc = "https://www.youtube.com/embed/"+videoId;
                var videoFrame = $("<iframe>").attr("src", videoSrc).attr("frameborder",0).attr("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
                
                videoDiv.prepend(aboutTheVideo);
                videoDiv.prepend(videoFrame);
                
                $("#youTubeView").prepend(videoDiv);


             }



  });

  // function about search by username and channelId
/*
var userName = "muse";
var channelId
var apiKey = "AIzaSyCxI37dKTdAqPRZ2ObfcK2M7TaSXtr5F4c"

    var queryURL2 = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername="+userName+"&key="+apiKey;

    $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        console.log(response.items[0].id)
        channelId = response.items[0].id;

        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+channelId+"&type=video&key="+apiKey,
            method: "GET"
          }).then(function(response) {

            console.log(response)
            console.log(response.items[0].snippet.title)
            console.log(response.items[0].snippet.publishedAt)
            console.log(response.items[0].snippet.thumbnails.default.url)


             }




          });


      });
<<<<<<< HEAD
=======
*/

 

>>>>>>> 6ca61428409d6f64a9eddf2329b426769fdc1cea

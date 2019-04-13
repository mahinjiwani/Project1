console.log('Connected');

// Youtube API
// 
var keyword = "Muse";
var apiKey = "AIzaSyCxI37dKTdAqPRZ2ObfcK2M7TaSXtr5F4c"

var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+keyword+ "&type=video&videoCategoryId=10&key="+apiKey

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    console.log(response)
            console.log(response.items[0].snippet.title)
            console.log(response.items[0].snippet.publishedAt)
            console.log(response.items[0].snippet.thumbnails.default.url)

             for (let i=0;i<response.items.length;i++){
                var songTitle = response.items[i].snippet.title;
                var publishedAt = response.items[i].snippet.publishedAt;
                var videoId = response.items[i].id

                var videoDiv = $("<div>");
                var aboutTheVideo = $("<p>").html(songTitle+publishedAt);
                videoDiv.prepend(aboutTheVideo);

                $("#youTubeView").prepend(videoDiv);

             }


   
  });


// function about search by username and channelId
/*
var userName = "Muse";
var channelId
var apiKey = "AIzaSyCxI37dKTdAqPRZ2ObfcK2M7TaSXtr5F4c"
  
    var queryURL = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername="+userName+"&key="+apiKey;

    $.ajax({
        url: queryURL,
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

             for (let i=0;i<response.items.length;i++){
                var songTitle = response.items[i].snippet.title;
                var publishedAt = response.items[i].snippet.publishedAt;
                var videoId = response.items[i].id

                var videoDiv = $("<div>");
                var aboutTheVideo = $("<p>").html(songTitle+publishedAt);
                videoDiv.prepend(aboutTheVideo);

                $("#youTubeView").prepend(videoDiv);

             }



            
          });


      });

    */
      // 

      

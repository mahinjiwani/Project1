console.log('Connected');

// Youtube API
// 

// seacrh by keyword
var keyword = "Muse";
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
                var songTitle = response.items[i].snippet.title;//song title
                var publishedAt = response.items[i].snippet.publishedAt;//publish time
                var videoId = response.items[i].id.videoId;//videoid, which imports the video

                var videoDiv = $("<div>");
                var aboutTheVideo = $("<p>").html(songTitle+" "+publishedAt);
                var link = "https://youtu.be/"+videoId;
                console.log(link)

                var videoSrc = "https://www.youtube.com/embed/"+videoId;
                var videoFrame = $("<iframe>").attr("src", videoSrc).attr("frameborder",0).attr("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");


                //<iframe width="560" height="315" src="https://www.youtube.com/embed/w8KQmps-Sog" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                
                videoDiv.prepend(aboutTheVideo);
                videoDiv.prepend(videoFrame);

                $("#youTubeView").prepend(videoDiv);

             }


   
  });

 


// function about search by username and channelId



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

             for (let i=0;i<response.items.length;i++){
                 songTitle = response.items[i].snippet.title;
                 publishedAt = response.items[i].snippet.publishedAt;
                 videoId = response.items[i].id.videoId;

                 videoDiv = $("<div>");
                 aboutTheVideo = $("<p>").html(songTitle+publishedAt);

                videoSrc = "https://www.youtube.com/embed/"+videoId;
                videoFrame = $("<iframe>").attr("src", videoSrc).attr("frameborder",0).attr("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");

                videoDiv.prepend(aboutTheVideo);
                videoDiv.prepend(videoFrame);

                $("#youTubeView").prepend(videoDiv);

             }



            
          });


      });

   
      // 

 

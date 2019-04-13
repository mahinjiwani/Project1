// Global varibles and objecs - SM

// Spotify API - SM
const sp_api = {
  key:'BQCqQvdRRK8Yk9hr7sqty5msNZ0rvECRQ0UCjoNqke1H-wLFH2AEcw9M7dUdknH2_ZB1OvT0zZ1hE1SYympq5xA_zxIyAoBpqPU51yVxzcjigtNCoZZY0CYLdtKlpZ9Tgm4jfQ_cTeo1gOitQxRE_3Y-uyfFRHE0zg',

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

// Youtube API object - SM
// const yt_api = {
//   key:''
// }

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


             }



            
          });


      });


 


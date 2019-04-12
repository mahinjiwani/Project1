console.log('Connected');


// Spotify API
const sp_api = {
  key:'BQCnz19Niy-zqiu_NUUkjFUzWlTwMeB5yF8XAabH_S7_NUj9BwzVBMNtrMFr0nOTZmgtyo-NcMhTGdCk6b2LKmVkrtbw_f4ZMkztEGomKYHF1RmDeGwDx_AG4ed4DHB0DC2DgyfJMQKGenfBvJ7JSMK5XJ-xL3DR_A',

  // Search Artist
  searchArtist: function(q){
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&market=US&limit=10&offset=5`,
      method: 'GET',

    }).then(function(response){
      console.log(response);

    });
  }
  // `https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5`
}

// Youtube API
const yt_api = {
  key:''
}

// SoundCloud API
const sc_api = {
  key:''
}

// $.ajax({
//   url: `https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5`,
//   method: 'GET',
//
// }).then(function(response){
//   console.log(response);
//
// });

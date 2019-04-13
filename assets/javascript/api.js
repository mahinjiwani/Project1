// Global varibles and objecs - SM

// Spotify API - SM
const sp_api = {
  key:'BQB-rC-7HDS5Iz6UWhoZQJgDbOyUtkg9Jo55ZP81m1aC2tQdkazAEzMFQDW9XpV8Y1RQR7YDy90QID11eFIm644e0rRRogqkoKl1PkcrfIZw0OiIX0oyhJbfKfguA_y8J3hFMWrXZmNxPELlSAHs6I8BLea34VEcjA',

  // Search Artist - SM
  searchArtist: function(query){
    // results array will store searched queries
    let results = [];

    // New search clears results
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${query}&type=artist&market=US&limit=50&offset=5`,
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
          images: item.images
          // genres
        };

        // Add single result to results array
        results.push(result);
      });
      console.table(results);
      // Return results
      return results
    });
  }//,

  // getTopTracks: function(artist_id){
  //   // results array will store searched queries
  //   let results = [];
  //
  //   // New search clears results
  //   $.ajax({
  //     url: `https://api.spotify.com/v1/artists/${artist_id}/top-tracks`,
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${sp_api.key}`
  //     }
  //   }).then(function(response){
  //     console.table(respones);
  //
  //     });
  //   }
  }

// Youtube API object - SM
// const yt_api = {
//   key:''
// }

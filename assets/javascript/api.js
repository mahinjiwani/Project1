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

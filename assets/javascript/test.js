console.log('test.js');

let pitbul = '0TnOYISbd1XYRBk9myaseg';

$(document).ready(function(){

  $('#search').on('keydown', function(){
    console.log($('#search').val());
    let search = $('#search').val();
    x = JSON.stringify(sp_api.searchArtist(search));
  });
});

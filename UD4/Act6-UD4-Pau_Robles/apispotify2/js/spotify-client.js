var client_id = '193ae4e85c394332b72f01e95d0daabc';
var client_secret = '4bf21f2c8a224be38d0b6c42e2b1f791';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done(function(response){
    console.log(response);
    $("#results").empty();
    $.each(response.artists.items, function(index){
      $("#results").append("<div>" + "<p>" + response.artists.items[index].name + "</p>"  + "</div>");
      $("#results").append("<div>" +  "<h2>" + "Popularity: " + response.artists.items[index].popularity + "</h2>" +  "</div>" );
      if( $.isEmptyObject(response.artists.items[index].images) ) {
        $("#results").append( "NO IMAGE FOUND");
      } else {
        $("#results").append("<div>" + "<img src=" + response.artists.items[index].images[1].url + " id='myImage'> </img>" + "</div>");
      }
    });
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done(function(response){
    console.log(response);
    $("#results").empty();
    // response.forEach(function (index) {
    //   console.log(index);
    // });
    $.each( response.artists.items.id, function(index) {
      $("#results").append("<div>" + "<p>" + response.artists.items[index].name + "</p>"  + "</div>");
      $("#results").append("<div>" +  "<h2>" + "Popularity: " + response.artists.items[index].popularity + "</h2>" +  "</div>" );
      if( $.isEmptyObject(response.artists.items[index].images) ) {
        $("#results").append( "NO IMAGE FOUND");
      } else {
        $("#results").append("<div>" + "<img src=" + response.artists.items[index].images[1].url + " id='myImage'> </img>" + "</div>");
      }
    });
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function() {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    },
    dataType: "json",
    data: { grant_type: "client_credentials" }
  }).done( function(response) {    
    access_token = response.access_token;    
  });

  var spotify = new Spotify();

  $('#bgetArtist').on('click', function () {
    spotify.getArtist($('#artistName').val());
  });

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

});
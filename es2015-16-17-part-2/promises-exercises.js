function getMostFollowers(...usernames){
  let baseUrl = "https://api.github.com/users/"
  let urls = usernames.map(username => $.getJSON(baseUrl + username));
  return Promise.all(urls).then(function(data){
    let max = data.sort((a,b) => a.followers < b.followers)[0];
    return `${max.name} has the most followers with ${max.followers}`
  })
}

function starWarsString(id){
  var str = '';
  return $.getJSON(`https://swapi.co/api/people/${id}/`).then(function(data){
    str += `${data.name} is featured in `;
    var movies = data.films[0].replace('http','https');
    return $.getJSON(movies);
  }).then(function(res){
    str += `${res.title}, directed by ${res.director} `
    var movies = res.planets[0].replace('http','https');
    return $.getJSON(movies)
  }).then(function(res){
    str += `and it takes place on ${res.name}`;
    return str;
  }).then(function(finalString){
    return finalString
  })
}

// function getTracksForFirstAlbum(artist){
//   return $.getJSON(`https://api.spotify.com/v1/search?q=${artist}&type=album`)
//   .then(function(data){
//     var firstAlbum = data.albums.items[0];
//     console.log(`Getting tracks for ${firstAlbum.name}`)
//     return $.getJSON(`https://api.spotify.com/v1/albums/${firstAlbum.id}`)
//   }).then(function(data){
//     var trackNames = data.tracks.items.map(v => v.name);
//     return trackNames
//   })
// }

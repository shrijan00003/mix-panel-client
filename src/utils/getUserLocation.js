async function getLocation() {
  if (navigator.geolocation) {
    var lat_lng = await navigator.geolocation.getCurrentPosition(function(
      position
    ) {
      var user_position = {};
      user_position.lat = position.coords.latitude;
      user_position.lng = position.coords.longitude;
      // callback(user_position);
      //console.log(user_position);
      let r = await user_position

      return r;
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
let g = getLocation();
console.log(g, '-----')

var map;
var pos;
function initMap(){
  map = new google.maps.Map(
    document.getElementById('map'),
    {zoom: 15}
  );

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      pos = {
        lat:position.coords.latitude,
        lng:position.coords.longitude
      };
      map.setCenter(pos);
      var info = new google.maps.InfoWindow;
      info.setPosition(pos);
      info.setContent('You are here :)');
      info.open(map);
    })
  }

  // var httpReq;
  // var url = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw";
  // function createCORSRequest(method, url) {
  //   httpReq = new XMLHttpRequest();
  //   if ("withCredentials" in httpReq) {
  //     httpReq.open('GET', url, true);
  //   }
  //   return httpReq;
  // }
  // console.log(httpReq);
}

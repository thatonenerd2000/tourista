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
      var httpReq = new XMLHttpRequest();;
      var url = "https://cors.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+pos.lat+","+pos.lng+"&radius=1500&type=tourist+site&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw";
      httpReq.open('GET',url,true);
      httpReq.send();
      console.log(httpReq.responseText);
    })
  }
}

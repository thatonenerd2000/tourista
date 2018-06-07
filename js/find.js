var map;
var pos;
var marker;
var content = document.getElementById("cont")
var imghttp = new XMLHttpRequest();
function initMap(){
  map = new google.maps.Map(
    document.getElementById('map'),
    {
      center:{lat:35.6874875,lng:-2.9456439},
      zoom: 3
    }
  );

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      pos = {
        lat:position.coords.latitude,
        lng:position.coords.longitude
      };
      map.setCenter(pos);
      map.setZoom(15);
      marker = new google.maps.Marker({
        position:pos,
        map:map,
        title:"You are here :)",
      })
      var httpReq = new XMLHttpRequest();
      var url = "https://cors.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+pos.lat+","+pos.lng+"&radius=5000&type=tourist+site&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw";
      httpReq.open('GET',url,false);
      httpReq.send();
      var finalobj = JSON.parse(httpReq.responseText);
      console.log(finalobj.results);
      console.log(finalobj.results[0].photos[0].photo_reference);

      for(var i = 0; i < 8; i++){
        imghttp.open('GET',"https://cors.io/?https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ finalobj.results[i].photos[0].photo_reference +"&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw",false);
        imghttp.send();
        console.log(imghttp);
        var x = document.createElement("IMG");
        x.setAttribute("src", imghttp.responseText);
        x.setAttribute("alt", "The Pulpit Rock");
        content.append(x);
      }
    })
  }
}

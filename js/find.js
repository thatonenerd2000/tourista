var map;
var pos;
var marker;
var pic = document.getElementById("pic")
var service;
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
      var url = "https://cors.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+pos.lat+","+pos.lng+"&radius=5000&type=places+to+visit+near+me&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw";
      httpReq.open('GET',url,false);
      httpReq.send();
      var finalobj = JSON.parse(httpReq.responseText);
      console.log(finalobj.results);

      for(var i = 0; i < 8; i++){
        var request = {
          placeId: (finalobj.results[i].place_id)
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

        function callback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
              var img = new Image();
              img.src = place.photos[1].getUrl({'maxWidth': 200, 'maxHeight': 200});
              pic.append(img);
          }
        }
      }
      // console.log(finalobj.results[0].photos[0].photo_reference);
      //
      // for(var i = 0; i < 8; i++){
      //   imghttp.open('GET',"https://cors.io/?https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+ finalobj.results[i].photos[0].photo_reference +"&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw",true);
      //   imghttp.send();
      //   console.log(imghttp);
      //   var img = new Image();
      //   img.src = imghttp.response;
      //   content.append(img);
      // }
    })
  }
}

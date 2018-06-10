$(document).ready(function(){
  $(".scrolla").scrolla();
})

var map;
var pos;
var marker;
var pic = document.getElementById("pic")
var service;
var contacttext;

function fade(element) {
   var op = 0;  // initial opacity
   var timer = setInterval(function () {
       element.style.opacity = op;
       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
       op += 0.1;
   }, 50);
}

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
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      })
      var httpReq = new XMLHttpRequest();
      var url = "https://cors.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+pos.lat+","+pos.lng+"&radius=5000&type=places+to+visit+near+me&key=AIzaSyBjltKonYN1BdEJTfJXAxt5mOd-tleO1tw";
      httpReq.open('GET',url,false);
      httpReq.send();
      var finalobj = JSON.parse(httpReq.responseText);
      console.log(finalobj.results);

      for(var i = 0; i < 9; i++){
        var request = {
          placeId: (finalobj.results[i].place_id)
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

        function callback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
            var img = new Image();
            var img2 = new Image();
            var img3 = new Image();
            img.src = place.photos[1].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
            img2.src = place.photos[2].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
            img3.src = place.photos[3].getUrl({'maxWidth': 1000, 'maxHeight': 1000});
            pic.append(img);
            pic.append(img2);
            pic.append(img3);
            var h = document.createElement("H1");
            var add = document.createElement("P");
            var contact = document.createElement("P");
            if(place.formatted_phone_number != undefined){
              contacttext = document.createTextNode("Contacto: " + place.formatted_phone_number);
            }
            else{
              contacttext = "";
            }
            var addt = document.createTextNode("Dirección: " + place.formatted_address);
            var hr = document.createElement("HR");
            var t = document.createTextNode(place.name);
            hr.style.display = "block";
            hr.style.border = "2px solid";
            contact.append(contacttext);
            h.appendChild(t);
            add.appendChild(addt);
            pic.append(h);
            pic.append(add);
            pic.append(contact);
            pic.append(hr);
            h.style.position = "relative"
            map.setZoom(12);
            var mark = new google.maps.Marker({
              position:place.geometry.location,
              map:map,
              animation: google.maps.Animation.DROP,
            })
            mark.addListener('click', toggleBounce);
            function toggleBounce() {
              if (mark.getAnimation() !== null) {
                mark.setAnimation(null);
              } else {
                mark
                .setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            fade(img);
          }
        }
      }
    })
  }
}

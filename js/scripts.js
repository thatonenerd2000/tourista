/*global $*/
/*global ready*/
$(document).ready(function(){
  $("#slideshow").backstretch([
      {url: "./media/img1.jpg"},
      {url: "./media/img2.jpg"},
      {url: "./media/img3.jpg"},
      {url: "./media/img4.jpg"}
    ], {
        duration: 4000,
        alignY:0.7,
        transition: ["fade"],
        transitionDuration: 1000
    });
    $(".scrolla").scrolla();
})

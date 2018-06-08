/*global $*/
/*global ready*/
$(document).ready(function(){
    $(".scrolla").scrolla();
})

var all = document.getElementById("all");

function spanishDate(d){
	var weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
	var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	return weekday[d.getDay()]+" "+d.getDate()+" de "+monthname[d.getMonth()]+" de "+d.getFullYear()
}

var d = new Date()
window.setInterval(function(){
  (all.innerHTML=spanishDate(d) + "<br>" + moment().format('h:mm:ss a'))}
,1000)

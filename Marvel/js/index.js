var marvel = function(){
	var Buscar = function(){
		var personaje=$("#txtPersonaje").val();
		var url="http://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith="
		var cantidadComics = 0;
		var comics = "";
		var cantidadSeries = 0;
		var series = "";
		var stories = "";
		var cantidadStories = 0;
		url = url + personaje;
		$.ajax({
			dataType:"json",
			url: url,
			success: function(response){
				if(response.code == 200){
					$("#foto").attr("src",response.data.results[0].thumbnail.path+"."+response.data.results[0].thumbnail.extension);
					$("#nombre").html(response.data.results[0].name);
					//$("#comics").html(response.data.results[0].)
					cantidadComics=response.data.results[0].comics.returned;
					for(var i=0;i<cantidadComics;i++){
						comics+=response.data.results[0].comics.items[i].name+"<br>";
					}
					$("#comics").html("Comics: <br>"+comics);

					cantidadSeries=response.data.results[0].series.returned;
					for(var i=0;i<cantidadSeries;i++){
						series+=response.data.results[0].series.items[i].name+"<br>";
					}
					$("#series").html("Series: <br>"+series);

					cantidadStories=response.data.results[0].stories.returned;
					for(var i=0;i<cantidadStories;i++){
						stories+=response.data.results[0].stories.items[i].name+"<br>";
					}
					$("#stories").html("Stories: <br>"+stories);
				}
			}
		});
	}
	var teclaPersonaje = function(tecla){
		//Enter = 10 + 13
		//Retorno de carro y avance de línea
		if(tecla.which == 13){
			Buscar();
		}
	}
	$("#btnBuscar").on("click",Buscar)
	$("#txtPersonaje").on("keypress",teclaPersonaje);
}
$(document).ready(marvel);
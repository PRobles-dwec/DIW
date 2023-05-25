$(function(){
    $("#lista1").sortable();
    $("#lista2").sortable();
    $("#contenedor").width("250px");
    $("#contenedor").height("400px");
    $("#contenedor").css({"background-color": "#a2fe96", "position": "absolute", "display": "inline-block", "margin": "5px"});
    $("#lista1, #lista2").draggable();  
    $("#contenedor").droppable({
        drop: function(event, ui){
            console.log("Hola");
            $("#lista1, #lista2").sortable({
                connectWith: "#contenedor",                
            }).disableSelection();
        },
    })
})
$(document).ready(function(){
    console.log("Hola");
    $(".postit").draggable();
    $(".minimizar").hide();
    $(".postit").data("soltado", false);

    $("#confirmarBorrar").hide();
    $(".contenedor").data("contador", 0);

    $(".contenedor").droppable({
        drop: function(event, ui) {
            if(!ui.draggable.data("soltado")){
                ui.draggable.data("soltado", true);
                var elem = $(this);
                elem.data("contador", elem.data("contador") + 1);
                elem.html("Yo tengo" + elem.data("contador") + " post-its aquí.");
            }
        },
        out: function(event, ui) {
            if(ui.draggable.data("soltado")){
                ui.draggable.data("soltado", false);
                var elem = $(this);
                elem.data("contador", elem.data("contador") - 1);
                elem.html("Yo tengo" + elem.data("contador") + " post-its aquí.");
            }
        },
    });
    $("#contenedorAzul").droppable("option", "accept", ".azul");
    $("#contenedorNaranja").droppable("option", "accept", ".naranja");

    $("#crearNaranja").click(function(){
        var nuevoPostitNaranja = $("<div class='naranja postit'> <button id='maximizar'>🗖</button> <button id='cerrar'>X</button> </div>");
       $("body").append(nuevoPostitNaranja);
       nuevoPostitNaranja.draggable();
    });
    $("#crearAzul").click(function(){
        var nuevoPostitAzul = $("<div class='azul postit'> <button id='maximizar'>🗖</button> <button id='cerrar'>X</button> </div>");
       $("body").append(nuevoPostitAzul);
       nuevoPostitAzul.draggable();
    });

    $("#cerrar").click(function(){
       $("#confirmarBorrar").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Borrar el post-it": function(){
                $(this).dialog("close");
                $(".postit").remove();
            },
            "Cancelar": function() {
                $(this).dialog("close");
            }
        }
       });
    });
    $("#maximizar").click(function(){
        $(".postit").width("300px");
        $(".postit").height("300px");
        $("#maximizar").hide();
        $(".minimizar").show();
    });
    $(".minimizar").click(function(){
        $(".postit").width("100px");
        $(".postit").height("100px");
        $("#maximizar").show();
        $(".minimizar").hide();
    });
});
$(document).ready(function() {
  $( ".draggable").draggable();
    $(".draggable").data("classified", false);
    $(".droppable").data("counter", 0);

    $( ".droppable" ).droppable({      
      drop: function(event, ui) {
        if(!ui.draggable.data("classified")){
          counter = $(this).data("counter");
          counter ++;
          $(this).data("counter", counter);
          ui.draggable.data("classified", true); //We change the variable to classified
          $("p").text("You have " + ($(this).data("counter") + " post-its here!"));          
        }       
      },

      out: function(event, ui){               
        if(ui.draggable.data("classified")){
          counter = $(this).data("counter");
          counter --;
          $(this).data("counter", counter);
          ui.draggable.data("classified", false); //We change the variable to classified
          $("p").text("You have " + ($(this).data("counter") + " post-its here!"));          
        }   
      }
    });

    //The Dialog.
    $("#dialog").dialog({
      autoOpen : false, 
      modal : true, 
      show : "blind", 
      hide : "blind"
    });
  
     //Button to cancel
    $("#cancel").click(function(){
      $("#dialog").dialog("close");
    });

    //Button to delete the post-it
    $(".close").click(function() {
      $("#dialog").dialog("open");
      
    });

    //Button to confirm (to delete the post-it)
    $("#confirm").click(function() {
      $("#dialog").dialog("close");
      $(".draggable").remove();
    });

    //Maximize
    $(".maximize").click(function(){
      $(".draggable").width(200) + $(".draggable").height(200);
      $(this).removeClass("maximize").addClass("minimize");
      $(".maximize").after('<textarea rows="10" cols="20" style="width: 100%; margin-top: 31px;"> </textarea>');
    });

    //Minimize
    $(".minimize").click(function(){
      $(".draggable").width(100) + $(".draggable").height(100);
      $(this).removeClass("minimize").addClass("maximize");  
    });

    $("#createPostItBlue").click(function(){
      $("header").after($('<div class="draggable blue"> </div>'));
    })

    $("#createPostItOrange").click(function(){
      $("header").after($('<div class="draggable orange">  </div>'));
    })
  });
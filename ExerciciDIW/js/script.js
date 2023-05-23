$("#login").click(function(){
   // $("#loremIpsum").css("display", "none");   

    setTimeout(function(){
        $("#form").fadeIn("slow");
        var formWidth = ($("#form").width());
        var formHeight = ($("#form").height());

        var docWidth = ($(document).width());
        var docHeight = ($(document).height());

        var calcWidth = ((docWidth - formWidth) / 2);
        console.log(calcWidth);
        var calHeight = ((docHeight - 2*formHeight) / 2);

        $("#form").css({"left": calcWidth, "top": calHeight, "position": "absolute"});        
    }, 50);

    $("#email").val("");
    $("#password").val("");  
    $("#minimize").hide();  
    $("#errorEmail").hide();
    $("#errorPassword").hide();
    $("#message").hide();   
    $("#loremIpsum").addClass("opacity");
    $("footer").addClass("opacity");
    $("header").addClass("opacity");
});

$("#loginForm").click(function(){
    console.log("Recogiendo usuario.");    
    let email = $("#email").val();
    $("#form").css("display", "none");
    if($("#email").val() == ""){
        $("#form").css("display", "block");
        $("#errorEmail").css("display", "block");
    }
    if($("#password").val() == ""){
        $("#form").css("display", "block");
        $("#errorPassword").css("display", "block");
    }
    if($("#password").val() != "" && $("#email").val() == "") {
        $("#form").css("display", "block");
        $("#errorEmail").css("display", "block");
        $("#errorPassword").css("display", "none");
    }
    if($("#password").val() == "" && $("#email").val() != "") {
        $("#form").css("display", "block");
        $("#errorEmail").css("display", "none");
        $("#errorPassword").css("display", "block");
    }

    if($("#password").val() != "" && $("#email").val() != ""){
        setTimeout(function(){
            $("#form").fadeOut();
        }, 50);
        $("#errorPassword").css("display", "none");
        $("#errorEmail").css("display", "none");
        $("#message").text("Has iniciado sesión correctamente: " + email);
        $("#login").show();
        $("#loremIpsum").show();  
        setTimeout(function(){
            $("#message").fadeIn();
        }, 200);

        setTimeout(function(){
            $("#message").fadeOut();
        }, 2000);
        
        $("#message").css({"width": "fit-content", "fontSize": "18px"});
        $("#loremIpsum").removeClass("opacity");
        $("footer").removeClass("opacity");
        $("header").removeClass("opacity");
    }       
});

$("#close").click(function(){
    $("#loremIpsum").css("opacity", "0.9");    
    setTimeout(function(){
        $("#form").hide();                
    }, 100);      

    $("#loremIpsum").removeClass("opacity");
    $("footer").removeClass("opacity");
    $("header").removeClass("opacity");      
});
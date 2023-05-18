$("#login").click(function(){
    $("#loremIpsum").css("display", "none");    
    $("#form").css("display", "block");
    $("#title").text("Login Page");
    $("#email").val("");
    $("#password").val("");    
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
        $("#form").css("display", "none");
        $("#errorPassword").css("display", "none");
        $("#errorEmail").css("display", "none");
        $("#message").text("Has iniciado sesión correctamente: " + email);
        $("#cerrarSesion").css("display", "block");
        $("#login").css("display", "none");
        $("#title").text("Home");
        $("#loremIpsum").css("display", "block");  
    }   
});

$("#cerrarSesion").click(function (){
    $("#message").css("display", "none");
    $("#login").css("display", "block");
    $("#cerrarSesion").css("display", "none");
});
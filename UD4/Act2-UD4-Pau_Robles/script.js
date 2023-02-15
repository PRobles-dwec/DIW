$("#sum").click(function() { //When we click the button, it will execute the function
    //Variables to collect the values from both inputs
    var number1 = $("#number1").val();
    var number2 = $("#number2").val();
    
    $("#messages").append("<p id='error'> </p>");
    $("#messages").append("<p id='info'> </p>");

    $("#error").on("mouseenter mouseleave", function() {
        $(this).toggleClass("Error");
    });
    
    $("#info").on("mouseenter mouseleave", function() {
        $(this).toggleClass("Info");
    });

    if(isNaN(number1) && isNaN(number2)) {
        error = "You have to write 2 valid numbers";
        $("#error").html(error + ": " + number1 + " + " + number2 + " are not valid numbers.");
        number1.val("#number1");
        number2.val("#number2");
    }

    if(isNaN(number1)) {
        error = "You have to write a valid number in this input";
        $("#error").html(error + ": " + number1);
        number1.val("#number1");
    }

    if(isNaN(number2)) {
        error = "You have to write a valid number in this input";
        $("#error").html(error + ": " + number2);
        number1.val("#number2");
    }

    if(number1 == "" && number2 == "") {
        error = "You have to write something";
        $("#error").html(error + ": "+ " both inputs are empty.");

        number1.val("#number1");
        number2.val("#number2");
    }

    if(number1 == "") {
        error = "The first input";
        $("#error").html(error + " it's empty.");

        number1.val("#number1");
    }

    if(number2 == "") {
        error = "The second input";
        $("#error").html(error + " it's empty.");

        number1.val("#number2");
    }

    else{
        calculation = parseInt(number1) + parseInt(number2); //We calculate both numbers, and we make a parseInt() on both to pass them to integers.
        text = calculation; //We save the operation in the text.
        $("#info").html("The result is: " + text); //We write the operation of the sum in the page
        var number1 = $("#number1").val("");
        var number2 = $("#number2").val("");
        $("#error").remove();
    }
});

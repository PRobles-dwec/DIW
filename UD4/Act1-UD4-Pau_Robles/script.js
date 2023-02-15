$("#sum").click(function() { //When we click the button, it will execute the function
    //Variables to collect the values from both inputs
    var number1 = $("#number1").val();
    var number2 = $("#number2").val();
    
    if(isNaN(number1) || isNaN(number2)) {
        error = "You have to write 2 valid numbers";
        $("#error").html(error);
    }
    if(number1 == "" && number2 == "") {
        error = "You have to write something";
        $("#error").html(error);
    }else{
        calculation = parseInt(number1) + parseInt(number2); //We calculate both numbers, and we make a parseInt() on both to pass them to integers.
        text = calculation; //We save the operation in the text.
        $("#result").html(text); //We write the operation of the sum in the page
    }
});
jQuery.fn.countingChars = function() { // Creating a new plugin with JQuery called countingChars, that will have a function.
    $(this).each(function(){ //We make a reference about the jQuery object created from the HTML element, that in this moment it will be "textarea". This works like a for.
        textarea = $(this); //We are creating a variable that make a reference to $(this).
        textarea.next().html(textarea.val().length + " characters"); // We will write in the html, after the textarea, the length from the value from the textarea.
    });

    this.keyup(function(){ //Everytime that we are pressing some key from the keyboard in one of the textareas.
        $(this).next().html($(this).val().length + " characters"); // We will write in the html, after the textarea, the length from the value from the textarea.
    });
}

$(document).ready(function() { // When the document is ready, it will update the page automatically.
    $("textarea").countingChars(); //We call the elements from the function, in this case, the textareas.
});

// The variable (this), makes reference to the HTML element selected in the document. In this case, it will be the textarea.
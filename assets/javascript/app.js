// Declaring starter buttons that will show on page load
var gifs = ["lion", "tiger", "leopard", "lynx", "caracal", "serval", "ocelot"];

// Function to display the gifs on the page when a respective button is shown
function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=2wwaLFfpLZC98FttzuIiGzBlSkeXaXiV&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        $('#giphy-view').empty();
        
        var gifResults = response.data;
        
        // For loop that attatches attributes to our array of gifs
        for (var i = 0; i < gifResults.length; i++) {
            var gifDiv = $('<div>');
            gifDiv.addClass("gifDiv");

            var ratingText = $('<p>').text("Rating: " + gifResults[i].rating);

            gifDiv.append(ratingText);

            var imageTag = $("<img>");
            imageTag.addClass("image");

            imageTag.attr("src", gifResults[i].images.fixed_height_still.url);
            imageTag.attr("data-still", gifResults[i].images.fixed_height_still.url);
            imageTag.attr("data-animate", gifResults[i].images.fixed_height.url);
            imageTag.attr("data-state", "still");
            gifDiv.append(imageTag);

            $("#giphy-view").prepend(gifDiv);

        }


    });
}

// Funtion that creates the buttons from the gifs array
function buttonsShown() {
    $("#buttons-added").empty();

    for (var i = 0; i < gifs.length; i++) {
        var abutton = $("<button>");

        abutton.addClass("gif-btn btn btn-dark button-space");

        abutton.attr("data-name", gifs[i]);

        abutton.text(gifs[i]);

        $("#buttons-added").append(abutton);
    }
}

// Function that pushes the user input into the gifs array
$('#add-giphy').on("click", function(event) {
    event.preventDefault();
    var gif = $('#giphy-input').val().trim();
    gifs.push(gif);

    buttonsShown();
});

$(document).on("click", ".gif-btn", displayGif);

buttonsShown();

// This stops and plays the gifs when clicked
$('#giphy-view').on("click", ".image", function() {
    var state = $(this).attr("data-state");
    // If statement that changes the gif from a still to animated state and vice versa
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

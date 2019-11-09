var gifs = ["cat", "dog", "bird", "lynx"];

function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=2wwaLFfpLZC98FttzuIiGzBlSkeXaXiV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var giphyDiv = $("<div class ='gif'>");
        
        var gifResults = response.data;
        giphyDiv.append(gifResults);
        
        var gifRating = response.rating;
        var ratingView = $("<p>").text("Rating: " + gifRating);


    });
}

function buttonsShown() {
    $("#buttons-added").empty();

    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button>");

        a.addClass("gif-btn");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-added").append(a);
    }
}

$('#add-giphy').on("click", function(event) {
    event.preventDefault();
    var gif = $('#giphy-input').val().trim();
    gifs.push(gif);

    buttonsShown();
});

$(document).on("click", ".gif-btn", displayGif);

buttonsShown();

// Reference Activity 10 ajax
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
        var b = $("<button>");

        b.addClass("gif-btn");
        b.attr("data-name", gifs[i]);
        b.text(gifs[i]);
        $("#buttons-added").append(b);
    }
}

// Reference Activity 10 ajax
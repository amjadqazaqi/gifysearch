
// Initial array of movies
var movies = ["dog", "cat", "swan", "fox", "hyena", "snake"];

// Generic function for capturing the movie name from the data-attribute
function alertMovieName() {
  var movieName = $(this).attr("data-name");

  //alert(movieName);
  loadimage(movieName);
}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#animal-input").val().trim();

  // Adding the movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".movie", alertMovieName);

// Calling the renderButtons function to display the intial buttons
renderButtons();

function loadimage(myanimal) {

 /* // Storing our giphy API URL for a random cat image
  //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + myanimal;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+"swan"+"&api_key=dc6zaTOxFJmzC&limit=10";

console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function (response) {

      // Saving the image_original_url property
     // var imageUrl = stopanim(response.data.images.fixed_height.url);
      var imageUrl = (response.data.images.fixed_height.url);
      console.log(response.data)

      // Creating and storing an image tag
     var p = response.data.rating //$("<p>");
  
      var catImage = $("<img>");
      
      // Setting the catImage src attribute to imageUrl
      catImage.attr("src", imageUrl);
      catImage.attr("alt", "cat image");
      catImage.attr("class", "myimage");
      catImage.attr("mystatus", "p");

      // Prepending the catImage to the images div
      $("#images").prepend(catImage);
    });*/


// In this case, the "this" keyword refers to the button that was clicked
var person = myanimal;

// Constructing a URL to search Giphy for the name of the person who said the quote
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
person + "&api_key=dc6zaTOxFJmzC&limit=10";

// Performing our AJAX GET request
$.ajax({
  url: queryURL,
  method: "GET"
})
// After the data comes back from the API
.then(function(response) {
  // Storing an array of results in the results variable
  $('#images').empty();
  var results = [];
   results = response.data;

  // Looping over every result item
  for (var i = 0; i < results.length; i++) {

    // Only taking action if the photo has an appropriate rating
    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
      // Creating a div with the class "item"
      var gifDiv = $("<div class='item'>");

      // Storing the result item's rating
      var rating = results[i].rating;

      // Creating a paragraph tag with the result item's rating
      var p = $("<div>").text("Rating: " + rating);

      // Creating an image tag
      var personImage = $("<img>");
      var mya = $("<a>");
      

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      personImage.attr("src", results[i].images.fixed_height_still.url);
      personImage.attr("movable",results[i].images.fixed_height.url);
      personImage.attr("paused", results[i].images.fixed_height_still.url);
      personImage.attr("class", "myimage");
      personImage.attr("mystatus", "p");

      
      

      // Appending the paragraph and personImage we created to the "gifDiv" div we created
     // gifDiv.append(p);
      
      $("#images").append(personImage);
      $("#images").append(p);
      

      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
     // $("#gifs-appear-here").append(gifDiv);
    }
  }
});

















}

$(document).on("click", ".myimage", itsok);

function itsok() {


  if(($(this).attr("mystatus"))=="p")
  {
    $(this).attr("mystatus","r");
    var r= $(this).attr("movable");
   
    $(this).attr("src",r);
    
  }else
  {
    
    $(this).attr("mystatus","p");
    var r= $(this).attr("paused");
    $(this).attr("src",r);

  }

}
function stopanim(myurl) {
  var mylink = myurl;
  var linklingth = mylink.length;
  var x = linklingth - 4;
  var res = mylink.slice(0, x);
  res = res + "_s.gif"
  return (res);

}
function runanim(myurl) {
  var mylink = myurl;
  var linklingth = mylink.length;
  var x = linklingth - 6;
  var res = mylink.slice(0, x);
  res = res + ".gif"
  return (res);

}



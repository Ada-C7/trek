var baseUrl = "https://trektravel.herokuapp.com/trips";

//TODO: use $().remove instead of .toggle

// INDEX all trips--from Trek API
var indexCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripsData = response;

  var tripTemplate = _.template($('#index-trip-template').html());

  // loop to create template for each trip object
  for (var i = 0; i < tripsData.length; i ++) {
    var index_template = tripTemplate( { data: tripsData[i] }); //rename
    $('#trips').append(index_template);
  }

  $(".show").click(function(event) {
    var url = "";
    url = baseUrl + "/" + this.innerHTML;
    $.get(url, showCallback).fail(failureCallback);
    $("#trips").toggle(false);
  });
};

// SHOW each trip--id grabbed from button html
var showCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripData = response;

  var showTemplate = _.template($('#show-trip-template').html());
  var showHtml = showTemplate( { data: tripData } );
  $('#show-page').html(showHtml);

  $(".reserve-start").click(function(event) {
    var reserveTemplate = _.template($('#reserve-trip-template').html());
    $('#show-page').append(reserveTemplate);
  });
};

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

//***********************ONCE DOM IS READY************************

$(document).ready(function() {
  $("#trips").toggle(false); //to turn trips 'off' on load

  $("#load").click(function(event) {
    $.get(baseUrl, indexCallback).fail(failureCallback);
    $("#trips").toggle();
  });
});

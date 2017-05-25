var baseUrl = "https://trektravel.herokuapp.com/trips";

var indexCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripsData = response;

  var tripTemplate = _.template($('#index-trip-template').html());
  for (var i = 0; i < tripsData.length; i ++) {
    var tripHtml = tripTemplate( { data: tripsData[i] }); //rename
    $('#trips-tests').append(tripHtml);
  }

  $(".show").click(function(event) {
    var url = baseUrl + "/" + event.which;
    $.get(url, showCallback).fail(failureCallback);
    $("#trips").toggle();
  });
};

var showCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripData = response;

  var showTemplate = _.template($('#show-trip-template').html());
  var showHtml = showTemplate( { data: tripData } );
    $('#trips').html(showHtml);
};

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

$(document).ready(function() {
  $("#trips").toggle(); //to turn trips 'off' on load

  $("#load").click(function(event) {
    $.get(baseUrl, indexCallback).fail(failureCallback);
    $("#trips").toggle();
  });
});

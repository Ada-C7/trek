// Click button to show all trips
var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  tripsTemplate = _.template($('#trips-item-template').html());
  for (var i = 0; i < response.length; i ++) {
    // var trip = response[i];
    var generatedHtml = tripsTemplate({trip: response[i]});
    // append is going to cause the button to add on all the trips again every time its clicked
    $("#trips").append($(generatedHtml));
  }
};

var failureCallback = function() {
  console.log("Nope");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback)
};

// to get around scope
var tripsTemplate;

$(document).ready(function() {
  tripsTemplate = _.template($('#trips-item-template').html());

  $('#load').click(clickHandler);
});

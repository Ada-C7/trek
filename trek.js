const BASE_URL = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  // console.log(response);

  var trips = $('#trips');
  response.forEach(function(trip) {
    trips.append("<h3>" + trip['name'] + "</h3>");
  });
};

var failureCallback = function() {
  console.log("Unable to process request.");
  $('#errors').html("<h1>Ajax request failed!</h1>")
};

var clickHandler = function() {
  $.get(BASE_URL, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});


var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log('success!');
  console.log(response);
  var target = $('#trips');

  for (var i = 0; i < response.length; i++) {
  var trip = response[i];
  target.append("<li>" + trip.continent + ": " + trip.name + "</li>");
}
};

var failureCallback = function(response) {
  console.log('did not work');
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready( function() {
  $("#load").click(clickHandler);
});

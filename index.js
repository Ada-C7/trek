// Click button to show all trips
var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  var target = $("#trips");
  for (var i = 0; i < response.length; i ++) {
    var trip = response[i];
    target.append("<li>" + trip['name'] + ": " + trip['continent'] + ": " + trip["weeks"] + " weeks");
  }
};

var failureCallback = function() {
  console.log("Nope");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback)
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});

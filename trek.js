var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var target = $('#trips');
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    target.append("<li>" + trip['name'] + "</li>");
  }
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  //$.get(url, successCallback);
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  // Associate the click handler
  $('#load').click(clickHandler);
});

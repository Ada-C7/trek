var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var successCallback = function(response) { // this is an event listener
  console.log("Success!");
  console.log(response);

  var target = $('#trips');
  for (var i = 0; i < response.length; i++) {
    var trek = response[i];
    target.append("<li>" + trek.name + " " + trek.continent + " " + trek.weeks + "</li>");
  }
};

var clickHandler = function() {
  $('#trips').empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});

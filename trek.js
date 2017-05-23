// get trip data from API with AJAX
var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var target = $('#trips');
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    // target.empty();
    target.append("<li>" + trip['name'] + trip['continent'] + trip['weeks'] + "</li>");
  }
};

var failureCallback = function() {
  console.log("Didn't work. Sorry!");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  //$.get(url, successCallback);
  $.get(url, successCallback).fail(failureCallback);
};

// generate trip info on page
// underscore, html
// weeks
// trip name
// continent

// make another API call for trip details (see API docs)

$(document).ready(function() {
  $('#load').click(clickHandler);
});


//  $(document).ready(function() {
//    var tripTemplate = _.template('#all-trips-template').html();
// });

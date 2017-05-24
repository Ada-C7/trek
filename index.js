var url = "https://trektravel.herokuapp.com/trips";

var tripsCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var rawTrips = response;

  var tripTemplate = _.template($('#show-trip-template').html());
  for (var i = 0; i < rawTrips.length; i ++) {
    var tripHtml = tripTemplate( {data: rawTrips[i]} );
    $('#trips').append(tripHtml);
  }
};

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

$(document).ready(function() {
  $("#trips").toggle(); //to turn trips 'off' on load
  $("#load").click(function(event) {
    $.get(url, tripsCallback).fail(failureCallback);
    $("#trips").toggle();
  });
});

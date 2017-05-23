var indexCallback = function(response) {
  console.log("Loaded all trips!");
  console.log(response);

  var target = $('#content');
  var allTripsTemplate = _.template($('#all-trips-template').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = allTripsTemplate({
      trip: response[i]
    });
    target.append($(generatedHtml));
  }
};

var failureCallback = function() {
  console.log("Failed to get anything. Wooo....");
};

var clickHandler = function() {
  $("#content").empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, indexCallback).fail(failureCallback);
};

$(document).ready(function() {

  // declaring/compiling my templates
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var allTripsTemplate = _.template($('#all-trips-template').html());

  $('#get-trips').click(clickHandler);

});

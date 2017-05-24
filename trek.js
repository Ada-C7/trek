var indexCallback = function(response) {
  console.log("Loaded all trips!");
  console.log(response);

  var target = $('#content');
  var allTripsTemplate = _.template($('#all-trips-template').html());
  for (var i = 0; i < response.length; i++) {
    var allTripsHTML = allTripsTemplate({
      trip: response[i]
    });
    target.append($(allTripsHTML));
  }
  $('.get-trip').click(tripClickHandler);
  
};

var tripCallback = function(response) {
  console.log("Loaded a single trip!");
  console.log(response);

  var target = $('#content');
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var oneTripHTML = singleTripTemplate({
    thisTrip: response
  });
  target.append($(oneTripHTML));
};

var failureCallback = function() {
  console.log("Failed to get anything. Wooo....");
};

var indexClickHandler = function() {
  $("#content").empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, indexCallback).fail(failureCallback);
};

var tripClickHandler = function() {
  console.log("clicked on a trip");
  $("#content").empty();
  var baseUrl = "https://trektravel.herokuapp.com/trips/1";
  var id = "1";
  var finalUrl = baseUrl + id;
  $.get(finalUrl, tripCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#get-trips').click(indexClickHandler);
  $('.get-trip').click(tripClickHandler);
});

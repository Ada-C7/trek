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
  $('form').submit(joinClickHandler);
};

var joinCallback = function(response) {
  console.log("joined a trip!");
  console.log(response);

  var target = $('#successful-sign-up');
  var joinTripTemplate = _.template($('#join-trip-template').html());
  var joinTripHTML = joinTripTemplate({
    joined: response
  });
  target.append(joinTripHTML);
};

var failureCallback = function(response) {
  console.log("Failed to get anything. Wooo....");
  console.log(response);
};

var indexClickHandler = function() {
  $("#content").empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, indexCallback).fail(failureCallback);
};

var joinClickHandler = function(event) {
  event.preventDefault();
  console.log("clicked join!");
  $("#successful-sign-up").empty();
  var data = $(this).serialize();
  console.log(data);
  var reserveBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var reserveUrl = reserveBaseUrl + $('#join-id').html() + "/reserve";
  $.post(reserveUrl, data, joinCallback).fail(failureCallback);
};

var tripClickHandler = function() {
  console.log("clicked on a trip");
  $("#content").empty();
  var indexBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var finalUrl = indexBaseUrl + $(this).attr('id');
  $.get(finalUrl, tripCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#get-trips').click(indexClickHandler);
});

var successTripsCallback = function(response) {
  var tripTemplate = _.template($('#trips-template').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
  $(".trip-link").click(individualTripClickHandler);
};

var successIndividualTripCallback = function(response) {
  var tripDetailsTemplate = _.template($('#individual-trip-template').html());
  var generatedHtml = tripDetailsTemplate({
    data: response
  });
  $("#individual-trip").html($(generatedHtml));
};

var failureCallback = function() {
  $("#errors").html("Sorry something went wrong with your request!");
};

//click handlers
var allTripsClickHandler = function(event) {
  var tripUrl = "https://trektravel.herokuapp.com/trips/";
  $.get(tripUrl, successTripsCallback).fail(failureCallback);
};

var individualTripClickHandler = function(event){
  var tripId = $(this).attr("data-trip-id");
  var tripUrl = "https://trektravel.herokuapp.com/trips/";
  var individualTripURL = tripUrl + tripId;
  $.get(individualTripURL, successIndividualTripCallback).fail(failureCallback);
};

var reserveTrip = function(event){
  event.preventDefault();
  var tripUrl = $(this).attr("action");
  var formData = $(this).serialize();
  $.post(tripUrl, formData, function(response){
    $("#message").html("<p>Reservation Confirmed</p>");
  });
};

$(document).ready(function() {
  $('#load-trips').click(allTripsClickHandler);
  $("#individual-trip").on("submit", "form", reserveTrip);
});

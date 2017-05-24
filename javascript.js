// save response from API in an array
var allTripsUrl = 'https://trektravel.herokuapp.com/trips/';

var generateAllTrips = function(response) {
  $('#single-trip').hide();
  $('#trip-list').show();
  // compiles tripTemplate
  var tripsTemplate = _.template($('#trip-template').html());

  var tripArray = response;
  for (var i = 0; i < tripArray.length; i++) {
    var generatedHtml = tripsTemplate({
      trip: tripArray[i]
    });
    // adds content
    $('#trip-list').append($(generatedHtml));
  }
};

var generateSingleTrip = function(response) {
  $('#trip-list').hide();
  $('#single-trip').show();

  // compiles singleTripTemplate
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var generatedHtml = singleTripTemplate({
    trip: response
  });
  $('#single-trip').html($(generatedHtml));
};

var generateReservationResponse = function(response) {
  console.log("success!");
};

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, generateAllTrips);
};

var singleTripClickHandler = function(event) {
  var id = event.target.getAttribute('value');
  var singleTripUrl = allTripsUrl + id;
  $.get(singleTripUrl, generateSingleTrip);
};

var reserveClickHandler = function(event) {
  event.preventDefault();
  var id = event.target.getAttribute('value');
  var postUrl = allTripsUrl + id + '/' + 'reserve';
  var formData = $(this).serialize();
  $.post(postUrl, formData, generateReservationResponse);
};

$(document).ready(function() {
  $('#load').click(tripsClickHandler);

  $("#trip-list").on("click", ".trips", singleTripClickHandler);

  $('#single-trip').on("submit", "#reserve", reserveClickHandler);
});

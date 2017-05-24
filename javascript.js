var allTripsUrl = 'https://trektravel.herokuapp.com/trips/';

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, generateAllTrips);
};

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

var singleTripClickHandler = function(event) {
  var id = event.target.getAttribute('value');
  var singleTripUrl = allTripsUrl + id;
  $.get(singleTripUrl, generateSingleTrip);
};

var generateSingleTrip = function(response) {
  $('#trip-list').hide();
  $('#single-trip').show();

  // compiles singleTripTemplate
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var generatedHtml = singleTripTemplate({
    trip: response
  });

  // adds content
  $('#single-trip').html($(generatedHtml));
};

var reserveClickHandler = function(event) {
  event.preventDefault();
  var id = event.target.getAttribute('value');
  var postUrl = allTripsUrl + id + '/' + 'reserve';
  var formData = $(this).serialize();
  $.post(postUrl, formData, generateReservationResponse);
};

var generateReservationResponse = function(response) {
  $('input').val("");
  $('#single-trip-top').append('<p class="success">Thank you for signing up!  Your Reservation is Complete!</p>');
};

$(document).ready(function() {
  $('#load').click(tripsClickHandler);

  $("#trip-list").on("click", ".trips", singleTripClickHandler);

  $('#single-trip').on("submit", "#reserve", reserveClickHandler);
});

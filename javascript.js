var allTripsUrl = 'https://trektravel.herokuapp.com/trips/';

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, generateAllTrips).fail(tripsFail);
};

var tripsFail = function() {
  $("#message").html("<p>I'm sorry, something has gone wrong.  Please try again shortly.</p>");
};

var generateAllTrips = function(response) {
  $('#single-trip').hide();
  $('#trip-list').show();
  $('#trip-sort').show();
  $('#trip-list').addClass('.trip-list-outline');
  $("#message").empty();

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
  $.get(singleTripUrl, generateSingleTrip).fail(tripsFail);
};

var generateSingleTrip = function(response) {
  $('#trip-sort').hide();
  $('#trip-list').hide();
  $('#single-trip').show();
// add a console.log response to see what it gives me
// add in if statement to save it if that happens

  if (response) {
    // compiles singleTripTemplate
    var singleTripTemplate = _.template($('#single-trip-template').html());
    var generatedHtml = singleTripTemplate({
      trip: response
    });
    // adds content
    $('#single-trip').html($(generatedHtml));
  } else {
    console.log(response);
    $("#message").html("<p>I'm sorry, something has gone wrong.  Please refresh and try again.</p>");
  }
};

var reserveClickHandler = function(event) {
  event.preventDefault();
  var id = event.target.getAttribute('value');
  var postUrl = allTripsUrl + id + '/' + 'reserve';
  var formData = $(this).serialize();
  $.post(postUrl, formData, generateReservationResponse).fail(postFail);
};

var postFail = function() {
  $('#single-trip-top').append("<p>I'm sorry, something has gone wrong.  Please try again shortly.</p>");
};

var generateReservationResponse = function(response) {
  $('input').val("");
  $('#single-trip-top').append('<p class="success">Thank you for signing up!  Your Reservation is Complete!</p>');
};

var sortClickHandler = function(event) {
  event.preventDefault();
  var formData = $("select").serialize();
  var sortUrl = allTripsUrl + "continent?" + formData;
  $.get(sortUrl, sortSuccess);
};

var sortSuccess = function(response) {
  $('#trip-list').empty();
  console.log(response);

  // compile trips template
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


$(document).ready(function() {
  $('#trip-sort').hide();

  $('#load').click(tripsClickHandler);

  $("#trip-list").on("click", ".trips", singleTripClickHandler);

  $('#single-trip').on("submit", "#reserve", reserveClickHandler);

  $('#trip-sort').on("submit", '#sort', sortClickHandler);
});

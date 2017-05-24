// save response from API in an array
var allTripsUrl = 'https://trektravel.herokuapp.com/trips';

var generateAllTrips = function(response) {
  // compiles tripTemplate
  var tripsTemplate = _.template($('#trip-template').html());

  var tripArray = response;
  for (var i = 0; i < tripArray.length; i++) {
    var generatedHtml = tripsTemplate({
      trip: tripArray[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
};

var generateSingleTrip = function(response) {
  // compiles tripTemplate
  var singleTripTemplate = _.template($('#trip-template').html());
};

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, generateAllTrips);
};

var singleTripClickHandler = function(event) {
  var id = event.target.getAttribute('value');
  var singleTripUrl = allTripsUrl + id; //TRIP ID, where from?
  $.get(singleTripUrl, generateSingleTrip);
};

$(document).ready(function() {
  $('#load').click(tripsClickHandler);

  $("#trip-list").on("click", ".single-trip", singleTripClickHandler);

  // $('.dynamic-list').click(function() {
  // $(this).addClass('list-thinking');
// })

});

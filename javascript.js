// save response from API in an array
var allTripsUrl = 'https://trektravel.herokuapp.com/trips';

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

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, generateAllTrips);
};

var singleTripClickHandler = function(event) {
  var id = event.target.getAttribute('value');
  var singleTripUrl = allTripsUrl + "/" + id;
  $.get(singleTripUrl, generateSingleTrip);
};

$(document).ready(function() {
  $('#load').click(tripsClickHandler);

  $("#trip-list").on("click", ".single-trip", singleTripClickHandler);

  // $('.dynamic-list').click(function() {
  // $(this).addClass('list-thinking');
// })

});

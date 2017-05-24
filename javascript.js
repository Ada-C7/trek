// save response from API in an array
var allTripsUrl = 'https://trektravel.herokuapp.com/trips';

var sendToTemplate = function(response) {
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

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, sendToTemplate);
};

var singleTripClickHandler = function(event) {

};

$(document).ready(function() {
  $('#load').click(tripsClickHandler);

  $('.single-trip').click(singleTripClickHandler);
});

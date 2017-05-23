// save response from API in an array
var allTripsUrl = 'https://trektravel.herokuapp.com/trips';

$(document).ready(function() {
  // compiles tripTemplate
  var tripsTemplate = _.template($('#trip-template').html());

  var sendToTemplate = function(response) {
    console.log(response);
    var tripArray = response;
    for (var i = 0; i < tripArray.length; i++) {
      var generatedHtml = tripsTemplate({
        trip: tripArray[i]
      });
      $('#trip-list').append($(generatedHtml));
    }
  };
  
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, sendToTemplate);

});

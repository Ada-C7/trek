var allTripsUrl = "https://trektravel.herokuapp.com/trips/";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripTemplate = _.template($('#trip-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
};
var clickHandler = function(event) {
  $.get(allTripsUrl, successCallback);
};


$(document).ready(function() {
  var response = $('#load-trips').click(clickHandler);
});


// var singletripUrl = allTripsUrl + data.id

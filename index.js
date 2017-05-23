
var url_all_trip = "https://trektravel.herokuapp.com/trips";


$(document).ready(function() {
  $('#load').click(allTripsClickHandler);
});

var allTripsClickHandler = function(event) {
  $.get(url_all_trip, successTripsCallback).fail(failureCallback);
};

var successTripsCallback = function(response) {
  var tripTemplate = _.template($('#trips-list-template').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trips-list').append($(generatedHtml));
  }
  $('.see_trip').click(tripClickHandler);
};





var tripClickHandler = function(event) {
  // console.log(this.id);
  var url_trip = "https://trektravel.herokuapp.com/trips/" + this.id;
  $.get(url_trip, successTripCallback).fail(failureCallback);
};

var successTripCallback = function(response) {
  console.log(response);
  var tripTemplate = _.template($('#trip-template').html());
 for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response
    });
    $('#trip').append($(generatedHtml));

  }
};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var url = 'https://trektravel.herokuapp.com/trips';

var successTripsCallback = function(response) {
  var target = $('#trips');
  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    target.append("<li>" + trip.id + ": " + trip.name + "</li>");

  }
};

var successSingleTripCallback = function(response) {
  var target = $('#trip-details');
  var trip = response;
  var tripDetails = _.template(target.html());
  var generatedHtml = tripDetails({
    data: trip
    });
    console.log(generatedHtml)
  target.append($(generatedHtml));

};


var getTrips = function() {
  $('#trips').empty();
  $.getJSON(url).success(successTripsCallback).fail(failureCallback);
};

var getTripDetails = function(id) {
  $('#trips').empty();
  var url = "https://trektravel.herokuapp.com/trips/" + id;
  $.getJSON(url).success(successSingleTripCallback).fail(failureCallback);
};

var failureCallback = function(){
  console.log('bad call');
  $('#errors').html('<h1>Ajax request failed.</h1>');
};


$(document).ready(function() {
  $('#load').click(getTrips);
  $('#trips').on('click','li', function() {
    var id = $(this).text().charAt(0);
    getTripDetails(id);
  });
});

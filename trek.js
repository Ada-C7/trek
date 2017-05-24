var url = 'https://trektravel.herokuapp.com/trips';

var successTripsCallback = function(response) {
  var target = $('#trips-template');
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    response[i].id = trip.id;
    var tripListing = _.template(target.html());
    var generatedHtml = tripListing({
      data: trip
    });
    $('#trips').append($(generatedHtml));
  }
};

var successSingleTripCallback = function(response) {
  var target = $('#trip-details-template');
  var trip = response;
  response.id = trip.id;
  var tripDetails = _.template(target.html());
  var generatedHtml = tripDetails({
    data: trip
    });
  $('#trips').append($(generatedHtml));

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
    // console.log($(this).html().charAt(11));
    var id = $(this).html().charAt(11);
    getTripDetails(id);
  });
});

// shared failure callback

var failureCallback = function(){
  console.log('bad call');
  $('#errors').html('<h1>Ajax request failed.</h1>');
};


var url = 'https://trektravel.herokuapp.com/trips';

// get trips

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


var getTrips = function() {
  $('#trips').empty();
  $.getJSON(url).success(successTripsCallback).fail(failureCallback);
};


// get single trip detail

var successSingleTripCallback = function(response) {
  var target = $('#trip-details-template');
  var trip = response;
  response.id = trip.id;
  var tripDetails = _.template(target.html());
  var generatedHtml = tripDetails({
    data: trip
    });
  $('#trips').append($(generatedHtml));
  submitForm();

};


var getTripDetails = function(id) {
  $('#trips').empty();
  var url = "https://trektravel.herokuapp.com/trips/" + id;
  $.getJSON(url).success(successSingleTripCallback).fail(failureCallback);
};


// Reserve a trip
var submitForm = function(){$('form').submit(function(e) {
  e.preventDefault();
  var url = $(this).attr("action") + $(this).attr("id") + "/reserve"; // Retrieve the action from the form
  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#success').html('<p> Trip Successfully Reserved! </p>');
    // $('#trips').empty();
    $("#trips").append(response);
    console.log(response);
  })
    .fail(function(){
    $('#message').html('<p>Reservation Failed</p>');
  });
});
};

// post a new trip, repetitive

var submitTrip = function(){$('trip-form').submit(function(e) {
  e.preventDefault();
  var url = $(this).attr("action");

  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#success').html('<p> Trip Successfully Created! </p>');
    // $('#trips').empty();
    $("#trips").append(response);
    console.log(response);
  })
    .fail(function(){
    $('#message').html('<p>Trip Creation Failed</p>');
  });
});
};

var getNewTripForm = function() {
  // synonymous with successful callback
  $('#trips').empty();
  console.log("got here");
  // var target = $('#new-trip-template');
  // var newTripForm = _.template(target.html());
  // $('#trips').append($(newTripForm));
  // submitTrip();


};


// Trips by Continent

var getTripsByContinent = function(id) {
  var continentURL = url+"/continent?query="+id;
  console.log(continentURL);
  $('#trips').empty();
  $.getJSON(continentURL).success(successTripsCallback).fail(failureCallback);
};


$(document).ready(function() {
  $('#load').click(getTrips);
  $('#new-trip').click(getNewTripForm);

  $('#trips').on('click','li', function() {
    var id = $(this).attr("id");
    getTripDetails(id);
  });
  $('#trips-by-continent').on('click','button',function(){
    var id = $(this).attr("id");
    getTripsByContinent(id);
  });
});

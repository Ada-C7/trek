// shared failure callback

var failureCallback = function(){
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


var successSingleTripCallback = function(response) {
  var template = $('#trip-details-template');
  var apiData = response;
  response.id = apiData.id;
  var html = generateHTML(template, apiData);
  console.log(html);
  $('#trips').append(html);
  submitForm();

};

var generateHTML = function(template, apiData){
  var userInput = _.template(template.html());
  var html = userInput({
    data: apiData
  });
return html;
};


var getTrips = function() {
  $('#trips').empty();
  $('#success').empty();
  $('#errors').empty();
  $.getJSON(url).success(successTripsCallback).fail(failureCallback);
};


// get single trip detail



var getTripDetails = function(id) {
  $('#trips').empty();
  $('#success').empty();
  $('#errors').empty();
  var url = "https://trektravel.herokuapp.com/trips/" + id;
  $.getJSON(url).success(successSingleTripCallback).fail(failureCallback);
};


// Reserve a trip
var submitForm = function(){$('#reserve-form').submit(function(e) {
  e.preventDefault();
  var url = $(this).attr("action") + $('#hidden-id').html() + "/reserve"; // Retrieve the action from the form
  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#success').html('<p> Trip Successfully Reserved! </p>');
    console.log("reserved");
    // $('#trips').empty();
    $("#trips").append(response);
  })

  .fail(function(){
    $('#errors').html('<p>Reservation Failed</p>');
  });
});
};

function submitTrip() {$('#trip-form').submit(function(e){
  e.preventDefault();
  // var url = $(this).attr("action");
  var url = "https://trektravel.herokuapp.com/trips/?";
  console.log(url);
  var formData = $('#trip-form').serialize();
  console.log(formData);

  $.post(url, formData, function(response){
    $('#success').html('<p> Successfully created a new trip!</p>');

  })

  .fail(function(){
    $('#errors').html('<p>New Trip Failed</p>');
  });
});
}


var getNewTripForm = function() {
  $('#trips').empty();

  $('#trips').html($("#new-trip-template").html());

  submitTrip();
};

// Trips by Continent

var getTripsByContinent = function(id) {
  var continentURL = url+"/continent?query="+id;
  console.log(continentURL);
  $('#trips').empty();
  $.getJSON(continentURL).success(successTripsCallback).fail(failureCallback);
};


$(document).ready(function() {

  $('#all-trips').click(getTrips);


  $('#trips-by-continent').on('click','button',function(){
    var id = $(this).attr("id");
    getTripsByContinent(id);
  });


  $('#new-trip').click(getNewTripForm);

  //Single Trip Details
  $('#trips').on('click','li', function() {
    var id = $(this).attr("id");
    getTripDetails(id);
  });

});

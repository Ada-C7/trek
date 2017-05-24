// TRIP LIST

var tripsListCallback = function(response) {
  $('#trips-list thead tr').append("<th>Name</th><th>Number of Weeks</th>");
  var tripsListTemplate = _.template($('#trips-list-template').html());
  for ( i = 0; i < response.length; i++){
    var newTripRow = tripsListTemplate({
      trip: response[i]
    });
   $('#trips-list tbody').append($(newTripRow));
  }
  $('.trip-details-btn').click(tripDetailsClickHandler);
};

var tripsListClickHandler = function() {
  $('.clear').empty();
  url = "https://trektravel.herokuapp.com/trips";
  $.get(url, tripsListCallback).fail(failureCallback);
};

// TRIP DETAILS

var tripDetailsCallback = function(response) {
  var tripDetailsTemplate = _.template($('#trip-details-template').html());
  var tripDetails = tripDetailsTemplate({
      trip: response
    });
   $('#trip-details').append($(tripDetails));
  };

var tripDetailsClickHandler = function() {
  url = "https://trektravel.herokuapp.com/trips/" + $(this).attr('id');
  $.get(url, tripDetailsCallback).fail(failureCallback);
  $('.clear').empty();
};

// RESERVE TRIP

var reservationCallback = function(){
  $("#messages").html("<h3>Reservation complete!</h3>");
  console.log(response);
};

var reservationClickHandler = function(){
  $('form').submit(e);
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    $.post(url, formData, reservationCallback).fail(failureCallback);
  };

// FAIL

var failureCallback = function() {
  $("#messages").html("<h3>Request failed</h3>");
  console.log("Didn't Work! :(");
};

// DOCUMENT READY

$(document).ready(function() {
  $('#list-trips-btn').click(tripsListClickHandler);
});

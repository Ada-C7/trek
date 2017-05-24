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

var tripDetailsCallback = function() {
  console.log("success!");
};

var tripDetailsClickHandler = function() {
  url = "https://trektravel.herokuapp.com/trips/" + $(this).attr('id');
  $.get(url, tripDetailsCallback).fail(failureCallback);
  $('.clear').empty();
};

// FAIL

var failureCallback = function() {
  console.log("Didn't Work! :(");
  $("#errors").html("<h1>Request failed</h1>");
};

// DOCUMENT READY

$(document).ready(function() {
  $('#trips-show-btn').click(tripsListClickHandler);
});

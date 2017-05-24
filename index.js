var tripsListCallback = function(response) {
  $('#trips-list thead tr').append("<th>Name</th><th>Number of Weeks</th>");
  var tripsListTemplate = _.template($('#trips-list-template').html());
  for ( i = 0; i < response.length; i++){
    var newTripRow = tripsListTemplate({
      trip: response[i]
    });
   $('#trips-list tbody').append($(newTripRow));
  }
};

var tripDetailsCallback = function() {
};

var failureCallback = function() {
  console.log("Didn't Work! :(");
  $("#errors").html("<h1>Request failed</h1>");
};


var tripsListClickHandler = function() {
  $('#trips-list thead tr').empty();
  $('#trips-list tbody').empty();
  url = "https://trektravel.herokuapp.com/trips";
  $.get(url, tripsListCallback).fail(failureCallback);
};

var tripDetailsClickHandler = function() {
  url = "https://trektravel.herokuapp.com/trips";
  $.get(url, tripDetailsCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#trips-show-btn').click(tripsListClickHandler);
});

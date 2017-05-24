
var tripsListCallback = function(response) {
  var tripsListTemplate = _.template($('#trips-list-template').html());
  for ( i = 0; i < response.length; i++){
    var tripHTML = tripsListTemplate({
      trip: response[i]
    });
   $('#trips-list').append($(tripHTML));
  }
};


var failureCallback = function() {
  console.log("Didn't Work! :(");
  $("#errors").html("<h1>Request failed</h1>");
};

var tripsListClickHandler = function() {
  url = "https://trektravel.herokuapp.com/trips";
  $.get(url, tripsListCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#trips-show-btn').click(tripsListClickHandler);
});

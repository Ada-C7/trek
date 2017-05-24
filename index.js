
var tripsList = function(response) {
  console.log(response);
  var target = $('#trips-list');
  for ( i = 0; i < response.length; i++){
    var name = response[i].name;
    target.append("<li>" + trip.name + "</li>");
  }
};


var failureCallback = function() {
  console.log("Didn't Work! :(");
  $("#errors").html("<h1>Request failed</h1>");
};

var getTripsList = function() {
  $("#trips-list").empty();
  url = "https://trektravel.herokuapp.com/trips";
  $.get(url, tripsList).fail(failureCallback);
};

$(document).ready(function() {
  $('#trips-show-btn').click(getTripsList);
});

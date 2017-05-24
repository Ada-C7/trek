const BASE_URL = "https://trektravel.herokuapp.com/trips/";

var successTripsCallback = function(response) {
  console.log(response);

  var trips = $('#trips');
  response.forEach(function(trip) {
    trips.append("<li id=" + trip['id'] + ">" + trip['name'] + "</li>");
  });
};

var successTripInfoCallback = function(response) {
  console.log(response);
}

var failureCallback = function() {
  console.log("Unable to process request.");
  $('#errors').html("<h1>Ajax request failed!</h1>")
};

var clickHandler = function() {
  $.get(BASE_URL, successTripsCallback).fail(failureCallback);
};

var clickHandler2 = function() {
  $.get(BASE_URL + "1", successTripInfoCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load-trips').click(clickHandler);

  $('#trips').on('click', 'li', function(event) {
      console.log(event.key);
      var id = $(this).attr("id");
      var url = BASE_URL + id
      $.get(url, successTripInfoCallback).fail(failureCallback);
  });
});

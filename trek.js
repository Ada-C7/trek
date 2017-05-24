const BASE_URL = "https://trektravel.herokuapp.com/trips/";

var successTripsCallback = function(response) {
  // console.log(response);

  var trips = $('#trips');
  response.forEach(function(trip) {
    trips.append("<li id=" + trip['id'] + ">" + trip['name'] + "</li>");
  });
};

// var successTripInfoCallback = function(response) {
//   console.log(response);
//   var id = response['id'];
//   var trip = $('#' + id);
//   trip.append("<p>" + response['about'] + "</p>");
//   popupHandler();
// }

var successTripInfoCallback = function(response) {
  console.log(response);
  var id = response['id'];
  var target = $('#popup-content');
  target.empty();
  target.prepend("<h2>" + response['name'] + "</h2>" + "<p>" + response['about'] + "</p>");
  popupHandler();
}

var failureCallback = function() {
  console.log("Unable to process request.");
  $('#errors').html("<h1>Ajax request failed!</h1>")
};

var clickHandler = function() {
  $.get(BASE_URL, successTripsCallback).fail(failureCallback);
};

var popupHandler = function() {
  $('#popup').fadeIn(500);
  
  // close popup window
  $('#close-popup').on('click', function(event)  {
      event.preventDefault();
      $('#popup').fadeOut(500);
  });
};

$(document).ready(function() {
  $('#load-trips').click(clickHandler);

  $('#trips').on('click', 'li', function() {
      var id = $(this).attr("id");
      var url = BASE_URL + id
      $.get(url, successTripInfoCallback).fail(failureCallback);
  });

  // $('#popup-link').on('click', function(event)  {
  //     event.preventDefault();
  //     $('#popup').fadeIn(500);
  //
  // });
  //
  // // close popup window
  // $('#close-popup').on('click', function(event)  {
  //     event.preventDefault();
  //     $('#popup').fadeOut(500);
  // });

});

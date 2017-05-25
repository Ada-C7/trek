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
  target.append("<h2>" + response['name'] + "</h2>" + "<p class='about'>" + response['about'] + "</p>");
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
  $("form").hide();

  $("#reserve-spot").click(function(){
    // $("form").toggle();
    $("form").show();
    $("#reserve-spot").hide();

  });

  $('#load-trips').click(clickHandler);

  $('#trips').on('click', 'li', function() {
      var id = $(this).attr("id");
      var url = BASE_URL + id
      $.get(url, successTripInfoCallback).fail(failureCallback);
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, function(response) {
      $('#popup').fadeOut(500);
      $('#errors').html('<h3> Spot reserved! </h3>');
      console.log(response);
    }).fail(function() { $('#errors').html('<h3> Unable to reserve spot at this time. </h3>')})
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

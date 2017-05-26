const BASE_URL = "https://trektravel.herokuapp.com/trips/";
var tripsTemplate; // do not use before running $(document).ready
var tripTemplate;

var successTripsCallback = function(response) {
  response.forEach(function(trip) {
    var tripsHtml = tripsTemplate({
      trip: trip
    });
    $('#trips').append($(tripsHtml));
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
  var tripHtml = tripTemplate({
    trip: response
  });

  console.log(response);

  var trip = $('#popup-content');
  trip.empty() // clear any trip info from previous popup window
  trip.append($(tripHtml));
  // console.log(response);
  // var id = response['id'];
  // var target = $('#popup-content');
  // target.empty();
  // target.append("<h2>" + response['name'] + "</h2>" + "<p class='about'>" + response['about'] + "</p>");
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

  $("form").hide();
  $("#reserve-spot").show();

  $("#reserve-spot").click(function(){
    // $("form").toggle();
    $("form").show();
    $("#reserve-spot").hide();

  });

  // close popup window
  $('#close-popup').on('click', function(event)  {
      event.preventDefault();
      $('#popup').fadeOut(500);
  });
};

$(document).ready(function() {
  // Complies template to display all trips and a single trip
  tripsTemplate = _.template($('#trip-list-template').html());
  tripTemplate = _.template($('#single-trip-template').html());

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

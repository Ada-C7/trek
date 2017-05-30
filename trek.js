const BASE_URL = "https://trektravel.herokuapp.com/trips/";
var tripsTemplate; // do not use before running $(document).ready
var tripTemplate;
var formTemplate;

var successTripsCallback = function(response) {
  response.forEach(function(trip) {
    var tripsHtml = tripsTemplate({
      trip: trip
    });
    $('#trips').append($(tripsHtml));
  });
};

var successTripInfoCallback = function(response) {
  var tripHtml = tripTemplate({
    trip: response
  });
  var trip = $('#trip-info');
  trip.html($(tripHtml));
  popupHandler();
};

var successReservationCallback = function() {
  $('#popup').fadeOut(500);
  $('#message').html('<h3> Spot reserved! </h3>');
};

var failureCallback = function() {
  console.log("Ajax request failed!");
  $('#popup').fadeOut(500);
  $('#message').html("<h3>Unable to process request at this time.</h3>")
};

var tripsClickHandler = function() {
  $.get(BASE_URL, successTripsCallback).fail(failureCallback);
  $('#load-trips').hide();
  $('main').addClass("map");
};

var tripClickHandler = function() {
  var id = $(this).attr("id");
  var url = BASE_URL + id
  $.get(url, successTripInfoCallback).fail(failureCallback);
};

var popup = {
  open: function() {
    $('#popup').fadeIn(500);
    $("form").empty();
    $("#reserve-spot").show();
  },
  close: function() {
    event.preventDefault();
    $('#popup').fadeOut(500);
  }
};

var popupHandler = function() {
  popup.open();

  // Loads form to reserve a spot when the 'reserve-spot' button is clicked
  $("#reserve-spot").click(formHandler.display);
  $('form').submit(formHandler.submit);

  $('#close-popup').click(popup.close);
};

var formHandler = {
  display: function() {
    var formHtml = formTemplate({});
    $('form').html($(formHtml));
    $("#reserve-spot").hide();
  },
  submit: function() {
    event.preventDefault();
    var id = $('#trip-info section').attr("id");
    var url = BASE_URL + id + $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, successReservationCallback).fail(failureCallback);
  }
};


$(document).ready(function() {
  // Complies template to display all trips and a single trip
  tripsTemplate = _.template($('#trip-list-template').html());
  tripTemplate = _.template($('#single-trip-template').html());
  formTemplate = _.template($('#reserve-spot-template').html());

  $('#load-trips').click(tripsClickHandler);

  // Loads individual trip info when that trip is clicked
  $('#trips').on('click', 'li', tripClickHandler);

});

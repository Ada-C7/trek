var baseUrl = 'https://trektravel.herokuapp.com/trips/';
var tripListTemplate = _.template($('#trip-list-template').html());
var tripTemplate = _.template($('#trip-template').html());

var tripListSuccess = function(response) {
  var tripList = $('<ul id="trip-list"></ul>');

  for (i = 0; i < response.length; i++) {
    var generatedHtml = tripListTemplate( {
      data: response[i]
    });
    if (response[i].name) {
      tripList.append(generatedHtml);
    }
  }
  $('#trip-info').html(tripList);
  $('#errors').empty();
};

var tripSuccess = function(response) {
  console.log(response);
  var generatedHtml = tripTemplate( {
    data: response
  });
  $('#trip-info').html(generatedHtml);
  $('#errors').empty();
};

var reserveSuccess = function() {
  console.log('Trip booked');
  $('#reserve-trip-form').trigger('reset');
  $('#reserve-message').html('Trip booked!').removeClass("errors");
  $('#errors').empty();
};

var tripListClickHandler = function() {
  $.get(baseUrl, tripListSuccess).fail(function() {
    console.log('AJAX failed to load.');
    $('#errors').html('Couldn\'t load trips.');
  });
};

var tripClickHandler = function(e) {
  e.preventDefault();
  var trip = $(this).attr('id');
  var tripId = trip.substr(4, trip.length-1);

  $.get(baseUrl + tripId, tripSuccess).fail(function() {
    console.log('AJAX failed to load trip');
    $('#errors').html('Couldn\'t load trip.');
  });
};

var reserveClickHandler = function(e) {
  e.preventDefault();
  var url = $('#reserve-trip-form').attr('action');
  var formData = $('#reserve-trip-form').serialize();
  var requiredFields = $('#reserve-trip-form [required]');

  if ($('#name').val() === "" || $('#email').val() === "" || $('#age').val() === "") {
    $('#reserve-message').html('All fields are required').addClass('errors');
    return;
  }
  $.post(url, formData, reserveSuccess).fail(function() {
    console.log('AJAX failed to book trip');
    $('#reserve-message').html('Error: Trip NOT reserved.').addClass('errors');
  });
};

$(document).ready(function() {
  $('#load-trips').click(tripListClickHandler);
  $('#trip-info').on('click', 'ul a', tripClickHandler);
  $('#trip-info').on('click', '#reserve-button', reserveClickHandler);
});

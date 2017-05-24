var baseUrl = 'https://trektravel.herokuapp.com/trips/';
var tripListTemplate = _.template($('#trip-list-template').html());
var tripTemplate = _.template($('#trip-template').html());

var tripListSuccess = function(response) {
  var tripList = $('<ul></ul>');

  for (i = 0; i < response.length; i++) {
    var generatedHtml = tripListTemplate( {
      data: response[i]
    });
    tripList.append(generatedHtml);
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
  $('#reserve-message').html('Trip booked!');
  $('#errors').clear();
};

var tripListClickHandler = function() {
  $.get(baseUrl, tripListSuccess).fail(function() {
    console.log('AJAX failed to load.');
    $('#errors').html('Couldn\'t load trips.');
  });
};

var tripClickHandler = function() {
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

  $.post(url, formData, reserveSuccess).fail(function() {
    console.log('AJAX failed to book trip');
    $('#reserve-message').html('Unable to book trip.');
  });
};

$(document).ready(function() {
  $('#load-trips').click(tripListClickHandler);
  $('#trip-info').on('click', 'h4', tripClickHandler);
  $('#trip-info').on('click', '#reserve-button', reserveClickHandler);
});

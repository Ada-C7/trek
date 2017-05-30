var baseUrl = 'https://trektravel.herokuapp.com/trips/';

var tripListSuccess = function(response) {
  var tripList = $('<ul id="trip-list"></ul>');
  var tripListTemplate = _.template($('#trip-list-template').html());

  for (i = 0; i < response.length; i++) {
    var generatedHtml = tripListTemplate( {
      data: response[i]
    });
    if (response[i].name) {
      tripList.append(generatedHtml);
    }
  }

  $('#trip-info').append(tripList);
  $('#errors').empty();
};

var tripSuccess = function(response) {
  var tripTemplate = _.template($('#trip-template').html());

  var generatedHtml = tripTemplate( {
    data: response
  });
  $('#trip-info').html(generatedHtml);
  $('#errors').empty();
};

var formSuccess = function() {
  var tripAction = $('form .button').attr('id');
  tripAction = tripAction.substring(0, tripAction.length - 7);

  console.log('Trip ' + tripAction + 'd.');
  $('form').trigger('reset');
  $('#form-message').html('Trip ' + tripAction + 'd!').removeClass("errors");
  $('#errors').empty();
};

var tripListClickHandler = function() {
  $('#trip-info').html('<h2>Trips</h2>');
  $.get(baseUrl, tripListSuccess).fail(function() {
    console.log('AJAX failed to load.');
    $('#errors').html('Couldn\'t load trips.');
  });
};

var budgetTripsClickHandler = function() {
  $('#trip-info').html('<h2>Trips Under $1000</h2>');
  $.get(baseUrl + 'budget?query=999', tripListSuccess).fail(function() {
    console.log('AJAX failed to load.');
    $('#errors').html('Couldn\'t load trips.');
  });
};

var newTripClickHandler = function() {
  var newTripTemplate = _.template($('#new-trip-template').html());

  $('#trip-info').html(newTripTemplate);
  $('#errors').empty();
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

var formClickHandler = function(e) {
  e.preventDefault();
  var url = $(this).attr('action');
  var formData = $(this).serialize();
  var tripAction = $('form .button').attr('id');
  tripAction = tripAction.substring(0, tripAction.length - 7);
  console.log(tripAction);

  $.post(url, formData, formSuccess).fail(function() {
    console.log('AJAX failed to ' + tripAction + ' trip.');
    $('#form-message').html('Error: Trip NOT ' + tripAction + 'd.').addClass('errors');
  });
};

$(document).ready(function() {
  $('#load-trips').click(tripListClickHandler);
  $('#budget-trips').click(budgetTripsClickHandler);
  $('#new-trip').click(newTripClickHandler);
  $('#trip-info').on('click', 'ul a', tripClickHandler);
  $('#trip-info').on('submit', 'form', formClickHandler);
});

// helpers

var notFound = function(response) {
  if (response === undefined) {
    $("#errors").append("Sorry, no trips found matching your search.");
    return true;
  }
};

var emptyStuff = function() {
  $("#errors").empty();
  $("#content").empty();
};

var getForm = function(target, template) {
  emptyStuff();
  var formTarget = $('#' + target);
  var formTemplate = _.template($('#' + template).html());
  var formHTML = formTemplate({});
  formTarget.append(formHTML);
};


// callbacks

var indexCallback = function(response) {
  if (notFound(response)) { return; }
  var target = $('#content');
  var allTripsTemplate = _.template($('#all-trips-template').html());
  for (var i = 0; i < response.length; i++) {
    var allTripsHTML = allTripsTemplate({
      trip: response[i]
    });
    target.append($(allTripsHTML));
  }
  $('.get-trip').click(tripClickHandler);
};

var tripCallback = function(response) {
  if (notFound(response)) {
    return;
  }
  var target = $('#content');
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var oneTripHTML = singleTripTemplate({
    thisTrip: response
  });
  target.append($(oneTripHTML));
  $('#join-form').submit(joinClickHandler);
};

var joinCallback = function(response) {
  var target = $('#successful-sign-up');
  var joinTripTemplate = _.template($('#join-trip-template').html());
  var joinTripHTML = joinTripTemplate({
    joined: response
  });
  target.append(joinTripHTML);
};

var newTripCallback = function(response) {
  var target = $('#errors');
  var createTripTemplate = _.template($('#create-trip-template').html());
  var createTripHTML = createTripTemplate({
    newTrip: response
  });
  target.append(createTripHTML);
};

var failureCallback = function(response) {
  $("#errors").html("Sorry, something went wrong! Please try again shortly.");
  console.log(response);
};


// click handlers

var indexClickHandler = function() {
  emptyStuff();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, indexCallback).fail(failureCallback);
};

var joinClickHandler = function(event) {
  $("#errors").empty();
  event.preventDefault();
  $("#successful-sign-up").empty();
  var data = $(this).serialize();
  var reserveBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var reserveUrl = reserveBaseUrl + $('#join-id').html() + "/reserve";
  $.post(reserveUrl, data, joinCallback).fail(failureCallback);
};

var tripClickHandler = function() {
  emptyStuff();
  var indexBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var indexUrl = indexBaseUrl + $(this).attr('id');
  $.get(indexUrl, tripCallback).fail(failureCallback);
};

var filterClickHandler = function(event) {
  event.preventDefault();
  emptyStuff();
  var data = $(this).serialize();
  datArray = data.split("=");
  var key = datArray[0];
  var value = datArray[1];
  var filterUrl = "https://trektravel.herokuapp.com/trips/" + key + "?query=" + value;
  $.get(filterUrl, indexCallback).fail(failureCallback);
};

var createTripClickHandler = function(event) {
  $("#errors").empty();
  event.preventDefault();
  $("#successful-new-trip-create").empty();
  var data = $(this).serialize();
  var newTripUrl = "https://trektravel.herokuapp.com/trips/";
  $.post(newTripUrl, data, newTripCallback).fail(failureCallback);
};

var newTripClickHandler = function() {
  getForm("content", "new-trip-template");
  $('#new-trip-form').submit(createTripClickHandler);
};

var filterTripsFormClickHandler = function() {
  getForm("content", "filter-trips-template");
  $('#continent-filter').submit(filterClickHandler);
  $('#price-filter').submit(filterClickHandler);
  $('#weeks-filter').submit(filterClickHandler);
};


// accessible upon a refresh

$(document).ready(function() {
  $('#get-trips').unbind(indexClickHandler).click(indexClickHandler);
  $('#new-trip').click(newTripClickHandler);
  $('#filter-trips').click(filterTripsFormClickHandler);
});

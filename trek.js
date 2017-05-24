var indexCallback = function(response) {
  if (notFound(response)) {
    return;
  }
  console.log("Loaded trips!");
  console.log(response);

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

var notFound = function(response) {
  if (response === undefined) {
    $("#errors").append("Sorry, no trips found matching your search.");
    return true;
  }
};

var tripCallback = function(response) {
  if (notFound(response)) {
    return;
  }
  console.log("Loaded a single trip!");
  console.log(response);

  var target = $('#content');
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var oneTripHTML = singleTripTemplate({
    thisTrip: response
  });
  target.append($(oneTripHTML));
  $('#join-form').submit(joinClickHandler);
};

var joinCallback = function(response) {
  console.log("joined a trip!");
  console.log(response);

  var target = $('#successful-sign-up');
  var joinTripTemplate = _.template($('#join-trip-template').html());
  var joinTripHTML = joinTripTemplate({
    joined: response
  });
  target.append(joinTripHTML);
};

var newTripCallback = function(response) {
  console.log("created a trip!");
  console.log(response);

  var target = $('#errors');
  var createTripTemplate = _.template($('#create-trip-template').html());
  var createTripHTML = createTripTemplate({
    newTrip: response
  });
  target.append(createTripHTML);
};

var failureCallback = function(response) {
  console.log("Failed to get anything. Wooo....");
  $("#errors").html("Sorry, something went wrong! Please try again shortly.");
  console.log(response);
};

var indexClickHandler = function() {
  $("#errors").empty();
  $("#content").empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, indexCallback).fail(failureCallback);
};

var joinClickHandler = function(event) {
  $("#errors").empty();
  event.preventDefault();
  console.log("clicked join!");
  $("#successful-sign-up").empty();
  var data = $(this).serialize();
  console.log(data);
  var reserveBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var reserveUrl = reserveBaseUrl + $('#join-id').html() + "/reserve";
  $.post(reserveUrl, data, joinCallback).fail(failureCallback);
};

var tripClickHandler = function() {
  console.log("clicked on a trip");
  $("#errors").empty();
  $("#content").empty();
  var indexBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var indexUrl = indexBaseUrl + $(this).attr('id');
  $.get(indexUrl, tripCallback).fail(failureCallback);
};

var continentClickHandler = function(event) {
  event.preventDefault();
  // console.log(event);
  console.log("filtering trips by continent");
  $("#errors").empty();
  $("#content").empty();
  var continent = $("#continent-sort option:selected").text();
  var continentBaseUrl = "https://trektravel.herokuapp.com/trips/continent?query=";
  var continentUrl = continentBaseUrl + continent;
  $.get(continentUrl, indexCallback).fail(failureCallback);
};

var priceClickHandler = function(event) {
  event.preventDefault();
  // console.log(event);
  console.log("filtering trips by price");
  $("#errors").empty();
  $("#content").empty();
  var data = $("#price-filter").serialize();
  var price = data.replace("price=", "");
  console.log(price);
  var priceBaseUrl = "https://trektravel.herokuapp.com/trips/budget?query=";
  var priceUrl = priceBaseUrl + price;
  $.get(priceUrl, indexCallback).fail(failureCallback);
};

var weekClickHandler = function(event) {
  event.preventDefault();
  // console.log(event);
  console.log("filtering trips by weeks");
  $("#errors").empty();
  $("#content").empty();
  var data = $("#weeks-filter").serialize();
  var week = data.replace("week=", "");
  console.log(week);
  var weekBaseUrl = "https://trektravel.herokuapp.com/trips/weeks?query=";
  var weekUrl = weekBaseUrl + week;
  $.get(weekUrl, indexCallback).fail(failureCallback);
};

var createTripClickHandler = function(event) {
  $("#errors").empty();
  event.preventDefault();
  console.log("clicked create trip!");
  $("#successful-new-trip-create").empty();
  var data = $(this).serialize();
  console.log(data);
  // var newTripUrl = "https://trektravel.herokuapp.com/trips/new";
  var newTripUrl = "https://trektravel.herokuapp.com/trips/";

  $.post(newTripUrl, data, newTripCallback).fail(failureCallback);
};

var newTripClickHandler = function() {
  $("#errors").empty();
  $("#content").empty();
  console.log("clicked new trip!");
  var target = $('#content');
  var newTripTemplate = _.template($('#new-trip-template').html());
  var newTripHTML = newTripTemplate({});
  target.append(newTripHTML);
  $('#new-trip-form').submit(createTripClickHandler);
};

$(document).ready(function() {
  $('#continent-filter').submit(continentClickHandler);
  $('#get-trips').click(indexClickHandler);
  $('#price-filter').submit(priceClickHandler);
  $('#weeks-filter').submit(weekClickHandler);
  $('#new-trip').click(newTripClickHandler);
});

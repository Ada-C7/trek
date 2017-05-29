// single-page app with jQuery + AJAX

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

// INDEX ~ callback for all trips + template
var indexCallback = function(response) {
  console.log("Success!");

  for ( var j = 0; j < response.length; j ++ ) {
    console.log(response[j]);
  }

  var tripsTemplate = _.template($('#index-trip-template').html());
  var all_trips = tripsTemplate({
    trips: response
  });

  $('#index-page').append(all_trips);
};

// SHOW ~ callback for each trip + template
var showCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripData = response;

  var showTemplate = _.template($('#show-trip-template').html());
  var showHtml = showTemplate( { data: tripData } );
  $('#show-page').html(showHtml);
  $('#show-page').data("id", response.id); // attach trip id to show page
};

// NEW ~ template for adding a new trip
var newTemplate = _.template($('#new-trip-template').html());
$('#new-page').append(newTemplate);

//***********************ONCE DOM IS READY************************

$(document).ready(function() {
  var baseUrl = "https://trektravel.herokuapp.com/trips"; // Trek API

  // INDEX ~ event handler for button
  $("#index-page").toggle(false); // start with trips toggled to 'off'

  $("#load-button").click(function(event) {
    $.get(baseUrl, indexCallback).fail(failureCallback);
    $("#index-page").toggle();
  });

  // SHOW ~ event handler for link
  $("#index-page").on("click", "a", function(event) {
    console.log("success!");
    event.preventDefault();
    var tripId = $(this).data().id;
    var showUrl = baseUrl + "/" + tripId.toString();
    console.log(showUrl);
    $.get(showUrl, showCallback).fail(failureCallback);
    $("#index-page").toggle(false); // hide all trips
    return false;
  });

  // RESERVE ~ event handler for form
  $('#show-page').on("submit", "form", (function(event) {
    event.preventDefault();
    console.log("success!");
    // console.log($('#show-page').data().id); //shows 1
    var tripId = $('#show-page').data().id;
    var reserveUrl = baseUrl + "/" + tripId.toString() + "/reserve";
    console.log(reserveUrl);

    var formData = $(this).serialize();
    console.log(formData);

    $.post(reserveUrl, formData, function(response) {
      console.log("success!");
      alert("Reservation added!");
      console.log("Form submitted!");
    });

    this.reset();
    return false;
  }));

  // NEW ~ template and event handler for button
  $("#new-page").toggle(false); // start with trips toggled to 'off'

  $("#new-button").click(function(event) {
    console.log("success!");
    $("#new-page").toggle();
  });

  // NEW ~ event handler for form
  $('#new-page').on("submit", "form", (function(event) {
    event.preventDefault();
    console.log("success!");

    var newData = $(this).serialize();
    var newUrl = this.action;
    console.log(newUrl);

    console.log(newData);

    $.post(newUrl, newData, function(response) {
      console.log(response);
      console.log("success!");
      alert("New trip added");
      console.log("Trip added!");
    });

    this.reset();
    return false;
  }));
});

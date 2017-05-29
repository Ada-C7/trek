// single-page app with jQuery + AJAX

var baseUrl = "https://trektravel.herokuapp.com/trips"; // Trek API

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

// INDEX ~ displays all trips
var indexCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripsTemplate = _.template($('#index-trip-template').html());
  var all_trips = tripsTemplate({
    trips: response
  });

  $('#index-page').append(all_trips);
};

// SHOW ~ displays each trip w/ more details
var showCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripData = response;

  var showTemplate = _.template($('#show-trip-template').html());
  var showHtml = showTemplate( { data: tripData } );
  $('#show-page').html(showHtml);
  $('#show-page').data("id", response.id); // attach trip id to show page
};

//***********************ONCE DOM IS READY************************

$(document).ready(function() {

  $("#index-page").toggle(false); // start with trips toggled to 'off'

  $("#load").click(function(event) {
    $.get(baseUrl, indexCallback).fail(failureCallback);
    $("#index-page").toggle();
  });

  // SHOW Event Handler: displays single trip detail
  $("#index-page").on("click", "a", function(event) {
    console.log("success");
    event.preventDefault();
    var tripId = $(this).data().id;
    var showUrl = baseUrl + "/" + tripId.toString();
    console.log(showUrl);
    $.get(showUrl, showCallback).fail(failureCallback);
    $("#index-page").toggle(false); // hide all trips
    return false;
  });

  // RESERVE Event Handler: submits form for reservation
  $('#show-page').on("submit", "form", (function(event) {
    event.preventDefault();
    console.log("in submit form");
    // console.log($('#show-page').data().id); //shows 1
    var tripId = $('#show-page').data().id;
    var reserveUrl = baseUrl + "/" + tripId.toString() + "/reserve";
    console.log(reserveUrl);

    var formData = $(this).serialize();
    console.log(formData);

    $.post(reserveUrl, formData, function(response) {
      console.log("success!");
      alert("Reservation added!");
    });
    this.reset();
    return false;
  }));
});

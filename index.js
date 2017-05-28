// single-page app with jQuery + AJAX

var baseUrl = "https://trektravel.herokuapp.com/trips";

//TODO: use $().remove instead of .toggle

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

// INDEX all trips--from Trek API
var indexCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripsTemplate = _.template($('#index-trip-template').html());
  var all_trips = tripsTemplate({
    trips: response
  });

  $('#index-page').append(all_trips);

  $(".show").click(function(event) {
    var show_url = "";
    show_url = baseUrl + "/" + this.innerHTML.toString(); // id of trip
    $.get(show_url, showCallback).fail(failureCallback);
    $("#index-page").toggle(false);
  });

  // SHOW each trip--id grabbed from button html
  var showCallback = function(response) {
    console.log("Success!");
    console.log(response);

    var tripData = response;

    var showTemplate = _.template($('#show-trip-template').html());
    var showHtml = showTemplate( { data: tripData } );
    $('#show-page').html(showHtml);
    $('#show-page').data("id", response.id); // attach trip id to show page
  };
};

//***********************ONCE DOM IS READY************************

$(document).ready(function() {
  $("#index-page").toggle(false); //to turn trips 'off' on load

  $("#load").click(function(event) {
    $.get(baseUrl, indexCallback).fail(failureCallback);
    $("#index-page").toggle();
  });

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

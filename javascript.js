var allTripsUrl = 'https://trektravel.herokuapp.com/trips/';

var tripsClickHandler = function(event) {
  // AJAX call to API, response sending to function sendToTemplate
  $.get(allTripsUrl, generateAllTrips).fail(tripsFail);
};

var tripsFail = function() {
  $("#message").html("<p>I'm sorry, something has gone wrong.  Please try again shortly.</p>");
};

var generateAllTrips = function(response) {
  $('#single-trip').hide();
  $('#opening-message').hide();
  $('#trip-list').show();
  $('#trip-list').empty();
  $('#trip-sort').show();
  $('#trip-list').addClass('.trip-list-outline');
  $("#message").empty();
  $("sort-weeks").val(""); // NEED TO FIGURE THIS OUT!!
  // compiles tripTemplate
  var tripsTemplate = _.template($('#trip-template').html());

  var tripArray = response;
  console.log(response);

  if (tripArray.length === 0) {
    $("#message").html("<p>There are no trips that satisfy this criteria</p>");
  }
  for (var i = 0; i < tripArray.length; i++) {
    var generatedHtml = tripsTemplate({
      trip: tripArray[i]
    });
    // adds content
    $('#trip-list').append($(generatedHtml));
  }
};

var sortByClickHandler = function(event) {
  event.preventDefault();
  $.get(allTripsUrl, sortTrips).fail(tripsFail);

  // var sortType = $('#sort-length').find(":selected").text();
  // var trips = $('#trip-list').children();
};

var sortTrips = function(response) {
  var sortTripLength = function(a,b) {
    if (a.weeks > b.weeks) return 1;
    if (a.weeks < b.weeks) return -1;
    return 0;
  };

  var sortedTrips = response.sort(sortTripLength);
  $('#trip-list').empty();

  var tripsTemplate = _.template($('#trip-template').html());

  for (var i = 0; i < sortedTrips.length; i++) {
    var generatedHtml = tripsTemplate({
      trip: sortedTrips[i]
    });
    // adds content
    $('#trip-list').append($(generatedHtml));
  }
};

var singleTripClickHandler = function(event) {
  var id = event.target.getAttribute('value');
  var singleTripUrl = allTripsUrl + id;
  $.get(singleTripUrl, generateSingleTrip).fail(tripsFail);
};

var generateSingleTrip = function(response) {
  $('#trip-sort').hide();
  $('#trip-list').hide();
  $('#single-trip').show();

  if (response) {
    // compiles singleTripTemplate
    var singleTripTemplate = _.template($('#single-trip-template').html());
    var generatedHtml = singleTripTemplate({
      trip: response
    });
    // adds content
    $('#single-trip').html($(generatedHtml));
  } else {
    console.log(response);
    $("#message").html("<p>I'm sorry, something has gone wrong.  Please refresh and try again.</p>");
  }
};

var reserveClickHandler = function(event) {
  event.preventDefault();
  var id = event.target.getAttribute('value');
  var postUrl = allTripsUrl + id + '/' + 'reserve';
  var formData = $(this).serialize();
  $.post(postUrl, formData, generateReservationResponse).fail(postFail);
};

var postFail = function() {
  $('#single-trip-top').append("<p>I'm sorry, something has gone wrong.  Please try again shortly.</p>");
};

var generateReservationResponse = function(response) {
  $('input').val("");
  $('#single-trip-top').append('<p class="success">Thank you for signing up!  Your Reservation is Complete!</p>');
};

var narrowContinentClickHandler = function(event) {
  event.preventDefault();
  var continentData = $('#continent').serialize();
  var narrowUrl = allTripsUrl + "continent?" + continentData;
  $.get(narrowUrl, narrowSuccess).fail(narrowFail);
};

var narrowWeeksClickHandler = function(event) {
  event.preventDefault();
  var weeksData = $("#weeks").serialize();
  var narrowUrl = allTripsUrl + "weeks?" + weeksData;
  $.get(narrowUrl, narrowSuccess).fail(narrowFail);
};

var narrowMoneyClickHandler = function(event) {
  event.preventDefault();
  var money = $('input:text').val();
   if ($.isNumeric(money)) {
     var moneyData = $("#money").serialize();
     var narrowUrl = allTripsUrl + "budget?" + moneyData;
     $.get(narrowUrl, narrowSuccess).fail(narrowFail);
   } else {
     $("#message").html("<p>Please enter a number.</p>");
   }
};

var narrowFail = function() {
  $('#message').html("<p>I'm sorry, something has gone wrong.  Please try again shortly.</p>");
};

var narrowSuccess = function(response) {
  $('#trip-list').empty();
  $('#message').empty();
  $('#continent option').prop('selected', function() {
      return this.defaultSelected;
  });
  $('#weeks option').prop('selected', function() {
      return this.defaultSelected;
  });
  $('input:text').val('');

  // compile trips template
  var tripsTemplate = _.template($('#trip-template').html());

  var tripArray = response;
  if (tripArray === undefined ) {
    $("#trip-list").append("<p>There are no trips that satisfy this criteria</p>");
  } else {
    for (var i = 0; i < tripArray.length; i++) {
      var generatedHtml = tripsTemplate({
        trip: tripArray[i]
      });
      // adds content
      $('#trip-list').append($(generatedHtml));
    }
  }

};


$(document).ready(function() {
  $('#trip-sort').hide();

  $('#load').click(tripsClickHandler);

  $("#trip-list").on("click", ".trips", singleTripClickHandler);

  $('#single-trip').on("submit", "#reserve", reserveClickHandler);

  $('#trip-sort').on("submit", '#narrow-continent', narrowContinentClickHandler);

  $('#trip-sort').on("submit", '#narrow-weeks', narrowWeeksClickHandler);

  $('#trip-sort').on("submit", '#narrow-money', narrowMoneyClickHandler);

  $('#trip-sort').on("submit", '#sort-by', sortByClickHandler);
});

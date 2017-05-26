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

  // if (tripArray.length === 0) {
  //   $("#message").html("<p>There are no trips that satisfy this criteria</p>");
  // }
  // for (var i = 0; i < tripArray.length; i++) {
  //   var generatedHtml = tripsTemplate({
  //     trip: tripArray[i]
  //   });
  //   // adds content
  //   $('#trip-list').append($(generatedHtml));
  // }
};

var sortByWeeks = function(a,b) {
  // a is a longer trip
  if (a.weeks > b.weeks) {
    return 1;
  } else if (a.weeks < b.weeks) {
    return -1;
  } else {
    return 0;
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
// add a console.log response to see what it gives me
// add in if statement to save it if that happens

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

var sortContinentClickHandler = function(event) {
  event.preventDefault();

  var continentData = $('#continent').serialize();
  var sortUrl = allTripsUrl + "continent?" + continentData;
  $.get(sortUrl, sortSuccess).fail(sortFail);
};

var sortWeeksClickHandler = function(event) {
  event.preventDefault();
  var weeksData = $("#weeks").serialize();
  var sortUrl = allTripsUrl + "weeks?" + weeksData;
  $.get(sortUrl, sortSuccess).fail(sortFail);
};

var sortMoneyClickHandler = function(event) {
  event.preventDefault();
  var money = $('input:text').val();
   if ($.isNumeric(money)) {
     var moneyData = $("#money").serialize();
     var sortUrl = allTripsUrl + "budget?" + moneyData;
     $.get(sortUrl, sortSuccess).fail(sortFail);
   } else {
     $("#message").html("<p>Please enter a number.</p>");
   }
};

var sortFail = function() {
  $('#message').html("<p>I'm sorry, something has gone wrong.  Please try again shortly.</p>");
};

var sortSuccess = function(response) {
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

  $('#trip-sort').on("submit", '#sort-continent', sortContinentClickHandler);

  $('#trip-sort').on("submit", '#sort-weeks', sortWeeksClickHandler);

  $('#trip-sort').on("submit", '#sort-money', sortMoneyClickHandler);
});

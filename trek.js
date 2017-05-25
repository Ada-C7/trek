



//************ all trips function ****************

var allCallback = function(response) {
  console.log("Trips!");
  console.log(response);

  $("#print-trippy").empty();
  var allTripsTemplate = _.template($('#trippy').html());
  for (var i = 0; i < response.length; i++) {
    var allTripsHtml = allTripsTemplate({
      trip: response[i]
    });
    $('#print-trippy').append($(allTripsHtml));
  }
  $("#detail-buttons").click(showTripClickHandler);
};

var allfailureCallback = function(response) {
  console.log("Error: No trippies for you:(");
  console.log(response);
};

//************* all trips event handling **************

var allTripsClickHandler = function() {
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, allCallback).fail(allfailureCallback);
};


//****************** show one trip function ************

var showCallback = function(response) {
  console.log("Trip!");
  console.log(response);

  // $("#tripper").empty();
  var showTripTemplate = _.template($('#tripper').html());
  var showTripHtml = showTripTemplate({
      tripper: response
    });
    $('#print-tripper').append($(showTripHtml));
    // $('#new-trip-form').submit(newTripClickHandler);
    };

  var showfailureCallback = function(response) {
    console.log("Sorry, could not find this trippy:(");
    console.log(response);
  };

  //************* show one trip event handling **************

  var showTripClickHandler = function() {

    var allTripsBaseUrl = "https://trektravel.herokuapp.com/trips/";
    var showTripUrl = allTripsBaseUrl + $(this).attr('id');
    $.get(showTripUrl, showCallback).fail(showfailureCallback);
  };


$(document).ready(function() {
  $('#bon-voyage').click(allTripsClickHandler);
  $('#detail-buttons').click(showTripClickHandler);
  // $('#new-trip').click(newTripClickHandler);
});

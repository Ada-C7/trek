

window.addEventListener("load", function(e) {

});

//************ all trips function ****************

var allCallback = function(response) {
  console.log("Trips!");
  console.log(response);

  $("#print-trippy").empty();
  $("#print-tripper").empty();
  var allTripsTemplate = _.template($('#trippy-template').html());
  for (var i = 0; i < response.length; i++) {
    var allTripsHtml = allTripsTemplate({
      trip: response[i]
    });
    $('#print-trippy').append($(allTripsHtml));
  }
  $(".detail-buttons").click(showTripClickHandler);
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

    $("#print-tripper").empty();
    $("#print-trippy").empty();
  var showTripTemplate = _.template($('#tripper').html());
  var showTripHtml = showTripTemplate({
      thisTrip: response
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

    var allTripsBaseUrl = "https://trektravel.herokuapp.com/trips/" + this.id;
    console.log(this.id);
    $.get(allTripsBaseUrl, showCallback).fail(showfailureCallback);
  };

  //***************** reserve trip **********************************
//
//
//   var resClickHandler = function(event) {
//     $("#errors").empty();
//     event.preventDefault();
//     console.log("reserved!");
//     $("#reserve").empty();
//     var data = $(this).serialize();
//     console.log(data);
//     var reservationBaseUrl = "https://trektravel.herokuapp.com/trips/";
//     var reservationUrl = reservationBaseUrl + $('#member-id').html() + "/reserved";
//     $.post(reservationUrl, data, reserveCallback).fail(failureCallback);
//   };
//
//*************** new trip *************************
//
//

//****************************************




$(document).ready(function() {
  $('#bon-voyage').click(allTripsClickHandler);
  // $('.detail-buttons').click(showTripClickHandler);
  // $('a').addClass('animated-link');
  // $("li").addClass(function(index) {
  //   $(this).addClass("item-" + index);
  // });
  // $('#new-trip').click(newTripClickHandler);
});





//************ all trips function ****************

var allCallback = function(response) {
  console.log("Trips!");
  console.log(response);

  var allfailureCallback = function(response) {
    console.log("Error: No trippies for you:(");
    console.log(response);
  };

  $("#print-trippy").empty();
  var allTripsTemplate = _.template($('#trippy').html());
  for (var i = 0; i < response.length; i++) {
    var allTripsHtml = allTripsTemplate({
      trip: response[i]
    });
    $('#print-trippy').append($(allTripsHtml));
  }
};



//************* all trips event handling **************


var allTripsClickHandler = function() {
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback).fail(failureCallback);
};


//****************** show one trip function ************


var showCallback = function(response) {
  console.log("Trip!");
  console.log(response);

  var showfailureCallback = function(response) {
    console.log("Error: No trippy for you:(");
    console.log(response);
  };

  $("#print-trip").empty();
  var showTripTemplate = _.template($('#trip').html());
  for (var i = 0; i < response.length; i++) {
    var showTripHtml = showTripTemplate({
      trip: response[i]
    });
    $('#print-trip').append($(showTripHtml));
  }
};


//**********************************************

var showTripClickHandler = function() {
  console.log("clicker");
  $("#tripper").empty();
  var allTripsBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var showTripUrl = BaseUrl + $(this).attr('id');
  $.get(showurl, tripCallback).fail(failureCallback);
};

  //************* show one trip event handling **************


$(document).ready(function() {
  $('#bon-voyage').click(alltripsClickHandler);
});

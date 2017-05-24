

//dan's solution to seven wonders

  // Define the function
  var successCallback = function(response) {
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

  };

  var failureCallback = function(response) {
    console.log("No trippy for you:(");
    console.log(response);
  };

//*************************************************

var showTripClickHandler = function() {
  console.log("clicker");
  $("#tripper").empty();
  var allTripsBaseUrl = "https://trektravel.herokuapp.com/trips/";
  var showTripUrl = BaseUrl + $(this).attr('id');
  $.get(showurl, tripCallback).fail(failureCallback);
};


var alltripsClickHandler = function() {
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback).fail(failureCallback);
};


$(document).ready(function() {
  $('#bon-voyage').click(alltripsClickHandler);
});



$(document).ready(function(){
  var urlTrips = "https://trektravel.herokuapp.com/trips";
  var tripsTemplate = _.template($('#trips-template').html());

  var successCallback = function(response){
    console.log("success");
    console.log(response);
    console.log(typeof response);
    // console.log(response.length);

    if (response.length > 1) {
      for (var i = 0; i < response.length; i++){
        var generateHTML = tripsTemplate({
          trip: response[i]
        });
        $('#trip-info').append($(generateHTML));
      };

    } else {
      var generateHTML = tripsTemplate({
        trip: response
      });
      $('#trip-info').empty();
      $('#trip-info').append($(generateHTML));
    }
  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h2>Something went wrong - check back later</h2>");
  };

  $.get(urlTrips, successCallback).fail(failureCallback);

// working on showing details for one trip //
  $('#trip-info').on('click', 'a#trip', function(event) {
    event.preventDefault();
    /*your_code_here;*/
    console.log("someone clicked on a trip link");
    // how to access the trip id
    console.log(event.target.dataset.id)
    var urlTrip = urlTrips + "/" + event.target.dataset.id
    // console.log(urlTrip);
    $.get(urlTrip, successCallback).fail(failureCallback);

  });
});

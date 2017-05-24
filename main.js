

$(document).ready(function(){
  var urlTrips = "https://trektravel.herokuapp.com/trips";
  var tripsTemplate = _.template($('#trips-template').html());

  var successCallbackTrips = function(response){
    console.log("success");
    console.log(response);

    for (var i = 0; i < response.length; i++){
      var generateHTML = tripsTemplate({
        trip: response[i]
      });

      $('#trip-info').append($(generateHTML));
      // will only hide the first one - adding div hides them all
      // but showing will not show all
      $('.hide-show-info').hide();
    };
  };

  var successCallbackTrip = function(response){
    console.log("success");
    console.log(response);
    console.log(response.id);
    // console.log(event);

    var generateHTML = tripsTemplate({
      trip: response
    });
    // $('#trip-info').empty();

    $('#'+response.id).show();
    // $('.hide-show-info').show();


    // $(this).html($(generateHTML));
  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h2>Something went wrong - check back later</h2>");
  };

  $.get(urlTrips, successCallbackTrips).fail(failureCallback);

// working on showing details for one trip //
  $('#trip-info').on('click', 'a#trip', function(event) {
    event.preventDefault();
    /*your_code_here;*/
    console.log("someone clicked on a trip link");
    // how to access the trip id
    console.log(event.target.dataset.id)
    var urlTrip = urlTrips + "/" + event.target.dataset.id
    // console.log(urlTrip);
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);

  });
});

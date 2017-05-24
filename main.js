

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

      $('#trips-list').append($(generateHTML));
      $('.hide-show-info').hide();
    };
  };

  var successCallbackTrip = function(response){
    console.log("success");
    console.log(response);
    // console.log(this);
    // console.log(response.id);
    // console.log(event);
    var id = '#trip-' + response.id;
    console.log(id);

    // $('#trip-' + response.id).empty();

    var generateHTML = tripsTemplate({
      trip: response
    });
    // $('#trips-list').empty();
    // need to figure out how to replace certain html already on page
    $('#'+ response.id).show();
    $('#trip-' + response.id).html($(generateHTML));

  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h2>Something went wrong - check back later</h2>");
  };

  $.get(urlTrips, successCallbackTrips).fail(failureCallback);

// working on showing details for one trip //
  $('#trips-list').on('click', 'a', function(event) {
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

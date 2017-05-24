

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

    var generateHTML = tripsTemplate({
      trip: response
    });


    $('#'+ response.id).show();
    $('#trip-' + response.id).replaceWith($(generateHTML));
    $('button#show').hide();
  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h2>Something went wrong - check back later</h2>");
  };

  $.get(urlTrips, successCallbackTrips).fail(failureCallback);

// working on showing details for one trip //
  $('#trips-list').on('click', '#show', function(event) {
    event.preventDefault();
    console.log("someone clicked on a trip link");
    // how to access the trip id
    console.log(event.target.dataset.id)

    var urlTrip = urlTrips + "/" + event.target.dataset.id
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);
  });

  $('#trips-list').on('click', 'button#hide', function(event){
    event.preventDefault();
    console.log("hide the info");
    $('.hide-show-info').hide();
    $('button#show').show();
  });

});

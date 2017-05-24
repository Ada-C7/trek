var successCallbackTrips = function(response){
  var tripsTemplate = _.template($('#trips-template').html());

  console.log("success");
  console.log(response);

  for (var i = 0; i < response.length; i++){
    var generateHTML = tripsTemplate({
      trip: response[i]
    });

    $('#trips-list').append($(generateHTML));
    $('.slidingInfo').hide();
  };
};

var successCallbackTrip = function(response){
  var tripsTemplate = _.template($('#trips-template').html());
  console.log("success");
  console.log(response);

  var generateHTML = tripsTemplate({
    trip: response
  });

  $('#trip-' + response.id).replaceWith($(generateHTML));

};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h2>Something went wrong - check back later</h2>");
};

$(document).ready(function(){

  var urlTrips = "https://trektravel.herokuapp.com/trips";

  // api request for all trips //
  $.get(urlTrips, successCallbackTrips).fail(failureCallback);

  // gets the info for one trip//
  $('#trips-list').on('click', 'h3', function(event) {
    event.preventDefault();

    var urlTrip = urlTrips + "/" + event.target.dataset.id
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);
  });

  // will hide the extra info
  $('#trips-list').on('click', 'button#hide', function(event){
    event.preventDefault();
    $('.slidingInfo').hide();
  });
});



$(document).ready(function(){
  var urlTrips = "https://trektravel.herokuapp.com/trips";
  var tripsTemplate = _.template($('#trips-template').html());

  var successCallback = function(response){
    console.log("success");
    console.log(response)

    for (var i = 0; i < response.length; i++){
      var generateHTML = tripsTemplate({
        trip: response[i]
      });
      $('#trips-list').append($(generateHTML));
    };
  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h2>Something went wrong - check back later</h2>");
  };

  $.get(urlTrips, successCallback).fail(failureCallback);

// working on showing details for one trip //
  $('#trips-list').on('click', 'a#trip', function(event) {
    event.preventDefault();
    /*your_code_here;*/
    console.log("someone clicked on a trip link");

    return false;
  });
});

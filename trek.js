
$(document).ready(function() {
  $('#trippy').click(alltripsClickHandler);
});

//dan's solution to seven wonders
var successCallback = function(wonder) {
  // Define the function
  var successCallback = function(response) {
    console.log("Trips!");
    console.log(response);

  };

  var failureCallback = function(response) {
    console.log("No trippy for you:(");
    console.log(response);
  };

  var target = $('#trippy');
  var allTripsTemplate = _.template($('#trippy-template').html());
  for (var i = 0; i < response.length; i++) {
    var allTripsHtml = allTripsTemplate({
      trip: response[i]
    });
    $('#trippy').append($(allTripsHtml));
  }
};



//*************************************************

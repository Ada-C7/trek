var allTripsUrl = "https://trektravel.herokuapp.com/trips/";

var successTripsCallback = function(response) {
  console.log("Success!");
  // console.log(response);

  var tripTemplate = _.template($('#trips-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
  $("[href]").click(function(event){
    $("p").slideToggle();
    console.log(event)
  });
};

var clickHandler = function(event) {
  $.get(allTripsUrl, successTripsCallback);
  // console.log(event)
};

// var individualTripURL = allTripsUrl + data.id


var successIndividualTripCallBack = function(response) {
  var tripTemplate = _.template($('#individual-trip').html());
  // grab it by id, based on what the user clicks, which i can grab from the event properties
}



// var toggleDown = function(event) {
//   $.get(singleTripUrl, data(?));
// }

$(document).ready(function() {
  $('#load-trips').click(clickHandler);
  // $('[href]').slideToggle(toggleDown);

});



// var singletripUrl = allTripsUrl + data.id
// data attributes, pass data through attributes

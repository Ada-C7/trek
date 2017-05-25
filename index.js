var allTripsUrl = "https://trektravel.herokuapp.com/trips/";

$(document).ready(function() {
  var successTripsCallback = function(response) {
    console.log("Success!");
    //here i am compiling my template
    var tripTemplate = _.template($('#trips-template').html());
    //loop that is parsing through all trips api and saving the response in generatedHtml, which I'm doing because I'll call it in my template.
    for (var i = 0; i < response.length; i++) {
      var generatedHtml = tripTemplate({
        data: response[i]
      });
      //here i am appending my response which i've housed in y generated Html variable and appending it to '#trip-list'
      $('#trip-list').append($(generatedHtml));
    }
    $(".trip-link").click(function(event){
      var tripId = $(this).attr("data-trip-id");
      // console.log("I'm inside click handler for a trip in the list for trip " + tripId);
      var individualTripURL = allTripsUrl + tripId;
      $.get(individualTripURL, successIndividualTripCallBack);
    });

  };

  var successIndividualTripCallBack = function(response) {
    console.log("I'm in my successIndividualTripCallBack function");
    console.log(response);
    var tripDetailsTemplate = _.template($('#individual-trip-template').html());
    var generatedHtml = tripDetailsTemplate({
      data: response
    });
    $("#individual-trip").html($(generatedHtml));
  };




  // grab it by id, based on what the user clicks, which i can grab from the event properties




  var clickHandler = function(event) {
    $.get(allTripsUrl, successTripsCallback);
    // console.log(event)
  };

  // var individualTripClick
  // var toggleDown = function(event) {
  //   $.get(singleTripUrl, data(?));
  // }


  $('#load-trips').click(clickHandler);
  // $('[href]').slideToggle(toggleDown);

});



// var singletripUrl = allTripsUrl + data.id
// data attributes, pass data through attributes

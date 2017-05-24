$(document).ready(function() {

  var url = "https://trektravel.herokuapp.com/trips";


  var tripsData = [];

  var tripsSuccessCallback = function(response) {
    
  var tripsTtitle = "Which of these exciting adventures are in your future?";

  $('#trips').append("<h2>"+tripsTtitle+"</h2>");


    for (var i = 0; i < response.length; i++) {
      tripsData.push(response[i]);
    }

    console.log(response);
    var tripsListTemplate = _.template($("#trips-list-template").html());


    for (var j = 0; j < tripsData.length; j++) {
      var generatedHtml = tripsListTemplate({
        data: tripsData[j]
      });
      $('#trips').append($(generatedHtml));
    }
  };


  var tripsFailureCallback = function() {
    console.log("Getting all trips did not work");
    $("#errors").html("<h1>Sorry, we could not retrieve the list of trips at this time.</h1>");
  };

  var tripsClickHandler = function(event) {

    $.get(url, tripsSuccessCallback).fail(tripsFailureCallback);
  };



  var singleTripSuccess= function(response) {

    console.log(response);
    var indivTripTemplate = _.template($("#indiv-trip-template").html());

    var generatedHtml = indivTripTemplate({
      data: response
    });

  $('#trips').hide();
  $('#singleTrip').html($(generatedHtml));

  };






var singleTripFailure = function(){
  console.log("Getting an individual trip did not work");
  // $("#single-trip-errors").html("<h1>Sorry, we could not retrieve this trip at this time.</h1>");
};

var singleTripHandler = function(event){
  tripURL = url + "/" + $(this).attr("data-tripID");
  $.get(tripURL, singleTripSuccess).fail(singleTripFailure);
};


$('#load-all-trips').click(tripsClickHandler);

$("#trips").on("click", "button#ShowDetails",
singleTripHandler);


});

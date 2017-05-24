$(document).ready(function() {

 var url = "https://trektravel.herokuapp.com/trips";


var tripsData = [];

var tripsSuccessCallback = function(response) {
  $('#trips-title').html("Which of these exciting adventures are in your future?");
  for (var i = 0; i < response.length; i++) {
    tripsData.push(response[i]);
  }

  console.log(response);
  var tripsListTemplate = _.template($("#trips-list-template").html());


  for (var i = 0; i < tripsData.length; i++) {
      var generatedHtml = tripsListTemplate({
        data: tripsData[i]
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


var singleTripHandler = function(event){
 tripURL = url + "/" + $(this).attr("data-tripID");
 $.get(tripURL, singleTripSuccess);
 };

var singleTripSuccess= function(response) {

  console.log(response);
};


$('#load-all-trips').click(tripsClickHandler);

$("#trips").on("click", "button#ShowDetails",
singleTripHandler);


});

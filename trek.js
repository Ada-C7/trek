$(document).ready(function() {

  var url = "https://trektravel.herokuapp.com/trips";


  var tripsData = [];

  var tripsSuccessCallback = function(response) {

    var tripsTtitle = "Which of these exciting adventures are in your future?";

    tripsData = [];
    $('#trips').empty();
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
      $('#trips').append(generatedHtml);
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

    $('#load-all-trips').hide();
    $('#trips').hide();
    $('#singleTrip').show();
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

  var hideTripHandler = function(event){
    $('#singleTrip').hide();
    $('#trips').show();
    console.log("Uh-oh");
  };

  var ReserveTripHandler = function(event){
    console.log("Reserving A spot");

    var tripID = $(this).attr("data-tripID");
    var reserveTripURL = url + "/" + tripID + "/" + "reserve";

    var reservationTemplate = _.template($("#reservation-template").html());

    var generatedHtml = reservationTemplate({
      url: reserveTripURL,
      tripID: tripID
    });

    $('div#reservationForm').html(generatedHtml);

    $('#form-'+tripID).submit(function(event) {
      event.preventDefault();
      var postURL = $(this).attr("action");
      var formData = $(this).serialize();
      $.post(postURL, formData, reserveSuccess);
      console.log("submit step 1");
    });

  };



  var reserveSuccess = function(event){
    $('div#reservationForm').html("Congratulations. You have booked this trip!");
    console.log("submit step 2");
  };




var continentHandler = function() {

  var continent = ($(this).html());
  var continentURL = url + "/continent?query=" + continent;
  $.get(continentURL, tripsSuccessCallback).fail(continentFailure);

};


// var continentSuccess= function(response) {
//
//    console.log(response);
//   // var indivTripTemplate = _.template($("#indiv-trip-template").html());
//   //
//   // var generatedHtml = indivTripTemplate({
//   //   data: response
//   // });
//   //
//   // $('#load-all-trips').hide();
//   // $('#trips').hide();
//   // $('#singleTrip').show();
//   // $('#singleTrip').html($(generatedHtml));
//
// };


var continentFailure = function() {
  console.log("Getting trips for did not work");
  $("#errors").html("<h1>Sorry, we could not retrieve the list of trips to this continent at this time.</h1>");
};





  $('#load-all-trips').click(tripsClickHandler);

  $('#load-all-trips').click(tripsClickHandler);

  $("#trips").on("click", "button#ShowDetails", singleTripHandler);

  $("#singleTrip").on("click", "button#HideDetails", hideTripHandler);

  $("#singleTrip").on("click", "button#reserve", ReserveTripHandler);

  $("[href]").on("click", continentHandler);


});

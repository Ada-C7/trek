var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log("success!");
  console.log(response);

  var tripTemplate = _.template($("#trip-list-template").html());
  for (var i = 0; i < response.length; i++ ) {
    var generatedHtml = tripTemplate({
      trip: response[i]
    });

    $("#trip-list").append($(generatedHtml));
  };
};

var successCallbackTrip = function(response) {
  console.log("Success! for indiv trip");
  console.log(response);
  var indivTripTemplate = _.template($("#trip_template").html());
  var generatedHtml = indivTripTemplate({
    trip: response

  })

  $("#trip-info-indv").html($(generatedHtml));

  $("#trip-info-indv").show();
};

var failureCallback = function() {
  console.log("Didn't work :( ");
  $("errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function() {
  $.get(url, successCallback).fail(failureCallback);
};

var clickHandlerTrip = function(event){
  var id = $(this).attr("data-tripid");
  var tripUrl = url + "/" + id;
  $.get(tripUrl, successCallbackTrip).fail(failureCallback);
};

var clickHandlerCloseModal = function(event) {
  $("#trip-info-indv").hide();
};

var makeReservation = function(event){
  event.preventDefault();

  var url = $(this).attr("action");
  var formData = $(this).serialize();

  console.log(formData);  //gives us back a string

  $.post(url, formData, function(response){
    $("#message").html("<p>Reservation Confirmed!</p>");

    console.log(response);
  }).fail(function(){
    $("#message").html("<p>Reservation Did Not Go Through</p>");
  });
};

$(document).ready(function() {

//associate the click handler
$("#load").click(clickHandler);

$("#trip-list").on("click", "button#seeTrip", clickHandlerTrip);

$("#trip-info-indv").on("submit", "form", makeReservation);

$("#trip-info-indv").on("click", ".close-button", clickHandlerCloseModal);


});

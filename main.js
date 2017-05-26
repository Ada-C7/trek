var url = "https://trektravel.herokuapp.com/trips/";

// tripTemplate compiled at document ready (called only once);
var tripTemplate;
var singleTripTemplate;
var displayFormTemplate;

$('#trip-list').hide();

var singleTripCallback = function(response) {
  console.log("Success!");
  console.log(response);
  $('#trip-list').hide();
  $('#load').hide();
  var generatedHTML = singleTripTemplate({
    trip: response
  });
  $('#single-trip-detail').html(generatedHTML);
  $('#all-trips-button').click(clickHandler);
  $('#display-form').click(displayFormHandler);
};

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);
  $('#load').hide();
  $('#trip-list').show();

  for (var i = 0; i < response.length; i++){
    var generatedHTML = tripTemplate({
      trip: response[i]
    });
    $('#trip-list tbody').append(generatedHTML);
  }
  $('.trip-details').click(tripDetailHandler);
};

var failureCallback = function() {
  console.log("Call Failed");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

var tripDetailHandler = function(event){
  var tripID = $(this).attr("data-trip-id");
  var detailURL = url + tripID;
  $.get(detailURL, singleTripCallback).fail(failureCallback);
};

var displayFormHandler = function(event){
  // var tripID = $(this).attr("data-trip-id");
  var generatedHTML = displayFormTemplate({});
  $('#display-form').html(generatedHTML);
};

$(document).ready(function() {
  tripTemplate = _.template($('#trip-template').html());
  singleTripTemplate = _.template($('#single-trip-template').html());
  displayFormTemplate = _.template($('#display-form-template').html());
  $('#load').click(clickHandler);
});

var url = "https://trektravel.herokuapp.com/trips/";

// tripTemplate compiled at document ready (called only once);
var tripTemplate;
var singleTripTemplate;
var displayFormTemplate;

$('#trip-list').hide();
$('#trip-header').hide();

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);
  $('#trip-header').show();
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

var backToListCallback = function() {
  console.log("WE ARE IN BACKTOLIST CALLBACK!");
  $('#display-form').hide();
  $('#trip-header').show();
  $('#single-trip-detail').hide();
  $('#load').hide();
  $('#trip-list').show();
  $('.trip-details').click(tripDetailHandler);
};

var singleTripCallback = function(response) {
  console.log("Success!");
  console.log(response);
  $('#trip-header').hide();
  $('#trip-list').hide();
  $('#load').hide();
  var generatedHTML = singleTripTemplate({
    trip: response
  });
  $('#single-trip-detail').html(generatedHTML);
  $('#single-trip-detail').show();
  $('#all-trips-button').click(backToListCallback);
  $('#display-form-button').click(displayFormHandler);
};

var bookTripCallback = function(response){
  console.log(response);
  $('#reservation-message').html('Trip Reserved!');
};

var failureCallback = function() {
  console.log("Call Failed");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

var tripDetailHandler = function(event) {
  console.log("CLICKED");
  var tripID = $(this).attr("data-trip-id");
  var detailURL = url + tripID;
  console.log(detailURL);
  $.get(detailURL, singleTripCallback).fail(failureCallback);
};

var displayFormHandler = function(event){
  $('#display-form').show();
  var generatedHTML = displayFormTemplate({
    id: $(this).attr("data-reservation-id")
  });
  $('#display-form').html(generatedHTML);
  $('#display-form-button').hide();
  $('.button.submit-trip-reservation').click(bookTripHandler);
};

var bookTripHandler = function(event){
  event.preventDefault();
  var submitURL = $(this).parents("form").attr("action");
  var formData = $(this).parents("form").serialize();
  console.log("THIS IS FORM DATA");
  console.log(formData);
  $.post(submitURL, formData, bookTripCallback);
  $('#display-form').hide();
};

$(document).ready(function() {
  tripTemplate = _.template($('#trip-template').html());
  singleTripTemplate = _.template($('#single-trip-template').html());
  displayFormTemplate = _.template($('#display-form-template').html());
  $('#load').click(clickHandler);
});

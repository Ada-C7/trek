var tripsUrl = "https://trektravel.herokuapp.com/trips";

var allTripClickHandler = function(event) {
  // console.log(this.event);
  var target = $('#trips-template');
  // target.empty(); // might use later so trip list does not repeat if button clicked again
  $.get(tripsUrl, allSuccessCallback).fail(failureCallback);
};

var allSuccessCallback = function(response) {
  // console.log("Success!");
  // console.log(response[0]);
  // $('#print-trip-data').hide();
  $('#print-trip-data').empty();
  $('#print-trips').show();

  var tripsTemplate = _.template($('#trips-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripsTemplate({
      data: response[i]
    });
    console.log(generatedHtml);
    $('#print-trips').append(generatedHtml);
  }
  $('.trip').click(oneTripClickHandler);
};

var oneTripClickHandler = function(event) {

  // console.log(event.target);
  // var tripID = event.target;
  // var trying = 'https://trektravel.herokuapp.com/trips/1';
  var oneTripUrl = tripsUrl + "/" + this.id;

  $.get(oneTripUrl, oneSuccessCallback).fail(failureCallback);
};

var oneSuccessCallback = function(response) {
  // $('#print-trips').hide();
  $('#print-trips').empty();
  $('#print-trip-data').show();

  var oneTripTemplate = _.template($('#trip-data').html());

  var generatedHtml = oneTripTemplate({
    data: response
  });
  console.log(generatedHtml);
  $('#print-trip-data').append(generatedHtml);

  // Trip reservation
  $('form').submit(function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    console.log("form data = ", formData);
    $.post(url, formData, function(response){
      $('#add-reservation').html('<p>Reservation successful!</p>');
      console.log(response);
    }).fail(function(){
      $("#errors").html('<p>Reservation failed</p>');
    });
  });
};

var failureCallback = function() {
  console.log("AJAX request did not work");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function(){
  $('#load').click(allTripClickHandler);
});

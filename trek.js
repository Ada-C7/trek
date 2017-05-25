// get trip data from API with AJAX
var url = "https://trektravel.herokuapp.com/trips";

var successCallbackAll = function(response) {
  console.log("Success!");
  console.log(response);

  var tripTemplate = _.template($('#all-trips-template').html());

  // generate trip info on page
  for(var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trips-list').append(generatedHtml);
    $('#trip-index-' + response[i].id).on('click', 'p', clickHandlerLocale);
  }
};

var failureCallback = function() {
  console.log("Didn't work. Sorry!");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  //$.get(url, success Callback);
  $.get(url, successCallbackAll).fail(failureCallback);
};

// make another API call for trip details

var successCallbackOne = function(response) {
  console.log("Success!");
  console.log(response);

  var detailsTemplate = _.template($('#details-template').html());

  var generatedHtml = detailsTemplate({
    data: response
  });
  $('#trip-details').html($(generatedHtml));
};
var clickHandlerLocale = function(event) {
  // getting the id from the event
  var tripId = event.delegateTarget.id.split("-")[2];
  var detailsUrl = "https://trektravel.herokuapp.com/trips/" + tripId;
  $.get(detailsUrl, successCallbackOne).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});


// form stuff...WIP

$('#reserve-form').submit(function(e) {
  e.preventDefault();
  var reserveUrl = $(this).attr("action");
  var formData = $(this).serialize();

  $.post(reserveUrl, formData, function(response) {
    $('#message').html('<p> Reservation successful! </p>');
  });
  console.log(response);
})
.fail(function() {
  $('#message').html('<p> Reservation unsuccessful. Please try again! </p>');
});







// space

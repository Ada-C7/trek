// You will build a web app that will query data from an api, using AJAX, to
// display a list of trips and view more information on a specific trip.
// While viewing a specific trip, you can claim your spot by sending data
// back to the API.
//
// All of this should be done without ever having to reload the page. In
// other words, TREK will be a single page application and will only need one
// html page (index.html).

var url = "https://trektravel.herokuapp.com/trips";

// Click Director

var clickDirector = function(event) {

  var uniqueId = event.target.id;

  if (uniqueId === "load") {
    $.get(url, successCallback).fail(failureCallback);
  } else {
    var individualTripUrl = url + "/" + uniqueId;
    var response = $.get(individualTripUrl, successCallback).fail(failureCallback);
  }
};

// Callbacks

var successCallback = function(response) {
  // Turn off this response while testing.
  console.log("Successful request.");
  console.log(response);

  if (response.length > 1) {
    generateList(response);
  } else {
    generateTripInfo(response);
  }
};

var failureCallback = function() {
  console.log("Something went wrong.");
  $("#errors").html("<h1> AJAX request failed. </h1>");
};

// Template functions

var generateList = function(response) {
  var tripTemplate = _.template($('#trip-item-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate(
      {
        data: response[i]
      }
    );
    $('#trip-list').append($(generatedHtml));
  }
};

var generateTripInfo = function(response) {
  var tripTemplate = _.template($('#trip-info-template').html());
  var generatedHtml = tripTemplate(
    {
      data: response
    }
  );

  var idSelection = '#' + response.id;

  if ($(idSelection).find('ul').length > 0) {
    $('.trip-info', idSelection).remove();
    $('form', idSelection).remove();
    $('.submit', idSelection).remove();
  } else {
    $(idSelection).append($(generatedHtml));
  }
};

$(document).ready(function() {
  $('#load').click(clickDirector);

  $('#trip-list').on('click', '.show-info', function(event) {
    clickDirector(event);
  });
});

// Does this need to go in the doc ready? 
$('form').submit(function(event) {
  event.preventDefault();

  var url = $(this).attr("action");

  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#message').html('<p> Enjoy your trip! </p>');

    // What do we get in the response?
    console.log(response);

  }).fail(function(){
    $('#message').html('<p>Reservation could not be made.</p>');

  });
});

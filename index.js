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

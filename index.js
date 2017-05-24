// You will build a web app that will query data from an api, using AJAX, to
// display a list of trips and view more information on a specific trip.
// While viewing a specific trip, you can claim your spot by sending data
// back to the API.
//
// All of this should be done without ever having to reload the page. In
// other words, TREK will be a single page application and will only need one
// html page (index.html).

var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Successful request.");
  console.log(response);

  var tripTemplate = _.template($('#trip-item-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
};

var failureCallback = function() {
  console.log("Something went wrong.");
  $("#errors").html("<h1> AJAX request failed. </h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  var response = $('#load').click(clickHandler);
});

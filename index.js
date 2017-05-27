// You will build a web app that will query data from an api, using AJAX, to
// display a list of trips and view more information on a specific trip.
// While viewing a specific trip, you can claim your spot by sending data
// back to the API.
//
// All of this should be done without ever having to reload the page. In
// other words, TREK will be a single page application and will only need one
// html page (index.html).

var url = "https://trektravel.herokuapp.com/trips";


// loadDocument function

var loadDocument = function() {
  // Passed in tripListClickDirector as anonymous function.
  $('#find-trips').click(function(event) {
    $.get(url, tripListSuccessCallback).fail(failureCallback);
  });

  $('#trip-list').on('click', '.trip-name', function(event) {
    var parentElement = event.target.parentElement;
    var id = parentElement.id;

    if ($(parentElement).find('ul').length > 0) {
      toggleTripInfo(parentElement);
    } else {
      tripInfoClickDirector(id);
    }
  });

  $('#trip-list').on('submit', 'form', function(event) {
      event.preventDefault();

      var url = $(this).attr("action");
      var id = event.target.parentElement.id;

      url += id;
      url += "/reserve";

      var formData = $(this).serialize();

      $.post(url, formData, function(response){
        $('#message').html('<p> Enjoy your trip! </p>');
        console.log(response);
      }).fail(function(){
        $('#message').html('<p>Can not make reservation.</p>');
      });

    });
  };


  // Click director for trip information

  var tripInfoClickDirector = function(id) {
    var individualTripUrl = url + "/" + id;
    var response = $.get(individualTripUrl, tripInfoSuccessCallback).fail(failureCallback);
  };


  // Callbacks

  // Trip list success callback
  var tripListSuccessCallback = function(response) {
    console.log("Successful request for list of trips.");
    console.log(response);

    generateList(response);
  };

  // Individual Trip Information success callback
  var tripInfoSuccessCallback =  function(response) {
    console.log("Successful request for trip information. (Trip Name: " + response.name + ")");
    console.log(response);

    generateTripInfo(response);

  };

  // Generic failure callback
  var failureCallback = function() {
    console.log("Something went wrong.");
    $("#errors").html("<h1> AJAX request failed. </h1>");
  };


  // Template generation functions

  // Trip List template generator function
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

  // Individual Trip Information template generator function
  var generateTripInfo = function(response) {
    var tripTemplate = _.template($('#trip-info-template').html());
    var generatedHtml = tripTemplate(
      {
        data: response
      }
    );
    var idSelection = '#' + response.id;

    $(idSelection).append($(generatedHtml));
  };


  // Toggle logic function

  var toggleTripInfo = function(id) {
    $('.trip-info', id).toggle();
    $('form', id).toggle();
  };


  $(document).ready(loadDocument());

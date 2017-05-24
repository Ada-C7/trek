var baseUrl = "https://trektravel.herokuapp.com/";

$(document).ready(function () {
  var tripListTemplate = _.template($('#trip-list-template').html());
  var showTripTemplate = _.template($('#show-trip-template').html());

  var tripsCallback = function (response) {
    $('#trip-details').empty();
    var generatedHtml = tripListTemplate({ trips: response });
    $('#trip-list').html(generatedHtml);
  };

  var tripCallback = function (response) {
    $('#trip-list').empty();
    var generatedHtml = showTripTemplate({ trip: response });
    $('#trip-details').html(generatedHtml);
    console.log(response);
  };

  var failCallback = function (response) {
    $('main').html("<p>AJAX Request Failed!</p>");
  };

  $('#get-trips').click(function() {
    var url = baseUrl + "trips";
    $.get(url, tripsCallback).fail(failCallback);
  });

  $('#trip-list').on('click', 'a', function () {
    var url = baseUrl + "trips/" + $(this).attr('id');
    $.get(url, tripCallback).fail(failCallback);
  });
});

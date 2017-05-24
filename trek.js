var baseUrl = "https://trektravel.herokuapp.com/";
var clearPage = function () {
  $('#alert').empty();
  $('#trip-list').empty();
  $('#trip-details').empty();
};

$(document).ready(function () {
  var tripListTemplate = _.template($('#trip-list-template').html());
  var showTripTemplate = _.template($('#show-trip-template').html());

  var tripsCallback = function (response) {
    clearPage();
    var generatedHtml = tripListTemplate({ trips: response });
    $('#trip-list').html(generatedHtml);
  };

  var tripCallback = function (response) {
    clearPage();
    var reservationUrl = baseUrl + "trips/" + response.id + "/reserve";
    var generatedHtml = showTripTemplate({
      trip: response,
      url: reservationUrl
    });
    $('#trip-details').html(generatedHtml);
  };

  var failCallback = function (response) {
    $('#alert').html("<p>AJAX Request Failed!</p>");
  };

  $('#get-trips').click(function() {
    var url = baseUrl + "trips";
    $.get(url, tripsCallback).fail(failCallback);
  });

  $('#trip-list').on('click', 'a', function () {
    var url = baseUrl + "trips/" + $(this).attr('id');
    $.get(url, tripCallback).fail(failCallback);
  });

  $('#trip-details').on('click', "input[type='submit']", function(e) {
    e.preventDefault();

    var url = $('form').attr('action');
    var formData = $('form').serialize();

    $.post(url, formData, function (response) {
      $("<p>Reserved Successfully!</p>").insertAfter('h3');
    }).fail(failCallback);
  });
});

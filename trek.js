url = "https://trektravel.herokuapp.com/trips";

$(document).ready(function () {
  var tripListTemplate = _.template($('#trip-list-template').html());

  var successCallback = function (response) {
    for (var i = 0; i < response.length; i++) {
      var generatedHtml = tripListTemplate({ trips: response });
      $('main').append(generatedHtml);
    }
  };

  var failCallback = function (response) {
    $('main').html("<p>AJAX Request Failed!</p>");
  };

  $('#get-trips').click(function() {
    $.get(url, successCallback).fail(failCallback);
  });
});

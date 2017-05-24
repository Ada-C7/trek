var baseUrl = "https://trektravel.herokuapp.com/trips"

var getTrips = function() {
  $.get(baseUrl, displayTrips).fail(failureCallback);
};

var displayTrips = function(response) {
  var tripListTemplate = _.template($('#trip-list-template').html());
  $('#display').empty();
  for (var i = 0; i < response.length; i++) {
    response[i]["days"] = response[i].weeks * 7;
    var generatedHtml = tripListTemplate({
      data: response[i]
    });
    $('#display').append(generatedHtml);
  }
};

var getOneTrip = function() {
  $.get(baseUrl + "/" + this.id, displayOneTrip).fail(failureCallback);
};

var displayOneTrip = function(response) {
  var showTripTemplate = _.template($('#show-trip-template').html());
  $('#display').empty();
  response["days"] = response.weeks * 7;
  response["cost"] = response.cost.toFixed(2);
  var generatedHtml = showTripTemplate({
    data: response
  });
  $('#display').append(generatedHtml);
  $('form').submit(reserveTrip);
}

var reserveTrip = function(event) {
  event.preventDefault();
  var url = $(this).attr("action");
  var formData = $(this).serialize();
  $.post(url, formData, function(response) {
    $("#message").html("<p>Trip successfully reserved with confirmation #" + response.id + "</p>");
  }).fail(failureCallback);
};

var failureCallback = function() {
  $("#message").html("<h4>Alas, your request could not be completed.</h4>");
};


$(document).ready(function() {
  $('#hitMe').click(getTrips);

  $(document).on('click', '.trip', getOneTrip);





});

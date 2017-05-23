var baseUrl = "https://trektravel.herokuapp.com/trips"

var getTrips = function() {
  $.get(baseUrl, displayTrips).fail(failureCallback);
};

var displayTrips = function(response) {
  var tripListTemplate = _.template($('#trip-list-template').html());
  $('#display').empty();
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripListTemplate({
      data: response[i]
    });
    $('#display').append(generatedHtml);
  }
};

var getOneTrip = function() {
  $.get(baseUrl + "/" + this.id, displayOneTrip);
};

var displayOneTrip = function(response) {
  console.log(response);
}

var failureCallback = function() {
  $("#errors").html("<h3>Alas, the request for data has failed.</h3>");
};


$(document).ready(function() {
  $('#hitMe').click(getTrips);

  $(document).on('click', '.trip', getOneTrip);

});

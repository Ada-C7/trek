var baseUrl = "https://trektravel.herokuapp.com/trips"

var getTrips = function() {
  $.get(baseUrl, displayTrips);
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



$(document).ready(function() {
  $('#hitMe').click(getTrips);
});

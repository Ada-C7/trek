var baseUrl = 'https://trektravel.herokuapp.com/trips';
var tripListTemplate = _.template($('#trip-list-template').html());

var tripListSuccess = function(response) {
  var tripList = $('<ul></ul>');

  for (i = 0; i < response.length; i++) {
    var generatedHtml = tripListTemplate({
      data: response[i]
    });
    tripList.append(generatedHtml);
  }
  $('#trip-info').html(tripList);
};

var tripListClickHandler = function() {
  response = $.get(baseUrl, tripListSuccess).fail(function() {
    console.log('AJAX failed to load.');
    $('#errors').html('Couldn\'t load trips.');
  });
};

$(document).ready(function() {
  $('#load-trips').click(tripListClickHandler);
});

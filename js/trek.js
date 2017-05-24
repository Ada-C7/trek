var tripListUrl = 'https://trektravel.herokuapp.com/trips';
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

var tripClickHandler = function() {
  response = $.get(tripListUrl, tripListSuccess);
};


$(document).ready(function() {
  $('#load-trips').click(tripClickHandler);
});

var tripListUrl = 'https://trektravel.herokuapp.com/trips';
var tripListTemplate = _.template($('#trip-list-template').html());

var tripListSuccess = function(response) {
  console.log('Success!');
  console.log(response);

  for (i = 0; i < response.length; i++) {
    var generatedHtml = tripListTemplate({
      data: response[i]
    });
    $('#trips-list').append(generatedHtml);
  }
};

var tripClickHandler = function() {
  response = $.get(tripListUrl, tripListSuccess);
};


$(document).ready(function() {
  $('#load-trips').click(tripClickHandler);
});

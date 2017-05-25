var url = "https://trektravel.herokuapp.com/trips/";

// tripTemplate compiled at document ready (called only once);
var tripTemplate;

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  for (var i = 0; i < response.length; i++){
    var generatedHTML = tripTemplate({
      trip: response[i],
      link: url + response[i]['id']
    });
    $('#trip-list tbody').append(generatedHTML);
  }
};

var failureCallback = function() {
  console.log("Call Failed");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  tripTemplate = _.template($('#trip-template').html());
  $('#load').click(clickHandler);
});

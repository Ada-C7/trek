var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripTemplate = _.template($('#trip-template').html());
  for (var i = 0; i < response.length; i++){
    var generatedHTML = tripTemplate({
      trip: response[i]
    });
    $('#trip-list').append(generatedHTML);
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
  $('#load').click(clickHandler);
});

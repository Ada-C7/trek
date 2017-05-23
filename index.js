
var url = "https://trektravel.herokuapp.com/trips";

$(document).ready(function() {
  $('#load').click(clickHandler);
});


var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);
  var tripTemplate = _.template($('#trips-list-template').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trips-list').append($(generatedHtml));
  }
};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var tripsUrl = "https://trektravel.herokuapp.com/trips";

var clickHandler = function(event) {
  var target = $('#list-trips');
  // target.empty(); // might use later so trip list does not repeat if button clicked again

  $.get(tripsUrl, successCallback).fail(failureCallback);
};

var successCallback = function(response) {
  console.log("Success!");
  console.log(response[0]);

  var tripsTemplate = _.template($('#list-trips').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripsTemplate({
      data: response[i]
    });
    console.log(generatedHtml);
    $('#print-trips').append(generatedHtml);
  }
};

var failureCallback = function() {
  console.log("AJAX request did not work");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function(){
  $('#load').click(clickHandler);
});

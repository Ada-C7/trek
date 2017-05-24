var url = "https://trektravel.herokuapp.com/trips";

// What do we want to happen when we get our response?
var successCallback = function(response) {
  console.log('success!');
  console.log(response);
  var tripsData = response;
  var tripsTemplate = _.template($('#trips-template').html());

  for (var i = 0; i < tripsData.length; i++) {
    var generatedHtml = tripsTemplate({
      trip: tripsData[i]
    });
    $('#trips').append($(generatedHtml));
  }

};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var successCallback = function(response) {
  // console.log("Success!");
  // console.log(response.length);

  var target = $('#trips');
  var trekTemplate = _.template($('#trek-item-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = trekTemplate({
      trek: response[i]
    });
    target.append($(generatedHtml));
  }
};

var clickHandler = function() {
  $('#trips').empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);

});

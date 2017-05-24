
var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  // console.log('success!');
  // console.log(response);
  var listTemplate = _.template($('#list-template').html());
  var target = $('#trips');

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = listTemplate({
      data: response[i]
    });
    target.append($(generatedHtml));
  }
};

var failureCallback = function(response) {
  console.log('did not work');
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $("#trips").empty();
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready( function() {
  $("#load").click(clickHandler);
});

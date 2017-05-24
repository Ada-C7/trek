var url = 'https://trektravel.herokuapp.com/trips';

var listTrips = function(returnedData) {
  var listTemplate = _.template($('#list-template').html());

  for (var i = 0; i < returnedData.length; i++) {
    var generatedHtml = listTemplate({
      data: returnedData[i]
    });
    $('#list').append($(generatedHtml));
  }
};

var SuccessCallback = function(response) {
  console.log("Its working!");
  listTrips(response);
  console.log(response);
};

var failureCallback = function() {
  console.log("HAHA Fail :( ");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(e) {
  $('#list').empty();
  $.get(url, SuccessCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});

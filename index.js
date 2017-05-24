var urlBasic = "https://trektravel.herokuapp.com/trips";

var successCallbackList = function(response) {
  console.log("Success!");
  console.log(response);
  $('#list_head_of_trips').empty();
  $('#list_of_trips').empty();

  var listHeadTemplate = _.template($('#list_head_template').html());
  $('#list_head_of_trips').html(listHeadTemplate);

  var listTemplate = _.template($('#list_template').html());

  for (var ind = 0; ind < response.length; ind++) {
    var generatedHtml = listTemplate({
      data: response[ind]
    });
    $('#list_of_trips').append($(generatedHtml));
    // $('#getTrip').click(clickHandlerList);
  }
};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};


var clickHandlerList = function(event) {
  $.get(urlBasic, successCallbackList).fail(failureCallback);
};


$(document).ready(function() {
  $('#load_list').click(clickHandlerList);

});

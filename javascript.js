var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var successCallback = function(response) {
  // console.log("Success!");
  // console.log(response.length);
  $('#trips').empty();

  var target = $('#trips');
  var trekTemplate = _.template($('#trek-item-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = trekTemplate({
      trek: response[i]
    });
    target.append($(generatedHtml));
  }
};

var successLocaleCallback = function(response) {
  $('#trips').empty();
  var target = $('#trips');
  var trekTemplate = _.template($('#locale-trek-template').html());
  var generatedHtml = trekTemplate({
    trek: response
  });
  target.append($(generatedHtml));

};

var clickHandler = function() {
  // $('#trips').empty();
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback).fail(failureCallback);
};

var clickHandlerLocale = function(event) {
  // console.log(event);
  // $('trips').empty();
  var url = "https://trektravel.herokuapp.com/trips/";
  var tripUrl = $(this).data().trekId;
  $.get(url + tripUrl, successLocaleCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
  $('#trips').on('click', '#oneTrek', clickHandlerLocale);
});

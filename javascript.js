var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h2>AJAX request failed!</h2>");
};

var successCallback = function(response) {

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

  $('form').submit(clickHandlerReserve);
};

var successLocaleReserved = function() {
  $('#message').html('<p> You reserved this trek! </p>');
};

var clickHandler = function() {
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback).fail(failureCallback);
};

var clickHandlerLocale = function(event) {
  var url = "https://trektravel.herokuapp.com/trips/";
  var tripUrl = $(this).data().trekId;
  $.get(url + tripUrl, successLocaleCallback).fail(failureCallback);
};

var clickHandlerReserve = function(event) {

  event.preventDefault();

  var url = $(this).attr("action");
  var formData = $(this).serialize();
  console.log("form data = ", formData);
  $.post(url, formData, successLocaleReserved).fail(failureCallback);
};

var homeHandler = function() {
  window.location.replace("file:///Users/jou-jousun/ada/javascript/trek/index.html");
};

$(document).ready(function() {
  $('#load').click(clickHandler);
  $('#trips').on('click', '#oneTrek', clickHandlerLocale);
  $('#title').click(homeHandler);
});

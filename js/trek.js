
var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  var listTemplate = _.template($('#list-template').html());
  var target = $('#trips');

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = listTemplate({
      data: response[i]
    });
    target.append($(generatedHtml));
  }
};

var detailsSuccessCallback = function(response) {
  var detailsTemplate = _.template($('#details-template').html());
  var target = $('#trip-details');
  var generatedHtml = detailsTemplate({
    data: response
  });

  target.append($(generatedHtml));

  $("#reservation-form").submit(reservationHandler);
};

var reservationHandler = function(e) {
  e.preventDefault();
  $("#reservation-form").empty();

  var reserveUrl = $(this).attr("action");
  var formData = $(this).serialize();
  $.post(reserveUrl, formData, function(response){
    $("#message").html('<p> Reservation made! </p>');
  }).fail(reservationFailureCallback);
};

var failureCallback = function(response) {
  $(".errors").html("<h3>Sorry, but your AJAX request for all trips failed!</h3>");
};

var detailsFailureCallback = function(response) {
  $(".errors").html("<h3>Sorry, but your AJAX request for trip details failed!</h3>");
};

var reservationFailureCallback = function(response) {
  $("#trip-details").empty();
  $(".errors").html("<h3>Sorry, but your reservation failed!</h3>");
};

var clickHandler = function() {
  $("#trip-details").empty();
  $("#trips").empty();
  $.get(url, successCallback).fail(failureCallback);
};

var detailsClickHandler = function() {
  id = $(this).attr('id');
  $("#trips").empty();
  $.get(url + "/" + id, detailsSuccessCallback).fail(detailsFailureCallback);
};

$(document).ready( function() {
  $("#load").click(clickHandler);
  $("#trips").on("click", "a", detailsClickHandler);
});

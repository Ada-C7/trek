
var url = 'https://trektravel.herokuapp.com/trips';
var id;

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

  $("#reservation-form").submit(function(e) {
    e.preventDefault();
    // console.log($(this).attr("action"));
    var reserveUrl = $(this).attr("action");

    var formData = $(this).serialize();

    // console.log(reserveUrl);
    // console.log(formData);

    $.post(reserveUrl, formData, function(response){
      $("#message").html('<p> Reservation made! </p>');

      // console.log(response);
    });
  });
};

var failureCallback = function(response) {
  console.log('did not work');
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function() {
  $("#trip-details").empty();
  $("#trips").empty();
  $.get(url, successCallback).fail(failureCallback);
};

var detailsClickHandler = function() {
  id = $(this).attr('id');
  // console.log(id);
  $("#trips").empty();
  $.get(url + "/" + id, detailsSuccessCallback).fail(failureCallback);
};

$(document).ready( function() {
  $("#load").click(clickHandler);
  $("#trips").on("click", "a", detailsClickHandler);
});

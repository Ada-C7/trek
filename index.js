var buildUrl = function() {
  return "https://trektravel.herokuapp.com/trips";
};

var allTripsCallback = function(response) {
  console.log("Success!");
  console.log(response);

  $("#trips-list").empty();
  $("#trip").empty();

  var tripsTemplate = _.template($('#trips-template').html());
  for (var i = 0; i < response.length; i++) {

    var generatedHtml = tripsTemplate({
      data: response[i]
    });

    $('#trips-list').append($(generatedHtml));
  }

  $(".individual-trip").click(clickHandler2);
};

var tripCallback = function(response) {
  console.log("Success!");
  console.log(response);

  $("#trips-list").empty();
  $("#trip").empty();

  var tripTemplate = _.template($('#trip-template').html());
  var generatedHtml = tripTemplate({
    data: response
  });
  $('#trip').append($(generatedHtml));

  $('form').submit(function(e) {
    // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
    e.preventDefault();

    var url = $(this).attr("action"); // Retrieve the action from the form
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $('#reserve-form').html('<p> Trip reserved for ' + this.name + '! </p>');
      console.log(response);
    }).fail(function() {
      $("#errors").html('<p>Reservation failed! Please check you have filled out all fields</p>');
    });
  });
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler2 = function() {
  var url2 = "https://trektravel.herokuapp.com/trips/" + this.id;
  $.get(url2, tripCallback).fail(failureCallback);
};

var tripsClickHandler = function() {
  $.get(url, allTripsCallback).fail(failureCallback);
};

$(document).ready(function() {
  url = buildUrl();

  $('#load').click(tripsClickHandler);
});

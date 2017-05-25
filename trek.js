var tripsUrl = "https://trektravel.herokuapp.com/trips";

var allTripClickHandler = function(event) {
  var target = $('#trips-template');
  $.get(tripsUrl, allSuccessCallback).fail(failureCallback);
};

var allSuccessCallback = function(response) {
  $('#print-trip-data').empty();
  $('#print-trips').show();

  var tripsTemplate = _.template($('#trips-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripsTemplate({
      data: response[i]
    });
    console.log(generatedHtml);
    $('#print-trips').append(generatedHtml);
  }
};

var oneTripClickHandler = function(oneTripUrl) {
  $.get(oneTripUrl, oneSuccessCallback).fail(failureCallback);
};

var oneSuccessCallback = function(response) {
  $('#print-trips').empty();
  $('#print-trip-data').show();

  var oneTripTemplate = _.template($('#trip-data').html());

  var generatedHtml = oneTripTemplate({
    data: response
  });
  console.log(generatedHtml);
  $('#print-trip-data').append(generatedHtml);

  // Trip reservation
  $('form').submit(function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    console.log("form data = ", formData);
    $.post(url, formData, function(response){
      $('#add-reservation').html('<p>Reservation successful!</p>');
      console.log(response);
    }).fail(function(){
      $("#errors").html('<p>Reservation failed</p>');
    });
  });
};

var failureCallback = function() {
  console.log("AJAX request did not work");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function(){
  $('#load').click(allTripClickHandler);
  $('#print-trips').on('click', 'h4', function() {
    console.log(this);
    var oneTripUrl = tripsUrl + "/" + this.id;
    oneTripClickHandler(oneTripUrl);
  });
});

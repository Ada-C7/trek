var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripsTemplate = _.template($('#trips-item').html());
  for (var i = 0; i < response.length; i++){
    var generatedHtml = tripsTemplate({trip: response[i]});

    $('#trips').append($(generatedHtml));
  }

  $('#load').hide(); //hide button after loading trips
  var destinationButtons = $('button.destination');
  destinationButtons.click(tripClickHandler);
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

var tripClickHandler = function(event) {
  $.get(url + "/"+ this.id, tripSuccessCallback).fail(failureCallback);
  console.log("hello");
  console.log(this.id)
};

var tripSuccessCallback = function(response) {
  console.log("Success!");
  console.log(response);
  var tripDetailTemplate = _.template($('#detail-template').html());

  var generatedHtml = tripDetailTemplate({trip: response});
  $('#'+ response.id).append($(generatedHtml));

  $("#<%-trip.id%>").hide();
  $("#<%-trip.id%>").empty();

}

$(document).ready(function() {
  $('#load').click(clickHandler);
});

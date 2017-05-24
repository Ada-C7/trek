// Click button to show all trips
var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  // var target = $("#trips");
  // for (var i = 0; i < response.length; i ++) {
  //   var trip = response[i];
  //   target.append("<li>" + trip['name'] + ": " + trip['continent'] + ": " + trip["weeks"] + " weeks" + "</li>");
  // }

  tripsTemplate2 = _.template($('#trips-item-template-2').html());
  for (var i = 0; i < response.length; i ++) {
    // var trip = response[i];
    var generatedHtml = tripsTemplate2({trip: response[i]});
    $("#trips").append($(generatedHtml));
  }
  // var generatedHtml = tripsTemplate({tripsData: response});
  // console.log(generatedHtml);
  // $("#trips").append($(generatedHtml));
};

var failureCallback = function() {
  console.log("Nope");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback)
};

// to get around scope
var tripsTemplate;

$(document).ready(function() {
  tripsTemplate = _.template($('#trips-item-template').html());

  $('#load').click(clickHandler);
});

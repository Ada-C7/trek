// // get trip data from API with AJAX
var url = "https://trektravel.herokuapp.com/trips";
//
//
// // generate trip info on page
//
//
// });
// // make another API call for trip details (see API docs)
// // var url = "https://trektravel.herokuapp.com/trips/1";
//
//


var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var tripTemplate = _.template($('#all-trips-template').html());

  for(var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trips-list').append(generatedHtml);
  }
};

var failureCallback = function() {
  console.log("Didn't work. Sorry!");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  //$.get(url, successCallback);
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});


// var target = $('#trips');

// for (var i = 0; i < response.length; i++) {
//   var trip = response[i];
//   // target.empty();
//   target.append("<li>" + trip['name'] + trip['continent'] + trip['weeks'] + "</li>");
// }

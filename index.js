var buildUrl = function() {
  return "https://trektravel.herokuapp.com/trips";
};


var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  console.log($('#trips'));

  var trips = [];
  for (var i = 0; i < response.length; i++) {
    var name = response[i].name;
    $('#trips').append("<h1>" + name + "</h1>");
  }


};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};


$(document).ready(function() {
    var url = buildUrl();

    $.get(url, successCallback).fail(failureCallback);

    // var tripTemplate = _.template($('#trips-template').html());
});

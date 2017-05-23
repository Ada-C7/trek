var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log("Success!")
  console.log(response);

  var target = $('#trips');
  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    target.append("<h2>" + trip['name'] + "</h2>" +
    "<ul>" + "<li>" + "Continent: " + trip['continent'] + "</li>" +
    "<li>" + "Duration: " + trip['weeks'] + " weeks" + "</li>" + "</ul>");
  }
}

var failureCallback = function() {
  console.log("Didn't work");
  $("#errors").html("<h1>AJAX request failed!</h1>");
}

var clickHandler = function() {
  $.get(url, successCallback) //passing a function around as a variable (to be invoted later.) when the request comes in, that is when it willb e called.
};
//as soon as the document is ready, load the page
$(document).ready(function() {
  $('#load').click(clickHandler);
});

$(document).ready(function() {
var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  var target = $('#trips');

  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    var row = $('<tr></tr>');
    var name = $('<td><a href="#" id=' + trip.id + '>' + trip.name + '</a></td>');
    var continent = $('<td>' + trip.continent + '</td>');
    var weeks = $('<td' + trip.weeks + '</td>');
    row.append(name, continent, weeks);
    target.append(row);
  }
};

$('#load').click( function() {
  $('#trips').empty();
  $('#load').hide();
  $.get(url, successCallback);
});

var failureCallback = function() {
  console.log("Didn't work: (");
  $("#errors").html("<h1>Ajax request failed!</h1>");
};

var clickHandler = function() {
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
});
});

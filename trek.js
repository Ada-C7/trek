var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  var target = $('#trips');
  console.log(response[0]);
  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    target.append("<li>" + trip.name + "</li>");
  }
};


var clickHandler = function() {
  $('body').empty();

  $.getJSON(url).success(successCallback).fail(failureCallback);

};

var failureCallback = function(){
  console.log('bad call');
  $('#errors').html('<h1>Ajax request failed.</h1>');
};


$(document).ready(function() {
  $('#load').click(clickHandler);

});

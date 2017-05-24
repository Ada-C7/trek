$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
    console.log(response);
  };

  $('.button').click(function() {
    $.get(url, successCallback);
  });

});

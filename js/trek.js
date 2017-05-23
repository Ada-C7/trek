var tripListUrl = 'https://trektravel.herokuapp.com/trips';

var tripListSuccess = function(response) {
  console.log('Success!');
  console.log(response);
};

var tripClickHandler = function() {
  $.get(tripListUrl, tripListSuccess);
};


$(document).ready(function() {
  $('#load-trips').click(tripClickHandler);
});

url = "https://trektravel.herokuapp.com/trips";

var successCallback = function (response) {
  for (var i = 0; i < response.length; i++) {
    $('#trip-list').append("<li>" + response[i].name + "</li>");
  }
  console.log(response);
};

var failCallback = function (response) {
  $('#trip-list').html("<li>AJAX Request Failed!</li>");
};

$(document).ready(function () {
  $('#get-trips').click(function() {
    $.get(url, successCallback).fail(failCallback);
  });
});

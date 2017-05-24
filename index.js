const BASEURL = 'https://trektravel.herokuapp.com/trips/';

var successTreksCallback = function(response) {
  console.log("success!");
  console.log(response);

  var treksTemplate = _.template($('#trek-list').html());

  response.forEach(function(object) {
    var genHTML = treksTemplate({
      trek: object
    });
    $('#treks').append($(genHTML));
  });
};

var successTrekCallback = function(response) {
  console.log("success!");
  console.log(response);

  var treksTemplate = _.template($('#show-trek').html());

  var genHTML = treksTemplate({
    trek: response
  });
  $('#treks').append($(genHTML));

  // console.log(response[i]);
  // $('#test').append('<p>name: ' + response[i].name + '</p>');
};

var successSignUpCallback = function() {

};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var alwaysCallback = function() {
  console.log("always get this");
};

var getTreks = function(event) {
  var target = $('#treks');
  target.empty();

  var url = BASEURL;
  $.get(url, successTreksCallback).fail(failureCallback).always(alwaysCallback);
};

var getTrek = function(event) {
  var target = $('#treks');
  target.empty();

  var id = $(this).attr("id");
  var url = BASEURL + id;
  // console.log(url);
  $.get(url, successTrekCallback).fail(failureCallback).always(alwaysCallback);
};

var signUp = function(event) {
  event.preventDefault();
  var action = $(this).attr("action");
  var id = $(this).attr("id");
  console.log(id);
  var url = BASEURL + id + reserve;
  var formData = $(this).serialize();
  $.post(url, formData, successSignUpCallback).fail(failureCallback).always(alwaysCallback);
};

$(document).ready(function() {
  $('body').on('click', '#load-treks', getTreks);

  $('#treks').on('click', '.load-trek', getTrek);
  $('form').submit(signUp);
});

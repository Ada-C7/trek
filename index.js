var successTreksCallback = function(response) {
  console.log("success!");
  console.log(response);

  // var treksTemplate = _.template($('#trek-list').html());

  for (var i = 0; i < response.length; i++) {
    // var genHTML = treksTemplate({
    //   trek: response[i]
    // });
    // $('#trek-list').append($(genHTML));

    console.log(response[i]);
    $('#test').append('<p>name: ' + response[i].name + '</p>');
  }
};

// var successTrekCallback = function(response) {
//   console.log("success!");
//   console.log(response);
//
//   // var treksTemplate = _.template($('#trek-list').html());
//
//   for (var i = 0; i < response.length; i++) {
//     // var genHTML = treksTemplate({
//     //   trek: response[i]
//     // });
//     // $('#trek-list').append($(genHTML));
//
//     console.log(response[i]);
//     $('#test').append('<p>name: ' + response[i].name + '</p>');
//   }
// };

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var alwaysCallback = function() {
  console.log("always get this");
};

const BASEURL = 'https://trektravel.herokuapp.com/trips';

var getTreks = function(event) {
  var target = $('.treks');
  target.empty();

  var url = BASEURL;
  $.get(url, successTreksCallback).fail(failureCallback).always(alwaysCallback);
};

// var getTrek = function(event) {
//   var target = $('.treks');
//   target.empty();
//
//   var url = BASEURL + this id;
//   $.get(url, successTrekCallback).fail(failureCallback).always(alwaysCallback);
// };


$(document).ready(function() {
  $('#load-treks').click(getTreks);
  $('h2').click(getTrek);
});

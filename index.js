var makeSuccessCallback = function(name) {
  console.log("success!");
  var successCallback = function(response) {
    // console.log(response);
    // appendContent(response.results[0]);
  };
  return successCallback;
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var alwaysCallback = function() {
  console.log("always get this");
};

const BASEURL = // "https://maps.googleapis.com/maps/api/geocode/json?address=";

// AJAX request
var clickHandler = function(event) {
  // $('table').empty();
  // sevenWonders.forEach(function(wonder) {
  //   var url = BASEURL + wonder;
  //   $.get(url, makeSuccessCallback(wonder)).fail(failureCallback).always(alwaysCallback);
  // });
};


$(document).ready(function() {
  // $('#load').click(clickHandler);
});

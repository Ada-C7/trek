/*****Return List of All Trips******/
var url= "https://trektravel.herokuapp.com/trips";

var allTemplate = _.template($('#all-trips-template').html());

var successCallback = function(event) {
  for (var i = 0; i < event.length; i++) {
    var generatedHTML = allTemplate({
      allData: event[i]
    });
    $("#all-trips").append(generatedHTML);
    // Why do I get different output when I use .append vs. .html?
  }
};

var failureCallback = function() {
  $('#errors').html('<h2>Apologies, it appears the list of trips is not available right now. </h2>');
};

var clickHandler = function() {
  $.get(url, successCallback).fail(failureCallback);
};

/*****Return Single Trip Info******/
var singleTemplate = _.template($('single-trip-template').html());

var successSingleCallback = function(event) {
  for (var i = 0; i < event.length; i++) {
    var generatedSingleHTML = singleTemplate({
      singleData: event[i]
    });
    $("#single-trip").append(generatedSingleHTML);
  }
};

var failureSingleCallback = function() {
  $('#errors').html('<h2>Apologies, there are not trip details at this moment.</h2>');
};

var singleClickHandler = function(event) {
  event.preventDefault();
  var id = $(this).attr('href');
  var singleURL = url + "/" + id;
  $.get(singleURL, successSingleCallback).fail(failureSingleCallback);
};

/*****Execute above code on Click******/
$(document).ready(function() {
  $('#allLoad').click(clickHandler);
  $("#singleLoad").on("click", singleClickHandler);
});

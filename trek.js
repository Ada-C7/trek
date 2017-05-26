/*****Return List of All Trips******/
var url= "https://trektravel.herokuapp.com/trips";

var allTemplate = _.template($('#all-trips-template').html());

var successCallback = function(event) {
  var target = $('#all-trips');

  for (var i = 0; i < event.length; i++) {
    var generatedHTML = allTemplate({
      allData: event[i]
    });
    target.append($(generatedHTML));
  }
};

var failureCallback = function() {
  $('#errors').html('<h2>Apologies, it appears the list of trips is not available right now. </h2>');
};

var clickHandler = function() {
  alert($(this).attr("id")); // returns allLoad
  $.get(url, successCallback).fail(failureCallback);
};

/*****Return Single Trip Info******/
var singleTemplate = _.template($('#single-trip-template').html());

var successSingleCallback = function(event) {
  var target = $('#single-trip');

  for (var i = 0; i < event.length; i++) {
    var generatedSingleHTML = singleTemplate({
      singleData: event[i]
    });
    target.append($(generatedSingleHTML));
  }
};

var failureSingleCallback = function() {
  $('#errors').html('<h2>Apologies, it appears this trip info is not available right now. </h2>');
};

var singleClickHandler = function(event) {
  console.log("WE HERE");
  var id = event.target.id;
  var singleURL = url + "/" + id;
  $.get(singleURL, successSingleCallback).fail(failureSingleCallback);
};

/*****Execute above code on Click******/
$(document).ready(function() {
  $('#allLoad').click(clickHandler);
  $('#all-trips').on('click', '<%- allData.id %>', singleClickHandler);
});

/* would like some error handling to get rid of the ugly
responses.*/

var url= "https://trektravel.herokuapp.com/trips";

var allTemplate = _.template($('#all-trips-template').html());

var successCallback = function(response) {
  var target = $('#all-trips');
  for (var i = 0; i < response.length; i++) {
    var generatedHTML = allTemplate({
      allData: response[i]
    });
    target.append($(generatedHTML));
  }
};

var failureCallback = function() {
  $('#errors').html('<h2>Apologies, it appears the list of trips is not available right now. </h2>');
};

var allClickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

/***********/
// var singleTemplate = _.template($('#single-trip-template').html());



/***********/
$(document).ready(function() {
  $('#allLoad').click(allClickHandler);
  //$('#singleLoad').click(singleClickHandler);
});

/* would like some error handling to get rid of the ugly
responses.*/

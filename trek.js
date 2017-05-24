var url= "https://trektravel.herokuapp.com/trips";

var trektravelTemplate = _.template($('#all-trips-template').html());

var successCallback = function(response) {
  var target = $('#all-trips');
  for (var i = 0; i < response.length; i++) {
    var generatedHTML = trektravelTemplate({
      data: response[i]
    });
    target.append($(generatedHTML));
  }
};

var failureCallback = function() {
  $('#errors').html('<h2>Apologies, it appears the list of trips is not available right now. </h2>');
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};


$(document).ready(function() {
  $('#load').click(clickHandler);
});

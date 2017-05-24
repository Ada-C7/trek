$(document).ready(function() {
  var tripsTemplate = _.template($('#trips-template').html());
  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallback = function(response) {
      for (var i = 0; i < response.length; i++) {
        var generatedHTML = tripsTemplate({
          trip: response[i]
        });
        $('#trips').append($(generatedHTML));
      }
    return successCallback;
  };

  $('.button').click(function() {
    if( $('#trips').children().length === 0) {
      $.get(url, successCallback);
    }
  });

});

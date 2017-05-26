
$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';

  var successCallBack = function(response){
    console.log('Success!');
    
    var templateTrips = _.template($('#infoTrip').html());

    for (var i = 0; i < response.length; i++){
      var generatedHTML = templateTrips({
        data: response[i]
      });
      $('#listTrips').append($(generatedHTML));
    }
  };

  var failureCallback = function(){
    console.log("did not work :()");
    $('#errors').html("<h1>AJAX request failed!</h1>");
  };

  var clickHandler = function() {
    $.get(url, successCallBack);
    // $.get(url).success(successCallBack).fail(failureCallback);
  };

  $('#load').click(clickHandler);

}); // final documento listo.

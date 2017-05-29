
$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';
  var tripsTemplate = _.template($('#trips-template').html());
  var oneTripsTemplate = _.template($('#one-trip-template').html());

  var successCallBack = function(response){
    console.log('Success!');
    console.log(response);

    for (var i = 0; i < response.length; i++){
      console.log(response[i]);

      var generatedHTML = tripsTemplate({
        data: response[i]
      });
      console.log(generatedHTML);
      $('#showInfo').append($(generatedHTML));

    }
    $('.more-info').click(clickShowInfoHandler);

  };

  var failureCallback = function(){
    console.log("did not work :()");
    $('#errors').html("<h1>AJAX request failed!</h1>");
  };

  var clickButtonHandler = function() {
    $.get(url, successCallBack);
    // $.get(url).success(successCallBack).fail(failureCallback);
  };

  var successSingleTrip = function(response){
    var id = response.id;
    var generatedHTML = oneTripsTemplate({
      data: response
    });
    $("#" + id).append($(generatedHTML));
  };

  var clickShowInfoHandler = function(event){
    var tripId = event.currentTarget.dataset.id;


    $.get('https://trektravel.herokuapp.com/trips/' + tripId, successSingleTrip);

  };

  $('#load').click(clickButtonHandler);
  // $('.more-info').click(clickShowInfoHandler);

}); // final documento listo.

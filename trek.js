$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';
  var tripsTemplate = _.template($('#trips-template').html());
  var oneTripsTemplate = _.template($('#one-trip-template').html());

  var clickButtonHandler = function() {
    $.get(url).success(successTripList).fail(failureTripList);
  };

  var successTripList = function(response){
    for (var i = 0; i < response.length; i++){
      var generatedHTML = tripsTemplate({
        data: response[i]
      });
      console.log(generatedHTML);
      $('#trips-list').append($(generatedHTML));
    }

    $('.more-info').click(clickShowInfoHandler);
  };

  var failureTripList = function(){
    console.log("did not work :()");
    $('#errors').html("<h1>AJAX request failed!</h1>");
  };



  var successSingleTrip = function(response){
    var id = response.id;
    var generatedHTML = oneTripsTemplate({
      data: response
    });
    $("#" + id).append($(generatedHTML));

    $('form').submit(function(event){
      event.preventDefault();

      var url = $(this).attr("action");// can repeated because is a function scope variable!
      var formData = $(this).serialize();

      $.post(url, formData).success(successReservation).fail(failureReservation)
    });
  };

  var successReservation = function(response){
    $('#message').html('<p> You have reserved your trip successfully! </p>');
    $('form').hide();
  }

  var failureReservation = function(response){
    $('#message').html('<p> We are sorry. Something has gone wrong! </p>');
    $('form').hide();
  }

  var clickShowInfoHandler = function(event){
    var tripId = event.currentTarget.dataset.id;
    $.get('https://trektravel.herokuapp.com/trips/' + tripId, successSingleTrip);
  };

  $('#load').click(clickButtonHandler);

}); // final documento listo.

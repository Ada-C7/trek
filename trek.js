$(document).ready(function() {

  var url = 'https://trektravel.herokuapp.com/trips';
  var tripsTemplate = _.template($('#trips-template').html());
  var oneTripsTemplate = _.template($('#one-trip-template').html());

  var clickButtonHandler = function() {
    $.get(url).success(successTripsList).fail(failureTripList);
  };

  var successTripsList = function(response){
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
    $('#info-to-hide').hide();
    $('#message').html('<p> You have reserved your trip successfully! </p>');
    $('form').hide();
  }

  var failureReservation = function(response){
    $('#info-to-hide').hide();
    $('#message').html('<p> We are sorry. Something has gone wrong! Your reservation has not been added. </p>');
    $('form').hide();
  }

  var clickShowInfoHandler = function(event){
    var tripId = event.currentTarget.dataset.id;
    $.get(url + '/' + tripId, successSingleTrip);
    // $('#info-to-hide').toggle();
  };

  $('#load').click(clickButtonHandler);
  $('body').css('background-image', 'url(' + 'https://c1.staticflickr.com/3/2696/4125192347_09ecd8904c_z.jpg?zz=1' + ')');

}); // document ready closing

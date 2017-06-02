$(document).ready(function() {

  var tripsTemplate = _.template($('#trips-template').html());
  var tripTemplate = _.template($('#trip-template').html());

  var url = 'https://trektravel.herokuapp.com/trips';

var reserveCallback = function(response){

}



  var singleTripCallback = function(response) {
    var generatedHTML = tripTemplate({
      trip: response
    });
    $('#trips').append($(generatedHTML));
  };

  var successCallback = function(response) {
      for (var i = 0; i < response.length; i++) {
        var generatedHTML = tripsTemplate({
          trip: response[i]
        });
        $('#trips').append($(generatedHTML));
      }

      $('a').on("click", function() {
        var id = $(this).parent().parent().attr('id');

        $("#trips").empty();

        $.get(url + "/" + id, singleTripCallback);

        console.log($('#trips').children().length);


      });

    return successCallback;
  };

  $('.button').click(function() {
    if( $('#trips').children().length < 2 ) {
      $('#trips').empty();
      $.get(url, successCallback);
    }
  });

  $('form').submit(function(e) {

  e.preventDefault();

  var url = $(this).attr("action");
  var formData = $(this).serialize();

  $.post(url, formData, function(response){


    // What do we get in the response?
    console.log(response);
  });
});



});

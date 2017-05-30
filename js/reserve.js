$(document).ready(function() {

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h1>AJAX request failed!</h1>");
  };

  var clickonReserve = function(event) {
    event.preventDefault();
    var target = $(event.target).attr("data-trip-id");
    // console.log(event.target);
    var url = "https://trektravel.herokuapp.com/trips" + "/"+ target + "/" + "reserve"; // Retrieve the action from the form
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $('#message').html('<p> Your trip reserved! </p>');
      console.log(response);
    }).fail(failureCallback);
  };

  $('#trip_details').on('submit', '#reservation-form', clickonReserve);

});

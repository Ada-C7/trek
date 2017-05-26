var url = "https://trektravel.herokuapp.com/trips";

var failureCallback = {
  noTrips: function() {
              $("#errors").html("<h2>AJAX request failed!</h2>");
            },

  noReserve: function() {
                $("#message").html("<h2>Failed to make reservation</h2>");
              }
};

var allTrips = function(response){
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    $("#trips").append("<li class='oneTrip' id='" + trip['id'] + "'>"  + trip['name'] +"</li>").append("<button class='reserveBtn' id='resBtn" + trip['id'] + "'>Make Reservation</button>");
  }
};

var tripData = function(response){
    var generatedHtml = tripTemplate({
        trip: response
      });

      var sectionTarget = 'section#' + response['id'];
      var target = 'li#' + response['id'];

      $(target).after($(generatedHtml))
};

var clickHandler = function(){
      var nextElement = $($('.oneTrip#'+this.id)[0]).next()[0];
      if (nextElement.id === this.id) {
        $(nextElement).remove();
      } else {
        tripURL = url + "/" + this.id;
        $.get(tripURL, tripData).fail(failureCallback.noTrips);
      }

};

$(document).ready(function() {
  tripTemplate = _.template($('#trip-template').html());


  $('form').submit(function(e) {
    // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
    e.preventDefault();

    var url = $(this).attr("action"); // Retrieve the action from the form
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $('#message').html('<p> Reservation Made! </p>');

    }).fail(failureCallback.noReserve);
  });

  // Get the modal
  var modal = document.getElementById('popUpReserve');

    $.get(url, allTrips).fail(failureCallback.noTrips);

    $('#trips').on('click', 'li.oneTrip', clickHandler);

    // When the user clicks on the button, open the modal
    $('body').on('click','.reserveBtn', function() {

        modal.style.display = "block";
        document.getElementById("reserveForm").action = "https://trektravel.herokuapp.com/trips/" + this.id + "/reserve";
        document.getElementById("trip_id").value = this.id.replace(/\D/g,'');
    });

    // When the user clicks on <span> (x), close the modal
    $('body').on('click', '.close', function() {
        modal.style.display = "none";
    });

});

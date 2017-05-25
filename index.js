var url = "https://trektravel.herokuapp.com/trips";

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var allTrips = function(response){
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    $("#trips").append("<li class='oneTrip' id='" + trip['id'] + "'>"  + trip['name'] + "</li>");
  }
};

var tripData = function(response){
    var generatedHtml = tripTemplate({
        trip: response
      });

      var sectionTarget = 'section#' + response['id'];
      var target = 'li#' + response['id'];

      $(target).after($(generatedHtml))


    console.log($('section#' + response['id']));
    console.log($(sectionTarget).html());
};

var clickHandler = function(){
      var nextElement = $($('.oneTrip#'+this.id)[0]).next()[0];
      if (nextElement.id === this.id) {
        $(nextElement).remove();
      } else {
        tripURL = url + "/" + this.id;
        console.log(this);

        $.get(tripURL, tripData).fail(failureCallback);
      }
};

$('form').submit(function(e) {
  // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
  e.preventDefault();

  var url = $(this).attr("action"); // Retrieve the action from the form
  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#message').html('<p> Reservation Made! </p>');

    // What do we get in the response?
    console.log(response);
  });
});

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
$('#reserveBtn').onclick = function() {
    $('#popUpReserve').style.display = "block";
}

// When the user clicks on <span> (x), close the modal
$('span.close').onclick = function() {
    $('#popUpReserve').style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == $('#popUpReserve')) {
        $('#popUpReserve').style.display = "none";
    }
}

$(document).ready(function() {
  tripTemplate = _.template($('#trip-template').html());

    $.get(url, allTrips).fail(failureCallback);

    $('#trips').on('click', 'li.oneTrip', clickHandler);
});

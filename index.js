
var url_all_trip = "https://trektravel.herokuapp.com/trips";


$(document).ready(function() {
  $('#load').click(allTripsClickHandler);

  // checkIfTableEmpty();
  // checkIfErrorsEmpty();
});

var allTripsClickHandler = function(event) {
  $.get(url_all_trip, successTripsCallback).fail(failureCallback);
};

var successTripsCallback = function(response) {
  var tripTemplate = _.template($('#trips-list-template').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripTemplate({
      data: response[i]
    });
    $('#trips-list').append($(generatedHtml));
  }
  $('.see_trip').click(tripClickHandler);
};


var tripClickHandler = function(event) {
  var url_trip = "https://trektravel.herokuapp.com/trips/" + this.id;
  $.get(url_trip, successTripCallback).fail(failureCallback);
};

var successTripCallback = function(response) {
  var singleTripTemplate = _.template($('#trip-template').html());
  var generatedHtml = singleTripTemplate({
    data: response
  });
  $('#trip').html($(generatedHtml));
  // To change id of the trip in form:
  var id = response.id;
  $('form').attr('action','https://trektravel.herokuapp.com/trips/' + id + '/reserve');
  // To create reservation inside trip show modal:
  $('form').submit(function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    var validation_result = validateForm();
      if (validation_result != false){
        $.post(url, formData, function(response){
          $('#message').html('<p> You succesfully reserved your trip! </p>');
        })
        .fail(function(){
          $('#errors').html('<p>Creating new reservation failed</p>');
        });
        $('#reservation-form').hide();
      }
  });
};

// Failure callback for all actions:
var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<p>AJAX request failed! Check your Internet connection</p>");
};

// Additional functions to check if table and error box is emty:
var checkIfTableEmpty = function(){
  console.log($('#trips-list').html().includes("1"));
  if (!$('#trips-list').html().includes("1")){
    $('#trips-list-table').hide();
  }
};

var checkIfErrorsEmpty = function(){
  if ($('#errors').html() == ""){
    $('#errors-block').hide();
  }
  if ($('#message').html() == ""){
    $('#message-block').hide();
  }
};


// After closing modal reload a page:
// $( ".trip-close-button").click(function() {
//     location.reload();
//     // allTripsClickHandler ?????
// });



// FORM VALIDATION:
var validateForm = function() {
    var name = document.forms["reservation-form"]["name"].value;
    var age = document.forms["reservation-form"]["age"].value;
    var email = document.forms["reservation-form"]["email"].value;
    var alert_text = ""
    if (name == "") {
        alert_text += "Name must be filled out \n";
    }
    if (email == "") {
        alert_text += "Email must be filled out \n";
    }
    if (age == "") {
        alert_text += "Age must be filled out \n";
    }
    if (alert_text != ""){
      alert(alert_text);
    }
    if (name == "" || email == "" || age == ""){
      return false;
    }
    return true;
}

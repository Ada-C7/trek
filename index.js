
var url_all_trip = "https://trektravel.herokuapp.com/trips";


$(document).ready(function() {
  $('#load').click(allTripsClickHandler);

  $('#new-trip-button').click(function(response){
    var singleTripTemplate = _.template($('#new-trip-template').html());
    var generatedHtml = singleTripTemplate({
      data: response
    });
    $('#new-trip').html($(generatedHtml));

    $('#new-trip-form').submit(function(e) {
      e.preventDefault();
      var new_trip_url = "https://trektravel.herokuapp.com/trips";
      var formData = $(this).serialize();

      var validation_result = validateNewTripForm();
        if (validation_result != false){
          $.post(new_trip_url, formData, function(response){
            $('#message').html('<p> New trip added! </p>');
          })
          .fail(function(){
            $('#errors').html('<p>Creating new reservation failed</p>');
          });
          $('#new-trip-form').hide();
        }
    });
  }); // end of new trip block
  checkIfTableEmpty();
  checkIfTripBlockEmpty();
  // checkIfErrorsEmpty();

}); // end of document ready


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
    checkIfTableEmpty();
    checkIfErrorsEmpty();
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
      // checkIfErrorsEmpty();
};

// Failure callback for all actions:
var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<p>AJAX request failed! Check your Internet connection</p>");
};

// Additional functions to check if table and error box is emty:
var checkIfTableEmpty = function(){
  if (!$('#trips-list').html().includes("1")){
    $('#trips-list-table').hide();
  }
  else {
    $('#trips-list-table').show();
  }
};


var checkIfTripBlockEmpty = function(){
  console.log("I AM HERE");
  console.log($('#trip').html());
  // if ($('#trip').html() == ""){
  //   $('#trip-block').hide();
  // }
  // else {
  //   $('#trip-block').show();
  // }
};

var checkIfErrorsEmpty = function(){
  if ($('#errors').html() == ""){
    $('#errors-block').hide();
  }
  else {
    $('#errors-block').show();
  }
  if ($('#message').html() == ""){
    $('#message-block').hide();
  }
  else {
    $('#message-block').show();
  }
};


// FORM VALIDATION BLOCK:
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


var validateNewTripForm = function() {
    var name = document.forms["new-trip-form"]["name"].value;
    var continent = document.forms["new-trip-form"]["continent"].value;
    var about = document.forms["new-trip-form"]["about"].value;
    var category = document.forms["new-trip-form"]["category"].value;
    var weeks = document.forms["new-trip-form"]["weeks"].value;
    var cost = document.forms["new-trip-form"]["cost"].value;
    var alert_text = ""

    if (name == "") {
        alert_text += "Name must be filled out \n";
    }
    if (continent == "") {
        alert_text += "Continent must be filled out \n";
    }
    if (about == "") {
        alert_text += "About must be filled out \n";
    }
    if (category == "") {
        alert_text += "Category must be filled out \n";
    }
    if (weeks == "") {
        alert_text += "Weeks must be filled out \n";
    }
    if (cost == "") {
        alert_text += "Cost must be filled out \n";
    }
    if (alert_text != ""){
      alert(alert_text);
    }
    if (name == ""|| continent == "" || about == "" || category == "" || weeks == "" || cost == ""){
      return false;
    }
    return true;
}

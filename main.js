// taking advantage of hositing?
var tripsTemplate;
var urlTrips;

//// form validation functions ////
var validateName = function(name) {
  var regex = /^[A-Za-z][-'a-zA-Z]{0,100}$/;
  var result = regex.test(name);

  if (result == false) {
    alert("please eneter a first and last name");
  } else { return result; }
};

var validateAge = function(age) {
  if ( age >= 0 ) {
    return true;
  } else {
    alert("Please enter an number for age");
    return false;
  }
};

var validateEmail = function(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = regex.test(email);
  if ( result == false ) {
    alert("please enter a complete email address");
  } else { return result; }
};

//// callback functions /////

var successCallbackTrips = function(response){
  console.log("success");
  console.log(response);

  $('#trips-list').empty();
  for (var i = 0; i < response.length; i++){
    var generateHTML = tripsTemplate({
      trip: response[i]
    });

    $('#trips-list').append($(generateHTML));
    $('.slidingInfo').hide();
  };
};

var successCallbackTrip = function(response){
  console.log("success");
  console.log(response);

  var generateHTML = tripsTemplate({
    trip: response
  });

  $('#trip-' + response.id).replaceWith($(generateHTML));
  $('#show-hide-id-' + response.id).removeClass('closed').addClass('open');
  $('#tripDetails-' + response.id).slideDown("slow");
};

var successCallbackReserve = function(response){
  console.log("callback from reserve: " + response);
  alert('Trip Reserved!');

  $('.reservedMessage').html('<p>You are Reserved for this Trip</p>')
  $('#form' + response.id).hide();
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h2>Something went wrong - check back later</h2>");
};

//// click handler functions /////

$(document).ready(function(){
  tripsTemplate = _.template($('#trips-template').html());
  var urlTrips = "https://trektravel.herokuapp.com/trips";

  // api request for all trips //
  $.get(urlTrips, successCallbackTrips).fail(failureCallback);

  $('button.query').click(function(event){
    var url = urlTrips + $(this).attr("action");
    $.get(url, successCallbackTrips).fail(failureCallback);
  });

  $('#trips-list').on('click', '.closed', function(event) {
    event.preventDefault();
    var urlTrip = urlTrips + "/" + event.target.dataset.id
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);
  });

  $('#trips-list').on('click', '.open', function(event){
    $('#tripDetails-' + event.target.dataset.id ).slideToggle();
  });

  $('#trips-list').on('submit', 'form', function(event) {
    event.preventDefault();
    console.log("your in the submit form function");

    // this will just give you just the input of the form
    var name = $(event.target.name).val();
    var age = $(this).find('#age').val();
    var email = $(event.target.email).val();

    if ( validateName(name) && validateAge(age) && validateEmail(email) ) {
      var url = $(this).attr("action");
      var formData = $(this).serialize();
      $.post(url, formData, successCallbackReserve).fail(failureCallback);
    }
  });
});

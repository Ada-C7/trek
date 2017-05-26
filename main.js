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
    alert("please enter an age");
    return false;
  }
};

var validateEmail = function(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = regex.test(email);
  if ( result == false ) {
    alert("please enter a valid email");
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
  // where did $$ come from and it only works if you have $$
  //- it appears to let you only grab the current element - comes from the browser - can only use with cool browsers (chrome, safari, firefox)
  // $$('.slidingInfo').slideDown("slow");
  $('#tripDetails-' + response.id).slideDown("slow");
};

var successCallbackReserve = function(response){
  console.log("callback from reserve: " + response);
  alert('Trip Reserved!');

  $('.reservedMessage').html('<p>You are Reserved for this Trip</p>')
  $('#form' + response.id).hide();
};

// var successCallbackContinent = function(response){
//   console.log("success");
//   console.log(response);
//
//   for (var i = 0; i < response.length; i++){
//     var generateHTML = tripsTemplate({
//       trip: response[i]
//     });
//
//     $('#trips-list').append($(generateHTML));
//     $('.slidingInfo').hide();
//   };
// };

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

  $('#asia').click(function(event){
    var url = $(this).attr("action");
    $.get(url, successCallbackTrips).fail(failureCallback);
  });

  // have to use .on because .get all trips might not be complete before document.ready (asynch issue)
  $('#trips-list').on('click', '.closed', function(event) {
    event.preventDefault();
    // scope/context/boundaries for searching through with selectors
    // var scope = event.target.parent;
    var urlTrip = urlTrips + "/" + event.target.dataset.id
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);
  });

  $('#trips-list').on('click', '.open', function(event){
    $('#tripDetails-' + event.target.dataset.id ).slideToggle();
  });

  $('#trips-list').on('submit', 'form', function(event) {
    event.preventDefault();
    console.log("your in the submit form function");

    // this will just give you just the value
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

// add validations for forms
// add background color on header - make sure it appears cickable
// add custom searches// - drop down menus with budject, weeks, and contitent

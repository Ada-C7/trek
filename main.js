// $(document).foundation();
var tripsTemplate;
var urlTrips;

// var checkName = function(name) {

// };

var successCallbackTrips = function(response){
  console.log("success");
  console.log(response);

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
  console.log(response);
  alert('Trip Reserved!');
  $('.reservedMessage').html('<p>You are Reserved for this Trip</p>')
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h2>Something went wrong - check back later</h2>");
};

$(document).ready(function(){
  tripsTemplate = _.template($('#trips-template').html());
  var urlTrips = "https://trektravel.herokuapp.com/trips";

  // api request for all trips //
  $.get(urlTrips, successCallbackTrips).fail(failureCallback);

  // have to use .on because .get all trips might not be complete before document.ready (asynch issue)
  $('#trips-list').on('click', '.closed', function(event) {
    event.preventDefault();
    // scope/context/boundaries for searching through with selectors
    var scope = event.target.parent;

    var urlTrip = urlTrips + "/" + event.target.dataset.id
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);
  });

  $('#trips-list').on('click', '.open', function(event){

    $('#tripDetails-' + event.target.dataset.id ).slideToggle();
  });

  $('#trips-list').on('submit', 'form', function(event) {
    event.preventDefault();
    // console.log("your in the submit form function");
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    // console.log(formData);

    $.post(url, formData, successCallbackReserve).fail(failureCallback);
  });
});

// add validations for forms
// add background color on header - make sure it appears cickable
// add custom searches// - drop down menus with budject, weeks, and contitent

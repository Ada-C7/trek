// $(document).foundation();
var tripsTemplate;

var successCallbackTrips = function(response){
  // var tripsTemplate = _.template($('#trips-template').html());

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

  // have to use .on because .get might not be complete before document.ready
  $('#trips-list').on('click', '.closed', function(event) {
    event.preventDefault();

    var urlTrip = urlTrips + "/" + event.target.dataset.id
    $.get(urlTrip, successCallbackTrip).fail(failureCallback);
  });

  $('#trips-list').on('click', '.open', function(event){
    $('#'+event.target.dataset.id ).toggle();
  });

  $('#trips-list').on('submit', 'form', function(event) {
    event.preventDefault();
    console.log("your in the submit form function");
    console.log(this);

    var url = $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, successCallbackReserve).fail(failureCallback);
  });
});

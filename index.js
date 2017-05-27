// Click button to show all trips
var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  tripsTemplate = _.template($('#trips-item-template').html());
  for (var i = 0; i < response.length; i ++) {
    // var trip = response[i];
    var generatedHtml = tripsTemplate({trip: response[i]});
    // append is going to cause the button to add on all the trips again every time its clicked
    $("#trips").append($(generatedHtml));
  }


};

var tripDetailCallback = function(response) {
  console.log("Success");
  console.log(response);
  var generatedHtml = tripsDetailTemplate({trip: response});
$('.vacationDetails').append($(generatedHtml));

  // $("#hideTrip").hide();

};

function hideTripDetails() {
  // $("#hideTrip").hide();
  $(".vacationDetails").hide();
}

var failureCallback = function() {
  console.log("Nope");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback)
};

var clickHandlerDetails = function(event) {
  // clear the "All Trips" list
  // $("#trips").empty();
  // make API call for specific id (id passed from button)

  $.get(url + '/' + this.id, tripDetailCallback).fail(failureCallback)
  // render template
  console.log("hi");
};


// Not sure if I need a click handler for the hide button?


// to get around scope
var tripsTemplate;
var tripsdetailTemplate;

$(document).ready(function() {
  tripsTemplate = _.template($('#trips-item-template').html());
  tripsDetailTemplate = _.template($('#trips-detail-template').html());

  $('#load').click(clickHandler);


  // $('.button.trip-detail').click(clickHandlerDetails);

  $("body").on('click', ".button.trip-detail", clickHandlerDetails);

  // $(document).ready(function() {
  //   tripsDetailTemplate = _.template($('#trips-detail-template').html());
  // });



});

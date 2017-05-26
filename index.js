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

  tripsDetailTemplate = _.template($('#trips-detail-template').html());

};

var failureCallback = function() {
  console.log("Nope");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback)
};

var clickHandlerDetails = function(event) {
  // clear the "All Trips" list
  $("#trips").empty();
  // make API call for specific id (id passed from button)
  // render template
  console.log("hi");
};

// to get around scope
var tripsTemplate;
var tripsdetailTemplate;

$(document).ready(function() {
  tripsTemplate = _.template($('#trips-item-template').html());

  $('#load').click(clickHandler);
  $('.button.trip-detail').click(clickHandlerDetails);

  // trying to select class
  // $(".button.trip-detail").on('click', function(){
  //  console.log("yo");
});

  // $(document).ready(function() {
  //   tripsDetailTemplate = _.template($('#trips-detail-template').html());
  // });
});

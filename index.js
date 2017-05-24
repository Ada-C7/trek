
var url_all_trip = "https://trektravel.herokuapp.com/trips";


$(document).ready(function() {
  $('#load').click(allTripsClickHandler);
  // checkIfTableEmpty();
  checkIfErrorsEmpty();
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

  var id = response.id;
  $('form').attr('action','https://trektravel.herokuapp.com/trips/' + id + '/reserve');
  //
  // $('form').attr('action', function(i, v) {
  //   return v + id;
  //   console.log(v);
  // });


};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<p>AJAX request failed! Check your Internet connection</p>");
};




var checkIfTableEmpty = function(){
  // console.log($('#trips-list').html());
  if (!$('#trips-list').html().includes("td")){
    $('#trips-list-table').hide();
  }
};



var checkIfErrorsEmpty = function(){
  if ($('#errors').html() == ""){
    $('#errors-block').hide();
  }
};

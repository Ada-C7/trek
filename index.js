var baseURL = " https://trektravel.herokuapp.com/trips";

$(document).ready(function(){
  $("#load").on('click', clickAllTrips);
  $(".trips-list").on('click', "tr", function()
    {
      var id = $(this).attr("id");
      console.log(id);
      clickShowTrip(id);
    }  );
});


var clickAllTrips = function(){
    $("#show-trip").empty();
    $("#messages").empty();
    $.get(baseURL, successAllTrips).fail(failureCallback);
  };

var clickShowTrip = function(tripID) {

  var showTripURL = baseURL + "/" + tripID;
  $.get(showTripURL, successShowTrip).fail(failureCallback);
};

var clickReserveTrip = function(tripInfo) {
  console.log(tripInfo);//submit button to do AJAX post
  //https:trektravel.herokuapp.com/trips/1/reserve
  //accepted params: name, age, email
};


var successShowTrip = function(response) {
    $("#trips-list-header").empty();
    $("#trips-list-body").empty();

    var target = $('#show-trip');
    target.empty();
    keyNames = Object.keys(response);
    var showTripTemplate = _.template($('#show-trip-template').html());

    var generatedTripHTML = showTripTemplate({data: response, names: keyNames});
    target.append($(generatedTripHTML));
    console.log(keyNames);
    console.log(response);

    //form corresponds to an html tag - submit is the event handler for the submit button
    $('form').submit(function(e) {
      e.preventDefault(); //prevent default submit action
      var url = $(this).attr("action")+ response.id +"/reserve";
      var formData = $(this).serialize();
      console.log("form data = ", formData);
      $.post(url, formData, function(response){
        $('#messages').html('<p> Trip reserved! </p>');
        console.log(response);
      }).fail(function(){
        $("#message").html("<p>Faliure!</p>");
      });
  });
};

//only works for trip-list class. how make it work for all the classes (details and reserve)?
var successAllTrips = function(response) {
  $("#show-trip").empty();

  //fill in the headers with the template
  var tripHeaders = Object.keys(response[0]);
  var targetHeaders = $('#trips-list-header');
  var tripHeaderTemplate = _.template($('#trips-header-template').html());
  var generatedHeaderHTML = tripHeaderTemplate({header: tripHeaders});
  targetHeaders.append($(generatedHeaderHTML));

  console.log("Success!");
  console.log(response);

  var targetTripList = $("#trips-list-body");
  var listTemplate = _.template($('#trips-list-template').html());

  response.forEach(function(trip) {
    var generatedHTML = listTemplate({data: trip});
    targetTripList.append($(generatedHTML));
  });
};

var failureCallback = function() {
  $("#errors").html("<h4>TREK request failed!</h4>");
};

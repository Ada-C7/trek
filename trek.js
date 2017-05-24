var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log("success!");
  console.log(response);

  var triplate = _.template($("#trip-list-template").html());
  for (var i = 0; i < response.length; i++ ) {
    var generatedHtml = tripTemplate({
      trip: response[i]
    });

    $("#trip-list").append($(generatedHtml));
  };
};

var successCallbackTrip = function(response) {
  console.log("Success! for indiv trip");
  console.log(response);
  //add code here
  var indivTripTemplate = _.template($("trip_template").html());
  var generatedHtml = indivTripTemplate({
    indivTrip: response
  });

  $("trip-info-indv").append($(generatedHtml));
};

var failureCallback = function() {
  console.log("Didn't work :( ");
  $("errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function() {
  $.get(url, successCallback).fail(failureCallback);
};

var clickHandlerTrip = function(event){
  var id = $(this).attr("trip-tripid");
  var tripUrl = url + "/" + id;
  $.get(tripUrl, successCallbackTrip).fail(failureCallback);
};

$(document).ready(function() {

//associate the click handler
$("#load").click(clickHandler);

$("#trip-list")on("click", "button#seeTrip", clickHandlerTrip);

// $("#trips").show()

});

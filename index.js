
var buildUrl = function(option){
  return "https://trektravel.herokuapp.com/trips/" + option;
};

var categoryBuildUrl = function(option){
  return "https://trektravel.herokuapp.com/trips/" + option;
};



$(document).ready(function() {
  $("#home").click(function() {
    window.location.reload(true);
  });

  $("#button").click(tripsClickHandler);

  $(".category-form").submit(function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    var urlArry = formData.split("=")
    var url = buildUrl(urlArry[0]+"?query="+urlArry[1]);
    $.get(url, tripsSuccessCallback).fail(failureCallback);
  });

  $("#create_trip").click(createTripClicHandler);
});

var createTripClicHandler = function(){
  $("#display").empty();
  var createTripTemplate = _.template($("#create-trip-template").html());
  var generatedHtml = createTripTemplate({
  });
  $("#display").append($(generatedHtml));
  $("#create-trip-form").submit(function(event) {
    event.preventDefault();

    var url = $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $('#message').html("<p> New trip is created! </p>");
    })
    .fail(function(){
      $("#message").html("<p> Failed to create a trip!</p>")
    })
    $("#display").empty();
  });

}

var tripsClickHandler = function(){
  $("#display").empty();
  var url = buildUrl("");
  console.log(url);
  $.get(url, tripsSuccessCallback).fail(failureCallback);
}

var tripsSuccessCallback = function(response){
  // $(".category-form").hide();
  $('#message').empty();
  var tripsTemplate = _.template($("#trips-template").html());
  console.log(response[0]);
  for (var i = 0; i < response.length; i++) {

    var generatedHtml = tripsTemplate({
      data: response[i],
    });
    $("#display").append($(generatedHtml));

  }
  $(".trip").on("click", "button",   (function(){
    var tripId = $(this).html().replace("Detail of Trip ", "");
    var tripUrl = buildUrl(tripId);
    $.get(tripUrl, tripSuccessCallback).fail(failureCallback);
  }));

};


var tripSuccessCallback = function(response){
  var tripTemplate = _.template($("#trip-template").html());
  var generatedHtml = tripTemplate({
    data: response
  });
  $("#display").empty();
  $("#display").append($(generatedHtml));

  $("#reservation-form").submit(function(event) {
    event.preventDefault();

    var url = $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $('#message').html("<p> Reservation made! </p>");
    })
    .fail(function(){
      $("#message").html("<p> Failed to make a reservation!</p>")
    })
  });

}

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

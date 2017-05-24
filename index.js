var buildUrl = function(option){
  return "https://trektravel.herokuapp.com/trips/" + option;
};


$(document).ready(function() {
  $("#button").click(tripsClickHandler);
});


var tripsClickHandler = function(){
  $("#display").empty();
  var url = buildUrl("");
  console.log(url);
  $.get(url, tripsSuccessCallback).fail(failureCallback);
}

var tripsSuccessCallback = function(response){
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
    // console.log(tripUrl);
    $.get(tripUrl, tripSuccessCallback).fail(failureCallback);
  }));

};


var tripSuccessCallback = function(response){
  // console.log(response.id);
  var tripTemplate = _.template($("#trip-template").html());
  var generatedHtml = tripTemplate({
    data: response
  });
  // console.log("here");
  $("#display").empty();
  $("#display").append($(generatedHtml));
}

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function() {

 var url = "https://trektravel.herokuapp.com/trips";


var tripsData = [];

var successCallback = function(response) {
  // console.log("Success!");
  // console.log(response);

  for (var i = 0; i < response.length; i++) {
    tripsData.push(response[i]);
  }
  console.log("tripsDATA:"+tripsData[3]['name']);
  var tripsListTemplate = _.template($("#trips-list-template").html());


  for (var i = 0; i < tripsData.length; i++) {
      var generatedHtml = tripsListTemplate({
        data: tripsData[i]
      });
      $('#trips').append($(generatedHtml));
    }
};



var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>Could not get list of trips</h1>");
};

var clickHandler = function(event) {
  $('#trips-title').html("Which of these exciting adventures are in your future?");
  $.get(url, successCallback).fail(failureCallback);
};

$('#load-all-trips').click(clickHandler);

$("#trips").on("click", "button", function(event){
 console.log("HI!");
});


});

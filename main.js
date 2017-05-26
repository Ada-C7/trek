var url = "https://trektravel.herokuapp.com/trips";

// What do we want to happen when we get our response?
var successCallback = function(response) {
  console.log('success!');
  console.log(response);
  var tripsData = response;
  var tripsTemplate = _.template($('#trips-template').html());

  // for (var i = 0; i < tripsData.length; i++) {
  //   var generatedHtml = tripsTemplate({
  //     trip: tripsData[i]
  //   });
  //   $('#trips').append($(generatedHtml));
  //
  //     var id = tripsData[i]["id"];
  //     $(".name[data-id=" + tripsData[i]["id"] + "]").click(function() {
  //       console.log(id);
  //       $(".hello[data-id=" + id + "]").slideToggle(1000);
  //     });
  //
  // }

  $.each(tripsData, function(i) {
    var generatedHtml = tripsTemplate({
      trip: tripsData[i]
    });
    $('#trips').append($(generatedHtml));

    var id = tripsData[i]["id"];
    $(".name[data-id=" + id + "]").click(function() {
      $(".hello[data-id=" + id + "]").slideToggle("fast");
    });

  })



};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed</h1>");
};

var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
  // $(".name").click(toggleHandler)
  // $("#trips").delegate(".name", "click", function() {
  //   console.log("the click");
  //   $(".hello").slideToggle(1000);
  // });

  // console.log("ready was called");
  //
  // $(".name").click(function() {
  //   console.log("the click");
  //   $("#hello").slideToggle(1000);
  // });
});

var tripUrl = "https://trektravel.herokuapp.com/trips/";

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
      console.log("clicked on a trip");
      $.get((tripUrl + id), successTripCallback).fail(failureCallback);
      console.log("got");
    });

  })

};

var successTripCallback = function(response) {
  console.log('success!');
  console.log(response);
  var singleTripData = response;
  var singleTripTemplate = _.template($('#single-trip-template').html());
  var singleGeneratedHtml = singleTripTemplate({
    singleTrip: singleTripData
  });
  $('#single-trip').html($(singleGeneratedHtml));
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed</h1>");
};

var clickHandler = function(event) {
  $.get(tripUrl, successCallback).fail(failureCallback);
};


$('form').submit(function(event) {

  event.preventDefault();

  var url = $(this).attr("action");
  var formData = $(this).serialize();

  $.post(url, formData, function(response){
    $('#reservation').html('<p> Reservation confirmed! </p>');
    console.log(response);
  }).fail(function(){
    $('#reservation').html('<p>Unable to save reservation</p>');
  });
});

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

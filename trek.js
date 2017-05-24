$(document).ready(function() {
  var tripUrl = 'https://trektravel.herokuapp.com/trips/';

  var allTrips = function(response) {
    console.log("Success!")
    console.log(response);
    //new template, new event handler (get request to specific trip) from there it will append the template t the slide thing


    var tripTemplate = _.template($('#trips-template').html());
    for (var i = 0; i < response.length; i++) {
      var generatedHtml = tripTemplate ({
        data: response[i]
      });
      $("#trips-list").append(generatedHtml);
    }


    $(".flip").click(function() {
      $(".info").slideToggle("slow");
    });
  };


  var failureCallback = function() {
    console.log("Didn't work");
    $("#errors").html("<h1>AJAX request failed!</h1>");
  }


  var clickHandler = function() {
    $.get(tripUrl, allTrips) //passing a function around as a variable (to be invoted later.) when the request comes in, that is when it willb e called.
  };
  //as soon as the document is ready, load the page

  $('#load').click(clickHandler);
});





//////////////////////////////////////////////////////
// var successCallback = function(response) {
//   console.log("Success!")
//   console.log(response);
//
//   var target = $('#trips');
//   // var names = $('.trip_name')
//   // var trip_details = $('.trip_details')
//   for (var i = 0; i < response.length; i++) {
//     trip = response[i];
//     target.append("<h2>" + trip['name'] + "</h2>" +
//     "<ul>" + "<li>" + "Continent: " + trip['continent'] + "</li>" +
//     "<li>" + "Duration: " + trip['weeks'] + " weeks" + "</li>" + "</ul>");
//   }
// }
// //the trip name I need to link to by id
// var failureCallback = function() {
//   console.log("Didn't work");
//   $("#errors").html("<h1>AJAX request failed!</h1>");
// }
//
// var clickHandler = function() {
//   $.get(trip_url, successCallback) //passing a function around as a variable (to be invoted later.) when the request comes in, that is when it willb e called.
// };
// //as soon as the document is ready, load the page
// $(document).ready(function() {
//   $('#load').click(clickHandler);
// });

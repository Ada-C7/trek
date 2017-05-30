$(document).ready(function() {
  var tripUrl = 'https://trektravel.herokuapp.com/trips/';

  var allTrips = function(response) { // callback function
    console.log("Success! in the allTrips function")
    console.log(response); //showing what the response from the api is in the console

    var tripTemplate = _.template($('#trips-template').html()); // the template is connected/generates html in the first trips template
    for (var i = 0; i < response.length; i++) { //going through the response
      var generatedHtml = tripTemplate ({
        data: response[i] //so data is each trip info
      });

      $("#trips-list").append(generatedHtml); //generate the html in the trips-template script and pin it to the trips-list div
      $("#test").hide();
    }


  };

  var trip = function(response) { //another callback function
    console.log("Success in the trip function! (indvidual trip info)");
    console.log(response); // shows the api response
    var tripTemplate = _.template($('#trip-dets').html());
    //here you don't need to iterate because now the response is just one object
      var generatedHtml = tripTemplate ({
        data: response
      });
      console.log("obj id: " + "#trip-" + response.id);

      $("#trip-" + response.id).append(generatedHtml); //need to make a specific trip append to the specific name
      $(".flip").click(function() {
        $(".info").slideToggle("slow");
      });

  };


  $("form").submit(function(event) {
    event.preventDefault();

    var url = $(this).attr("action");
    var formData = $(this).serialize();
    console.log(formData)

    $.post(url, formData, function(response){
      console.log(response);
    });
  });

  var clickHandler = function() {
    $.get(tripUrl, allTrips) //passing a function around as a variable (to be invoked later.) when the request comes in, that is when it willb e called.
  };

  $('#trips-list').on('click', '.trip', function(event){
    console.log("success");
    console.log(event);
    console.log(this);

    var indvTrips = tripUrl + event.target.dataset.id //this is similar to going into a nested hash or array
    //go into event, then to target, then to dataset, then get the id.

    $.get(indvTrips, trip) //event is just a nasty large object
  });


  var failureCallback = function() {
    console.log("Didn't work, in the failure callback");
    $("#errors").html("<h1>AJAX request failed!</h1>");
  }




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

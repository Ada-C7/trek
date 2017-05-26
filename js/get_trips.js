$(document).ready(function() {

  var listAllTrips = function(response) {
    response.forEach(function (each_trip) {
      //make rows with using trip template
      console.log(response)
      var tripHtml = tripTemplate({trip: each_trip}); //passing the whole trip obhect
      $("#trip_table").append($(tripHtml));
    }); //3
  };
    var failureListTrips = function() {
      console.log("Didn't work :(");
      $("#errors").html("<h1>AJAX request failed!</h1>");
    };//4

    var getAllTrips = function(event) {
      //$.get(url, successCallback);
      $.get("https://trektravel.herokuapp.com/trips", listAllTrips).fail(failureListTrips);
    };//2

    var tripTemplate = _.template($('#trips').html());
    $('#load').click(getAllTrips); //1

  });

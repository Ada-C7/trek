
$(document).ready(function() {
  // Associate the click handler

  var successCallback = function(response) {
    response.forEach(function (trip) {
      //make rows with using trip template
      var tripHtml = tripTemplate({trip: trip}); //passing the whole trip obhect
      $("#trip_table").append($(tripHtml));
    });
    // console.log("About to clear trip details");
    $("#trip_details").html("");
  }; //only interate if the response is successful

  var showDetails = function(trip) {
    var tripIdHtml = tripIdTemplate({trip: trip});

    //passing the whole trip object
    $("#trip_details").append($(tripIdHtml));
    $("#trip_table").html("");
    $('#reservation-form').submit(clickonReserve);
  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h1>AJAX request failed!</h1>");
  };

  var clickHandler = function(event) {
    //$.get(url, successCallback);
    $.get("https://trektravel.herokuapp.com/trips", function(response){
      successCallback(response);
    }).fail(failureCallback);
  };

  var clickonId = function(event) {
    var target = $(event.target).html();
    $.get("https://trektravel.herokuapp.com/trips" + "/"+ target, showDetails).fail(failureCallback);
  };

  var clickonDetail = function(event) {
    var target = $(event.target).attr("data-trip-id");
    // console.log("data-trip-id")
    $.get("https://trektravel.herokuapp.com/trips" + "/"+ target, showDetails).fail(failureCallback);
  };

  var clickonReserve = function(event) {
    event.preventDefault();
    var target = $(event.target).attr("data-trip-id");
    console.log(event.target);
    var url = "https://trektravel.herokuapp.com/trips" + "/"+ target + "/" + "reserve"; // Retrieve the action from the form
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $('#message').html('<p> Your trip reserved! </p>');

      console.log(response);
    });
  };

  var tripTemplate = _.template($('#trips').html());
  $('#load').click(clickHandler);
  $('#trip_table').on('click', '.id_td', clickonId);
  $('#trip_table').on('click', '.detail', clickonDetail);

  var tripIdTemplate = _.template($('#trip_detail').html());

});

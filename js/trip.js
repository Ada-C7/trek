$(document).ready(function() {

  var showDetails = function(each_trip) {
    var tripIdHtml = tripIdTemplate({trip: each_trip});
    //passing the whole trip object
    $("#trip_details").append($(tripIdHtml));
    $("#trip_table").html("");
    // $('#reservation-form').submit(clickonReserve);
  };

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h1>AJAX request failed!</h1>");
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


  var tripIdTemplate = _.template($('#trip_detail').html());
  $('#trip_table').on('click', '.id_td', clickonId);
  $('#trip_table').on('click', '.detail', clickonDetail);

});

var urlBasic = "https://trektravel.herokuapp.com/trips";


var showPage = function(page){
  $('#list_head_of_trips').empty();
  $('#list_of_trips').empty();
  var list = document.getElementById("view_list");
  var trip = document.getElementById("trip");
  if (page === 'view_list'){
    list.style.display = "block";
    trip.style.display = "none";
  }
  if (page === 'trip'){
    list.style.display = "none";
    trip.style.display = "block";
  }
}


var successCallbackList = function(response) {
  console.log("Success!");
  console.log(response);
  showPage('view_list');

  var listHeadTemplate = _.template($('#list_head_template').html());
  $('#list_head_of_trips').html(listHeadTemplate);

  var listTemplate = _.template($('#list_template').html());
  for (var ind = 0; ind < response.length; ind++) {
    var tripResponse = response[ind]
    var generatedHtml = listTemplate({
      data: tripResponse
    });
    $('#list_of_trips').append($(generatedHtml));
  }
};


var successCallbackTrip= function(response){
  console.log("Success! for the trip");
  console.log(response);
  showPage('trip');

  var tripTemplate = _.template($('#trip_template').html());
  var generatedHtml = tripTemplate({
    data: response
  });
  $('#trip').html($(generatedHtml));
};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};


var clickHandlerList = function(event) {
  $.get(urlBasic, successCallbackList).fail(failureCallback);
};


var clickHandlerTrip = function(event) {
  var id = $(this).attr('data-tripid');
  var url = urlBasic + '/' + id;
  $.get(url, successCallbackTrip).fail(failureCallback);
}


$(document).ready(function() {
  $('#load_list').click(clickHandlerList);
  $('#list_of_trips').on('click', 'button#getTrip' ,clickHandlerTrip);
});

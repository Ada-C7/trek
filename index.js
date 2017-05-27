// GLOBAL varialbles ***************************************

var urlBasic = "https://trektravel.herokuapp.com/trips";

var ascending = {
  trip_sort: null,
  destination_sort: null,
  continent_sort: null,
  duration_sort: null
}
var listOfTrips = null;

var sortBy = null;

// HELPER functions ****************************************

var showPage = function(page){
  $('#list_head_of_trips').empty();
  $('#list_of_trips').empty();
  var list = document.getElementById("view_list");
  var trip = document.getElementById("trip");
  if (page === 'view_list'){
    list.style.display = "block";
    trip.style.display = "none";
  };
  if (page === 'trip'){
    list.style.display = "none";
    trip.style.display = "block";
  };
};


var sortNumbers = function(list, by, asc) {
  var sorted = list.sort(function(a, b) {
    if (by === "trip_sort"){ var numA = a.id, numB = b.id;};
    if (by === "duration_sort"){ var numA = a.weeks, numB = b.weeks;};
    if (numA === 0){ numA = null;};
    if (numB === 0){ numB = null;};

    if (numA === null && numB=== null){ return 0;};
    if (numA === null && numB !==null) { return 1;};
    if (numA !== null && numB ===null) { return -1;};

    if (numA !== null && numB !==null) {
      if (asc[by] === false || asc[by] === null){
        return numA - numB;
      } else {
        return numB - numA;
      };
    };
  });
  return sorted;
}


var sortStrings = function(list, by, asc){
  var sorted = list.sort(function(a,b){
    if (by === "destination_sort"){ var stringA = a.name, stringB = b.name;};
    if (by === "continent_sort"){ var stringA = a.continent, stringB = b.continent;};
    if (stringA === ""){ stringA = null;};
    if (stringB === ""){ stringB = null;};

    if (stringA === null && stringB === null){ return 0;}; //returns 0, leave a and b unchanged with respect to each other
    if (stringA === null && stringB !== null) { return 1;};
    if (stringA !== null && stringB === null) { return -1;};

    if (stringA !== null && stringB !== null) {
      if (asc[by] === false || asc[by] === null){
        if (stringA.toLowerCase() < stringB.toLowerCase()) { return -1;}; // is less than 0, sort a to a lower index than b, i.e. a comes first.
        if (stringA.toLowerCase() > stringB.toLowerCase()) { return 1;};//is greater than 0, sort b to a lower index than a
        return 0; // returns 0, leave a and b unchanged with respect to each other
      } else {
        if (stringA.toLowerCase() < stringB.toLowerCase()) { return 1;};
        if (stringA.toLowerCase() > stringB.toLowerCase()) { return -1;};
        return 0; // returns 0, leave a and b unchanged with respect to each other
      };
    };
  });
  return sorted;
};

var toggleAsc = function(by){
  if (ascending[by] === false || ascending[by] === null){
    ascending[by] = true
  } else {
    ascending[by] = false
  };
};

var resetAscending = function() {
  ascending = {
    trip_sort: null,
    destination_sort: null,
    continent_sort: null,
    duration_sort: null
  };
}





// CALLBACKS functions ****************************************



var successCallbackList = function(response) {
  console.log("Success!");
  console.log(response);
  console.log(listOfTrips === null);
  showPage('view_list');

  if (listOfTrips === null) {
    listOfTrips = sortNumbers(response, "trip_sort", ascending);
    toggleAsc("trip_sort");
  };

  if (sortBy === "trip_sort" || sortBy === "duration_sort") {
    listOfTrips = sortNumbers(listOfTrips, sortBy, ascending);
    toggleAsc(sortBy);
    sortBy = null;
  };

  if (sortBy === "destination_sort" || sortBy === "continent_sort") {
    listOfTrips = sortStrings(listOfTrips, sortBy, ascending);
    toggleAsc(sortBy);
    sortBy = null;
  };

  var listHeadTemplate = _.template($('#list_head_template').html());
  $('#list_head_of_trips').html(listHeadTemplate);

  var listTemplate = _.template($('#list_template').html());
  for (var ind = 0; ind < listOfTrips.length; ind++) {
    var tripResponse = listOfTrips[ind]
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

  var url = urlBasic + '/' + response.id + '/' + 'reserve'

  var tripTemplate = _.template($('#trip_template').html());
  var generatedHtml = tripTemplate({
    data: response,
    url: url
  });
  $('#trip').html($(generatedHtml));
};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};



// clickHANDLERS functions ****************************************

var clickHandlerList = function(event) {
  listOfTrips = null;
  resetAscending();
  $.get(urlBasic, successCallbackList).fail(failureCallback);
};


var clickHandlerSort = function(event) {
  console.log('In the clickHandlerSortfunction: ');
  console.log(ascending);
  sortBy = $(this).attr('data-sort');
  successCallbackList(listOfTrips);
  // $.get(urlBasic, successCallbackList).fail(failureCallback);
};

var clickHandlerTrip = function(event) {
  var id = $(this).attr('data-tripid');
  var url = urlBasic + '/' + id;
  $.get(url, successCallbackTrip).fail(failureCallback);
};

var clickHandlerQuery = function(event) {
  console.log('In the clickHandlerQuery');
  console.log('select: '+ $(this).attr('data-query'));
  var select = $(this).attr('data-query');
  var select_item = $(this).attr('class').split(" ")[1];
  if (select_item === 'continent') { var query = '/continent?query=' + select};
  var url = urlBasic + query;
  listOfTrips = null;
  resetAscending();
  $.get(url, successCallbackList).fail(failureCallback);
};

var makeReservation = function(event) {
  event.preventDefault();  /// VERY IMPORTANT TO INCLUDE // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
  var url = $(this).attr("action"); // Retrieve the action from the form
  var formData = $(this).serialize();
  console.log(formData);
  $.post(url, formData, function(response){
    $('#message').html('<p> You have a reservation! </p>');
    document.getElementById("form1").style.display = "none";
    console.log(response);
  }).fail(function(){
    $('#message').html('<p>Reservation Failed</p>');
  });
}; // END of "var makeReservation"







// DOCUMENT-READY functions ****************************************

$(document).ready(function() {
  $('#load_list').click(clickHandlerList);

  $('#list_of_trips').on('click', 'a.query', clickHandlerQuery);
  $('#trip').on('click', 'a.query', clickHandlerQuery);
  $('#list_of_trips').on('click', 'button#getTrip' ,clickHandlerTrip);

  $('#list_head_of_trips').on('click', 'button.sort_button' ,clickHandlerSort);

  $('#trip').on('submit', 'form' ,makeReservation);

});

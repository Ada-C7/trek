var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var target = $("#trip-list");
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    target.append("<p>" +  trip["name"] +  "</p>");
  }

};


var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function() {
  $.get(url, successCallback);
  $.get(url, successCallback).fail(failureCallback);
};



// var updateView = function() {
//
//   $('#trip-list').find('p').on('click', function(e){
//   	e.preventDefault();
//
//   	var $desc = _.template($('#trip-description').html());{
//       var tripInfoCards = "<% _.each(dataset, function(item) { %>" +
//       "<div class='studenttrip " +
//
//       "<div class='particulars'> " +
//
//       "<span class='tripName'> Name: <%= item.name%> </span>" +
//
//       "<span class='tripGrade'> Weeks: <%= item.weeks %> </span>" +
//
//       "<span class='tripCont'> Continent: <%= item.continent %> </span>" +
//
//       "</div>" +
//       "</div>" +
//       "<% }); %>";
//
//     }
// }
//
// };





$(document).ready(function() {
  $('#load').click(clickHandler); {
  };

  $('#trip-list').click(updateView); {
  };

});

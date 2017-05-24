// var url = "https://trektravel.herokuapp.com/trips";
//
//
//
// var successCallback = function(response) {
//   console.log("Success!");
//   console.log(response);
//
//   var target = $("#trip-list");
//   for (var i = 0; i < response.length; i++) {
//     var trip = response[i];
//     target.append("<p>" +  trip["name"] +  "</p>");
//   }
// };
//
//
// var failureCallback = function() {
//   console.log("Didn't work :(");
//   $("#errors").html("<h1>AJAX request failed!</h1>");
// };
//
// var clickHandler = function() {
//   $.get(url, successCallback);
//   $.get(url, successCallback).fail(failureCallback);
// };
//
//
//
//
//
// $(document).ready(function() {
//   $('#load').click(clickHandler); {
//   };
// });
//
//
//
//
// //
// //  var $trips = $("#trip-list");
// //    $("#trip-list").find('p').on('click', function(e){
// //    	e.preventDefault();

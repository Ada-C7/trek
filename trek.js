

url = "https://trektravel.herokuapp.com/trips";

// trekData = [
// {
// id: 1,
// name: "Cairo to Zanzibar",
// continent: "Africa",
// weeks: 5
// },
// {
// id: 2,
// name: "Everest Base Camp Trek",
// continent: "Asia",
// weeks: 2
// },
// {
// id: 3,
// name: "Golden Triangle",
// continent: "Asia",
// weeks: 1
// }];

var clickHandler = function(event) {
console.log(event);
$.get(url, successCallback);
 };

 var clickHandlerLocale = function(event) {
 console.log("WHATTT");
 // console.log(event);
 // $.get(url, successCallback);
  };


successCallback = function(trekData) {
  var trekTemplate = _.template($('#trek-list-template').html());
  for (var i = 0; i < trekData.length; i++) {
    var generatedHtml = trekTemplate({
      data: trekData[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function() {

$('#load').click(clickHandler);
$("#trip-list").on("click", "h2", clickHandlerLocale);

});

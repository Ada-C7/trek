

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
  console.log("CLICKHANDLER");
  console.log(event);
  $.get(url, successCallback);
 };


var clickHandlerLocale = function(event) {
 console.log("WHATTT");
 console.log(event);
  tripUrl = url + "/" + $(this).data().tripId;
  console.log(url);
 // console.log(event);
 $.get(tripUrl, localeSuccessCallback);
  };


localeSuccessCallback = function(localeData) {
    console.log("WE ARE HERE");
    var localeTemplate = _.template($('#trek-detail-template').html());
    var generatedHtml = localeTemplate({
      data: localeData
    });
    $('#trip-list').empty();
    $('#trip-list').append($(generatedHtml));
  }


successCallback = function(trekData) {
  var trekTemplate = _.template($('#trek-list-template').html());
  $('#trip-list').empty();
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
$("#trip-list").on("click", ".trek-link", clickHandlerLocale);

});

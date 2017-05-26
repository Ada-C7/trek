

url = "https://trektravel.herokuapp.com/trips";

var clickHandler = function(event) {

  var continentSelect = document.getElementById("continent");
  var selectedText = continentSelect.options[continentSelect.selectedIndex].text;
  if (selectedText != "See All") {
   continentUrl = url + "/continent?query=" + selectedText;
   $.get(continentUrl, successCallback).fail(failureCallback);
  } else {
    $.get(url, successCallback).fail(failureCallback);
  }

 };

var localeClickHandler = function(event) {
  tripUrl = url + "/" + $(this).data().tripId;
 $.get(tripUrl, localeSuccessCallback).fail(failureCallback);
  };

// var continentClickHandler = function(event) {
//   // https://trektravel.herokuapp.com/trips/continent?query=Asia
//   // "https://trektravel.herokuapp.com/trips/continent?query=Asia"
//   //
//   // $(this).data().tripId;
//  $.get(continentUrl, successCallback).fail(failureCallback);
//   };

var formClickHandler = function(e) {
  e.preventDefault();
  var url = $("form").attr("action");
  var formData = $("form").serialize();
    $.post(url, formData, function(e){
    $('#message').html('<p> Trip Reserved! </p>');
  }).fail(failureCallback);
    $("form").trigger("reset");
};

var localeSuccessCallback = function(localeData) {
    var localeTemplate = _.template($('#trek-detail-template').html());
    var generatedHtml = localeTemplate({
      data: localeData
    });
    $('#trip-list').empty();
    $('#message').empty();
    $('#trip-list').append($(generatedHtml));
  };

var successCallback = function(trekData) {
  var trekTemplate = _.template($('#trek-list-template').html());
  $('#trip-list').empty();
  $('#message').empty();
  if (trekData) {
  for (var i = 0; i < trekData.length; i++) {
    var generatedHtml = trekTemplate({
      data: trekData[i]
    });
    $('#trip-list').append($(generatedHtml));
  }
  }else {
    $('#trip-list').append("Looks like there are no trips to that continent!");
  }
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function() {
  $('#load').click(clickHandler);
  // $('#continent').click(continentClickHandler);
  $("#trip-list").on("click", ".trek-link", localeClickHandler);
  $("#trip-list").on("click", "#prevent", formClickHandler);
});

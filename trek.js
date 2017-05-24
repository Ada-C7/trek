

url = "https://trektravel.herokuapp.com/trips";

var clickHandler = function(event) {
  $.get(url, successCallback);
 };

var localeClickHandler = function(event) {
  tripUrl = url + "/" + $(this).data().tripId;
 $.get(tripUrl, localeSuccessCallback);
  };

var formClickHandler = function(e) {
  e.preventDefault();
  var url = $("form").attr("action");
  var formData = $("form").serialize();
    $.post(url, formData, function(e){
    $('#message').html('<p> Trip Reserved! </p>');
    });
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
  $("#trip-list").on("click", ".trek-link", localeClickHandler);
  $("#trip-list").on("click", "#prevent", formClickHandler);
});

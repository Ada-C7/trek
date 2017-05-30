var url = 'https://trektravel.herokuapp.com/trips';
var id;

var clearElements = function() {
  $('#trip').empty();
  $('#reserve').hide();
  $('#list').empty();
  $('#message').empty();
  $('#errors').empty();
};

var listSuccessCallback = function(response) {
  clearElements();
  console.log(response);
  console.log("list feature is working!");
  if (response === undefined) {
    $("#errors").html("<h2>Currently there are no trip packages matching your search parameter!</h2>");
  } else {
    var listTemplate = _.template($('#list-template').html());
    for (var i = 0; i < response.length; i++) {
      var generatedHtml = listTemplate({
        data: response[i]
      });
      $('#list').append($(generatedHtml));
    }
  }
};

var listClickHandler = function(e) {
  $.get(url, listSuccessCallback).fail(failureCallback);
};

var tripSuccessCallback = function(response) {
  console.log("trip detail feature working!");
  $('#trip').empty();
  var detailTemplate = _.template($('#details-template').html());
  var generatedHtml = detailTemplate({
    trip: response
  });
  $('#trip').append($(generatedHtml));
  $('#reserve').show();
};

var tripClickHandler = function() {
  id = $(this).attr('id');
  $('#list').empty();
  $.get(url + "/" + id, tripSuccessCallback).fail(failureCallback);
};

var failureCallback = function() {
  console.log("HAHA Fail :( ");
  clearElements();
  $("#errors").html("<h2>AJAX request failed!</h2>");
};


var reservationSuccessCallback = function(response) {
  $('#message').html('<p><strong> Reservation has been made!</strong></p>');
  console.log("reservation feature is working!");
};

var showFilterClickHandler = function() {
  $('#filter').show();
  $('#show-filter').hide();
  $('#hide-filter').show();
};

var hideFilterClickHandler = function() {
  $('#filter').hide();
  $('#hide-filter').hide();
  $('#continent-filter').trigger('reset');
  $('#week-filter').trigger('reset');
  $('#budget-filter').trigger('reset');
  $('#show-filter').show();
};

var filterHandler = function(that) {
  console.log($(that).attr("action"));
  var formData = $(that).serialize();
  formData= formData.split("=").join("?query=");
  console.log(formData);
  $.get($(that).attr("action") + formData, listSuccessCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#reserve').hide();
  $('#filter').hide();
  $('#hide-filter').hide();

  $('#show-filter').click(showFilterClickHandler);
  $('#hide-filter').click(hideFilterClickHandler);

  $('#load').click(listClickHandler);
  $('#list').on('click', 'a', tripClickHandler);

  $('#reserveForm').submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post($(this).attr("action") + id + "/reserve", formData, reservationSuccessCallback).fail(failureCallback);
    $('#reserveForm').trigger('reset');
  });

  $('#continent-filter').submit(function(e) {
    e.preventDefault();
    filterHandler(this);
  });

  $('#week-filter').submit(function(e) {
    e.preventDefault();
    filterHandler(this);
  });

  $('#budget-filter').submit(function(e) {
    e.preventDefault();
    filterHandler(this);
  });
});

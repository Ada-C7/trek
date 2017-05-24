var url = 'https://trektravel.herokuapp.com/trips';
var id;

var listSuccessCallback = function(response) {
  console.log("list feature is working!");
  var listTemplate = _.template($('#list-template').html());
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = listTemplate({
      data: response[i]
    });
    $('#list').append($(generatedHtml));
  }
};

var listClickHandler = function(e) {
  $('#trip').empty();
  $('#reserve').hide();
  $('#list').empty();
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
    $("#errors").html("<h1>AJAX request failed!</h1>");
  };


var reservationSuccessCallback = function(response) {
   $('#message').html('<p><strong> Reservation has been made!</strong></p>');
   console.log(response);
};

  $(document).ready(function() {
    $('#reserve').hide();
    $('#load').click(listClickHandler);
    $('#list').on('click', 'a', tripClickHandler);

    $('form').submit(function(e) {
      e.preventDefault();
      var url = $(this).attr("action") + id + "/reserve";
      var formData = $(this).serialize();
      $.post(url, formData, reservationSuccessCallback).fail(failureCallback);
      $('#reserveForm').trigger('reset');
    });
  });

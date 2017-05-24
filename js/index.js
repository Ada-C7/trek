var url = 'https://trektravel.herokuapp.com/trips';

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
    var id = $(this).attr('id');
    $('#list').empty();
    $.get(url + "/" + id, tripSuccessCallback).fail(failureCallback);
  };

  var failureCallback = function() {
    console.log("HAHA Fail :( ");
    $("#errors").html("<h1>AJAX request failed!</h1>");
  };

  $(document).ready(function() {
    $('#reserve').hide();
    $('#load').click(listClickHandler);
    $('#list').on('click', 'a', tripClickHandler);




    $('form').submit(function(e) {
      e.preventDefault();
      var url = $(this).attr("action");
      var formData = $(this).serialize();
      console.log("form data = ", formData);
      $.post(url, formData, function(response){
        $('#message').html('<h2> Reservation has been made!</h2>');
        console.log(response);
      });
    });
  });

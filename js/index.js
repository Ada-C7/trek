$(document).ready(function() {
  var tripsTemplate = _.template($('#trips-template').html());
  var tripTemplate = _.template($('#trip-template').html());
  var filterTemplate = _.template($('#filter-template').html());


  var url = 'https://trektravel.herokuapp.com/trips';

  var failCallback = function() {
    $('#trips').append('<h3>There was an error handling your request</h3>');

  }
  var singleTripCallback = function(response) {
    var generatedHTML = tripTemplate({
      trip: response
    });
    $('#trips').append($(generatedHTML));

    $('form').submit(function(e){
      e.preventDefault();

      var url = $(this).attr("action");
      var formData = $(this).serialize();

      $.post(url, formData, function(response){
        $('#message').html('<p> You have reserved this trip </p>');
        console.log(response);
      }).fail(failCallback);
    });
  };

  var successCallback = function(response) {
    if(response === undefined) {
      $('#trips').append('<h3>No Trips Were Found</h3>');
    } else {
        for (var i = 0; i < response.length; i++) {
          var generatedHTML = tripsTemplate({
            trip: response[i]
          });
          $('#trips').append($(generatedHTML));
        }

        $('a').on("click", function() {
          var id = $(this).parent().parent().attr('id');
          $("#trips").empty();
          $.get(url + "/" + id, singleTripCallback).fail(failCallback);
        });
      }

    return successCallback;
  };



  $('#all').click(function() {
      $('#trips').empty();
      $.get(url, successCallback);
  });

    $('#filter').click(function() {
      $('#trips').empty();
      var generatedHTML = filterTemplate({});
      $('#trips').append($(generatedHTML));
      $('form').submit(function(e){
        e.preventDefault();
        var url = $(this).attr("action");
        var formData = $(this).serialize();
        formData = formData.replace("%3F", "?");
        $('#trips').empty();
        $.get(url + formData, successCallback).fail(failCallback);
      });
  });






});

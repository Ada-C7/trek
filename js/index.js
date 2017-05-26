$(document).ready(function() {
  var tripsTemplate = _.template($('#trips-template').html());
  var tripTemplate = _.template($('#trip-template').html());
  var filterTemplate = _.template($('#filter-template').html());


  var url = 'https://trektravel.herokuapp.com/trips';

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
      });
    });
  };

  var successCallback = function(response) {
    if(response === undefined) {
      $('#trips').append('<p>No Trips Were Found</p>');
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
          $.get(url + "/" + id, singleTripCallback);
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
        var formData = $(this).serialize().split('&');
        for(var i = 0; i < formData.length; i++) {
          formData[i] = formData[i].replace("%3F", "?");
        }
        formData = formData.join('&');
        $('#trips').empty();
        $.get(url + formData, successCallback);
      });
  });






});

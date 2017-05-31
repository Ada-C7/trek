


var homeSuccessCallback = function(response) {
  console.log("Success");

  var homeTemplate = _.template($('#trips-template').html());

  for (var i = 0; i < response.length; i++) {
    var generatedHtml = homeTemplate({
      trip: response[i],
    });
    $('#trip-list').append(generatedHtml);
  }
  $('#trip-list').on('click', 'a', showClickHandler);
};

var showSuccessCallback = function(response) {
  var showTemplate = _.template($('#trips-show-template').html());

  var url = 'https://trektravel.herokuapp.com/trips/'+ response.id +'/reserve';

  var generatedHtml = showTemplate({
    trip: response,
    url: url
  });

  $('#trip-list').html($(generatedHtml));
  // console.log("Ha");
};

$('#trip-list').on('click', 'button', function(e) {
  e.preventDefault();

  var url = $('form').attr("action");
  var data = $('form').serialize();

  $.post(url, data, function(response) {
    alert("Trip reserved");
    $('form').empty();
  }).fail(failureCallback);
});

var failureCallback = function() {
  console.log("Didn't work:");
  $("#errors").html("<h1>Ajax request failed!</h1>");
};

var homeClickHandler = function() {
  var url = 'https://trektravel.herokuapp.com/trips';
  $.get(url, homeSuccessCallback).fail(failureCallback);
};

var showClickHandler = function() {
  var tripId = $(this).attr('id');
  var urlShow = 'https://trektravel.herokuapp.com/trips/' + tripId;
  console.log('this is the url', urlShow);
  $.get(urlShow, showSuccessCallback).fail(failureCallback);
};


$(document).ready(function() {
  $('#load').click(homeClickHandler);
});

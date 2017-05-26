


var homeSuccessCallback = function(response) {
  console.log("Success");
  // console.log(response);

  var homeTemplate = _.template($('#trips-template').html());
  // var target = $('#trips-body');
  //
  // console.log(response);
  for (var i = 0; i < response.length; i++) {
    //  console.log(response[i]);
    var generatedHtml = homeTemplate({
      trip: response[i],
    });
    $('#trip-list').append(generatedHtml);
  }
  console.log("hello from homeClickHandler");
  $('#trip-list').on('click', 'a', showClickHandler);
};

var showSuccessCallback = function(response) {
  console.log(response);

  var showTemplate = _.template($('#trips-show-template').html());

  var generatedHtml = showTemplate({
    trip: response
  });

  $('#trip-list').html($(generatedHtml));
    console.log("Ha");
};

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
    // console.log("This is " + e);
  var urlShow = 'https://trektravel.herokuapp.com/trips/' + tripId;

  console.log('this is the url', urlShow);
  $.get(urlShow, showSuccessCallback).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(homeClickHandler);
  // $('#trips-show').on('click', '.trip-link', showClickHandler);
});


//   trip = response[i];
//   var row = $('<tr></tr>');
//   var name = $('<td><a href="#" id=' + trip.id + '>' + trip.name + '</a></td>');
//   var continent = $('<td>' + trip.continent + '</td>');
//   var weeks = $('<td' + trip.weeks + '</td>');
//   row.append(name, continent, weeks);
//   target.append(row);

// $('#load').click( function() {
//   // $('#trips-body').empty();
//   // $('#load').hide();
//   $.get(url, homeSuccessCallback);
// });

// $('#trips-body').on('click', 'a', function(e) {
//   e.preventDefault();
//   $('#trips-body').show();
//   var tripUrl = $(this).attr('href');
// });

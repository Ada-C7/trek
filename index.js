var buildUrl = function() {
  return "https://trektravel.herokuapp.com/trips";
};

// var tripsTemplate = null;

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  // console.log($('#trips'));

  // var tripsTemplate = _.template($('#trips-template').html());
  // var trips = [];
  $("#trips-list").empty();
  $("#trip").empty();
  for (var i = 0; i < response.length; i++) {

    var generatedHtml = tripsTemplate({
      data: response[i]
    });

    $('#trips-list').append($(generatedHtml));
    // var name = response[i].name;
    // $('#trips-template').append("<h1>" + name + "</h1>");
  }

  // var selector =
  $(".individual-trip").click(clickHandler2);

};

var tripCallback = function(response) {
  console.log("Success!");
  console.log(response);

  $("#trips-list").empty();
  $("#trip").empty();

  var generatedHtml = tripTemplate({
    data: response
  });
  $('#trip').append($(generatedHtml));
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler2 = function() {
  // console.log(clickHandler2);

  var url2 = "https://trektravel.herokuapp.com/trips/" + this.id;
  $.get(url2, tripCallback).fail(failureCallback);
};

var clickHandler = function() {
  $.get(url, successCallback).fail(failureCallback);

  // $('.trip-name').click(clickHandler2);
};


$(document).ready(function() {
  url = buildUrl();

  $('#load').click(clickHandler);


  tripsTemplate = _.template($('#trips-template').html());
  tripTemplate = _.template($('#trip-template').html());

  // var tripsTemplate = _.template($('#trips-template').html());

});

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
  for (var i = 0; i < response.length; i++) {

    var generatedHtml = tripsTemplate({
      data: response[i]
    });

    $('#trips-list').append($(generatedHtml));
    // var name = response[i].name;
    // $('#trips-template').append("<h1>" + name + "</h1>");
  }

};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function() {
  $.get(url, successCallback).fail(failureCallback);
};


$(document).ready(function() {
    url = buildUrl();

    $('#load').click(clickHandler);

    tripsTemplate = _.template($('#trips-template').html());

    // var tripsTemplate = _.template($('#trips-template').html());

});

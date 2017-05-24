var buildUrl = function() {
  return "https://trektravel.herokuapp.com/trips";
};


var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  // console.log($('#trips'));


  // var trips = [];
  for (var i = 0; i < response.length; i++) {
    var tripsTemplate = _.template($('#trips-template').html());

    var generatedHtml = tripsTemplate({
      data: response[i]
    });

    $('#trips-list').append($(generatedHtml));
    // var name = response[i].name;
    // $('#trips-template').append("<h1>" + name + "</h1>");
  }


//   for (var i = 0; i < todoData.length; i++) {
//   var generatedHtml = todoTemplate({
//     data: todoData[i]
//   });
//   $('#todo-list').append($(generatedHtml));
// }

//   for (var i = 0; i < todoData.length; i++) {
//   var generatedHtml = todoTemplate({
//     data: todoData[i]
//   });
//   $('#todo-list').append($(generatedHtml));
// }


};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};


$(document).ready(function() {
    var url = buildUrl();

    $.get(url, successCallback).fail(failureCallback);

    tripsTemplate = _.template($('#trips-template').html());

    // var tripTemplate = _.template($('#trips-template').html());
});

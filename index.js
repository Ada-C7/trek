var buildUrl = function(option){
  return "https://trektravel.herokuapp.com/trips/" + option;
};


$(document).ready(function() {
  // var tripsTemplate = _.template($('#trips-template').html());
  $('#button').click(clickHandler);
  // console.log(tripsTemplate);
});

//
var clickHandler = function(){
  var url = buildUrl("");
  console.log(url);
//
  $.get(url, successCallback).fail(failureCallback);
//
}
//
var successCallback = function(response){
  var tripsTemplate = _.template($('#trips-template').html());
  console.log(response[0]);
  for (var i = 0; i < response.length; i++) {
  var generatedHtml = tripsTemplate({
    data: response[i]
  });
  $('#all').append($(generatedHtml));
}

}
//
//
//
//
// // var buildSuccessCallback = function(wonder) {
// //   // Define the function
// //   var successCallback = function(response) {
// //     console.log("Success!");
// //     console.log(response);
// //
// //     var location = response["results"][0]["geometry"]["location"];
// //
// //     var generated_html = "";
// //     generated_html += "<li>";
// //     generated_html += wonder;
// //     generated_html += ": ";
// //     generated_html += location["lat"];
// //     generated_html += ", ";
// //     generated_html += location["lng"];
// //     generated_html += "</li>";
// //
// //     $('#wonders').append(generated_html);
// //   };
// //
// //   // Return the function, making it a closure
// //   return successCallback;
// // };
//
var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};
//
//
// // $(document).ready(function() {
// //   var tripsTemplate = _.template($('#trip-templa`te').html());
// //
// //   for (var i = 0; i < tripData.length; i++) {
// //   var generatedHtml = todoTemplate({
// //     data: todoData[i]
// //   });
// //   $('#todo-list').append($(generatedHtml));
// // }
// // });

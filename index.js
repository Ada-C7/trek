var buildUrl = function(option){
  return "https://trektravel.herokuapp.com/trips/" + option;
};


$(document).ready(function() {
  // var tripsTemplate = _.template($('#trips-template').html());
  $('#button').click(tripsClickHandler);
  // console.log(tripsTemplate);
});


var tripsClickHandler = function(){
  var url = buildUrl("");
  console.log(url);
  $.get(url, tripsSuccessCallback).fail(failureCallback);
}

var tripsSuccessCallback = function(response){
  var tripsTemplate = _.template($('#trips-template').html());
  console.log(response[0]);
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = tripsTemplate({
      data: response[i],
      tripUrl: buildUrl(response[i].id)
    });
    $('#all').append($(generatedHtml));
  }
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

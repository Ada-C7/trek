var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function (response) {
  console.log("Success!");
  var target = $("#vacations");
  for (var i = 0; i < response.length; i++) {
    var vacation = response[i];
    target.append("<li>" +  vacation.continent + ": " + vacation.name+ " (" + vacation.weeks + " weeks)" + "</li>");

  }
};

var failureCallback = function () {
  $("#errors").html("<h1> AJAX request failed! </h1>");
};


// var clickHandler = function() {
//   $.get(url, successCallback).fail(failureCallback);
//
// };

// Pretend we got this data from AJAX or something

$(document).ready(function() {
  // $.get(url, successCallback).fail(failureCallback);
  //associate the click handler
  //no guaruntee



  var trekTemplate = _.template($('#trek-item-template').html());


  var test = function (trekData)
  {
    for (var i = 0; i < trekData.length; i++) {
      console.log(trekData[i]);

      var generatedHtml = trekTemplate({
        data: trekData[i],
      });
      $('#vacations').append($(generatedHtml));
    }
  };


  $.get(url, test);
});

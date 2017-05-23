var url = 'https://trektravel.herokuapp.com/trips';

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  var target = $('#trips');

  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    target.append("<li>" + trip + "</li>");
  }
};

var failureCallback = function() {
  console.log("Didn't work: (");
  $("#errors").html("<h1>Ajax request failed!</h1>");
};

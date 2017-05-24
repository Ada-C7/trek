var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var trips = response;

  for (var i = 0; i < response.length; i ++) {
    var trip_html = "";
    trip_html += "<li>";
    trip_html += "<a href='#'>";
    trip_html +=  trips[i].id + " ";
    trip_html +=  trips[i].name + " ";
    trip_html +=  trips[i].continent + " ";
    trip_html +=  trips[i].week + " ";
    trip_html += "</a>";
    trip_html += "</li>";
    $('#trips').append(trip_html);
  }
};

var failureCallback = function() {
  console.log("Fail :(");
  $("#errors").html("<h1>Your AJAX request failed!</h1>");
};

$(document).ready(function() {
  $("#trips").toggle(); //to turn trips 'off' on load
  var url = "https://trektravel.herokuapp.com/trips";
  $("#load").click(function(event) {
    $.get(url, successCallback).fail(failureCallback);
    $("#trips").toggle();
  });
});

var successCallback = function(response) {
  console.log("Success!");
  console.log(response);

  var trips = response;

  for (var i = 0; i < response.length; i ++) {
    var trip_html = "";
    trip_html += "<li>";
    trip_html +=  trips[i]["id"] + " ";
    trip_html +=  trips[i]["name"] + " ";
    trip_html +=  trips[i]["continent"] + " ";
    trip_html +=  trips[i]["week"] + " ";
    trip_html += "</li>";
    $('#trips').append(trip_html);
  }
};

$(document).ready(function() {
  var url = "https://trektravel.herokuapp.com/trips";
  $.get(url, successCallback);
});

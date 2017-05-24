var url = "https://trektravel.herokuapp.com/trips";

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var allTrips = function(response){
  for (var i = 0; i < response.length; i++) {
    var trip = response[i];
    $("#trips").append("<li class='oneTrip' id='" + trip['id'] + "'>"  + trip['name'] + "</li>");
  }
};

var tripData = function(response){
    var generatedHtml = tripTemplate({
        trip: response
      });
      var sectionTarget = 'section#' + response['id']

      if ($(sectionTarget)[0]){
        $(sectionTarget).toggle();
      } else {
      var target = 'li#' + response['id']
      $(target).append($(generatedHtml))
    }

    console.log($('section#' + response['id']));
    console.log('section#' + response['id']);
};

var clickHandler = function(){
      tripURL = url + "/" + this.id
      console.log(this);
      $.get(tripURL, tripData).fail(failureCallback);
};

$(document).ready(function() {
  tripTemplate = _.template($('#trip-template').html());

    $.get(url, allTrips).fail(failureCallback);

    $('#trips').on('click', 'li.oneTrip', clickHandler);
});

var baseUrl = "https://trektravel.herokuapp.com/trips"

var getTrips = function() {
  $.get(baseUrl, displayTrips).fail(failureCallback);
};

var displayTrips = function(response) {
  var tripListTemplate = _.template($('#trip-list-template').html());
  $('#display').empty();
  for (var i = 0; i < response.length; i++) {
    response[i]["days"] = response[i].weeks * 7;
    response[i]["image"] = chooseImage();
    var generatedHtml = tripListTemplate({
      data: response[i]
    });
    $('#display').append(generatedHtml);
  }
};

var getOneTrip = function() {
  $.get(baseUrl + "/" + this.id, displayOneTrip).fail(failureCallback);
};

var displayOneTrip = function(response) {
  var showTripTemplate = _.template($('#show-trip-template').html());
  $('#display').empty();
  response["days"] = response.weeks * 7;
  response["cost"] = response.cost.toFixed(2);
  var generatedHtml = showTripTemplate({
    data: response
  });
  $('#display').append(generatedHtml);
  $('form').submit(reserveTrip);
}

var reserveTrip = function(event) {
  event.preventDefault();
  var url = $(this).attr("action");
  var formData = $(this).serialize();
  $.post(url, formData, function(response) {
    $("#message").html("<p>Trip successfully reserved with confirmation #" + response.id + "</p>");
  }).fail(failureCallback);
};

var failureCallback = function() {
  $("#message").html("<h4>Alas, your request could not be completed.</h4>");
};

var chooseImage = function() {
  var options = [
    "https://cdn.pixabay.com/photo/2016/04/05/11/04/nepal-1309205_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/06/17/18/45/chile-1463830_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/28/23/10/mosque-615415_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/10/22/17/46/scotland-1761292_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/10/09/02/26/beef-192976_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/06/23/51/frankfurt-1804481_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/01/13/01/36/bagan-1137015_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/05/05/02/40/jetty-1373173_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/07/02/10/10/cinque-terre-828614_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/10/21/09/25/sunset-1757593_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/03/07/01/03/escalante-662636_1280.jpg",
    "https://cdn.pixabay.com/photo/2010/12/23/12/58/horseshoe-bend-4040_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/10/10/14/44/train-1728537_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/09/15/01/57/chiang-mai-1670926_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/08/26/13/09/panorama-427929_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/05/28/20/30/city-114290_1280.jpg"
  ]
  var randomPic = Math.floor(Math.random() * options.length);
  return options[randomPic];
}

$(document).ready(function() {
  $('#seeTrips').click(getTrips);

  $(document).on('click', '.trip', getOneTrip);

});

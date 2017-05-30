

var buildUrl = function(option){
  return "https://trektravel.herokuapp.com/trips/" + option;
};

$(document).ready(function() {
  tripsClickHandler();
  $("#home").click(function() {
    window.location.reload(true);
  });

  $("#button").click(tripsClickHandler);
  $("#create_trip").click(createTripClickHandler);


  // ///============= Using Form instead of Dropdown menu================
  // $(".category-form").submit(function(e){
  //   e.preventDefault();
  //   var formData = $(this).serialize();
  //   var urlArry = formData.split("=")
  //   var url = buildUrl(urlArry[0]+"?query="+urlArry[1]);
  //   $.get(url, tripsSuccessCallback).fail(failureCallback);
  // });
  // ///==================================================================

  $("[href]").on("click", function(){
    var category = $(this).attr("data-category");
    if (category == "budget"){
      var url = "budget?query=" + $(this).html();
    } else if (category == "weeks"){
      var url = "weeks?query=" + $(this).html();
    } else {
      var url = "continent?query=" + $(this).html();
    }
    categoryClickHandler(url);
  });
  //
});

var categoryClickHandler = function(data){
  $("#display").empty();
  $("#options").empty();

  var url = buildUrl(data)
  // console.log(url);
  $.get(url, tripsSuccessCallback).fail(failureCallback);
}

var tripsClickHandler = function(){
  $("#display").empty();
  var url = buildUrl("");
  // console.log(url);
  $.get(url, tripsSuccessCallback).fail(failureCallback);
}

var displayTrips = function(data){
  var tripsTemplate = _.template($("#trips-template").html());

  for (var i = 0; i < data.length; i++) {
    var generatedHtml = tripsTemplate({
      data: data[i],
    });
    $("#display").append($(generatedHtml));
  }
};

var tripClick = function(){
  $(".trip").on("click", (function(){
    var tripId = $(this).find("#trip-id").html().replace("<strong> id: </strong>", "");
    var tripUrl = buildUrl(tripId)
    $.get(tripUrl, tripSuccessCallback).fail(failureCallback);
  }));
}

var tripsSuccessCallback = function(response){
  // $(".category-form").hide();  // For using forms for categories instead
  $('#message').empty();
  if (response != null){
    $("#options").empty();
    var sortedResponse = response;
    displayTrips(sortedResponse);

    if (response[0].cost != null){
      $("#options").append("<section><button id='sort-budget' class='category-button'> Sort by Budget </button></section>");
      $("#sort-budget").on("click", function(){

        sortedResponse = _.sortBy( response, "cost")
        $("#display").empty();

        displayTrips(sortedResponse);
        tripClick();
      })
    }
    if (response[0].weeks != null){

      $("#options").append("<section><button id='sort-length' class='category-button'> Sort by Length </button></section>")

      $("#sort-length").on("click", function(){

        sortedResponse = _.sortBy( response, "weeks")
        $("#display").empty();
        displayTrips(sortedResponse);
        tripClick();
      })
    }

  } else {
    $("#message").html("<p> No trips to show! </p>");
  };

  tripClick();

};



var tripSuccessCallback = function(response){
  $("#options").empty();
  var tripTemplate = _.template($("#trip-template").html());
  var generatedHtml = tripTemplate({
    data: response
  });
  $("#display").empty();
  $("#display").append($(generatedHtml));

  $("#reservation-form").submit(function(event) {
    event.preventDefault();

    var url = $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $("#message").html("<h2> Reservation made! </h2>");
      $("html, body").animate({
        scrollTop: 0
      }, 500);
      setTimeout(function(){
        tripsClickHandler()
      },2000);
    })
    .fail(function(){
      $("#message").html("<p> Failed to make a reservation!</p>")
    })
  });

}

var createTripClickHandler = function(){
  $("#display").empty();
  $("#message").empty();
  var createTripTemplate = _.template($("#create-trip-template").html());
  var generatedHtml = createTripTemplate({
  });
  $("#display").append($(generatedHtml));
  $("#create-trip-form").submit(function(event) {
    event.preventDefault();

    var url = $(this).attr("action");
    var formData = $(this).serialize();

    $.post(url, formData, function(response){
      $("#message").html("<h2> New trip is created! </h2>");
      $("html, body").animate({
        scrollTop: 0
      }, 500);
      setTimeout(function(){
        tripsClickHandler()
      },1500);

    })
    .fail(function(){
      $("#message").html("<p> Failed to create a trip!</p>")
    })
    $("#display").empty();
  });

}

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

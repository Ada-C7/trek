
$(document).ready(function() {
  // Associate the click handler

  var successCallback = function(response) {
    console.log(response);
    response.forEach(function (trip) {
      //make rows with using trip template
      var tripHtml = tripTemplate({trip: trip}); //passing the whole trip obhect
      $("#trip_table").append($(tripHtml));
    });
  }; //only interate if the response is successful

  var failureCallback = function() {
    console.log("Didn't work :(");
    $("#errors").html("<h1>AJAX request failed!</h1>");
  };

  var clickHandler = function(event) {
    console.log("aaaa");
    //$.get(url, successCallback);
    $.get("https://trektravel.herokuapp.com/trips", function(response){
      successCallback(response);
    }).fail(failureCallback);
  };

  // var contextHandler = function(event) {
  //   var target = $(event.target).html();
  //   console.log(target);
  //   $.get("https://trektravel.herokuapp.com/trips" + "/"+ target, function(response){
  //     console.log(response);
  //     successCallback_1(response);
  //   }).fail(failureCallback);
  //
  // };

  var tripTemplate = _.template($('#trips').html());
  $('#load').click(clickHandler);
  // $('#trip_table').on('click', '.id_td', contextHandler);

});

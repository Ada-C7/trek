


$(document).ready(function(){
  var urlTrips = "https://trektravel.herokuapp.com/trips";
  var tripsTemplate = _.template($('#trips-template').html());

  var successCallback = function(response){
    console.log("success");
    console.log(response)

    for (var i = 0; i < response.length; i++){
      var generateHTML = tripsTemplate({
        trip: response[i]
      });
      $('#trips-list').append($(generateHTML));
    };
  };

  // $('link').onClick(function(event){

  // });

  $.get(urlTrips, successCallback)
});

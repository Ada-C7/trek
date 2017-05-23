$(document).ready(function(){
  var urlTrips = "https://trektravel.herokuapp.com/trips";

  var successCallback = function(response){
    console.log("success");
    console.log(response)
    var target = $('#trips-list')
    for (var i = 0; i < response.length; i++){
      target.append( '<h3>' + response[i]['name'] + '</h3>' );
    }

  };

  $.get(urlTrips, successCallback)

});

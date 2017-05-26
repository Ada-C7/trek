
var hideItem = function (itemId, targetId){
  $(targetId).click(function(){
    console.log('here');
  });
};

$(document).ready(function() {
  var tripTemplate = _.template($('#trip-template').html());
  var aTripTemplate = _.template($('#single-trip-template').html());

  var successCallback = function (response) {
    var allTrips = [],
    nameId = '' ,
    linkId = '' ;
    for (var i = 0; i < response.length; i++) {
      if (Object.values(response[i]).includes(null) === false  ){
        var tripDetails = response[i];


        allTrips.push(tripDetails);
      }else {continue;}
    }

    for (var j = 0; j < allTrips.length; j++){
      var aTrip = tripTemplate({
        data: allTrips[j]
      });
      linkId = 'details' + j,
      nameId = 'trip' + j;


      $('#please').append(aTrip);

      $('a.tripName:last').attr("id", nameId).attr("href",linkId);
      console.log(linkId);

      $(nameId).click(function (){
      });
        // hideItem(linkId, nameId);
      }
  };
  $('#all-trips').click( function (event){
    $.get('https://trektravel.herokuapp.com/trips', successCallback);
  });
});

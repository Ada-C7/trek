
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

      $('#mainView').append(aTrip)

      $('a.tripName:last').attr("id", allTrips[j].id).attr("href",'#' + linkId);

      }
    };

    var showTrip = function(response) {
      var showTrip = aTripTemplate({
        data: {
          id: response.id,
          name: response.name,
          cost: response.cost,
          weeks: response.weeks,
          continent: response.continent,
          category: response.category,
          about: response.about
        }
      });
            console.log(showTrip);
            // this is where I put the individual trips
      $('#mainView').html(showTrip);
    };


    $('#all-trips').click( function (event){
      $.get('https://trektravel.herokuapp.com/trips', successCallback);
    });
// 
    $('body').on ('click','a.tripName', function(event){
      var  id = $(this).attr("id");
      $.get(('https://trektravel.herokuapp.com/trips/' + id), showTrip);
      // console.log(id);
    });
 $
    $('body').on ('click','a.tripName', function(event){
      $('#all-trips').text('Return to all trips')
    });
  });

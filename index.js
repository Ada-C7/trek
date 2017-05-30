
$(document).ready(function() {

  var tripTemplate = _.template($('#trip-template').html());
  var aTripTemplate = _.template($('#single-trip-template').html());
  // var resTripTemplate = _.template($('#reservation-form-templa te').html());
  // var reservationsTemplate = _.template($('#reservations-template').html());

  var url = 'https://trektravel.herokuapp.com/trips';

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

      $('#main-view').append(aTrip);
      $('a.trip-name:last').attr("id", allTrips[j].id).attr("href",'#' + linkId);
    }
    };

    // Display Reservation form
    // $('body').on ('click','#reservation-form-button', function(e){
    //   e.preventDefault();
    //   var id = $(this).attr('data-trip-id'),
    //   reserveUrl = 'https://trektravel.herokuapp.com/trips/' + id +'/reserve'
    //   resForm = resTripTemplate();
    //   console.log(id);
    //   $('#main-view').append($(resForm));
    //   $('#reservation-form').attr('action', reserveUrl);

    // $('#reservation-section').toggleClass("hidden")
    // });

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
      $('#main-view').html(showTrip);


      $('#reservation-form').submit( function(e) {
        e.preventDefault();
        var id = response.id//$('reservation-complete-button').attr('data-trip-id');
          console.log(id);

        var reserveUrl = 'https://trektravel.herokuapp.com/trips/' + id+'/reserve',
        // resForm = resTripTemplate(),
        formData = $(this).serialize();
        // reserveUrl = $(this).attr('action')
        console.log(reserveUrl);
        $.post(reserveUrl, formData, function(response){
          $('#messages').prepend("<h3> Reservation Made! </h3>");

        }).fail(function(){
          $('#messages').prepend("<h3> Reservation Failed. </h3>");
        });
      });
    };

// On Click Events

// Show All Trips
    $('#all-trips').click( function (event){
      $.get(url, successCallback);
    });

//View a single trip
    $('body').on ('click','a.trip-name', function(event){
      var  id = $(this).attr("id");
      $.get((url +'/'+ id), showTrip);

    });
 // Return to All Trips View
    $('body').on ('click','a.trip-name', function(event){
      $('#all-trips').text('Return to all trips')
    });






  });

$(document).ready(function() {

     // **************
     // TEMPLATES
     // **************

     // All Trips
     var tripsTemplate = _.template($( '#trips-template' ).html());

     // A Trip
     var tripTemplate = _.template($( '#trip-template' ).html());

     // Add a Trip
     var tripFormTemplate = _.template($( '#trip-form-template' ).html());

     // Add a Reservation
     var reservationFormTemplate = _.template($( '#reservation-form-template' ).html());

     // **************
     // GLOBAL
     // *************

     // Clear Page
     var clearPage = function() {
          $( '#trips' ).empty();
          $( '#trip' ).empty();
          $( '#tripForm' ).empty();
          $( '#reservationForm' ).empty();
     };

     // **************
     // GET ALL TRIPS
     // **************

     var url = 'https://trektravel.herokuapp.com/trips/';

     var successTrips = function( response ) {
          clearPage();
          response.reverse();
          for ( var i = 0; i < response.length; i++ ) {
               response[i]['reference'] = url + response[i].id;
               var generatedHtml = tripsTemplate({
                    trip: response[i]
               });
          $( '#trips' ).append($( generatedHtml ));
          }
          return successTrips;
     };

     var failureTrips = function() {
       $( '#errors' ).html( '<h1> Mayday! Mayday! Trips failed to load. </h1>' );
     };

     var getAllTrips = function( event ) {
          $.get( url, successTrips ).fail( failureTrips );
     };

     // **************
     // GET A TRIP
     // **************

     var href;

     var successTrip = function( response ) {
          clearPage();
          var generatedHtml = tripTemplate({
               trip: response
          });
          $( '#trip' ).append($( generatedHtml ));
     };

     var failureTrip = function() {
       $( '#errors').html( '<h1> Mayday! Mayday! Trip failed to load! </h1>' );
     };

     // ADD A TRIP

     var addTrip = function( event ) {
          clearPage();
          var generatedHtml = tripFormTemplate({
          });
          $(' #tripForm ').append($( generatedHtml ));
     }

     $( '#tripForm' ).on('submit', 'form', function( event ) {
          event.preventDefault();
          var url = $( this ).attr( 'action' );
          var formData = $( this ).serialize();

          $.post( url, formData, function( response ) {
               getAllTrips();
               $( '#messages' ).html( 'Your trip, '+ $( '#name' ).val() + ', has been added!' ).fadeOut( 9000 );
          });

          .fail( function () {
               $( '#messages' ).html( '<p> Oops. Adding your trip failed. </p>' );
          });
     });

     // ADD A RESERVATION

     var addReservation = function( event ) {
          var generatedHtml = reservationFormTemplate({
          });
          $(' #trip ').append($( generatedHtml ));
     }

     // $( '#test' ).on( 'click', '#reserve', function() {
     //      if( !confirm( 'Are you sure that you want to submit the form' ) )
     //              event.preventDefault();

          // var url = $(this).attr('action', 'https://trektravel.herokuapp.com/trips/10/reserve');
          // var formData = $( this ).serialize();
          //
          // $.post(url, formData, function(response){
          //      $('#message').html('<p> Reservation added!</p>');
          // });
     // });

     // **************
     // CLICK HANDLERS
     // **************

     // Reload Page
     $( '#reload' ).click( function() {
          location.reload();
     });

     // All Trips
     $( 'body' ).on( 'click', '.wander', function() {
          getAllTrips();
     });

     // A Trip
     $( '#trips' ).on( 'click', 'a', function(event) {
               href = $( this ).attr( 'href' );
               event.preventDefault();
               $.get( href, successTrip );
     });

     // Add a Trip
     $( '#share' ).click( addTrip );

     // Add a Reservation
     $( '#trip' ).on( 'click', '#reserve', function() {
          addReservation();
     });
});

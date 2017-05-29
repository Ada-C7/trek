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
          $( '#tripForm' ).empty();
          $( '#reservationForm' ).empty();
          $( 'article' ).remove();
          $('.secondary').hide();
     };

     // **************
     // GET ALL TRIPS
     // **************

     var option = '';
     var options = {
          'africa': 'Africa',
          'antarctica': 'Antarctica',
          'asia': 'Asia',
          'australia': 'Australia',
          'europe': 'Europe',
          'northAmerica': 'North America',
          'southAmerica': 'South America',
     };

     var url = 'https://trektravel.herokuapp.com/trips/';

     var successTrips = function( response ) {;
          clearPage();
          $('.secondary').show( 'fast');
          response.reverse();
          for ( var i = 0; i < response.length; i++ ) {
               if ( response[i].continent == options[option] )  {
                    response[i]['reference'] = url + response[i].id;
                    var generatedHtml = tripsTemplate({
                         trip: response[i]
                    });
               $( '#trips' ).append($( generatedHtml ));
               }
          }
          $( '#trips' ).prepend('<h1>' + options[option] + '</h1>');
     };

     var failureTrips = function() {
       $( '#errors' ).html( '<h1> Mayday! Mayday! Trips failed to load. </h1>' );
     };

     var getAllTrips = function( option ) {
          $.get( url, successTrips ).fail( failureTrips );
     };

     // Filter Trips
     $( '.secondary' ).hide();
     $( '.secondary' ).click( function( event ){
          event.preventDefault();
     });


     // **************
     // GET A TRIP
     // **************

     var href;

     var successTrip = function( response ) {
          clearPage();
          var generatedHtml = tripTemplate({
               trip: response
          });
          $( generatedHtml ).prependTo( '#trip' );
     };

     var failureTrip = function() {
       $( '#errors').html( '<h1> Mayday! Mayday! Trip failed to load! </h1>' );
     };

     // **************
     // ADD A TRIP
     // **************

     var addTrip = function( event ) {
          clearPage();
          var generatedHtml = tripFormTemplate();
          $(' #tripForm ').append($( generatedHtml ));
     };

     $( '#tripForm' ).on('submit', 'form', function( event ) {
          event.preventDefault();
          var url = $( this ).attr('action');
          var formData = $( this ).serialize();

          $.post( url, formData, function( response ) {
               $( '#messages' ).html( 'Your Wanderlust, '+ $( '#name' ).val() + ', has been added!' ).fadeOut( 9000 );
               getAllTrips();

          })

          .fail( function () {
               $( '#messages' ).html( '<p> Oops. Adding your trip failed. </p>' ).fadeOut( 9000 );
          });
     });


     // ADD A RESERVATION

     var addReservation = function( event ) {
          var generatedHtml = reservationFormTemplate();
          $( '#reservationForm' ).append($( generatedHtml ));
     }

     $( '#reservationForm' ).on('submit', 'form', function( event ) {
          event.preventDefault();
           $( 'form' ).attr('action', 'https://trektravel.herokuapp.com/trips/' + $('article').attr('id') + '/reserve')
           var url = $( this ).attr('action');
           var formData = $( this ).serialize();

          $.post( url, formData, function( response ) {
               $( '#messages' ).html( 'Thanks, ' + $( '#name' ).val() + '! Your reservation has been recorded!' ).fadeOut( 9000 );
          })

          .fail( function () {
               $( '#messages' ).html( '<p> Oops. Adding your trip failed. </p>' ).fadeOut( 9000 );
          });
     });

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

     // Filter Trips

     $( 'summary' ).click(function( event ) {
          summary = '#' + $( event.target ).attr( 'id' )
          $( 'header' ).on( 'click', summary, function() {
               $( 'details' ).attr('open', false);
               $( this ).closest( 'details' ).attr('open', true);
          });
     });

     $( 'details'  ).click(function( event ) {
          option = $( event.target ).attr( 'id' )

          switch (true) {
               case option == 'continent':
                    break;
               case option == 'time':
                    break;
               case option == 'budget':
                    break;
               default:
                    getAllTrips(option);
          }
     });

     // A Trip
     $( '#trips' ).on( 'click', 'a', function( event ) {
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

     // Cancel Reservation
     $( '#trip' ).on( 'click', '#cancel', function() {
          $( 'form' ).empty();
     });
});

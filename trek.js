
var url = 'https://trektravel.herokuapp.com/trips';

var callBack = function(response){
  // console.log('Success!');
  // console.log(response);

  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    $('#listTrips').append('<li>' + trip['name'] + '</li>');

    // if (trip['name'] === null ){
    //   break;
    // } else {
    //   $('#listTrips').append('<li>' + trip['name'] + '</li>');
    // };
  }
};

var failureCallback = function(){
  console.log("did not work :()");
  $('#errors').html("<h1>AJAX request failed!</h1>");
};

var clickHandler = function() {
  $.get(url, callBack);
  $.get(url).success(callBack).fail(failureCallback);
};

$(document).ready(function() {
  $('#load').click(clickHandler);
}); // final documento listo.


// $(document).ready(function() {
//
//   var clickHandler = function(){
//     $.get(url,
//       function(response){
//         console.log('success!');
//         console.log(response);
//
//         for (var i = 0; i < response.length; i++) {
//           trip = response[i];
//           $('#listTrips').append('<li>' + trip['name'] + '</li>');
//         }
//       })
//       .fail(function(){
//         console.log('failure');
//       })
//       .always(function(){
//         console.log('always even if we have success or failure');
//       });
//   };
//
//   $('#load').click(clickHandler);
//
// }); // final

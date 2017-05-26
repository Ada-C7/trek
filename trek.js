
var url = 'https://trektravel.herokuapp.com/trips';

var callBack = function(response){
  console.log('Success!');
  console.log(response);

  var target = $('#listTrips');
  for (var i = 0; i < response.length; i++) {
    trip = response[i];
    target.append('<li>' + trip['name'] + '</li>')
  }
};

var clickHandler = function() {
  $.get(url, callBack);
};

$(document).ready(function() {

  $('#load').click(clickHandler);

}); // final








// $.get(url,
//   function(response){
//     console.log('success!');
//     console.log(response);
//   })
//   .fail(function(){
//     console.log('failure');
//   })
//   .always(function(){
//     console.log('always even if we have success or failure');
//   });
// );

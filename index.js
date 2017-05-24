$(document).ready(function(){

$('#explore').click(indexClickHandler);
$('#trip-index').on('click', '#trip-link', showClickHandler);
});


// ~~~~~~~~~~~~~~~~~~~~~~ INDEX ~~~~~~~~~~~~~~~~~~~~~~~~ //

var indexClickHandler = function(){
     url = 'https://trektravel.herokuapp.com/trips';
    $.get(url, indexSuccessCallback).fail(failureCallback);

};


var indexSuccessCallback = function(response){

  var tripIndexTemplate = _.template($('#trip-index-template').html());

  for(var i=0;i<response.length;i++){
    var generatedHtml = tripIndexTemplate({
      trip: response[i]
    });
    $('#trip-index').append($(generatedHtml));
  }
};


var failureCallback = function(){
    $('#errors').html("<h1>Oops Something Went Wrong</h1>");
};


// ~~~~~~~~~~~~~~~~~~~~~~ SHOW ~~~~~~~~~~~~~~~~~~~~~~~~ //

var showClickHandler = function(event){

  var tripId = $(event.target)[0].getAttribute('id');

     url = 'https://trektravel.herokuapp.com/trips/' + tripId;
    $.get(url, showSuccessCallback).fail(failureCallback);

};

var showSuccessCallback = function(response){
console.log(response);
  var tripShowTemplate = _.template($('#trip-show-template').html());

    var generatedHtml = tripShowTemplate({
      trip: response
    });

    // TODO what is the difference between .append and .html
    $('#trip-index').html($(generatedHtml));
    // $('#trip-show').append($(generatedHtml));

};

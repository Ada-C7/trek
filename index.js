$(document).ready(function(){

$('#explore').click(indexClickHandler);
// $('#trip-link').click(showClickHandler);
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

};


// ~~~~~~~~~~~~~~~~~~~~~~ SHOW ~~~~~~~~~~~~~~~~~~~~~~~~ //

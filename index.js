$(document).ready(function(){
  $('#explore').click(indexClickHandler);
});


// ####################### Trip Index/List ####################### //

var indexClickHandler = function(){
  url = 'https://trektravel.herokuapp.com/trips';
  $.get(url, indexSuccessCallback).fail(failureCallback);

};


var indexSuccessCallback = function(response){

  $('#trip-index').empty();


  var tripIndexTemplate = _.template($('#trip-index-template').html());

  for(var i=0;i<response.length;i++){
    // validate data
    if(response[i] && response[i].name && response[i].continent){
      // validate data
      if(response[i].name.length > 5 && response[i].weeks > 0 && response[i].continent.length > 3){

      var generatedHtml = tripIndexTemplate({
        trip: response[i],
      });
    } 
  }
    $('#trip-index').append(generatedHtml);
  }
  $('#trip-index').on('click', '#trip-link', showClickHandler);
};


var failureCallback = function(){
  $('#errors').html("<h1>Oops Something Went Wrong</h1>");
};


// ####################### Trip Show/Details ####################### //

var showClickHandler = function(event){

  var tripId = $(event.target)[0].getAttribute('id');

  url = 'https://trektravel.herokuapp.com/trips/' + tripId;

  $.get(url, showSuccessCallback).fail(failureCallback);
};

var showSuccessCallback = function(response){

  var tripShowTemplate = _.template($('#trip-show-template').html());

  var url = 'https://trektravel.herokuapp.com/trips/'+response.id+'/reserve';

  var generatedHtml = tripShowTemplate({
    trip: response,
    url: url
  });

  // TODO what is the difference between .append and .html
  $('#trip-index').html($(generatedHtml));
  // $('#trip-show').append($(generatedHtml));

};

// ####################### Reservation ####################### //




$('#trip-index').on('click', 'button', function(e) {

  e.preventDefault();

  var url = $('form').attr("action");
  var formData = $('form').serialize();

  $.post(url, formData, function(response){

    alert("Your reservation has been requested!");
    $('form').empty();
  })
  .fail(failureCallback);
});

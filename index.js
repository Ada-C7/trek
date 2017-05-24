var trekTemplate;
var trekTemplateOne;

var trekListURL = "https://trektravel.herokuapp.com"

var successCallback = function (response) {
  for (var i = 0; i < response.length; i++) {
    var generatedHtml = trekTemplate({
      data: response[i]
    });
    $('#trek-list').append($(generatedHtml));
  }
};

var successCallbackTrek = function (response) {
  var generatedHtml = trekTemplateOne({
    data: response
  });
  $('#' + response.id).removeClass('unopened').addClass('opened');
  $('#' + response.id).append($(generatedHtml));

  $('#form' + response.id).submit(function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var formData = $(this).serialize();
    $.post(url, formData, function(response){
      $('#message' + response.id).html('<p>  Trip Reserved! </p>');
      $('#form' + response.id).hide();
    })
    .fail(function(){
      $('#message').html('<p> Trip Reservation Failed </p>');
    });
  });
}

var failureCallback = function() {
  console.log("borked");
  $('errors').html("<h1>it borked, sorry frend</h1>");
};

var clickHandler = function(id){
  $.get(trekListURL + "/trips/" + id, successCallbackTrek).fail(failureCallback);
}


$(document).ready(function() {
  trekTemplate = _.template($('#trek-template').html());
  trekTemplateOne = _.template($('#test-template').html());
  $.get(trekListURL + "/trips", successCallback).fail(failureCallback);


  $('#trek-list').on('click', '.unopened', function(event) {
    clickHandler(event.target.dataset.id);
  });

  $('#trek-list').on('click', '.opened', function(event){
    $('#about' + event.target.dataset.id).toggle();
  });
});

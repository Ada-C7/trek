//write an API call function then call it in the document.ready
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
  console.log(response.id);
  $('#' + response.id).html($(generatedHtml));
}

var failureCallback = function() {
  console.log("borked");
  $('errors').html("<h1>it borked, sorry frend</h1>");
};

var clickHandler = function(id){
  $.get(trekListURL + "/trips/" + id, successCallbackTrek).fail(failureCallback);
}

var onLoad = function() {
  $.get(trekListURL + "/trips", successCallback).fail(failureCallback);
}

$(document).ready(function() {
  trekTemplate = _.template($('#trek-template').html());
  trekTemplateOne = _.template($('#test-template').html());
  onLoad();

  $('#trek-list').on('click', 'h2', function(event) {
    $('#' + event.target.dataset.id).toggle();
    clickHandler(event.target.dataset.id);
  });
});

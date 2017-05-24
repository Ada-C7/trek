var url = 'https://trektravel.herokuapp.com/trips/';



var singleCallback = function (trekData){
  var trekTemplate = _.template($('#detailed-trip-template').html());
  
  generatedHtml = trekTemplate({  data: trekData});
  $('#trip_info').append($(generatedHtml));
};

var failureCallback = function () {
  $("#errors").html("<h1> AJAX request failed! </h1>");
};

var test = function (trekData)
{
  for (var i = 0; i < (trekData.length/2); i++) {

    var generatedHtml = treksTemplate({
      data: trekData[i],
    });
    $('#vacations').append($(generatedHtml));
  }

  $('.load').click(function(event){
    id =  this.attributes["data-trip-id"].value;
    show = url + id;
    $.get(show,singleCallback);

  });
};



$(document).ready(function() {
  var treksTemplate = _.template($('#trek-item-template').html());


  var test = function (trekData)
  {
    for (var i = 0; i < (trekData.length/2); i++) {

      var generatedHtml = treksTemplate({
        data: trekData[i],
      });
      $('#vacations').append($(generatedHtml));
    }

    $('.load').click(function(event){
      id =  this.attributes["data-trip-id"].value;
      show = url + id;
      $.get(show,singleCallback);

    });
  };

  $.get(url, test);
});

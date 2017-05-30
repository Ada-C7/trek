var url = 'https://trektravel.herokuapp.com/trips/';


var failureCallback = function () {
  $("#errors").html("<h1> AJAX request failed! </h1>");
};


$(document).ready(function() {


  var index = function (trekData)
  {
    var treksTemplate = _.template($('#trek-item-template').html());

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


  var singleCallback = function (trekData){
    var trekTemplate = _.template($('#detailed-trip-template').html());

    generatedHtml = trekTemplate({  data: trekData});

    $('#vacations').empty();
    $('#vacations').show();


    $('#vacations').append($(generatedHtml));

  };

  $('#vacations').on("click", "#index",function() {
    $('#vacations').empty();
    $('#vacations').show();
    $.get(url, index);
  });



  $.get(url, index);


});

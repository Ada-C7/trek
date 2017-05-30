var url = "https://trektravel.herokuapp.com/trips";

var successCallback = function(response) {
  console.log("Success");
  console.log(response);

  tripsTemplate = _.template($('#trips-item-template').html());
  for (var i = 0; i < response.length; i ++) {
    var generatedHtml = tripsTemplate({trip: response[i]});
    $("#trips").append($(generatedHtml));
  }

  $('#load').hide();
};

var failureCallback = function() {
  console.log("Request failed");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

var tripDetailCallback = function(response) {
  console.log("Success");
  console.log(response);
  var generatedHtml = tripsDetailTemplate({trip: response});
  $('.vacationDetails').empty().show().append($(generatedHtml));

// reservation functionality below

  $(".reserveForm").hide();

  $('.reserveForm').submit(function(e) {
    e.preventDefault();

    var postUrl = $(this).attr("action");
    var formData = $(this).serialize();
    console.log(postUrl, formData);

    $.post(postUrl, formData, function(response) {
      $('#message').html('<p>We saved you a spot!</p>');
      console.log(response);
      console.log("reservation");
    })
    .fail(function(){
      $('#message').html('<p>Reservation failed</p>');
    });
  });

};



var clickHandler = function(event) {
  $.get(url, successCallback).fail(failureCallback);
};

var clickHandlerDetails = function(event) {
  $.get(url + '/' + this.id, tripDetailCallback).fail(failureCallback)
  $('body').animate({ scrollTop: 0}, "slow");

};



function hideTripDetails() {
  $(".vacationDetails").hide();
}

function reserve() {
  $(".reserveForm").show();
}



// to get around scope
var tripsTemplate;
var tripsdetailTemplate;

$(document).ready(function() {
  tripsTemplate = _.template($('#trips-item-template').html());
  tripsDetailTemplate = _.template($('#trips-detail-template').html());

  $('#load').click(clickHandler);

  $("body").on('click', ".trip-detail", clickHandlerDetails);

});

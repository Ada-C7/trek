

url = "https://trektravel.herokuapp.com/trips";

var clickHandler = function(event) {
  $('#budgetDrop').hide();
  $('#continentDrop').hide();
  $.get(url, successCallback).fail(failureCallback);
};

var continentRadioClickHandler = function(event) {
  event.preventDefault();
  var value;
  var continentSelect = document.getElementById("continentDrop");
  console.log(continentSelect);
  console.log("IRIRIRI");
  for (var i = 0; i < continentSelect.length; i++) {
      if (continentSelect[i].type === 'radio' && continentSelect[i].checked) {
          value = continentSelect[i].value;
      }
  }
  if (value) {
     var continentUrl = (url + "/continent?query=" + value);
     $.get(continentUrl, continentRadioSuccessCallback).fail(failureCallback);
  } else {
    $('#message').html('<p> No continent selected! </p>');
    $.get(url, successCallback).fail(failureCallback);
  }
 };

 var continentClickHandler = function(event) {
  $('#continentDrop').toggle('show');
  $('#budgetDrop').hide();
 };

  var budgetClickHandler = function(event) {
   $('#budgetDrop').toggle('show');
   $('#continentDrop').hide();
    };

    var budgetSubmitClickHandler = function(event) {
      event.preventDefault();
      var budgetSelect = $("#budgetField");
      var budget = budgetSelect[0].value;
      var budgetUrl = url + "/budget?query=" + budget;
      $.get(budgetUrl, successCallback).fail(failureCallback);
    };



var localeClickHandler = function(event) {
  tripUrl = url + "/" + $(this).data().tripId;
 $.get(tripUrl, localeSuccessCallback).fail(failureCallback);
  };


var formClickHandler = function(e) {
  e.preventDefault();
  var url = $("#reserveForm").attr("action");
  var formData = $("#reserveForm").serialize();
    $.post(url, formData, function(e){
    $('#message').html('<p> Trip Reserved! </p>');
  }).fail(failureCallback);
    $("#reserveForm").trigger("reset");
};

var localeSuccessCallback = function(localeData) {
    var localeTemplate = _.template($('#trek-detail-template').html());
    var generatedHtml = localeTemplate({
      data: localeData
    });
    $('#trip-list').empty();
    $('#message').empty();
    $('#trip-list').append($(generatedHtml));
  };

var successCallback = function(trekData) {
  var trekTemplate = _.template($('#trek-list-template').html());
  $('#trip-list').empty();
  $('#message').empty();
  if (trekData) {
    for (var i = 0; i < trekData.length; i++) {
      var generatedHtml = trekTemplate({
        data: trekData[i]
      });
      $('#trip-list').append($(generatedHtml));
    }
  }else {
    $('#trip-list').append("Looks like there are no trips to that continent!");
  }
};

var continentRadioSuccessCallback = function(tData) {
  $('#trip-list').empty();
  $('#message').empty();
  var trekTemplate = _.template($('#trek-list-template').html());
  if (tData) {
    for (var i = 0; i < tData.length; i++) {
      var generatedHtml = trekTemplate({
        data: tData[i]
      });
      $('#trip-list').append($(generatedHtml));
    }
  }else {
    $('#trip-list').append("Looks like there are no trips to that continent!");
  }
};


var failureCallback = function(error) {
  if (error) {
    console.log(error);
  }
  console.log("Didn't work :(");
  $("#errors").html("<h1>AJAX request failed!</h1>");
};

$(document).ready(function() {
  $('#load').click(clickHandler);
  $('#continent').click(continentClickHandler);
  $("#budget").click(budgetClickHandler);
  $(document).on("click", "#submitBudget", budgetSubmitClickHandler);
  $(document).on("click", "#submitContinent", continentRadioClickHandler);
  $("#trip-list").on("click", ".trek-link", localeClickHandler);
  $("#trip-list").on("click", "#prevent", formClickHandler);
});

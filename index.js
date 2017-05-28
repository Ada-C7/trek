const BASEURL = 'https://trektravel.herokuapp.com/trips/';

var successTreksCallback = function(response) {
  console.log("success!");
  console.log(response);

  var treksTemplate = _.template($('#trek-list').html());

  response.forEach(function(object) {
    var genHTML = treksTemplate({
      trek: object
    });
    $('#treks').append($(genHTML));
  });

  $('button').on('click', '.button', toggleDropdown);
  $('input').on('keyup', '#myInput', filterFunction);
};

var successTrekCallback = function(response) {
  console.log("success!");
  console.log(response);

  var treksTemplate = _.template($('#show-trek').html());

  var genHTML = treksTemplate({
    trek: response
  });
  $('#treks').append($(genHTML));

  $('form').submit(signUp);
};

var successSignUpCallback = function() {
  $('#message').html("<p> You've signed up! </p>");
};

var failureCallback = function() {
  console.log("Didn't work :(");
  $("#message").html("AJAX request failed!");
};

var alwaysCallback = function() {
  console.log("always get this");
};

var getTreks = function(event) {
  var target = $('#treks');
  target.empty();

  var url = BASEURL;
  $.get(url, successTreksCallback).fail(failureCallback).always(alwaysCallback);
};

var getTrek = function(event) {
  var target = $('#treks');
  target.empty();

  var id = $(this).attr("id");
  var url = BASEURL + id;
  // console.log(url);
  $.get(url, successTrekCallback).fail(failureCallback).always(alwaysCallback);
};

var signUp = function(event) {
  event.preventDefault();
  var url = $(this).attr("action");
  // console.log(url);
  var formData = $(this).serialize();
  // console.log(formData);
  $.post(url, formData, successSignUpCallback).fail(failureCallback).always(alwaysCallback);
};

$(document).ready(function() {
  $('body').on('click', '#load-treks', getTreks);

  $('#treks').on('click', '.load-trek', getTrek);

  $('.dropdown').on('click', '.button', toggleDropdown);
  $('.dropdown-content').on('keyup', '#myInput', filterFunction);
});

// css jquery
$(function(){
    $(window).resize(function(e){
        placeFoooter();
    });
    placeFoooter();
    // hide it before it's positioned
    $('footer').css('display', 'inline');
});

function placeFoooter() {
    var windHeight = $(window).height();
    var footerHeight = $('footer').height();
    var offset = parseInt(windHeight) - parseInt(footerHeight);
    // console.log(offset);
    $('footer').css('top', offset);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
 document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
      } else {
          a[i].style.display = "none";
      }
  }
}

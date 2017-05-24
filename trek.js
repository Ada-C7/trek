var url = 'https://trektravel.herokuapp.com/trips';
var successCallback = function(response){
    console.log('Success!');
    console.log(response);
};

var clickHandler = function(){
    $.get(url, successCallback)
}
$(document).ready(function(){
    $('#load').click(clickHandler);
});

var url = 'https://trektravel.herokuapp.com/trips';

var clickHandler = function(){
    $.get(url, successCallback);
};

var successCallback = function(response){
    console.log('Success!');
    // console.log(response);

    $('#trips-list').empty();

    var tripsTemplate = _.template($('#trips-template').html());

    for(var i = 0; i < response.length; i++){
        var generatedHtml = tripsTemplate({
            trip: response[i]
        });
        $('#trips-list').append($(generatedHtml));
    }
    $('.each-trip').click(showClickHandler)
};

var showCallback = function(info){
    console.log('hi');
    var showTemplate = _.template($('#show-template').html());

    var individualTrip = showTemplate({
        trip: info
    });
    $('#show-list').append($(individualTrip));

}

var showClickHandler = function(){
    var showUrl = 'https://trektravel.herokuapp.com/trips/' + $(this).attr('id');
    $.get(showUrl, showCallback);
    $('#trips-list').empty();
};

$(document).ready(function(){
    $('#load').click(clickHandler);
});

$(document).ready(function() {
  var tripTemplate = _.template($('#todo-item-template').html());
});


// Pretend we got this data from AJAX or something
var tripData = [
  {
    name: 'Mow the lawn',
    description: 'Must be finished before BBQ on Sat afternoon',
    assignedTo: ['Kari', 'Charles']
  }, {
    title: 'Go to the Bank',
    description: 'Need to make a transfer',
    assignedTo: ['Dan', 'Jamie', 'Chris']
  }, {
    title: 'Tune the Piano',
    description: 'High C is missing or something???',
    assignedTo: ['Crystal']
  }
];

$(document).ready(function() {
  var todoTemplate = _.template($('#todo-item-template').html());

  for (var i = 0; i < todoData.length; i++) {
    var generatedHtml = todoTemplate({
      data: todoData[i]
    });
    $('#todo-list').append($(generatedHtml));
  }
});

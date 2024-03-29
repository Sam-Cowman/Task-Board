// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskFormEl = $('#taskForm');
const taskModalEl = $('#taskModal');
const addBtnEl = $('#add-btn');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return new Date().getTime()
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // use jquery to create a div and add class card 
    // what should be on the card, h tag for, create the html elements here 
    // append smaller elements to the card
    const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDescription = $('<p>').addClass('card-descr').text(task.description);
    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteProject);

  if (now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
cardBody.append(cardDueDate, cardDescription, cardDeleteBtn);
taskCard.append(cardHeader, cardBody);

return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // append smaller elements to the card 
    // get tasks from local storage 
    // empty all the divs with jquery 
    // empty the cards before adding cards 

for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createProjectCard(project));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createProjectCard(project));
    } else if (task.status === 'done') {
      doneList.append(createProjectCard(project));
    }
  }
    $("#draggable").draggable(taskFormEl);

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // need to get info for form, create a task object
    // be able to add task to task list 
    // render task list 
    event.preventDefault()
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        name: $('#taskName').val(),
        date: $('#taskDueDate').val(),
        status: 'todo',
        description: $('#taskDescription').val(),
        id: generateTaskId(),
    }
    taskList.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(taskList))
    console.log(newTask)
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) { 

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
            $("#draggable").draggable();
            $("#droppable").droppable({
                  drop: function( event, ui ) {
                    $(task)
                      .addClass( "ui-state-highlight" )
            }
            });
        

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    taskFormEl.on('submit', handleAddTask)

});


$(function () {
    $("#datepicker").datepicker();
});
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskFormEl = $("#taskForm");
const taskModalEl = $("#taskModal");
const addBtnEl = $("#add-btn");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return new Date().getTime();
}
// Todo: create a function to create a task card
function createTaskCard(task) {
  // use jquery to create a div and add class card
  // what should be on the card, h tag for, create the html elements here
  // append smaller elements to the card
  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3")
    .attr("data-taskid", task.id);
  const cardHeader = $("<div>").addClass("card-header h4").text(task.name);
  const cardBody = $("<div>").addClass("card-body");
  const cardDueDate = $("<p>").addClass("card-text").text(task.date);
  const cardDescription = $("<p>")
    .addClass("card-descr")
    .text(task.description);
  const cardDeleteBtn = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-taskid", task.id);
  cardDeleteBtn.on("click", handleDeleteTask);
    const now = dayjs()
  if (now.isSame(task.date, "day") && task.status !== 'done') {
    taskCard.addClass("bg-warning text-white");
  } else if (now.isAfter(task.date) && task.status !== 'done') {
    taskCard.addClass("bg-danger text-white");
    cardDeleteBtn.addClass("border-light");
  }
  cardBody.append(cardDueDate, cardDescription, cardDeleteBtn);
  console.log(cardBody)
  taskCard.append(cardHeader, cardBody);
  console.log(taskCard)

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // append smaller elements to the card
  // get tasks from local storage
  // empty all the divs with jquery
  // empty the cards before adding cards
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];


//   const tasks = readTasksFromStorage();

  const todoList = $("#todo-cards");
  todoList.empty();

  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();

  const doneList = $("#done-cards");
  doneList.empty();

  for (let task of taskList) {
    if (task.status === "todo") {
      todoList.append(createTaskCard(task));
    } else if (task.status === "in-progress") {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === "done") {
      doneList.append(createTaskCard(task));
    }
  }
  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // This function creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // need to get info for form, create a task object
  // be able to add task to task list
  // render task list
  event.preventDefault();
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTask = {
    name: $("#taskName").val(),
    date: $("#taskduedate").val(),
    status: "todo",
    description: $("#taskDescription").val(),
    id: generateTaskId(),
  };
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  console.log(newTask);
  $('#taskName').val('');
  $('#taskduedate').val('');
  $('#taskDescription').val('');

  renderTaskList()
  $('#taskModal').modal('hide')
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    console.log($(this))
    const taskId = $(this).attr('data-taskid')
    console.log(taskId)
taskList = taskList.filter(task => task.id != taskId)
console.log(taskList)
localStorage.setItem("tasks", JSON.stringify(taskList));
renderTaskList()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  
  // $("#draggable").draggable();
  // $(".lane").droppable({
  //   drop: function (event, ui) {
     const taskId = ui.draggable[0].dataset.taskid
     console.log(event.target.id)
     console.log(taskId)
  //   },
  // });

  // const taskId = ui.draggable.attr('data-task-id');
  
  // Get the id of the lane that the card was dropped into
  const newStatus = event.target.id.slice(0, -6);
  console.log('newStatus', newStatus);
  const taskList = JSON.parse(localStorage.getItem('tasks'))
  // Update the status of the dropped task
  for (let task of taskList) {
    if (task.id == taskId) {
      task.status = newStatus;
      console.log(typeof task.id)
      console.log(taskId)
    }
  }
  
  // Save the updated task list to localStorage
  localStorage.setItem('tasks', JSON.stringify(taskList));
  
  // Re-render the task list to reflect the changes
  renderTaskList();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  taskFormEl.on("submit", handleAddTask);
  $("#taskduedate").datepicker();
  // ? Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
  renderTaskList()
});



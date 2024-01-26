const addTaskButton = document.querySelector(".add-task-button");
const inputField = document.getElementById("taskInput");
const savedTaskContainer = document.getElementById("saved-tasks");
const seeHistoryBtn = document.querySelector(".see-history");
let tasks = [];
let deletedTasks = [];

window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("tasks");
  const storedDeletedTasks = localStorage.getItem("deletedTasks"); // Add this line

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
  if (storedDeletedTasks) {
    deletedTasks = JSON.parse(storedDeletedTasks); // Add this line
    renderDeletedTasks(); // Add this line
  }
});

const saveTask = () => {
  const taskContent = inputField.value;
  if (taskContent === "") {
    return;
  } else {
    const newTask = {
      id: Date.now(),
      title: taskContent,
      completed: false,
    };
    tasks.push(newTask);

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
  }
  inputField.value = "";
};

addTaskButton.addEventListener("click", saveTask);

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveTask();
  }
});
const renderDeletedTasks = () => {
  const deletedTaskContainer = document.getElementById("deleted-tasks");
  deletedTaskContainer.innerHTML = "";

  deletedTasks.forEach((deletedTask) => {
    const deletedTaskElement = document.createElement("li");
    deletedTaskElement.innerHTML = `${deletedTask.title} `;
    deletedTaskContainer.appendChild(deletedTaskElement);
  });
  localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
};

seeHistoryBtn.addEventListener("click", () => {
  const deletedTasksWrapper = document.querySelector(".deleted-tasks__wrapper");
  deletedTasksWrapper.classList.toggle("hidden");
});

const renderTasks = () => {
  savedTaskContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `${task.title}<button class="delete-btn" data-id="${task.id}">X</button>`;
    const deleteBtn = taskElement.querySelector(".delete-btn");
    if (task.completed) {
      taskElement.classList.add("checked");
    }
    taskElement.addEventListener("click", function () {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    deleteBtn.addEventListener("click", function () {
      const taskID = parseInt(deleteBtn.getAttribute("data-id"));
      const taskIndex = tasks.findIndex((currenttask) => currenttask.id === taskID);
      if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        deletedTasks.push(deletedTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
        renderTasks();
        renderDeletedTasks();
      }
    });
    savedTaskContainer.appendChild(taskElement);
  });
};

// const saveTask = () => {
//   const taskContent = inputField.value;
//   if (taskContent === "") {
//     return;
//   } else {
//     const newTask = {
//       id: Date.now(),
//       title: taskContent,
//       completed: false,
//     };
//     tasks.push(newTask);

//     const taskElement = document.createElement("li");
//     taskElement.innerHTML = `${taskContent}<button class="delete-btn" data-id="${newTask.id}">X</button>`;
//     const deleteBtn = taskElement.querySelector(".delete-btn");
//     deleteBtn.addEventListener("click", function () {
//       const taskID = parseInt(deleteBtn.getAttribute("data-id"));

//       const taskIndex = tasks.findIndex((task) => task.id === taskID);
//       if (taskIndex !== -1) {
//         tasks.splice(taskIndex, 1);
//         taskElement.remove();
//       }
//     });

//     savedTaskContainer.appendChild(taskElement);
//   }
//   inputField.value = "";
//   console.log(tasks);
// };

// addTaskButton.addEventListener("click", saveTask);
// inputField.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     saveTask();
//   }
// });

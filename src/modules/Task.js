export default class Task {
  tasks = [
    {
      projectName: "Create To Do App",
      name: "Create Html",
      dueDate: "2023-02-07",
      priority: "low",
    },
  ];
  popupAction = "New Task";
  activeProject = "inbox";

  constructor() {
    this.buttonTaskAdd = document.querySelector(".button-task-add");
    this.buttonTaskClear = document.querySelector(".button-task-clear");

    this.popupNameActionText = document.querySelector(".popup-name-action p");
    this.popupTaskAction = document.querySelector(".popup-task-action");
    this.popupTaskActionCancel = document.querySelector(
      ".popup-task-event-cancel"
    );
    this.taskToDo = document.querySelector(".task-to-do");
    this.popupForm = document.querySelector(".popup-task-form");
    this.projectTaskQuantity = document.querySelector(".project-task-quantity");

    this.buttonTaskAdd.addEventListener("click", this.toggleAddTask);
    this.buttonTaskClear.addEventListener("click", this.clearCompletedTask);
    this.popupTaskActionCancel.addEventListener(
      "click",
      this.removeFormListeners
    );

    this.renderTasks();
  }

  togglePopupForm() {
    this.popupTaskAction.classList.toggle("hide");
  }

  removeFormListeners = () => {
    this.popupForm.removeEventListener("submit", this.createNewTask);
    this.togglePopupForm();
  };

  toggleEditTask = () => {
    this.togglePopupForm();
    this.popupNameActionText.textContent = "Edit Task";
  };

  toggleAddTask = () => {
    this.togglePopupForm();
    this.popupNameActionText.textContent = "New Task";

    this.popupForm.addEventListener("submit", this.createNewTask);
  };

  createTaskContainer(taskName, dueDate, priority, whichProject) {
    const task = document.createElement("div");
    task.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.addEventListener("click", this.renderTasksRemaininig);
    checkbox.classList.add("task-checkbox");
    checkbox.classList.add(`${priority}`);
    checkbox.type = "checkbox";
    checkbox.name = "checkbox-task";
    checkbox.id = taskName;

    const label = document.createElement("label");
    label.htmlFor = taskName;

    const name = document.createElement("p");
    name.classList.add("task-name");
    whichProject
      ? (name.textContent = `${taskName} (${whichProject})`)
      : (name.textContent = `${taskName}`);

    const date = document.createElement("p");
    date.classList.add("task-date");
    date.textContent = `${dueDate}`;

    const editBtn = document.createElement("button");
    editBtn.classList.add("button-edit");
    editBtn.addEventListener("click", this.editTask);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button-delete");
    deleteBtn.addEventListener("click", this.deleteTask);

    task.appendChild(checkbox);
    task.appendChild(label);
    task.appendChild(name);
    task.appendChild(date);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    this.taskToDo.append(task);
  }

  addTaskToArray(activeProject, taskName, dueDate, priority) {
    const task = {
      projectName: activeProject,
      name: taskName,
      dueDate: dueDate,
      priority: priority,
    };

    this.tasks.push(task);
    console.log(this.tasks);
  }

  createNewTask = (e) => {
    e.preventDefault();
    this.popupForm.removeEventListener("submit", this.createNewTask);

    let isAlreadyExist = false;

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    this.tasks.forEach((task) => {
      if (task.name == taskName && task.projectName == this.activeProject)
        isAlreadyExist = true;
    });

    if (isAlreadyExist) return;

    this.addTaskToArray(this.activeProject, taskName, dueDate, priority);
    this.createTaskContainer(taskName, dueDate, priority);
    this.togglePopupForm();
    this.renderTasksRemaininig();
  };

  renderAllTasks() {
    let allTasks = [];

    this.tasks.forEach((task) => {
      allTasks.push(task);
    });

    console.log(allTasks);

    allTasks.forEach((task) =>
      this.createTaskContainer(
        task.name,
        task.dueDate,
        task.priority,
        task.projectName
      )
    );
  }

  renderAllTodaysTasks() {
    let todayTasks = [];
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    month >= 10
      ? (month = date.getMonth() + 1)
      : (month = `0${date.getMonth() + 1}`);
    day >= 10 ? (day = date.getDate()) : (day = `0${date.getDate()}`);

    let fullDate = `${year}-${month}-${day}`;

    this.tasks.forEach((task) => {
      if (task.dueDate == fullDate) {
        todayTasks.push(task);
      }
    });

    todayTasks.forEach((todayTask) =>
      this.createTaskContainer(
        todayTask.name,
        todayTask.dueDate,
        todayTask.priority,
        todayTask.projectName
      )
    );
  }

  renderAllWeeksTasks() {
    // let thisWeeksTasks = [];
    // const date = new Date();
    // let day = date.getDate() + 10;
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // function getWeekNumber(d) {
    //   // Copy date so don't modify original
    //   d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    //   // Set to nearest Thursday: current date + 4 - current day number
    //   // Make Sunday's day number 7
    //   d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    //   // Get first day of year
    //   var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    //   // Calculate full weeks to nearest Thursday
    //   var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    //   // Return array of year and week number
    //   return [d.getUTCFullYear(), weekNo];
    // }
    // var result = getWeekNumber(new Date());
    // console.log(result);
    // month >= 10 ? (month = date.getMonth() + 1) : (month = `0${date.getMonth() + 1}`);
    // // day >= 10 ? (day = date.getDate()) : (day = `0${date.getDate()}`);
    // let fullDate = `${year}-${month}-${day}`;
    // console.log(fullDate);
    // this.tasks.forEach((task) => {
    //   if (task.dueDate == fullDate) {
    //     thisWeeksTasks.push(task);
    //   }
    // });
    // thisWeeksTasks.forEach((thisWeeksTask) => this.createTaskContainer(thisWeeksTask.name, thisWeeksTask.dueDate, thisWeeksTask.priority));
  }

  renderTasks() {
    this.taskToDo.innerHTML = "";

    if (this.activeProject.toLocaleLowerCase() == "inbox")
      return this.renderAllTasks();
    if (this.activeProject.toLocaleLowerCase() == "today")
      return this.renderAllTodaysTasks();
    // if (this.activeProject.toLocaleLowerCase() == "this week") return this.renderAllWeeksTasks();

    let activeProjectTask = [];

    this.tasks.forEach((task) => {
      if (task.projectName == this.activeProject) {
        activeProjectTask.push(task);
      }
    });

    console.log(activeProjectTask);

    activeProjectTask.forEach((activeTask) =>
      this.createTaskContainer(
        activeTask.name,
        activeTask.dueDate,
        activeTask.priority
      )
    );
    this.renderTasksRemaininig();
  }

  deleteTask = (e) => {
    const taskName =
      e.target.parentNode.querySelector(".task-name").textContent;
    const taskDeleteIndex = this.tasks.findIndex(
      (task) => task.name == taskName
    );

    this.tasks.splice(taskDeleteIndex, 1);
    e.target.parentNode.remove();
  };

  editTask = (e) => {
    this.toggleEditTask();

    const taskName = e.target.parentNode.querySelector(".task-name");
    const dueDate = e.target.parentNode.querySelector(".task-date");
    const priority = e.target.parentNode.querySelector(".task-checkbox");

    this.popupForm.addEventListener("submit", this.changeTaskProperty, {
      once: true,
    });
  };

  renderTasksRemaininig = () => {
    const numberOfTasks = this.taskToDo.querySelectorAll(
      `.task input[name="checkbox-task"]:not(:checked)`
    ).length;
    this.projectTaskQuantity.textContent = numberOfTasks;
  };

  clearCompletedTask = () => {
    let completeTasks = [];

    const completedTasksCheckboxes = this.taskToDo.querySelectorAll(
      `.task input[name="checkbox-task"]:checked`
    );
    completedTasksCheckboxes.forEach((completeTaskcheckbox) =>
      completeTasks.push(completeTaskcheckbox.closest(".task"))
    );

    completeTasks.forEach((completeTask) => {
      const taskName = completeTask.querySelector(".task-name").textContent;
      const taskDeleteIndex = this.tasks.findIndex(
        (task) => task.name == taskName
      );
      this.tasks.splice(taskDeleteIndex, 1);
      completeTask.remove();
    });
  };
}

// const editedTaskName = document.getElementById("task-name").value;
// const editedDueDate = document.getElementById("date").value;
// const editedPriority = document.getElementById("priority").value;

// taskName.textContent = editedTaskName;
// dueDate.textContent = editedDueDate;
// priority.classList.add(editedPriority);

{
  /* <div class="task">
<input
  class="task-checkbox medium"
  type="checkbox"
  name="checkbox-task"
  id="two"
/>
<label for="two"></label>
<p class="task-name">Create CSS</p>
<p class="task-date">12/07/2023</p>
<button class="button-edit"></button>
<button class="button-delete"></button>
</div> */
}

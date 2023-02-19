export default class Task {
  tasks = [];

  popupAction = "New Task";
  activeProject = "Create To Do App";
  constructor() {
    this.buttonTaskAdd = document.querySelector(".button-task-add");
    this.popupNameActionText = document.querySelector(".popup-name-action p");
    this.popupTaskAction = document.querySelector(".popup-task-action");
    this.popupForm = document.querySelector(".popup-task-form");
    this.popupTaskActionCancel = document.querySelector(".popup-task-event-cancel");
    this.taskToDo = document.querySelector(".task-to-do");

    this.buttonTaskAdd.addEventListener("click", this.newTask);
    this.popupTaskActionCancel.addEventListener("click", this.toggleAddTask);
  }

  toggleAddTask = () => {
    this.popupForm.replaceWith(this.popupForm.cloneNode(true));
    this.popupTaskAction.classList.toggle("hide");
    this.popupNameActionText.textContent = this.popupAction;
  };

  createTaskContainer(taskName, dueDate, priority) {
    const task = document.createElement("div");
    task.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.classList.add("task-checkbox");
    checkbox.classList.add(`${priority}`);
    checkbox.type = "checkbox";
    checkbox.name = "checkbox-task";
    checkbox.id = taskName;

    const label = document.createElement("label");
    label.htmlFor = taskName;

    const name = document.createElement("p");
    name.classList.add("task-name");
    name.textContent = `${taskName}`;

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

  createNewTask = (e) => {
    e.preventDefault();

    if (!this.popupAction == "New Task") return;

    let isAlreadyExist = false;

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    this.tasks.forEach((task) => {
      if (task.name == taskName && task.projectName == this.activeProject) isAlreadyExist = true;
    });

    if (isAlreadyExist) return;

    const task = {
      projectName: this.activeProject,
      name: taskName,
      dueDate: dueDate,
      priority: priority,
    };

    this.tasks.push(task);
    this.createTaskContainer(taskName, dueDate, priority);
    this.toggleAddTask();
  };

  renderTasks() {
    this.taskToDo.innerHTML = "";
    let activeProjectTask = [];

    this.tasks.forEach((task) => {
      if (task.projectName == this.activeProject) {
        activeProjectTask.push(task);
      }
    });

    activeProjectTask.forEach((activeTask) => this.createTaskContainer(activeTask.name, activeTask.dueDate, activeTask.priority));
  }

  deleteTask = (e) => {
    const taskName = e.target.parentNode.querySelector(".task-name").textContent;
    const taskDeleteIndex = this.tasks.findIndex((task) => task.name == taskName);

    this.tasks.splice(taskDeleteIndex, 1);
    e.target.parentNode.remove();
  };

  newTask = () => {
    this.popupAction = "New Task";
    console.log(this.popupForm);
    this.toggleAddTask();
    console.log(this.popupForm);

    this.popupForm.addEventListener(
      "submit",
      () => {
        this.createNewTask(event);
      },
      {once: true}
    );
  };

  editTask = (e) => {
    this.popupAction = "Edit Task";
    this.toggleAddTask();

    const taskName = e.target.parentNode.querySelector(".task-name");
    const dueDate = e.target.parentNode.querySelector(".task-date");
    const priority = e.target.parentNode.querySelector(".task-checkbox");

    this.popupForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        const editedTaskName = document.getElementById("task-name").value;
        const editedDueDate = document.getElementById("date").value;
        const editedPriority = document.getElementById("priority").value;

        taskName.textContent = editedTaskName;
        dueDate.textContent = editedDueDate;
        priority.classList.add(editedPriority);
        this.toggleAddTask();
      },
      {once: true}
    );
  };
}

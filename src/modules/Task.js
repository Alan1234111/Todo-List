export default class Task {
  tasks = [];

  activeProject = "Create To Do App";
  constructor() {
    this.buttonTaskAdd = document.querySelector(".button-task-add");
    this.popupTaskAction = document.querySelector(".popup-task-action");
    this.popupForm = document.querySelector(".popup-task-form");
    this.popupTaskActionCancel = document.querySelector(".popup-task-event-cancel");

    this.taskToDo = document.querySelector(".task-to-do");

    this.buttonTaskAdd.addEventListener("click", this.toggleAddTask);
    this.popupForm.addEventListener("submit", this.createNewTask);
    this.popupTaskActionCancel.addEventListener("click", this.toggleAddTask);
  }

  toggleAddTask = () => {
    this.popupTaskAction.classList.toggle("hide");
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
    const editBtnImg = document.createElement("img");
    editBtn.classList.add("button-edit");
    editBtnImg.src = "img/edit-task.svg";
    editBtnImg.alt = "change task";
    editBtn.appendChild(editBtnImg);

    const deleteBtn = document.createElement("button");
    const deleteBtnImg = document.createElement("img");
    deleteBtn.classList.add("button-delete");
    deleteBtnImg.src = "img/delete.svg";
    deleteBtnImg.alt = "delete";
    deleteBtn.appendChild(deleteBtnImg);

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
}

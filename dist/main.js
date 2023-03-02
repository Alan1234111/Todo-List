/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Projects.js":
/*!*********************************!*\
  !*** ./src/modules/Projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Projects)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");



class Projects {
  projectList = ["Create To Do App", "Make a video", "Make dinner"];
  constructor() {
    this.sidebar = document.querySelector(".sidebar");
    this.btnAddProject = document.querySelector(".button-project-add");
    this.projectAddSection = document.querySelector(".popup-project-add");
    this.projectSectionInput = document.querySelector(".popup-project-input");
    this.projectSectionAddBtn = document.querySelector(".popup-button-add");
    this.projectSectionCancelBtn = document.querySelector(".popup-button-cancel");
    this.projectDeleteBtn = document.querySelector(".btn-delete-project");
    this.userProjectsList = document.querySelector(".projects-list");
    this.btnsDeafultsProjects = document.querySelectorAll(".button-deafult-project");
    this.btnsUserProjects = document.querySelectorAll(".button-project");

    // Event Listeners
    this.btnAddProject.addEventListener("click", this.toggleInputProjectAdd);
    this.projectSectionAddBtn.addEventListener("click", this.addProject);
    this.projectSectionCancelBtn.addEventListener("click", this.toggleInputProjectAdd);
    this.btnsDeafultsProjects.forEach((btn) => btn.addEventListener("click", this.changeProject));
    this.btnsUserProjects.forEach((btn) => btn.addEventListener("click", this.changeProject));
    this.projectDeleteBtn.addEventListener("click", this.deleteProject);

    // localStorage.setItem("projectList", JSON.stringify(this.projectList));
    JSON.parse(localStorage.getItem("projectList")) ? (this.projectList = JSON.parse(localStorage.getItem("projectList"))) : (this.projectList = this.projectList);
    this.renderProjects();
    this.task = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  createProjectBtn(projectName) {
    const project = document.createElement("button");
    project.classList.add("button-project");

    project.textContent = `${projectName}`;
    project.addEventListener("click", this.changeProject);

    return project;
  }

  isProjectAlreadyExist(projectName) {
    let isAlreadyExist = false;

    const btnsUserProjects = document.querySelectorAll(".button-project");

    this.btnsDeafultsProjects.forEach((btnProject) => {
      if (btnProject.textContent.toLowerCase().replace(/\s+/g, "") == projectName.toLowerCase().replace(/\s+/g, "")) {
        isAlreadyExist = true;
      }
    });

    btnsUserProjects.forEach((btnProject) => {
      if (btnProject.textContent.toLowerCase().replace(/\s+/g, "") == projectName.toLowerCase().replace(/\s+/g, "")) {
        isAlreadyExist = true;
      }
    });

    return isAlreadyExist;
  }

  addProject = () => {
    const projectName = this.projectSectionInput.value;

    if (!projectName || this.isProjectAlreadyExist(projectName)) return;

    this.userProjectsList.appendChild(this.createProjectBtn(projectName));
    this.projectList.push(projectName);

    this.toggleInputProjectAdd();
    localStorage.setItem("projectList", JSON.stringify(this.projectList));
  };

  deleteProject = () => {
    const activeProject = document.querySelector(".button-project.active");

    if (!activeProject) return;

    //Remove Project from Local

    if (JSON.parse(localStorage.getItem("projectList"))) {
      const projectName = activeProject.textContent;
      let localStorageProjects = JSON.parse(localStorage.getItem("projectList"));

      localStorageProjects.forEach((storageProject, i) => {
        if (storageProject.toLowerCase().replace(/\s+/g, "") == projectName.toLowerCase().replace(/\s+/g, "")) {
          localStorageProjects.splice(i, 1);
        }
      });

      localStorageProjects = JSON.stringify(localStorageProjects);
      localStorage.setItem("projectList", localStorageProjects);
    }

    activeProject.remove();
    const projectDeleteIndex = this.projectList.findIndex((project) => project.toLowerCase().replace(/\s+/g, "") == activeProject.textContent.toLowerCase().replace(/\s+/g, ""));
    const removeProject = this.projectList.splice(projectDeleteIndex, 1);

    this.task.removeAllTaskFromProject(removeProject[0]);
  };

  changeProject = (e) => {
    this.btnsUserProjects = document.querySelectorAll(".button-project");
    this.btnsUserProjects.forEach((btn) => btn.classList.remove("active"));
    this.btnsDeafultsProjects.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    this.task.activeProject = e.target.textContent;
    localStorage.setItem("activeProject", e.target.textContent);
    this.task.renderTasks();
    this.ui.openSidebar();
  };

  renderProjects() {
    this.projectList.forEach((projectName) => this.userProjectsList.appendChild(this.createProjectBtn(projectName)));
  }

  toggleInputProjectAdd = () => {
    this.projectAddSection.classList.toggle("hide");
    this.projectSectionInput.value = "";
  };
}


/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
// import Task from "./Task";

class Storage {
  constructor() {
    // this.task = new Task();
    this.setItem();
    // this.task.renderTasks();
    // console.log(this.task.tasks);
  }

  setItem = () => {
    // console.log(JSON.parse(localStorage.getItem("tasks")));
    // this.task.tasks = JSON.parse(localStorage.getItem("tasks"));
  };
}


/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");

// import Storage from "./Storage";
class Task {
  tasks = [
    {
      projectName: "Create To Do App",
      name: "Create CSS",
      dueDate: "2023-02-07",
      priority: "low",
      checked: "true",
    },
    {
      projectName: "Create To Do App",
      name: "Create HTML",
      dueDate: "2023-03-01",
      priority: "low",
      checked: "true",
    },
  ];
  activeProject = "inbox";

  constructor() {
    this.ui = new _UI__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.projectName = document.querySelector(".project-name");
    this.projectTaskQuantity = document.querySelector(".project-task-quantity");
    this.buttonTaskAdd = document.querySelector(".button-task-add");
    this.buttonTaskClear = document.querySelector(".button-task-clear");

    this.popupNameActionText = document.querySelector(".popup-name-action p");
    this.popupTaskAction = document.querySelector(".popup-task-action");
    this.popupTaskActionCancel = document.querySelector(".popup-task-event-cancel");
    this.popupButtonSubmit = document.querySelector(".popup-button-submit");

    this.taskToDo = document.querySelector(".task-to-do");
    this.popupForm = document.querySelector(".popup-task-form");

    this.buttonTaskAdd.addEventListener("click", this.toggleAddTask);
    this.buttonTaskClear.addEventListener("click", this.clearCompletedTask);
    this.popupTaskActionCancel.addEventListener("click", this.togglePopupForm);
    this.popupForm.addEventListener("submit", this.addOrChangeTask);

    JSON.parse(localStorage.getItem("tasks")) ? (this.tasks = JSON.parse(localStorage.getItem("tasks"))) : (this.tasks = this.tasks);
    localStorage.getItem("activeProject") ? (this.activeProject = localStorage.getItem("activeProject")) : (this.activeProject = this.activeProject);
    // this.tasks = JSON.parse(localStorage.getItem("tasks"));
    this.renderTasks();
    this.renderTasksRemaininig();
  }

  togglePopupForm = () => {
    this.popupTaskAction.classList.toggle("hide");
    this.ui.screenDimming();
  };

  toggleAddTask = () => {
    this.togglePopupForm();
    this.popupNameActionText.textContent = "New Task";

    const formTaskName = document.getElementById("task-name");
    const formDueDate = document.getElementById("date");
    const formPriority = document.getElementById("priority");

    formTaskName.value = "";
    formDueDate.value = "";
    formPriority.value = "low";

    this.popupForm.addEventListener("submit", this.createNewTask, { once: true });
  };

  toggleEditTask = (e) => {
    this.togglePopupForm();
    this.popupNameActionText.textContent = "Edit Task";

    const task = e.target.parentNode;
    const formTaskName = document.getElementById("task-name");
    const formDueDate = document.getElementById("date");
    const formPriority = document.getElementById("priority");

    const taskName = task.querySelector(".task-name");
    const dueDate = task.querySelector(".task-date");
    const priority = task.querySelector(".task-checkbox");

    formTaskName.value = taskName.textContent.replace(/\(([^)]+)\)/, "");
    formDueDate.value = dueDate.textContent;
    formPriority.value = priority.classList[1];

    this.popupTaskActionCancel.style.display = "none";

    this.popupForm.addEventListener(
      "submit",
      () => {
        this.editTask(event, task);
      },
      { once: true }
    );
  };

  isTaskAlreadyExist = (taskName) => {
    let isAlreadyExist = false;

    this.tasks.forEach((task) => {
      if (task.name.toLowerCase().replace(/\s+/g, "") == taskName.toLowerCase().replace(/\s+/g, "")) {
        isAlreadyExist = true;
      }
    });

    return isAlreadyExist;
  };

  editTask = (e, task) => {
    e.preventDefault();
    if (this.popupNameActionText.textContent == "New Task") return;

    const taskName = task.querySelector(".task-name").textContent;
    const editedTaskName = document.getElementById("task-name").value;
    const editedDueDate = document.getElementById("date").value;
    const editedPriority = document.getElementById("priority").value;

    let taskNameToChange = taskName
      .replace(/\(([^)]+)\)/, "")
      .toLowerCase()
      .replace(/\s+/g, "");

    if (this.isTaskAlreadyExist(editedTaskName)) {
      if (editedTaskName.toLowerCase().replace(/\s+/g, "") !== taskNameToChange) {
        return this.popupForm.addEventListener(
          "submit",
          () => {
            this.editTask(event, task);
          },
          { once: true }
        );
      }
    }

    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "inbox" || this.activeProject.toLowerCase().replace(/\s+/g, "") == "today" || this.activeProject.toLowerCase().replace(/\s+/g, "") == "thisweek") {
      this.tasks.forEach((task) => {
        if (task.name.toLowerCase().replace(/\s+/g, "") == taskNameToChange) {
          task.name = editedTaskName;
          task.dueDate = editedDueDate;
          task.priority = editedPriority;
        }
      });
    } else {
      this.tasks.forEach((task) => {
        if (task.name.toLowerCase().replace(/\s+/g, "") == taskNameToChange && task.projectName.toLowerCase().replace(/\s+/g, "") == this.activeProject.toLowerCase().replace(/\s+/g, "")) {
          task.name = editedTaskName;
          task.dueDate = editedDueDate;
          task.priority = editedPriority;
        }
      });
    }

    this.renderTasks();
    this.togglePopupForm();
  };

  createTaskContainer(taskName, dueDate, priority, checked, whichProject) {
    const task = document.createElement("div");
    task.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", this.changeChecked);
    checkbox.classList.add("task-checkbox");
    checkbox.classList.add(`${priority}`);
    checkbox.type = "checkbox";
    checkbox.name = "checkbox-task";
    checkbox.id = taskName.toLowerCase().replace(/\s+/g, "");
    checkbox.checked = checked;

    const label = document.createElement("label");
    label.htmlFor = taskName.toLowerCase().replace(/\s+/g, "");

    const name = document.createElement("p");
    name.classList.add("task-name");
    whichProject ? (name.textContent = `${taskName} (${whichProject})`) : (name.textContent = `${taskName}`);

    const date = document.createElement("p");
    date.classList.add("task-date");
    date.textContent = `${dueDate}`;

    const editBtn = document.createElement("button");
    editBtn.classList.add("button-edit");
    editBtn.addEventListener("click", this.toggleEditTask);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button-delete");
    deleteBtn.addEventListener("click", this.deleteTask);

    label.appendChild(name);
    label.appendChild(date);
    task.appendChild(checkbox);
    task.appendChild(label);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    this.taskToDo.append(task);
  }

  addTaskToArray(activeProject, taskName, dueDate, priority, checked) {
    const task = {
      projectName: activeProject,
      name: taskName,
      dueDate: dueDate,
      priority: priority,
      checked: checked,
    };

    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

    // retrieving localStorage data in HTML
    // document.getElementById("content").innerHTML = localStorage.getItem("myCountryInfo");
  }

  createNewTask = (e) => {
    e.preventDefault();
    this.popupTaskActionCancel.style.display = "block";

    if (this.popupNameActionText.textContent == "Edit Task") return;

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (this.isTaskAlreadyExist(taskName)) return this.popupForm.addEventListener("submit", this.createNewTask, { once: true });

    this.addTaskToArray(this.activeProject, taskName, dueDate, priority, false);
    this.renderTasks();
    this.togglePopupForm();
    this.renderTasksRemaininig();
  };

  renderActiveProjectTask() {
    let activeProjectTask = [];

    this.tasks.forEach((task) => {
      if (task.projectName.toLowerCase().replace(/\s+/g, "") == this.activeProject.toLowerCase().replace(/\s+/g, "")) {
        activeProjectTask.push(task);
      }
    });

    activeProjectTask.forEach((activeTask) => this.createTaskContainer(activeTask.name, activeTask.dueDate, activeTask.priority, activeTask.checked));
    this.renderTasksRemaininig();
  }

  renderAllTasks() {
    let allTasks = [];

    this.tasks.forEach((task) => {
      allTasks.push(task);
    });

    allTasks.forEach((task) => this.createTaskContainer(task.name, task.dueDate, task.priority, task.checked, task.projectName));
    this.renderTasksRemaininig();
  }

  renderAllTodaysTasks() {
    let todayTasks = [];

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    month >= 10 ? (month = date.getMonth() + 1) : (month = `0${date.getMonth() + 1}`);
    day >= 10 ? (day = date.getDate()) : (day = `0${date.getDate()}`);

    let todayDate = `${year}-${month}-${day}`;

    this.tasks.forEach((task) => {
      if (task.dueDate == todayDate) {
        todayTasks.push(task);
      }
    });

    todayTasks.forEach((todayTask) => this.createTaskContainer(todayTask.name, todayTask.dueDate, todayTask.priority, todayTask.checked, todayTask.projectName));
    this.renderTasksRemaininig();
  }

  getLastDay(year, month) {
    return new Date(year, month, 0).getDate();
  }

  renderAllWeeksTasks() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let thisWeekTasks = [];
    let thisWeekDatesTasks = [];

    for (let i = 0; i < 7; i++) {
      if (this.getLastDay(year, month) == day) {
        day = 1;
        month += 1;
      }

      if (Number(month) > 12) {
        month = 1;
        year += 1;
      }

      day >= 10 ? (day = Number(day)) : (day = `0${Number(day)}`);
      month >= 10 ? (month = Number(month)) : (month = `0${Number(month)}`);
      let thisWeekDate = `${year}-${month}-${day}`;
      thisWeekDatesTasks.push(thisWeekDate);

      day = Number(day) + 1;
    }

    thisWeekDatesTasks.forEach((weekTask) => {
      this.tasks.forEach((task) => {
        if (task.dueDate == weekTask) {
          thisWeekTasks.push(task);
        }
      });
    });

    thisWeekTasks.forEach((thisWeekTask) => this.createTaskContainer(thisWeekTask.name, thisWeekTask.dueDate, thisWeekTask.priority, thisWeekTask.checked, thisWeekTask.projectName));
    this.renderTasksRemaininig();
  }

  renderTasks() {
    this.taskToDo.innerHTML = "";
    this.projectName.textContent = this.activeProject;

    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "inbox") return this.renderAllTasks();
    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "today") return this.renderAllTodaysTasks();
    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "thisweek") return this.renderAllWeeksTasks();
    return this.renderActiveProjectTask();
  }

  changeChecked = (e) => {
    const taskName = e.target.parentNode.querySelector(".task-name").textContent;

    const taskNameWithoutSpaces = taskName
      .replace(/\(([^)]+)\)/, "")
      .toLowerCase()
      .replace(/\s+/g, "");
    const activeProjectWithoutSpaces = this.activeProject.toLowerCase().replace(/\s+/g, "");

    this.tasks.forEach((task) => {
      if (task.name.toLowerCase().replace(/\s+/g, "") == taskNameWithoutSpaces && activeProjectWithoutSpaces == task.projectName.toLowerCase().replace(/\s+/g, "")) {
        task.checked = !task.checked;
      }
    });

    // change checked in localStorage

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

      localStorageTasks.forEach((task) => {
        if (task.name.toLowerCase().replace(/\s+/g, "") == taskNameWithoutSpaces && activeProjectWithoutSpaces == task.projectName.toLowerCase().replace(/\s+/g, "")) {
          task.checked = !task.checked;
        }
      });

      localStorageTasks = JSON.stringify(localStorageTasks);
      localStorage.setItem("tasks", localStorageTasks);
    }

    this.renderTasksRemaininig();
  };

  removeAllTaskFromProject(removeProject) {
    let arrayWithoutRemoveTasks = this.tasks.filter((task) => {
      return task.projectName.toLowerCase().replace(/\s+/g, "") !== removeProject.toLowerCase().replace(/\s+/g, "");
    });

    this.tasks = arrayWithoutRemoveTasks;

    // Remove all from task project from localstorage

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageProjects = JSON.parse(localStorage.getItem("tasks"));

      localStorageProjects = localStorageProjects.filter((task) => {
        return task.projectName.toLowerCase().replace(/\s+/g, "") !== removeProject.toLowerCase().replace(/\s+/g, "");
      });

      localStorageProjects = JSON.stringify(localStorageProjects);
      localStorage.setItem("tasks", localStorageProjects);
    }

    this.activeProject = "inbox";
    localStorage.setItem("activeProject", "inbox");
    this.renderTasks();
  }

  deleteTask = (e) => {
    const taskName = e.target.parentNode.querySelector(".task-name").textContent.replace(/\(([^)]+)\)/, "");
    const taskDeleteIndex = this.tasks.findIndex((task) => {
      return task.name.toLowerCase().replace(/\s+/g, "") == taskName.toLowerCase().replace(/\s+/g, "");
    });

    // Remove From LocalStorage

    let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

    localStorageTasks.forEach((storageTask, i) => {
      if (storageTask.name.toLowerCase().replace(/\s+/g, "") == taskName.toLowerCase().replace(/\s+/g, "")) {
        localStorageTasks.splice(i, 1);
      }
    });

    localStorageTasks = JSON.stringify(localStorageTasks);
    localStorage.setItem("tasks", localStorageTasks);

    this.tasks.splice(taskDeleteIndex, 1);
    e.target.parentNode.remove();
    this.renderTasksRemaininig();
  };

  renderTasksRemaininig = () => {
    const numberOfTasks = this.taskToDo.querySelectorAll(`.task input[name="checkbox-task"]:not(:checked)`).length;
    this.projectTaskQuantity.textContent = numberOfTasks;
  };

  clearCompletedTask = () => {
    let completeTasks = [];

    const completedTasksCheckboxes = this.taskToDo.querySelectorAll(`.task input[name="checkbox-task"]:checked`);
    completedTasksCheckboxes.forEach((completeTaskcheckbox) => completeTasks.push(completeTaskcheckbox.closest(".task")));

    completeTasks.forEach((completeTask) => {
      const taskName = completeTask.querySelector(".task-name").textContent;
      const taskDeleteIndex = this.tasks.findIndex((task) => task.name == taskName);
      this.tasks.splice(taskDeleteIndex, 1);
      completeTask.remove();
    });

    console.log(completeTasks);

    // if (JSON.parse(localStorage.getItem("tasks"))) {
    // let localStorageProjects = JSON.parse(localStorage.getItem("tasks"));

    // localStorageProjects = localStorageProjects.filter((task) => {
    // return task.projectName.toLowerCase().replace(/\s+/g, "") !== removeProject.toLowerCase().replace(/\s+/g, "");
    // });

    // localStorageProjects = JSON.stringify(localStorageProjects);
    // localStorage.setItem("tasks", localStorageProjects);
    // }
  };
}


/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ui)
/* harmony export */ });
class Ui {
  init() {
    this.toggleSidebar = document.querySelector(".toggle-menu");
    this.toggleSidebar.addEventListener("click", this.openSidebar);
    this.sidebar = document.querySelector(".sidebar");
  }

  openSidebar = () => {
    if (!this.toggleSidebar) {
      const toggleSidebar = document.querySelector(".toggle-menu");
      const sidebar = document.querySelector(".sidebar");
      toggleSidebar.checked = false;
      sidebar.classList.toggle("sidebar-active");
      return;
    }

    this.sidebar.classList.toggle("sidebar-active");
  };

  screenDimming = () => {
    const popupScreen = document.querySelector(".popup-screen");
    popupScreen.classList.toggle("show");
  };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Task */ "./src/modules/Task.js");
/* harmony import */ var _modules_Projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Projects */ "./src/modules/Projects.js");
/* harmony import */ var _modules_Storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Storage */ "./src/modules/Storage.js");





init();

function init() {
  // const storage = new Storage();
  const ui = new _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"]();
  // const task = new Task();
  const Project = new _modules_Projects__WEBPACK_IMPORTED_MODULE_2__["default"]();

  ui.init();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvYmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDSTtBQUNRO0FBQ0Y7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtREFBRTtBQUNuQjtBQUNBLHNCQUFzQix5REFBUTtBQUM5QjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIjtcclxuaW1wb3J0IFVpIGZyb20gXCIuL1VJXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0cyB7XHJcbiAgcHJvamVjdExpc3QgPSBbXCJDcmVhdGUgVG8gRG8gQXBwXCIsIFwiTWFrZSBhIHZpZGVvXCIsIFwiTWFrZSBkaW5uZXJcIl07XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1wcm9qZWN0LWFkZFwiKTtcclxuICAgIHRoaXMucHJvamVjdEFkZFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXByb2plY3QtYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1wcm9qZWN0LWlucHV0XCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYnV0dG9uLWFkZFwiKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25DYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWJ1dHRvbi1jYW5jZWxcIik7XHJcbiAgICB0aGlzLnByb2plY3REZWxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1kZWxldGUtcHJvamVjdFwiKTtcclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtbGlzdFwiKTtcclxuICAgIHRoaXMuYnRuc0RlYWZ1bHRzUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1kZWFmdWx0LXByb2plY3RcIik7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1wcm9qZWN0XCIpO1xyXG5cclxuICAgIC8vIEV2ZW50IExpc3RlbmVyc1xyXG4gICAgdGhpcy5idG5BZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUlucHV0UHJvamVjdEFkZCk7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmFkZFByb2plY3QpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGQpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KSk7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2hhbmdlUHJvamVjdCkpO1xyXG4gICAgdGhpcy5wcm9qZWN0RGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlbGV0ZVByb2plY3QpO1xyXG5cclxuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9qZWN0TGlzdCkpO1xyXG4gICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpKSA/ICh0aGlzLnByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpKSkgOiAodGhpcy5wcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdExpc3QpO1xyXG4gICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgdGhpcy50YXNrID0gbmV3IFRhc2soKTtcclxuICAgIHRoaXMudWkgPSBuZXcgVWkoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgcHJvamVjdC50ZXh0Q29udGVudCA9IGAke3Byb2plY3ROYW1lfWA7XHJcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpO1xyXG5cclxuICAgIHJldHVybiBwcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgaXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBidG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0blByb2plY3QpID0+IHtcclxuICAgICAgaWYgKGJ0blByb2plY3QudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG5Qcm9qZWN0KSA9PiB7XHJcbiAgICAgIGlmIChidG5Qcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBwcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpIHtcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0FscmVhZHlFeGlzdDtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXByb2plY3ROYW1lIHx8IHRoaXMuaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucHJvamVjdExpc3QucHVzaChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGQoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9qZWN0TGlzdCkpO1xyXG4gIH07XHJcblxyXG4gIGRlbGV0ZVByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tcHJvamVjdC5hY3RpdmVcIik7XHJcblxyXG4gICAgaWYgKCFhY3RpdmVQcm9qZWN0KSByZXR1cm47XHJcblxyXG4gICAgLy9SZW1vdmUgUHJvamVjdCBmcm9tIExvY2FsXHJcblxyXG4gICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TGlzdFwiKSkpIHtcclxuICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBhY3RpdmVQcm9qZWN0LnRleHRDb250ZW50O1xyXG4gICAgICBsZXQgbG9jYWxTdG9yYWdlUHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdExpc3RcIikpO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlUHJvamVjdHMuZm9yRWFjaCgoc3RvcmFnZVByb2plY3QsIGkpID0+IHtcclxuICAgICAgICBpZiAoc3RvcmFnZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlUHJvamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVByb2plY3RzKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLCBsb2NhbFN0b3JhZ2VQcm9qZWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZlUHJvamVjdC5yZW1vdmUoKTtcclxuICAgIGNvbnN0IHByb2plY3REZWxldGVJbmRleCA9IHRoaXMucHJvamVjdExpc3QuZmluZEluZGV4KChwcm9qZWN0KSA9PiBwcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBhY3RpdmVQcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSk7XHJcbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gdGhpcy5wcm9qZWN0TGlzdC5zcGxpY2UocHJvamVjdERlbGV0ZUluZGV4LCAxKTtcclxuXHJcbiAgICB0aGlzLnRhc2sucmVtb3ZlQWxsVGFza0Zyb21Qcm9qZWN0KHJlbW92ZVByb2plY3RbMF0pO1xyXG4gIH07XHJcblxyXG4gIGNoYW5nZVByb2plY3QgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgIHRoaXMuYnRuc0RlYWZ1bHRzUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIHRoaXMudGFzay5hY3RpdmVQcm9qZWN0ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVByb2plY3RcIiwgZS50YXJnZXQudGV4dENvbnRlbnQpO1xyXG4gICAgdGhpcy50YXNrLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnVpLm9wZW5TaWRlYmFyKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICB0aGlzLnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3ROYW1lKSA9PiB0aGlzLnVzZXJQcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSkpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlSW5wdXRQcm9qZWN0QWRkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgfTtcclxufVxyXG4iLCIvLyBpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICB0aGlzLnNldEl0ZW0oKTtcclxuICAgIC8vIHRoaXMudGFzay5yZW5kZXJUYXNrcygpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy50YXNrLnRhc2tzKTtcclxuICB9XHJcblxyXG4gIHNldEl0ZW0gPSAoKSA9PiB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpKTtcclxuICAgIC8vIHRoaXMudGFzay50YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgVWkgZnJvbSBcIi4vVUlcIjtcclxuLy8gaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vU3RvcmFnZVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcclxuICB0YXNrcyA9IFtcclxuICAgIHtcclxuICAgICAgcHJvamVjdE5hbWU6IFwiQ3JlYXRlIFRvIERvIEFwcFwiLFxyXG4gICAgICBuYW1lOiBcIkNyZWF0ZSBDU1NcIixcclxuICAgICAgZHVlRGF0ZTogXCIyMDIzLTAyLTA3XCIsXHJcbiAgICAgIHByaW9yaXR5OiBcImxvd1wiLFxyXG4gICAgICBjaGVja2VkOiBcInRydWVcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb2plY3ROYW1lOiBcIkNyZWF0ZSBUbyBEbyBBcHBcIixcclxuICAgICAgbmFtZTogXCJDcmVhdGUgSFRNTFwiLFxyXG4gICAgICBkdWVEYXRlOiBcIjIwMjMtMDMtMDFcIixcclxuICAgICAgcHJpb3JpdHk6IFwibG93XCIsXHJcbiAgICAgIGNoZWNrZWQ6IFwidHJ1ZVwiLFxyXG4gICAgfSxcclxuICBdO1xyXG4gIGFjdGl2ZVByb2plY3QgPSBcImluYm94XCI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy51aSA9IG5ldyBVaSgpO1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1uYW1lXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0VGFza1F1YW50aXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXRhc2stcXVhbnRpdHlcIik7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi10YXNrLWFkZFwiKTtcclxuICAgIHRoaXMuYnV0dG9uVGFza0NsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tdGFzay1jbGVhclwiKTtcclxuXHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLW5hbWUtYWN0aW9uIHBcIik7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtdGFzay1hY3Rpb25cIik7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbkNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtdGFzay1ldmVudC1jYW5jZWxcIik7XHJcbiAgICB0aGlzLnBvcHVwQnV0dG9uU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tc3VibWl0XCIpO1xyXG5cclxuICAgIHRoaXMudGFza1RvRG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdG8tZG9cIik7XHJcbiAgICB0aGlzLnBvcHVwRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtdGFzay1mb3JtXCIpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVBZGRUYXNrKTtcclxuICAgIHRoaXMuYnV0dG9uVGFza0NsZWFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsZWFyQ29tcGxldGVkVGFzayk7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVQb3B1cEZvcm0pO1xyXG4gICAgdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmFkZE9yQ2hhbmdlVGFzayk7XHJcblxyXG4gICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSA/ICh0aGlzLnRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSkgOiAodGhpcy50YXNrcyA9IHRoaXMudGFza3MpO1xyXG4gICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVQcm9qZWN0XCIpID8gKHRoaXMuYWN0aXZlUHJvamVjdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlUHJvamVjdFwiKSkgOiAodGhpcy5hY3RpdmVQcm9qZWN0ID0gdGhpcy5hY3RpdmVQcm9qZWN0KTtcclxuICAgIC8vIHRoaXMudGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVBvcHVwRm9ybSA9ICgpID0+IHtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xyXG4gICAgdGhpcy51aS5zY3JlZW5EaW1taW5nKCk7XHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlQWRkVGFzayA9ICgpID0+IHtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrXCI7XHJcblxyXG4gICAgY29uc3QgZm9ybVRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XHJcbiAgICBjb25zdCBmb3JtRHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKTtcclxuICAgIGNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XHJcblxyXG4gICAgZm9ybVRhc2tOYW1lLnZhbHVlID0gXCJcIjtcclxuICAgIGZvcm1EdWVEYXRlLnZhbHVlID0gXCJcIjtcclxuICAgIGZvcm1Qcmlvcml0eS52YWx1ZSA9IFwibG93XCI7XHJcblxyXG4gICAgdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmNyZWF0ZU5ld1Rhc2ssIHsgb25jZTogdHJ1ZSB9KTtcclxuICB9O1xyXG5cclxuICB0b2dnbGVFZGl0VGFzayA9IChlKSA9PiB7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID0gXCJFZGl0IFRhc2tcIjtcclxuXHJcbiAgICBjb25zdCB0YXNrID0gZS50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IGZvcm1UYXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZm9ybUR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCBmb3JtUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpO1xyXG5cclxuICAgIGNvbnN0IHRhc2tOYW1lID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1kYXRlXCIpO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jaGVja2JveFwiKTtcclxuXHJcbiAgICBmb3JtVGFza05hbWUudmFsdWUgPSB0YXNrTmFtZS50ZXh0Q29udGVudC5yZXBsYWNlKC9cXCgoW14pXSspXFwpLywgXCJcIik7XHJcbiAgICBmb3JtRHVlRGF0ZS52YWx1ZSA9IGR1ZURhdGUudGV4dENvbnRlbnQ7XHJcbiAgICBmb3JtUHJpb3JpdHkudmFsdWUgPSBwcmlvcml0eS5jbGFzc0xpc3RbMV07XHJcblxyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwic3VibWl0XCIsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLmVkaXRUYXNrKGV2ZW50LCB0YXNrKTtcclxuICAgICAgfSxcclxuICAgICAgeyBvbmNlOiB0cnVlIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgaXNUYXNrQWxyZWFkeUV4aXN0ID0gKHRhc2tOYW1lKSA9PiB7XHJcbiAgICBsZXQgaXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgaXNBbHJlYWR5RXhpc3QgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaXNBbHJlYWR5RXhpc3Q7XHJcbiAgfTtcclxuXHJcbiAgZWRpdFRhc2sgPSAoZSwgdGFzaykgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHRoaXMucG9wdXBOYW1lQWN0aW9uVGV4dC50ZXh0Q29udGVudCA9PSBcIk5ldyBUYXNrXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCBlZGl0ZWRUYXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZWRpdGVkRHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGVkaXRlZFByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcclxuXHJcbiAgICBsZXQgdGFza05hbWVUb0NoYW5nZSA9IHRhc2tOYW1lXHJcbiAgICAgIC5yZXBsYWNlKC9cXCgoW14pXSspXFwpLywgXCJcIilcclxuICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNUYXNrQWxyZWFkeUV4aXN0KGVkaXRlZFRhc2tOYW1lKSkge1xyXG4gICAgICBpZiAoZWRpdGVkVGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpICE9PSB0YXNrTmFtZVRvQ2hhbmdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICBcInN1Ym1pdFwiLFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRUYXNrKGV2ZW50LCB0YXNrKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IG9uY2U6IHRydWUgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcImluYm94XCIgfHwgdGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcInRvZGF5XCIgfHwgdGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcInRoaXN3ZWVrXCIpIHtcclxuICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWVUb0NoYW5nZSkge1xyXG4gICAgICAgICAgdGFzay5uYW1lID0gZWRpdGVkVGFza05hbWU7XHJcbiAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBlZGl0ZWREdWVEYXRlO1xyXG4gICAgICAgICAgdGFzay5wcmlvcml0eSA9IGVkaXRlZFByaW9yaXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICBpZiAodGFzay5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSB0YXNrTmFtZVRvQ2hhbmdlICYmIHRhc2sucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpIHtcclxuICAgICAgICAgIHRhc2submFtZSA9IGVkaXRlZFRhc2tOYW1lO1xyXG4gICAgICAgICAgdGFzay5kdWVEYXRlID0gZWRpdGVkRHVlRGF0ZTtcclxuICAgICAgICAgIHRhc2sucHJpb3JpdHkgPSBlZGl0ZWRQcmlvcml0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgfTtcclxuXHJcbiAgY3JlYXRlVGFza0NvbnRhaW5lcih0YXNrTmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIHdoaWNoUHJvamVjdCkge1xyXG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLmNoYW5nZUNoZWNrZWQpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKGAke3ByaW9yaXR5fWApO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94Lm5hbWUgPSBcImNoZWNrYm94LXRhc2tcIjtcclxuICAgIGNoZWNrYm94LmlkID0gdGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG4gICAgY2hlY2tib3guY2hlY2tlZCA9IGNoZWNrZWQ7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICBsYWJlbC5odG1sRm9yID0gdGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG5cclxuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIG5hbWUuY2xhc3NMaXN0LmFkZChcInRhc2stbmFtZVwiKTtcclxuICAgIHdoaWNoUHJvamVjdCA/IChuYW1lLnRleHRDb250ZW50ID0gYCR7dGFza05hbWV9ICgke3doaWNoUHJvamVjdH0pYCkgOiAobmFtZS50ZXh0Q29udGVudCA9IGAke3Rhc2tOYW1lfWApO1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGRhdGUuY2xhc3NMaXN0LmFkZChcInRhc2stZGF0ZVwiKTtcclxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBgJHtkdWVEYXRlfWA7XHJcblxyXG4gICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJidXR0b24tZWRpdFwiKTtcclxuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlRWRpdFRhc2spO1xyXG5cclxuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1kZWxldGVcIik7XHJcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZGVsZXRlVGFzayk7XHJcblxyXG4gICAgbGFiZWwuYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICBsYWJlbC5hcHBlbmRDaGlsZChkYXRlKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xyXG5cclxuICAgIHRoaXMudGFza1RvRG8uYXBwZW5kKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFza1RvQXJyYXkoYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkKSB7XHJcbiAgICBjb25zdCB0YXNrID0ge1xyXG4gICAgICBwcm9qZWN0TmFtZTogYWN0aXZlUHJvamVjdCxcclxuICAgICAgbmFtZTogdGFza05hbWUsXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgY2hlY2tlZDogY2hlY2tlZCxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRhc2tzKSk7XHJcblxyXG4gICAgLy8gcmV0cmlldmluZyBsb2NhbFN0b3JhZ2UgZGF0YSBpbiBIVE1MXHJcbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIikuaW5uZXJIVE1MID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJteUNvdW50cnlJbmZvXCIpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTmV3VGFzayA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbkNhbmNlbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPT0gXCJFZGl0IFRhc2tcIikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLmlzVGFza0FscmVhZHlFeGlzdCh0YXNrTmFtZSkpIHJldHVybiB0aGlzLnBvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuY3JlYXRlTmV3VGFzaywgeyBvbmNlOiB0cnVlIH0pO1xyXG5cclxuICAgIHRoaXMuYWRkVGFza1RvQXJyYXkodGhpcy5hY3RpdmVQcm9qZWN0LCB0YXNrTmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGZhbHNlKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckFjdGl2ZVByb2plY3RUYXNrKCkge1xyXG4gICAgbGV0IGFjdGl2ZVByb2plY3RUYXNrID0gW107XHJcblxyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSB0aGlzLmFjdGl2ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgYWN0aXZlUHJvamVjdFRhc2sucHVzaCh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYWN0aXZlUHJvamVjdFRhc2suZm9yRWFjaCgoYWN0aXZlVGFzaykgPT4gdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKGFjdGl2ZVRhc2submFtZSwgYWN0aXZlVGFzay5kdWVEYXRlLCBhY3RpdmVUYXNrLnByaW9yaXR5LCBhY3RpdmVUYXNrLmNoZWNrZWQpKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJBbGxUYXNrcygpIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IFtdO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBhbGxUYXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWxsVGFza3MuZm9yRWFjaCgodGFzaykgPT4gdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKHRhc2submFtZSwgdGFzay5kdWVEYXRlLCB0YXNrLnByaW9yaXR5LCB0YXNrLmNoZWNrZWQsIHRhc2sucHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJBbGxUb2RheXNUYXNrcygpIHtcclxuICAgIGxldCB0b2RheVRhc2tzID0gW107XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgIG1vbnRoID49IDEwID8gKG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSkgOiAobW9udGggPSBgMCR7ZGF0ZS5nZXRNb250aCgpICsgMX1gKTtcclxuICAgIGRheSA+PSAxMCA/IChkYXkgPSBkYXRlLmdldERhdGUoKSkgOiAoZGF5ID0gYDAke2RhdGUuZ2V0RGF0ZSgpfWApO1xyXG5cclxuICAgIGxldCB0b2RheURhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5kdWVEYXRlID09IHRvZGF5RGF0ZSkge1xyXG4gICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdG9kYXlUYXNrcy5mb3JFYWNoKCh0b2RheVRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcih0b2RheVRhc2submFtZSwgdG9kYXlUYXNrLmR1ZURhdGUsIHRvZGF5VGFzay5wcmlvcml0eSwgdG9kYXlUYXNrLmNoZWNrZWQsIHRvZGF5VGFzay5wcm9qZWN0TmFtZSkpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9XHJcblxyXG4gIGdldExhc3REYXkoeWVhciwgbW9udGgpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQWxsV2Vla3NUYXNrcygpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgIGxldCB0aGlzV2Vla1Rhc2tzID0gW107XHJcbiAgICBsZXQgdGhpc1dlZWtEYXRlc1Rhc2tzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuZ2V0TGFzdERheSh5ZWFyLCBtb250aCkgPT0gZGF5KSB7XHJcbiAgICAgICAgZGF5ID0gMTtcclxuICAgICAgICBtb250aCArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoTnVtYmVyKG1vbnRoKSA+IDEyKSB7XHJcbiAgICAgICAgbW9udGggPSAxO1xyXG4gICAgICAgIHllYXIgKz0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGF5ID49IDEwID8gKGRheSA9IE51bWJlcihkYXkpKSA6IChkYXkgPSBgMCR7TnVtYmVyKGRheSl9YCk7XHJcbiAgICAgIG1vbnRoID49IDEwID8gKG1vbnRoID0gTnVtYmVyKG1vbnRoKSkgOiAobW9udGggPSBgMCR7TnVtYmVyKG1vbnRoKX1gKTtcclxuICAgICAgbGV0IHRoaXNXZWVrRGF0ZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XHJcbiAgICAgIHRoaXNXZWVrRGF0ZXNUYXNrcy5wdXNoKHRoaXNXZWVrRGF0ZSk7XHJcblxyXG4gICAgICBkYXkgPSBOdW1iZXIoZGF5KSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpc1dlZWtEYXRlc1Rhc2tzLmZvckVhY2goKHdlZWtUYXNrKSA9PiB7XHJcbiAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgIGlmICh0YXNrLmR1ZURhdGUgPT0gd2Vla1Rhc2spIHtcclxuICAgICAgICAgIHRoaXNXZWVrVGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpc1dlZWtUYXNrcy5mb3JFYWNoKCh0aGlzV2Vla1Rhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcih0aGlzV2Vla1Rhc2submFtZSwgdGhpc1dlZWtUYXNrLmR1ZURhdGUsIHRoaXNXZWVrVGFzay5wcmlvcml0eSwgdGhpc1dlZWtUYXNrLmNoZWNrZWQsIHRoaXNXZWVrVGFzay5wcm9qZWN0TmFtZSkpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlclRhc2tzKCkge1xyXG4gICAgdGhpcy50YXNrVG9Eby5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRoaXMuYWN0aXZlUHJvamVjdDtcclxuXHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcImluYm94XCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFRhc2tzKCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcInRvZGF5XCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFRvZGF5c1Rhc2tzKCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcInRoaXN3ZWVrXCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFdlZWtzVGFza3MoKTtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlckFjdGl2ZVByb2plY3RUYXNrKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VDaGVja2VkID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKS50ZXh0Q29udGVudDtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZVdpdGhvdXRTcGFjZXMgPSB0YXNrTmFtZVxyXG4gICAgICAucmVwbGFjZSgvXFwoKFteKV0rKVxcKS8sIFwiXCIpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG4gICAgY29uc3QgYWN0aXZlUHJvamVjdFdpdGhvdXRTcGFjZXMgPSB0aGlzLmFjdGl2ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSB0YXNrTmFtZVdpdGhvdXRTcGFjZXMgJiYgYWN0aXZlUHJvamVjdFdpdGhvdXRTcGFjZXMgPT0gdGFzay5wcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpIHtcclxuICAgICAgICB0YXNrLmNoZWNrZWQgPSAhdGFzay5jaGVja2VkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjaGFuZ2UgY2hlY2tlZCBpbiBsb2NhbFN0b3JhZ2VcclxuXHJcbiAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSkge1xyXG4gICAgICBsZXQgbG9jYWxTdG9yYWdlVGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlVGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgIGlmICh0YXNrLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRhc2tOYW1lV2l0aG91dFNwYWNlcyAmJiBhY3RpdmVQcm9qZWN0V2l0aG91dFNwYWNlcyA9PSB0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgICAgdGFzay5jaGVja2VkID0gIXRhc2suY2hlY2tlZDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlVGFza3MgPSBKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2VUYXNrcyk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgbG9jYWxTdG9yYWdlVGFza3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVtb3ZlQWxsVGFza0Zyb21Qcm9qZWN0KHJlbW92ZVByb2plY3QpIHtcclxuICAgIGxldCBhcnJheVdpdGhvdXRSZW1vdmVUYXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB7XHJcbiAgICAgIHJldHVybiB0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSAhPT0gcmVtb3ZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnRhc2tzID0gYXJyYXlXaXRob3V0UmVtb3ZlVGFza3M7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBmcm9tIHRhc2sgcHJvamVjdCBmcm9tIGxvY2Fsc3RvcmFnZVxyXG5cclxuICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpKSB7XHJcbiAgICAgIGxldCBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IGxvY2FsU3RvcmFnZVByb2plY3RzLmZpbHRlcigodGFzaykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSAhPT0gcmVtb3ZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlUHJvamVjdHMgPSBKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2VQcm9qZWN0cyk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgbG9jYWxTdG9yYWdlUHJvamVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlUHJvamVjdCA9IFwiaW5ib3hcIjtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlUHJvamVjdFwiLCBcImluYm94XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVGFzayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQucmVwbGFjZSgvXFwoKFteKV0rKVxcKS8sIFwiXCIpO1xyXG4gICAgY29uc3QgdGFza0RlbGV0ZUluZGV4ID0gdGhpcy50YXNrcy5maW5kSW5kZXgoKHRhc2spID0+IHtcclxuICAgICAgcmV0dXJuIHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIEZyb20gTG9jYWxTdG9yYWdlXHJcblxyXG4gICAgbGV0IGxvY2FsU3RvcmFnZVRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2VUYXNrcy5mb3JFYWNoKChzdG9yYWdlVGFzaywgaSkgPT4ge1xyXG4gICAgICBpZiAoc3RvcmFnZVRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlVGFza3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2VUYXNrcyA9IEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVRhc2tzKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgbG9jYWxTdG9yYWdlVGFza3MpO1xyXG5cclxuICAgIHRoaXMudGFza3Muc3BsaWNlKHRhc2tEZWxldGVJbmRleCwgMSk7XHJcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJUYXNrc1JlbWFpbmluaWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBudW1iZXJPZlRhc2tzID0gdGhpcy50YXNrVG9Eby5xdWVyeVNlbGVjdG9yQWxsKGAudGFzayBpbnB1dFtuYW1lPVwiY2hlY2tib3gtdGFza1wiXTpub3QoOmNoZWNrZWQpYCkubGVuZ3RoO1xyXG4gICAgdGhpcy5wcm9qZWN0VGFza1F1YW50aXR5LnRleHRDb250ZW50ID0gbnVtYmVyT2ZUYXNrcztcclxuICB9O1xyXG5cclxuICBjbGVhckNvbXBsZXRlZFRhc2sgPSAoKSA9PiB7XHJcbiAgICBsZXQgY29tcGxldGVUYXNrcyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzQ2hlY2tib3hlcyA9IHRoaXMudGFza1RvRG8ucXVlcnlTZWxlY3RvckFsbChgLnRhc2sgaW5wdXRbbmFtZT1cImNoZWNrYm94LXRhc2tcIl06Y2hlY2tlZGApO1xyXG4gICAgY29tcGxldGVkVGFza3NDaGVja2JveGVzLmZvckVhY2goKGNvbXBsZXRlVGFza2NoZWNrYm94KSA9PiBjb21wbGV0ZVRhc2tzLnB1c2goY29tcGxldGVUYXNrY2hlY2tib3guY2xvc2VzdChcIi50YXNrXCIpKSk7XHJcblxyXG4gICAgY29tcGxldGVUYXNrcy5mb3JFYWNoKChjb21wbGV0ZVRhc2spID0+IHtcclxuICAgICAgY29uc3QgdGFza05hbWUgPSBjb21wbGV0ZVRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IHRhc2tEZWxldGVJbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KCh0YXNrKSA9PiB0YXNrLm5hbWUgPT0gdGFza05hbWUpO1xyXG4gICAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgICBjb21wbGV0ZVRhc2sucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhjb21wbGV0ZVRhc2tzKTtcclxuXHJcbiAgICAvLyBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSkge1xyXG4gICAgLy8gbGV0IGxvY2FsU3RvcmFnZVByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcclxuXHJcbiAgICAvLyBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IGxvY2FsU3RvcmFnZVByb2plY3RzLmZpbHRlcigodGFzaykgPT4ge1xyXG4gICAgLy8gcmV0dXJuIHRhc2sucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpICE9PSByZW1vdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vIGxvY2FsU3RvcmFnZVByb2plY3RzID0gSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlUHJvamVjdHMpO1xyXG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBsb2NhbFN0b3JhZ2VQcm9qZWN0cyk7XHJcbiAgICAvLyB9XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVaSB7XHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLW1lbnVcIik7XHJcbiAgICB0aGlzLnRvZ2dsZVNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblNpZGViYXIpO1xyXG4gICAgdGhpcy5zaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xyXG4gIH1cclxuXHJcbiAgb3BlblNpZGViYXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMudG9nZ2xlU2lkZWJhcikge1xyXG4gICAgICBjb25zdCB0b2dnbGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtbWVudVwiKTtcclxuICAgICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcclxuICAgICAgdG9nZ2xlU2lkZWJhci5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcInNpZGViYXItYWN0aXZlXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJzaWRlYmFyLWFjdGl2ZVwiKTtcclxuICB9O1xyXG5cclxuICBzY3JlZW5EaW1taW5nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcG9wdXBTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXNjcmVlblwiKTtcclxuICAgIHBvcHVwU2NyZWVuLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gIH07XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVWkgZnJvbSBcIi4vbW9kdWxlcy9VSVwiO1xyXG5pbXBvcnQgVGFzayBmcm9tIFwiLi9tb2R1bGVzL1Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdHNcIjtcclxuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vbW9kdWxlcy9TdG9yYWdlXCI7XHJcblxyXG5pbml0KCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIC8vIGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG4gIGNvbnN0IHVpID0gbmV3IFVpKCk7XHJcbiAgLy8gY29uc3QgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgY29uc3QgUHJvamVjdCA9IG5ldyBQcm9qZWN0cygpO1xyXG5cclxuICB1aS5pbml0KCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
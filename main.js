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
    this.task = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.sidebar = document.querySelector(".sidebar");
    this.btnAddProject = document.querySelector(".button-project-add");
    this.projectAddSection = document.querySelector(".popup-project-add");
    this.projectSectionInput = document.querySelector(".popup-project-input");
    this.projectSectionAddBtn = document.querySelector(".popup-button-add");
    this.projectSectionCancelBtn = document.querySelector(
      ".popup-button-cancel"
    );
    this.projectDeleteBtn = document.querySelector(".btn-delete-project");
    this.userProjectsList = document.querySelector(".projects-list");
    this.btnsDeafultsProjects = document.querySelectorAll(
      ".button-deafult-project"
    );
    this.btnsUserProjects = document.querySelectorAll(".button-project");

    // Event Listeners
    this.btnAddProject.addEventListener("click", this.toggleInputProjectAdd);
    this.projectSectionAddBtn.addEventListener("click", this.addProject);
    this.projectDeleteBtn.addEventListener("click", this.deleteProject);
    this.projectSectionCancelBtn.addEventListener(
      "click",
      this.toggleInputProjectAdd
    );
    this.btnsDeafultsProjects.forEach((btn) =>
      btn.addEventListener("click", this.changeProject)
    );
    this.btnsUserProjects.forEach((btn) =>
      btn.addEventListener("click", this.changeProject)
    );

    JSON.parse(localStorage.getItem("projectList"))
      ? (this.projectList = JSON.parse(localStorage.getItem("projectList")))
      : (this.projectList = this.projectList);
    this.renderProjects();
    this.addClassActive();
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
      if (
        btnProject.textContent.toLowerCase().replace(/\s+/g, "") ==
        projectName.toLowerCase().replace(/\s+/g, "")
      ) {
        isAlreadyExist = true;
      }
    });

    btnsUserProjects.forEach((btnProject) => {
      if (
        btnProject.textContent.toLowerCase().replace(/\s+/g, "") ==
        projectName.toLowerCase().replace(/\s+/g, "")
      ) {
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
      let localStorageProjects = JSON.parse(
        localStorage.getItem("projectList")
      );

      localStorageProjects.forEach((storageProject, i) => {
        if (
          storageProject.toLowerCase().replace(/\s+/g, "") ==
          projectName.toLowerCase().replace(/\s+/g, "")
        ) {
          localStorageProjects.splice(i, 1);
        }
      });

      localStorageProjects = JSON.stringify(localStorageProjects);
      localStorage.setItem("projectList", localStorageProjects);
    }

    activeProject.remove();
    const projectDeleteIndex = this.projectList.findIndex(
      (project) =>
        project.toLowerCase().replace(/\s+/g, "") ==
        activeProject.textContent.toLowerCase().replace(/\s+/g, "")
    );
    const removeProject = this.projectList.splice(projectDeleteIndex, 1);

    this.task.removeAllTaskFromProject(removeProject[0]);
  };

  addClassActive(btn) {
    if (btn) {
      btn.classList.add("active");
    } else if (localStorage.getItem("activeProject")) {
      this.btnsUserProjects = document.querySelectorAll(".button-project");

      this.btnsDeafultsProjects.forEach((btn) => {
        btn.classList.remove("active");
        if (
          btn.textContent.toLowerCase().replace(/\s+/g, "") ==
          localStorage
            .getItem("activeProject")
            .toLowerCase()
            .replace(/\s+/g, "")
        ) {
          btn.classList.add("active");
        }
      });

      this.btnsUserProjects.forEach((btn) => {
        btn.classList.remove("active");
        if (
          btn.textContent.toLowerCase().replace(/\s+/g, "") ==
          localStorage
            .getItem("activeProject")
            .toLowerCase()
            .replace(/\s+/g, "")
        ) {
          btn.classList.add("active");
        }
      });
    }
  }

  changeProject = (e) => {
    this.btnsUserProjects = document.querySelectorAll(".button-project");
    this.btnsUserProjects.forEach((btn) => btn.classList.remove("active"));
    this.btnsDeafultsProjects.forEach((btn) => btn.classList.remove("active"));

    this.addClassActive(e.target);

    this.task.activeProject = e.target.textContent;
    localStorage.setItem("activeProject", e.target.textContent);

    this.task.renderTasks();
    this.ui.openSidebar();
  };

  renderProjects() {
    this.projectList.forEach((projectName) =>
      this.userProjectsList.appendChild(this.createProjectBtn(projectName))
    );
  }

  toggleInputProjectAdd = () => {
    this.projectAddSection.classList.toggle("hide");
    this.projectSectionInput.value = "";
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
      checked: true,
    },
    {
      projectName: "Create To Do App",
      name: "Create HTML",
      dueDate: "2023-03-01",
      priority: "low",
      checked: true,
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
    this.popupTaskActionCancel = document.querySelector(
      ".popup-task-event-cancel"
    );
    this.popupButtonSubmit = document.querySelector(".popup-button-submit");

    this.taskToDo = document.querySelector(".task-to-do");
    this.popupForm = document.querySelector(".popup-task-form");

    this.buttonTaskAdd.addEventListener("click", this.toggleAddTask);
    this.buttonTaskClear.addEventListener("click", this.clearCompletedTask);
    this.popupTaskActionCancel.addEventListener("click", this.togglePopupForm);
    this.popupForm.addEventListener("submit", this.addOrChangeTask);

    JSON.parse(localStorage.getItem("tasks"))
      ? (this.tasks = JSON.parse(localStorage.getItem("tasks")))
      : (this.tasks = this.tasks);
    localStorage.getItem("activeProject")
      ? (this.activeProject = localStorage.getItem("activeProject"))
      : (this.activeProject = this.activeProject);
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

    this.popupForm.addEventListener("submit", this.createNewTask, {
      once: true,
    });
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
      if (
        task.name.toLowerCase().replace(/\s+/g, "") ==
        taskName.toLowerCase().replace(/\s+/g, "")
      ) {
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
      if (
        editedTaskName.toLowerCase().replace(/\s+/g, "") !== taskNameToChange
      ) {
        return this.popupForm.addEventListener(
          "submit",
          () => {
            this.editTask(event, task);
          },
          { once: true }
        );
      }
    }

    if (
      this.activeProject.toLowerCase().replace(/\s+/g, "") == "inbox" ||
      this.activeProject.toLowerCase().replace(/\s+/g, "") == "today" ||
      this.activeProject.toLowerCase().replace(/\s+/g, "") == "thisweek"
    ) {
      this.tasks.forEach((task) => {
        if (task.name.toLowerCase().replace(/\s+/g, "") == taskNameToChange) {
          task.name = editedTaskName;
          task.dueDate = editedDueDate;
          task.priority = editedPriority;
          return;
        }
      });
    } else {
      this.tasks.forEach((task) => {
        if (
          task.name.toLowerCase().replace(/\s+/g, "") == taskNameToChange &&
          task.projectName.toLowerCase().replace(/\s+/g, "") ==
            this.activeProject.toLowerCase().replace(/\s+/g, "")
        ) {
          task.name = editedTaskName;
          task.dueDate = editedDueDate;
          task.priority = editedPriority;
        }
      });
    }

    // Local Storage

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

      localStorageTasks.map((storageTask) => {
        if (
          storageTask.name.toLowerCase().replace(/\s+/g, "") == taskNameToChange
        ) {
          storageTask.name = editedTaskName;
          storageTask.dueDate = editedDueDate;
          task.priority = editedPriority;
        }
      });

      localStorageTasks = JSON.stringify(localStorageTasks);
      localStorage.setItem("tasks", localStorageTasks);
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
    whichProject
      ? (name.textContent = `${taskName} (${whichProject})`)
      : (name.textContent = `${taskName}`);

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
  }

  createNewTask = (e) => {
    e.preventDefault();
    this.popupTaskActionCancel.style.display = "block";

    if (this.popupNameActionText.textContent == "Edit Task") return;

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (this.isTaskAlreadyExist(taskName))
      return this.popupForm.addEventListener("submit", this.createNewTask, {
        once: true,
      });

    this.addTaskToArray(this.activeProject, taskName, dueDate, priority, false);
    this.renderTasks();
    this.togglePopupForm();
    this.renderTasksRemaininig();
  };

  renderActiveProjectTask() {
    let activeProjectTask = [];

    this.tasks.forEach((task) => {
      if (
        task.projectName.toLowerCase().replace(/\s+/g, "") ==
        this.activeProject.toLowerCase().replace(/\s+/g, "")
      ) {
        activeProjectTask.push(task);
      }
    });

    activeProjectTask.forEach((activeTask) =>
      this.createTaskContainer(
        activeTask.name,
        activeTask.dueDate,
        activeTask.priority,
        activeTask.checked
      )
    );
    this.renderTasksRemaininig();
  }

  renderAllTasks() {
    let allTasks = [];

    this.tasks.forEach((task) => {
      allTasks.push(task);
    });

    allTasks.forEach((task) =>
      this.createTaskContainer(
        task.name,
        task.dueDate,
        task.priority,
        task.checked,
        task.projectName
      )
    );
    this.renderTasksRemaininig();
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

    let todayDate = `${year}-${month}-${day}`;

    this.tasks.forEach((task) => {
      if (task.dueDate == todayDate) {
        todayTasks.push(task);
      }
    });

    todayTasks.forEach((todayTask) =>
      this.createTaskContainer(
        todayTask.name,
        todayTask.dueDate,
        todayTask.priority,
        todayTask.checked,
        todayTask.projectName
      )
    );
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

    thisWeekTasks.forEach((thisWeekTask) =>
      this.createTaskContainer(
        thisWeekTask.name,
        thisWeekTask.dueDate,
        thisWeekTask.priority,
        thisWeekTask.checked,
        thisWeekTask.projectName
      )
    );
    this.renderTasksRemaininig();
  }

  renderTasks() {
    this.taskToDo.innerHTML = "";
    this.projectName.textContent = this.activeProject;

    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "inbox")
      return this.renderAllTasks();
    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "today")
      return this.renderAllTodaysTasks();
    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "thisweek")
      return this.renderAllWeeksTasks();
    return this.renderActiveProjectTask();
  }

  changeChecked = (e) => {
    const taskName =
      e.target.parentNode.querySelector(".task-name").textContent;

    const taskNameWithoutSpaces = taskName
      .replace(/\(([^)]+)\)/, "")
      .toLowerCase()
      .replace(/\s+/g, "");

    this.tasks.forEach((task) => {
      if (
        task.name.toLowerCase().replace(/\s+/g, "") == taskNameWithoutSpaces
      ) {
        task.checked = !task.checked;
      }
    });

    // change checked in localStorage

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

      localStorageTasks.forEach((task) => {
        if (
          task.name.toLowerCase().replace(/\s+/g, "") == taskNameWithoutSpaces
        ) {
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
      return (
        task.projectName.toLowerCase().replace(/\s+/g, "") !==
        removeProject.toLowerCase().replace(/\s+/g, "")
      );
    });

    this.tasks = arrayWithoutRemoveTasks;

    // Remove all from task project from localstorage

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageProjects = JSON.parse(localStorage.getItem("tasks"));

      localStorageProjects = localStorageProjects.filter((task) => {
        return (
          task.projectName.toLowerCase().replace(/\s+/g, "") !==
          removeProject.toLowerCase().replace(/\s+/g, "")
        );
      });

      localStorageProjects = JSON.stringify(localStorageProjects);
      localStorage.setItem("tasks", localStorageProjects);
    }

    this.activeProject = "inbox";
    localStorage.setItem("activeProject", "inbox");
    this.renderTasks();
  }

  deleteTask = (e) => {
    const taskName = e.target.parentNode
      .querySelector(".task-name")
      .textContent.replace(/\(([^)]+)\)/, "");
    const taskDeleteIndex = this.tasks.findIndex((task) => {
      return (
        task.name.toLowerCase().replace(/\s+/g, "") ==
        taskName.toLowerCase().replace(/\s+/g, "")
      );
    });

    // Remove From LocalStorage

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

      localStorageTasks.forEach((storageTask, i) => {
        if (
          storageTask.name.toLowerCase().replace(/\s+/g, "") ==
          taskName.toLowerCase().replace(/\s+/g, "")
        ) {
          localStorageTasks.splice(i, 1);
        }
      });

      localStorageTasks = JSON.stringify(localStorageTasks);
      localStorage.setItem("tasks", localStorageTasks);
    }

    this.tasks.splice(taskDeleteIndex, 1);
    e.target.parentNode.remove();
    this.renderTasksRemaininig();
  };

  renderTasksRemaininig = () => {
    const numberOfTasks = this.taskToDo.querySelectorAll(
      `.task input[name="checkbox-task"]:not(:checked)`
    ).length;
    this.projectTaskQuantity.textContent = numberOfTasks;
  };

  clearCompletedTask = () => {
    let taskWithoutComplete = this.tasks.filter((task) => {
      return task.checked !== true;
    });

    this.tasks = taskWithoutComplete;
    this.renderTasks();

    if (JSON.parse(localStorage.getItem("tasks"))) {
      let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));

      let storageTaskWithoutComplete = localStorageTasks.filter((task) => {
        return task.checked !== true;
      });

      localStorageTasks = JSON.stringify(storageTaskWithoutComplete);
      localStorage.setItem("tasks", localStorageTasks);
    }
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
/* harmony import */ var _modules_Projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Projects */ "./src/modules/Projects.js");



init();

function init() {
  const ui = new _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const Project = new _modules_Projects__WEBPACK_IMPORTED_MODULE_1__["default"]();

  ui.init();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0o7QUFDdEI7QUFDZTtBQUNmO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQUk7QUFDeEIsa0JBQWtCLDJDQUFFO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsWUFBWTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVMc0I7QUFDdEI7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwyQ0FBRTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ044QjtBQUNZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1EQUFFO0FBQ25CLHNCQUFzQix5REFBUTtBQUM5QjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XHJcbmltcG9ydCBVaSBmcm9tIFwiLi9VSVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdHMge1xyXG4gIHByb2plY3RMaXN0ID0gW1wiQ3JlYXRlIFRvIERvIEFwcFwiLCBcIk1ha2UgYSB2aWRlb1wiLCBcIk1ha2UgZGlubmVyXCJdO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50YXNrID0gbmV3IFRhc2soKTtcclxuICAgIHRoaXMudWkgPSBuZXcgVWkoKTtcclxuICAgIHRoaXMuc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcclxuICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXByb2plY3QtYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtcHJvamVjdC1hZGRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXByb2plY3QtaW5wdXRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnBvcHVwLWJ1dHRvbi1jYW5jZWxcIlxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWRlbGV0ZS1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy51c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1saXN0XCIpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgIFwiLmJ1dHRvbi1kZWFmdWx0LXByb2plY3RcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25BZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWRkUHJvamVjdCk7XHJcbiAgICB0aGlzLnByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZGVsZXRlUHJvamVjdCk7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2xpY2tcIixcclxuICAgICAgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGRcclxuICAgICk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT5cclxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpXHJcbiAgICApO1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzLmZvckVhY2goKGJ0bikgPT5cclxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpXHJcbiAgICApO1xyXG5cclxuICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TGlzdFwiKSlcclxuICAgICAgPyAodGhpcy5wcm9qZWN0TGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TGlzdFwiKSkpXHJcbiAgICAgIDogKHRoaXMucHJvamVjdExpc3QgPSB0aGlzLnByb2plY3RMaXN0KTtcclxuICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIHRoaXMuYWRkQ2xhc3NBY3RpdmUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgcHJvamVjdC50ZXh0Q29udGVudCA9IGAke3Byb2plY3ROYW1lfWA7XHJcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpO1xyXG5cclxuICAgIHJldHVybiBwcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgaXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBidG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0blByb2plY3QpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGJ0blByb2plY3QudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09XHJcbiAgICAgICAgcHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG5Qcm9qZWN0KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBidG5Qcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PVxyXG4gICAgICAgIHByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgICApIHtcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0FscmVhZHlFeGlzdDtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXByb2plY3ROYW1lIHx8IHRoaXMuaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucHJvamVjdExpc3QucHVzaChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGQoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9qZWN0TGlzdCkpO1xyXG4gIH07XHJcblxyXG4gIGRlbGV0ZVByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tcHJvamVjdC5hY3RpdmVcIik7XHJcblxyXG4gICAgaWYgKCFhY3RpdmVQcm9qZWN0KSByZXR1cm47XHJcblxyXG4gICAgLy9SZW1vdmUgUHJvamVjdCBmcm9tIExvY2FsXHJcblxyXG4gICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0TGlzdFwiKSkpIHtcclxuICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBhY3RpdmVQcm9qZWN0LnRleHRDb250ZW50O1xyXG4gICAgICBsZXQgbG9jYWxTdG9yYWdlUHJvamVjdHMgPSBKU09OLnBhcnNlKFxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdExpc3RcIilcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZVByb2plY3RzLmZvckVhY2goKHN0b3JhZ2VQcm9qZWN0LCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgc3RvcmFnZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09XHJcbiAgICAgICAgICBwcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZVByb2plY3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlUHJvamVjdHMgPSBKU09OLnN0cmluZ2lmeShsb2NhbFN0b3JhZ2VQcm9qZWN0cyk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIiwgbG9jYWxTdG9yYWdlUHJvamVjdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2ZVByb2plY3QucmVtb3ZlKCk7XHJcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlSW5kZXggPSB0aGlzLnByb2plY3RMaXN0LmZpbmRJbmRleChcclxuICAgICAgKHByb2plY3QpID0+XHJcbiAgICAgICAgcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT1cclxuICAgICAgICBhY3RpdmVQcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IHJlbW92ZVByb2plY3QgPSB0aGlzLnByb2plY3RMaXN0LnNwbGljZShwcm9qZWN0RGVsZXRlSW5kZXgsIDEpO1xyXG5cclxuICAgIHRoaXMudGFzay5yZW1vdmVBbGxUYXNrRnJvbVByb2plY3QocmVtb3ZlUHJvamVjdFswXSk7XHJcbiAgfTtcclxuXHJcbiAgYWRkQ2xhc3NBY3RpdmUoYnRuKSB7XHJcbiAgICBpZiAoYnRuKSB7XHJcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZVByb2plY3RcIikpIHtcclxuICAgICAgdGhpcy5idG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICAgIHRoaXMuYnRuc0RlYWZ1bHRzUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgYnRuLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PVxyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgICAgIC5nZXRJdGVtKFwiYWN0aXZlUHJvamVjdFwiKVxyXG4gICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICBidG4udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2VcclxuICAgICAgICAgICAgLmdldEl0ZW0oXCJhY3RpdmVQcm9qZWN0XCIpXHJcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiXCIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlUHJvamVjdCA9IChlKSA9PiB7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuXHJcbiAgICB0aGlzLmFkZENsYXNzQWN0aXZlKGUudGFyZ2V0KTtcclxuXHJcbiAgICB0aGlzLnRhc2suYWN0aXZlUHJvamVjdCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVQcm9qZWN0XCIsIGUudGFyZ2V0LnRleHRDb250ZW50KTtcclxuXHJcbiAgICB0aGlzLnRhc2sucmVuZGVyVGFza3MoKTtcclxuICAgIHRoaXMudWkub3BlblNpZGViYXIoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJQcm9qZWN0cygpIHtcclxuICAgIHRoaXMucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdE5hbWUpID0+XHJcbiAgICAgIHRoaXMudXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUlucHV0UHJvamVjdEFkZCA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvamVjdEFkZFNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IFVpIGZyb20gXCIuL1VJXCI7XHJcbi8vIGltcG9ydCBTdG9yYWdlIGZyb20gXCIuL1N0b3JhZ2VcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgdGFza3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIHByb2plY3ROYW1lOiBcIkNyZWF0ZSBUbyBEbyBBcHBcIixcclxuICAgICAgbmFtZTogXCJDcmVhdGUgQ1NTXCIsXHJcbiAgICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0wN1wiLFxyXG4gICAgICBwcmlvcml0eTogXCJsb3dcIixcclxuICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb2plY3ROYW1lOiBcIkNyZWF0ZSBUbyBEbyBBcHBcIixcclxuICAgICAgbmFtZTogXCJDcmVhdGUgSFRNTFwiLFxyXG4gICAgICBkdWVEYXRlOiBcIjIwMjMtMDMtMDFcIixcclxuICAgICAgcHJpb3JpdHk6IFwibG93XCIsXHJcbiAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gIF07XHJcbiAgYWN0aXZlUHJvamVjdCA9IFwiaW5ib3hcIjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnVpID0gbmV3IFVpKCk7XHJcbiAgICB0aGlzLnByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW5hbWVcIik7XHJcbiAgICB0aGlzLnByb2plY3RUYXNrUXVhbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGFzay1xdWFudGl0eVwiKTtcclxuICAgIHRoaXMuYnV0dG9uVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXRhc2stYWRkXCIpO1xyXG4gICAgdGhpcy5idXR0b25UYXNrQ2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi10YXNrLWNsZWFyXCIpO1xyXG5cclxuICAgIHRoaXMucG9wdXBOYW1lQWN0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbmFtZS1hY3Rpb24gcFwiKTtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC10YXNrLWFjdGlvblwiKTtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIucG9wdXAtdGFzay1ldmVudC1jYW5jZWxcIlxyXG4gICAgKTtcclxuICAgIHRoaXMucG9wdXBCdXR0b25TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWJ1dHRvbi1zdWJtaXRcIik7XHJcblxyXG4gICAgdGhpcy50YXNrVG9EbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10by1kb1wiKTtcclxuICAgIHRoaXMucG9wdXBGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC10YXNrLWZvcm1cIik7XHJcblxyXG4gICAgdGhpcy5idXR0b25UYXNrQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUFkZFRhc2spO1xyXG4gICAgdGhpcy5idXR0b25UYXNrQ2xlYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xlYXJDb21wbGV0ZWRUYXNrKTtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZVBvcHVwRm9ybSk7XHJcbiAgICB0aGlzLnBvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuYWRkT3JDaGFuZ2VUYXNrKTtcclxuXHJcbiAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpXHJcbiAgICAgID8gKHRoaXMudGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpKVxyXG4gICAgICA6ICh0aGlzLnRhc2tzID0gdGhpcy50YXNrcyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZVByb2plY3RcIilcclxuICAgICAgPyAodGhpcy5hY3RpdmVQcm9qZWN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVQcm9qZWN0XCIpKVxyXG4gICAgICA6ICh0aGlzLmFjdGl2ZVByb2plY3QgPSB0aGlzLmFjdGl2ZVByb2plY3QpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVBvcHVwRm9ybSA9ICgpID0+IHtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xyXG4gICAgdGhpcy51aS5zY3JlZW5EaW1taW5nKCk7XHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlQWRkVGFzayA9ICgpID0+IHtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrXCI7XHJcblxyXG4gICAgY29uc3QgZm9ybVRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XHJcbiAgICBjb25zdCBmb3JtRHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKTtcclxuICAgIGNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XHJcblxyXG4gICAgZm9ybVRhc2tOYW1lLnZhbHVlID0gXCJcIjtcclxuICAgIGZvcm1EdWVEYXRlLnZhbHVlID0gXCJcIjtcclxuICAgIGZvcm1Qcmlvcml0eS52YWx1ZSA9IFwibG93XCI7XHJcblxyXG4gICAgdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmNyZWF0ZU5ld1Rhc2ssIHtcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUVkaXRUYXNrID0gKGUpID0+IHtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPSBcIkVkaXQgVGFza1wiO1xyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3QgZm9ybVRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XHJcbiAgICBjb25zdCBmb3JtRHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKTtcclxuICAgIGNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIik7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWNoZWNrYm94XCIpO1xyXG5cclxuICAgIGZvcm1UYXNrTmFtZS52YWx1ZSA9IHRhc2tOYW1lLnRleHRDb250ZW50LnJlcGxhY2UoL1xcKChbXildKylcXCkvLCBcIlwiKTtcclxuICAgIGZvcm1EdWVEYXRlLnZhbHVlID0gZHVlRGF0ZS50ZXh0Q29udGVudDtcclxuICAgIGZvcm1Qcmlvcml0eS52YWx1ZSA9IHByaW9yaXR5LmNsYXNzTGlzdFsxXTtcclxuXHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbkNhbmNlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJzdWJtaXRcIixcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZWRpdFRhc2soZXZlbnQsIHRhc2spO1xyXG4gICAgICB9LFxyXG4gICAgICB7IG9uY2U6IHRydWUgfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBpc1Rhc2tBbHJlYWR5RXhpc3QgPSAodGFza05hbWUpID0+IHtcclxuICAgIGxldCBpc0FscmVhZHlFeGlzdCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGFzay5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PVxyXG4gICAgICAgIHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgICApIHtcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0FscmVhZHlFeGlzdDtcclxuICB9O1xyXG5cclxuICBlZGl0VGFzayA9IChlLCB0YXNrKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAodGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID09IFwiTmV3IFRhc2tcIikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRhc2tOYW1lID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKS50ZXh0Q29udGVudDtcclxuICAgIGNvbnN0IGVkaXRlZFRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikudmFsdWU7XHJcbiAgICBjb25zdCBlZGl0ZWREdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZWRpdGVkUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG5cclxuICAgIGxldCB0YXNrTmFtZVRvQ2hhbmdlID0gdGFza05hbWVcclxuICAgICAgLnJlcGxhY2UoL1xcKChbXildKylcXCkvLCBcIlwiKVxyXG4gICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Rhc2tBbHJlYWR5RXhpc3QoZWRpdGVkVGFza05hbWUpKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBlZGl0ZWRUYXNrTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgIT09IHRhc2tOYW1lVG9DaGFuZ2VcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICBcInN1Ym1pdFwiLFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRUYXNrKGV2ZW50LCB0YXNrKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IG9uY2U6IHRydWUgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJpbmJveFwiIHx8XHJcbiAgICAgIHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0b2RheVwiIHx8XHJcbiAgICAgIHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0aGlzd2Vla1wiXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWVUb0NoYW5nZSkge1xyXG4gICAgICAgICAgdGFzay5uYW1lID0gZWRpdGVkVGFza05hbWU7XHJcbiAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBlZGl0ZWREdWVEYXRlO1xyXG4gICAgICAgICAgdGFzay5wcmlvcml0eSA9IGVkaXRlZFByaW9yaXR5O1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0YXNrLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRhc2tOYW1lVG9DaGFuZ2UgJiZcclxuICAgICAgICAgIHRhc2sucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRhc2submFtZSA9IGVkaXRlZFRhc2tOYW1lO1xyXG4gICAgICAgICAgdGFzay5kdWVEYXRlID0gZWRpdGVkRHVlRGF0ZTtcclxuICAgICAgICAgIHRhc2sucHJpb3JpdHkgPSBlZGl0ZWRQcmlvcml0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExvY2FsIFN0b3JhZ2VcclxuXHJcbiAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSkge1xyXG4gICAgICBsZXQgbG9jYWxTdG9yYWdlVGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlVGFza3MubWFwKChzdG9yYWdlVGFzaykgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHN0b3JhZ2VUYXNrLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRhc2tOYW1lVG9DaGFuZ2VcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHN0b3JhZ2VUYXNrLm5hbWUgPSBlZGl0ZWRUYXNrTmFtZTtcclxuICAgICAgICAgIHN0b3JhZ2VUYXNrLmR1ZURhdGUgPSBlZGl0ZWREdWVEYXRlO1xyXG4gICAgICAgICAgdGFzay5wcmlvcml0eSA9IGVkaXRlZFByaW9yaXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VUYXNrcyA9IEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVRhc2tzKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBsb2NhbFN0b3JhZ2VUYXNrcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG4gICAgdGhpcy50b2dnbGVQb3B1cEZvcm0oKTtcclxuICB9O1xyXG5cclxuICBjcmVhdGVUYXNrQ29udGFpbmVyKHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgd2hpY2hQcm9qZWN0KSB7XHJcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcblxyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMuY2hhbmdlQ2hlY2tlZCk7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKFwidGFzay1jaGVja2JveFwiKTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoYCR7cHJpb3JpdHl9YCk7XHJcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgY2hlY2tib3gubmFtZSA9IFwiY2hlY2tib3gtdGFza1wiO1xyXG4gICAgY2hlY2tib3guaWQgPSB0YXNrTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcbiAgICBjaGVja2JveC5jaGVja2VkID0gY2hlY2tlZDtcclxuXHJcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgIGxhYmVsLmh0bWxGb3IgPSB0YXNrTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcblxyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgbmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgd2hpY2hQcm9qZWN0XHJcbiAgICAgID8gKG5hbWUudGV4dENvbnRlbnQgPSBgJHt0YXNrTmFtZX0gKCR7d2hpY2hQcm9qZWN0fSlgKVxyXG4gICAgICA6IChuYW1lLnRleHRDb250ZW50ID0gYCR7dGFza05hbWV9YCk7XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xyXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGAke2R1ZURhdGV9YDtcclxuXHJcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1lZGl0XCIpO1xyXG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVFZGl0VGFzayk7XHJcblxyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWRlbGV0ZVwiKTtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVUYXNrKTtcclxuXHJcbiAgICBsYWJlbC5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgIGxhYmVsLmFwcGVuZENoaWxkKGRhdGUpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XHJcblxyXG4gICAgdGhpcy50YXNrVG9Eby5hcHBlbmQodGFzayk7XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrVG9BcnJheShhY3RpdmVQcm9qZWN0LCB0YXNrTmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQpIHtcclxuICAgIGNvbnN0IHRhc2sgPSB7XHJcbiAgICAgIHByb2plY3ROYW1lOiBhY3RpdmVQcm9qZWN0LFxyXG4gICAgICBuYW1lOiB0YXNrTmFtZSxcclxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICBjaGVja2VkOiBjaGVja2VkLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMudGFza3MpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU5ld1Rhc2sgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICBpZiAodGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID09IFwiRWRpdCBUYXNrXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Rhc2tBbHJlYWR5RXhpc3QodGFza05hbWUpKVxyXG4gICAgICByZXR1cm4gdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmNyZWF0ZU5ld1Rhc2ssIHtcclxuICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFkZFRhc2tUb0FycmF5KHRoaXMuYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5LCBmYWxzZSk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJBY3RpdmVQcm9qZWN0VGFzaygpIHtcclxuICAgIGxldCBhY3RpdmVQcm9qZWN0VGFzayA9IFtdO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGFzay5wcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT1cclxuICAgICAgICB0aGlzLmFjdGl2ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGFjdGl2ZVByb2plY3RUYXNrLnB1c2godGFzayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGFjdGl2ZVByb2plY3RUYXNrLmZvckVhY2goKGFjdGl2ZVRhc2spID0+XHJcbiAgICAgIHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcihcclxuICAgICAgICBhY3RpdmVUYXNrLm5hbWUsXHJcbiAgICAgICAgYWN0aXZlVGFzay5kdWVEYXRlLFxyXG4gICAgICAgIGFjdGl2ZVRhc2sucHJpb3JpdHksXHJcbiAgICAgICAgYWN0aXZlVGFzay5jaGVja2VkXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQWxsVGFza3MoKSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBbXTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgYWxsVGFza3MucHVzaCh0YXNrKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFsbFRhc2tzLmZvckVhY2goKHRhc2spID0+XHJcbiAgICAgIHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcihcclxuICAgICAgICB0YXNrLm5hbWUsXHJcbiAgICAgICAgdGFzay5kdWVEYXRlLFxyXG4gICAgICAgIHRhc2sucHJpb3JpdHksXHJcbiAgICAgICAgdGFzay5jaGVja2VkLFxyXG4gICAgICAgIHRhc2sucHJvamVjdE5hbWVcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJBbGxUb2RheXNUYXNrcygpIHtcclxuICAgIGxldCB0b2RheVRhc2tzID0gW107XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgIG1vbnRoID49IDEwXHJcbiAgICAgID8gKG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSlcclxuICAgICAgOiAobW9udGggPSBgMCR7ZGF0ZS5nZXRNb250aCgpICsgMX1gKTtcclxuICAgIGRheSA+PSAxMCA/IChkYXkgPSBkYXRlLmdldERhdGUoKSkgOiAoZGF5ID0gYDAke2RhdGUuZ2V0RGF0ZSgpfWApO1xyXG5cclxuICAgIGxldCB0b2RheURhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5kdWVEYXRlID09IHRvZGF5RGF0ZSkge1xyXG4gICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdG9kYXlUYXNrcy5mb3JFYWNoKCh0b2RheVRhc2spID0+XHJcbiAgICAgIHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcihcclxuICAgICAgICB0b2RheVRhc2submFtZSxcclxuICAgICAgICB0b2RheVRhc2suZHVlRGF0ZSxcclxuICAgICAgICB0b2RheVRhc2sucHJpb3JpdHksXHJcbiAgICAgICAgdG9kYXlUYXNrLmNoZWNrZWQsXHJcbiAgICAgICAgdG9kYXlUYXNrLnByb2plY3ROYW1lXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdERheSh5ZWFyLCBtb250aCkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCAwKS5nZXREYXRlKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJBbGxXZWVrc1Rhc2tzKCkge1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICBsZXQgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgbGV0IHRoaXNXZWVrVGFza3MgPSBbXTtcclxuICAgIGxldCB0aGlzV2Vla0RhdGVzVGFza3MgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5nZXRMYXN0RGF5KHllYXIsIG1vbnRoKSA9PSBkYXkpIHtcclxuICAgICAgICBkYXkgPSAxO1xyXG4gICAgICAgIG1vbnRoICs9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChOdW1iZXIobW9udGgpID4gMTIpIHtcclxuICAgICAgICBtb250aCA9IDE7XHJcbiAgICAgICAgeWVhciArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkYXkgPj0gMTAgPyAoZGF5ID0gTnVtYmVyKGRheSkpIDogKGRheSA9IGAwJHtOdW1iZXIoZGF5KX1gKTtcclxuICAgICAgbW9udGggPj0gMTAgPyAobW9udGggPSBOdW1iZXIobW9udGgpKSA6IChtb250aCA9IGAwJHtOdW1iZXIobW9udGgpfWApO1xyXG4gICAgICBsZXQgdGhpc1dlZWtEYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxuICAgICAgdGhpc1dlZWtEYXRlc1Rhc2tzLnB1c2godGhpc1dlZWtEYXRlKTtcclxuXHJcbiAgICAgIGRheSA9IE51bWJlcihkYXkpICsgMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzV2Vla0RhdGVzVGFza3MuZm9yRWFjaCgod2Vla1Rhc2spID0+IHtcclxuICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2suZHVlRGF0ZSA9PSB3ZWVrVGFzaykge1xyXG4gICAgICAgICAgdGhpc1dlZWtUYXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzV2Vla1Rhc2tzLmZvckVhY2goKHRoaXNXZWVrVGFzaykgPT5cclxuICAgICAgdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKFxyXG4gICAgICAgIHRoaXNXZWVrVGFzay5uYW1lLFxyXG4gICAgICAgIHRoaXNXZWVrVGFzay5kdWVEYXRlLFxyXG4gICAgICAgIHRoaXNXZWVrVGFzay5wcmlvcml0eSxcclxuICAgICAgICB0aGlzV2Vla1Rhc2suY2hlY2tlZCxcclxuICAgICAgICB0aGlzV2Vla1Rhc2sucHJvamVjdE5hbWVcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJUYXNrcygpIHtcclxuICAgIHRoaXMudGFza1RvRG8uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHRoaXMucHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSB0aGlzLmFjdGl2ZVByb2plY3Q7XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJpbmJveFwiKVxyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJBbGxUYXNrcygpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0b2RheVwiKVxyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJBbGxUb2RheXNUYXNrcygpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0aGlzd2Vla1wiKVxyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJBbGxXZWVrc1Rhc2tzKCk7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3RpdmVQcm9qZWN0VGFzaygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ2hlY2tlZCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWVXaXRob3V0U3BhY2VzID0gdGFza05hbWVcclxuICAgICAgLnJlcGxhY2UoL1xcKChbXildKylcXCkvLCBcIlwiKVxyXG4gICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWVXaXRob3V0U3BhY2VzXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRhc2suY2hlY2tlZCA9ICF0YXNrLmNoZWNrZWQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNoYW5nZSBjaGVja2VkIGluIGxvY2FsU3RvcmFnZVxyXG5cclxuICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpKSB7XHJcbiAgICAgIGxldCBsb2NhbFN0b3JhZ2VUYXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGFzay5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSB0YXNrTmFtZVdpdGhvdXRTcGFjZXNcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRhc2suY2hlY2tlZCA9ICF0YXNrLmNoZWNrZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZVRhc2tzID0gSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlVGFza3MpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIGxvY2FsU3RvcmFnZVRhc2tzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH07XHJcblxyXG4gIHJlbW92ZUFsbFRhc2tGcm9tUHJvamVjdChyZW1vdmVQcm9qZWN0KSB7XHJcbiAgICBsZXQgYXJyYXlXaXRob3V0UmVtb3ZlVGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcigodGFzaykgPT4ge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHRhc2sucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpICE9PVxyXG4gICAgICAgIHJlbW92ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnRhc2tzID0gYXJyYXlXaXRob3V0UmVtb3ZlVGFza3M7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBmcm9tIHRhc2sgcHJvamVjdCBmcm9tIGxvY2Fsc3RvcmFnZVxyXG5cclxuICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpKSB7XHJcbiAgICAgIGxldCBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IGxvY2FsU3RvcmFnZVByb2plY3RzLmZpbHRlcigodGFzaykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICB0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSAhPT1cclxuICAgICAgICAgIHJlbW92ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VQcm9qZWN0cyA9IEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVByb2plY3RzKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBsb2NhbFN0b3JhZ2VQcm9qZWN0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVQcm9qZWN0ID0gXCJpbmJveFwiO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVQcm9qZWN0XCIsIFwiaW5ib3hcIik7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVUYXNrID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQucGFyZW50Tm9kZVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIilcclxuICAgICAgLnRleHRDb250ZW50LnJlcGxhY2UoL1xcKChbXildKylcXCkvLCBcIlwiKTtcclxuICAgIGNvbnN0IHRhc2tEZWxldGVJbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KCh0YXNrKSA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGFzay5uYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PVxyXG4gICAgICAgIHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIEZyb20gTG9jYWxTdG9yYWdlXHJcblxyXG4gICAgaWYgKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSkpIHtcclxuICAgICAgbGV0IGxvY2FsU3RvcmFnZVRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZVRhc2tzLmZvckVhY2goKHN0b3JhZ2VUYXNrLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgc3RvcmFnZVRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT1cclxuICAgICAgICAgIHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlVGFza3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2VUYXNrcyA9IEpTT04uc3RyaW5naWZ5KGxvY2FsU3RvcmFnZVRhc2tzKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBsb2NhbFN0b3JhZ2VUYXNrcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50YXNrcy5zcGxpY2UodGFza0RlbGV0ZUluZGV4LCAxKTtcclxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclRhc2tzUmVtYWluaW5pZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IG51bWJlck9mVGFza3MgPSB0aGlzLnRhc2tUb0RvLnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgIGAudGFzayBpbnB1dFtuYW1lPVwiY2hlY2tib3gtdGFza1wiXTpub3QoOmNoZWNrZWQpYFxyXG4gICAgKS5sZW5ndGg7XHJcbiAgICB0aGlzLnByb2plY3RUYXNrUXVhbnRpdHkudGV4dENvbnRlbnQgPSBudW1iZXJPZlRhc2tzO1xyXG4gIH07XHJcblxyXG4gIGNsZWFyQ29tcGxldGVkVGFzayA9ICgpID0+IHtcclxuICAgIGxldCB0YXNrV2l0aG91dENvbXBsZXRlID0gdGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+IHtcclxuICAgICAgcmV0dXJuIHRhc2suY2hlY2tlZCAhPT0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudGFza3MgPSB0YXNrV2l0aG91dENvbXBsZXRlO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG5cclxuICAgIGlmIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpKSB7XHJcbiAgICAgIGxldCBsb2NhbFN0b3JhZ2VUYXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XHJcblxyXG4gICAgICBsZXQgc3RvcmFnZVRhc2tXaXRob3V0Q29tcGxldGUgPSBsb2NhbFN0b3JhZ2VUYXNrcy5maWx0ZXIoKHRhc2spID0+IHtcclxuICAgICAgICByZXR1cm4gdGFzay5jaGVja2VkICE9PSB0cnVlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZVRhc2tzID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVRhc2tXaXRob3V0Q29tcGxldGUpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIGxvY2FsU3RvcmFnZVRhc2tzKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpIHtcclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtbWVudVwiKTtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2lkZWJhcik7XHJcbiAgICB0aGlzLnNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XHJcbiAgfVxyXG5cclxuICBvcGVuU2lkZWJhciA9ICgpID0+IHtcclxuICAgIGlmICghdGhpcy50b2dnbGVTaWRlYmFyKSB7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZVNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1tZW51XCIpO1xyXG4gICAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xyXG4gICAgICB0b2dnbGVTaWRlYmFyLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKFwic2lkZWJhci1hY3RpdmVcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcInNpZGViYXItYWN0aXZlXCIpO1xyXG4gIH07XHJcblxyXG4gIHNjcmVlbkRpbW1pbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3B1cFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtc2NyZWVuXCIpO1xyXG4gICAgcG9wdXBTY3JlZW4uY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgfTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVaSBmcm9tIFwiLi9tb2R1bGVzL1VJXCI7XHJcbmltcG9ydCBQcm9qZWN0cyBmcm9tIFwiLi9tb2R1bGVzL1Byb2plY3RzXCI7XHJcblxyXG5pbml0KCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIGNvbnN0IHVpID0gbmV3IFVpKCk7XHJcbiAgY29uc3QgUHJvamVjdCA9IG5ldyBQcm9qZWN0cygpO1xyXG5cclxuICB1aS5pbml0KCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
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
  };

  deleteProject = () => {
    const activeProject = document.querySelector(".button-project.active");

    if (!activeProject) return;

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

    this.renderTasksRemaininig();
  };

  removeAllTaskFromProject(removeProject) {
    this.tasks.forEach((removeTask) => {
      if (removeTask.projectName.toLowerCase().replace(/\s+/g, "") == removeProject.toLowerCase().replace(/\s+/g, "")) {
        const deleteTasksIndex = this.tasks.findIndex((taskIndex) => taskIndex.projectName.toLowerCase().replace(/\s+/g, "") == removeProject.toLowerCase().replace(/\s+/g, ""));
        this.tasks.splice(deleteTasksIndex, 1);
      }
    });

    this.activeProject = "inbox";
    this.renderTasks();
  }

  deleteTask = (e) => {
    const taskName = e.target.parentNode.querySelector(".task-name").textContent;
    const taskDeleteIndex = this.tasks.findIndex((task) => task.name == taskName);

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




init();

function init() {
  const ui = new _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"]();
  // const task = new Task();
  const Project = new _modules_Projects__WEBPACK_IMPORTED_MODULE_2__["default"]();

  ui.init();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvWGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ044QjtBQUNJO0FBQ1E7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsbURBQUU7QUFDbkI7QUFDQSxzQkFBc0IseURBQVE7QUFDOUI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiO1xyXG5pbXBvcnQgVWkgZnJvbSBcIi4vVUlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RzIHtcclxuICBwcm9qZWN0TGlzdCA9IFtcIkNyZWF0ZSBUbyBEbyBBcHBcIiwgXCJNYWtlIGEgdmlkZW9cIiwgXCJNYWtlIGRpbm5lclwiXTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcclxuICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXByb2plY3QtYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtcHJvamVjdC1hZGRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXByb2plY3QtaW5wdXRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYnV0dG9uLWNhbmNlbFwiKTtcclxuICAgIHRoaXMucHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWRlbGV0ZS1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy51c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1saXN0XCIpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLWRlYWZ1bHQtcHJvamVjdFwiKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25BZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWRkUHJvamVjdCk7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUlucHV0UHJvamVjdEFkZCk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KSk7XHJcbiAgICB0aGlzLnByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZGVsZXRlUHJvamVjdCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgdGhpcy50YXNrID0gbmV3IFRhc2soKTtcclxuICAgIHRoaXMudWkgPSBuZXcgVWkoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgcHJvamVjdC50ZXh0Q29udGVudCA9IGAke3Byb2plY3ROYW1lfWA7XHJcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpO1xyXG5cclxuICAgIHJldHVybiBwcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgaXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBidG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0blByb2plY3QpID0+IHtcclxuICAgICAgaWYgKGJ0blByb2plY3QudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG5Qcm9qZWN0KSA9PiB7XHJcbiAgICAgIGlmIChidG5Qcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBwcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpIHtcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0FscmVhZHlFeGlzdDtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXByb2plY3ROYW1lIHx8IHRoaXMuaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucHJvamVjdExpc3QucHVzaChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGQoKTtcclxuICB9O1xyXG5cclxuICBkZWxldGVQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXByb2plY3QuYWN0aXZlXCIpO1xyXG5cclxuICAgIGlmICghYWN0aXZlUHJvamVjdCkgcmV0dXJuO1xyXG5cclxuICAgIGFjdGl2ZVByb2plY3QucmVtb3ZlKCk7XHJcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlSW5kZXggPSB0aGlzLnByb2plY3RMaXN0LmZpbmRJbmRleCgocHJvamVjdCkgPT4gcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gYWN0aXZlUHJvamVjdC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpO1xyXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IHRoaXMucHJvamVjdExpc3Quc3BsaWNlKHByb2plY3REZWxldGVJbmRleCwgMSk7XHJcblxyXG4gICAgdGhpcy50YXNrLnJlbW92ZUFsbFRhc2tGcm9tUHJvamVjdChyZW1vdmVQcm9qZWN0WzBdKTtcclxuICB9O1xyXG5cclxuICBjaGFuZ2VQcm9qZWN0ID0gKGUpID0+IHtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHJcbiAgICB0aGlzLnRhc2suYWN0aXZlUHJvamVjdCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgdGhpcy50YXNrLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnVpLm9wZW5TaWRlYmFyKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICB0aGlzLnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3ROYW1lKSA9PiB0aGlzLnVzZXJQcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSkpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlSW5wdXRQcm9qZWN0QWRkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgVWkgZnJvbSBcIi4vVUlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgdGFza3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIHByb2plY3ROYW1lOiBcIkNyZWF0ZSBUbyBEbyBBcHBcIixcclxuICAgICAgbmFtZTogXCJDcmVhdGUgQ1NTXCIsXHJcbiAgICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0wN1wiLFxyXG4gICAgICBwcmlvcml0eTogXCJsb3dcIixcclxuICAgICAgY2hlY2tlZDogXCJ0cnVlXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwcm9qZWN0TmFtZTogXCJDcmVhdGUgVG8gRG8gQXBwXCIsXHJcbiAgICAgIG5hbWU6IFwiQ3JlYXRlIEhUTUxcIixcclxuICAgICAgZHVlRGF0ZTogXCIyMDIzLTAzLTAxXCIsXHJcbiAgICAgIHByaW9yaXR5OiBcImxvd1wiLFxyXG4gICAgICBjaGVja2VkOiBcInRydWVcIixcclxuICAgIH0sXHJcbiAgXTtcclxuICBhY3RpdmVQcm9qZWN0ID0gXCJpbmJveFwiO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudWkgPSBuZXcgVWkoKTtcclxuICAgIHRoaXMucHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbmFtZVwiKTtcclxuICAgIHRoaXMucHJvamVjdFRhc2tRdWFudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10YXNrLXF1YW50aXR5XCIpO1xyXG4gICAgdGhpcy5idXR0b25UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tdGFzay1hZGRcIik7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXRhc2stY2xlYXJcIik7XHJcblxyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1uYW1lLWFjdGlvbiBwXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stYWN0aW9uXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stZXZlbnQtY2FuY2VsXCIpO1xyXG4gICAgdGhpcy5wb3B1cEJ1dHRvblN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYnV0dG9uLXN1Ym1pdFwiKTtcclxuXHJcbiAgICB0aGlzLnRhc2tUb0RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLXRvLWRvXCIpO1xyXG4gICAgdGhpcy5wb3B1cEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stZm9ybVwiKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvblRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlQWRkVGFzayk7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGVhckNvbXBsZXRlZFRhc2spO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlUG9wdXBGb3JtKTtcclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5hZGRPckNoYW5nZVRhc2spO1xyXG5cclxuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVQb3B1cEZvcm0gPSAoKSA9PiB7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcclxuICAgIHRoaXMudWkuc2NyZWVuRGltbWluZygpO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUFkZFRhc2sgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID0gXCJOZXcgVGFza1wiO1xyXG5cclxuICAgIGNvbnN0IGZvcm1UYXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZm9ybUR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCBmb3JtUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpO1xyXG5cclxuICAgIGZvcm1UYXNrTmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICBmb3JtRHVlRGF0ZS52YWx1ZSA9IFwiXCI7XHJcbiAgICBmb3JtUHJpb3JpdHkudmFsdWUgPSBcImxvd1wiO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5jcmVhdGVOZXdUYXNrLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlRWRpdFRhc2sgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy50b2dnbGVQb3B1cEZvcm0oKTtcclxuICAgIHRoaXMucG9wdXBOYW1lQWN0aW9uVGV4dC50ZXh0Q29udGVudCA9IFwiRWRpdCBUYXNrXCI7XHJcblxyXG4gICAgY29uc3QgdGFzayA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCBmb3JtVGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKTtcclxuICAgIGNvbnN0IGZvcm1EdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpO1xyXG4gICAgY29uc3QgZm9ybVByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKTtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIik7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gdGFzay5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY2hlY2tib3hcIik7XHJcblxyXG4gICAgZm9ybVRhc2tOYW1lLnZhbHVlID0gdGFza05hbWUudGV4dENvbnRlbnQucmVwbGFjZSgvXFwoKFteKV0rKVxcKS8sIFwiXCIpO1xyXG4gICAgZm9ybUR1ZURhdGUudmFsdWUgPSBkdWVEYXRlLnRleHRDb250ZW50O1xyXG4gICAgZm9ybVByaW9yaXR5LnZhbHVlID0gcHJpb3JpdHkuY2xhc3NMaXN0WzFdO1xyXG5cclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uQ2FuY2VsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICB0aGlzLnBvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcInN1Ym1pdFwiLFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lZGl0VGFzayhldmVudCwgdGFzayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHsgb25jZTogdHJ1ZSB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGlzVGFza0FscmVhZHlFeGlzdCA9ICh0YXNrTmFtZSkgPT4ge1xyXG4gICAgbGV0IGlzQWxyZWFkeUV4aXN0ID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGlzQWxyZWFkeUV4aXN0O1xyXG4gIH07XHJcblxyXG4gIGVkaXRUYXNrID0gKGUsIHRhc2spID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICh0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPT0gXCJOZXcgVGFza1wiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpLnRleHRDb250ZW50O1xyXG4gICAgY29uc3QgZWRpdGVkVGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGVkaXRlZER1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIikudmFsdWU7XHJcbiAgICBjb25zdCBlZGl0ZWRQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XHJcblxyXG4gICAgbGV0IHRhc2tOYW1lVG9DaGFuZ2UgPSB0YXNrTmFtZVxyXG4gICAgICAucmVwbGFjZSgvXFwoKFteKV0rKVxcKS8sIFwiXCIpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG5cclxuICAgIGlmICh0aGlzLmlzVGFza0FscmVhZHlFeGlzdChlZGl0ZWRUYXNrTmFtZSkpIHtcclxuICAgICAgaWYgKGVkaXRlZFRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSAhPT0gdGFza05hbWVUb0NoYW5nZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgXCJzdWJtaXRcIixcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0VGFzayhldmVudCwgdGFzayk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyBvbmNlOiB0cnVlIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJpbmJveFwiIHx8IHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0b2RheVwiIHx8IHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0aGlzd2Vla1wiKSB7XHJcbiAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgIGlmICh0YXNrLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRhc2tOYW1lVG9DaGFuZ2UpIHtcclxuICAgICAgICAgIHRhc2submFtZSA9IGVkaXRlZFRhc2tOYW1lO1xyXG4gICAgICAgICAgdGFzay5kdWVEYXRlID0gZWRpdGVkRHVlRGF0ZTtcclxuICAgICAgICAgIHRhc2sucHJpb3JpdHkgPSBlZGl0ZWRQcmlvcml0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWVUb0NoYW5nZSAmJiB0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSB0aGlzLmFjdGl2ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgICB0YXNrLm5hbWUgPSBlZGl0ZWRUYXNrTmFtZTtcclxuICAgICAgICAgIHRhc2suZHVlRGF0ZSA9IGVkaXRlZER1ZURhdGU7XHJcbiAgICAgICAgICB0YXNrLnByaW9yaXR5ID0gZWRpdGVkUHJpb3JpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIGNyZWF0ZVRhc2tDb250YWluZXIodGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCB3aGljaFByb2plY3QpIHtcclxuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuXHJcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VDaGVja2VkKTtcclxuICAgIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrYm94XCIpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChgJHtwcmlvcml0eX1gKTtcclxuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICBjaGVja2JveC5uYW1lID0gXCJjaGVja2JveC10YXNrXCI7XHJcbiAgICBjaGVja2JveC5pZCA9IHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuICAgIGNoZWNrYm94LmNoZWNrZWQgPSBjaGVja2VkO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgbGFiZWwuaHRtbEZvciA9IHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuXHJcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBuYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XHJcbiAgICB3aGljaFByb2plY3QgPyAobmFtZS50ZXh0Q29udGVudCA9IGAke3Rhc2tOYW1lfSAoJHt3aGljaFByb2plY3R9KWApIDogKG5hbWUudGV4dENvbnRlbnQgPSBgJHt0YXNrTmFtZX1gKTtcclxuXHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBkYXRlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRhdGVcIik7XHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gYCR7ZHVlRGF0ZX1gO1xyXG5cclxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWVkaXRcIik7XHJcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUVkaXRUYXNrKTtcclxuXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJidXR0b24tZGVsZXRlXCIpO1xyXG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlbGV0ZVRhc2spO1xyXG5cclxuICAgIGxhYmVsLmFwcGVuZENoaWxkKG5hbWUpO1xyXG4gICAgbGFiZWwuYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChlZGl0QnRuKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgICB0aGlzLnRhc2tUb0RvLmFwcGVuZCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2tUb0FycmF5KGFjdGl2ZVByb2plY3QsIHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCkge1xyXG4gICAgY29uc3QgdGFzayA9IHtcclxuICAgICAgcHJvamVjdE5hbWU6IGFjdGl2ZVByb2plY3QsXHJcbiAgICAgIG5hbWU6IHRhc2tOYW1lLFxyXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgIGNoZWNrZWQ6IGNoZWNrZWQsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU5ld1Rhc2sgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICBpZiAodGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID09IFwiRWRpdCBUYXNrXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Rhc2tBbHJlYWR5RXhpc3QodGFza05hbWUpKSByZXR1cm4gdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmNyZWF0ZU5ld1Rhc2ssIHsgb25jZTogdHJ1ZSB9KTtcclxuXHJcbiAgICB0aGlzLmFkZFRhc2tUb0FycmF5KHRoaXMuYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5LCBmYWxzZSk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJBY3RpdmVQcm9qZWN0VGFzaygpIHtcclxuICAgIGxldCBhY3RpdmVQcm9qZWN0VGFzayA9IFtdO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5wcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGFjdGl2ZVByb2plY3RUYXNrLnB1c2godGFzayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGFjdGl2ZVByb2plY3RUYXNrLmZvckVhY2goKGFjdGl2ZVRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcihhY3RpdmVUYXNrLm5hbWUsIGFjdGl2ZVRhc2suZHVlRGF0ZSwgYWN0aXZlVGFzay5wcmlvcml0eSwgYWN0aXZlVGFzay5jaGVja2VkKSk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQWxsVGFza3MoKSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBbXTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgYWxsVGFza3MucHVzaCh0YXNrKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFsbFRhc2tzLmZvckVhY2goKHRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcih0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSwgdGFzay5wcmlvcml0eSwgdGFzay5jaGVja2VkLCB0YXNrLnByb2plY3ROYW1lKSk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQWxsVG9kYXlzVGFza3MoKSB7XHJcbiAgICBsZXQgdG9kYXlUYXNrcyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICAgIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBtb250aCA+PSAxMCA/IChtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEpIDogKG1vbnRoID0gYDAke2RhdGUuZ2V0TW9udGgoKSArIDF9YCk7XHJcbiAgICBkYXkgPj0gMTAgPyAoZGF5ID0gZGF0ZS5nZXREYXRlKCkpIDogKGRheSA9IGAwJHtkYXRlLmdldERhdGUoKX1gKTtcclxuXHJcbiAgICBsZXQgdG9kYXlEYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2suZHVlRGF0ZSA9PSB0b2RheURhdGUpIHtcclxuICAgICAgICB0b2RheVRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRvZGF5VGFza3MuZm9yRWFjaCgodG9kYXlUYXNrKSA9PiB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIodG9kYXlUYXNrLm5hbWUsIHRvZGF5VGFzay5kdWVEYXRlLCB0b2RheVRhc2sucHJpb3JpdHksIHRvZGF5VGFzay5jaGVja2VkLCB0b2RheVRhc2sucHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0RGF5KHllYXIsIG1vbnRoKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckFsbFdlZWtzVGFza3MoKSB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICAgIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBsZXQgdGhpc1dlZWtUYXNrcyA9IFtdO1xyXG4gICAgbGV0IHRoaXNXZWVrRGF0ZXNUYXNrcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmdldExhc3REYXkoeWVhciwgbW9udGgpID09IGRheSkge1xyXG4gICAgICAgIGRheSA9IDE7XHJcbiAgICAgICAgbW9udGggKz0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKE51bWJlcihtb250aCkgPiAxMikge1xyXG4gICAgICAgIG1vbnRoID0gMTtcclxuICAgICAgICB5ZWFyICs9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRheSA+PSAxMCA/IChkYXkgPSBOdW1iZXIoZGF5KSkgOiAoZGF5ID0gYDAke051bWJlcihkYXkpfWApO1xyXG4gICAgICBtb250aCA+PSAxMCA/IChtb250aCA9IE51bWJlcihtb250aCkpIDogKG1vbnRoID0gYDAke051bWJlcihtb250aCl9YCk7XHJcbiAgICAgIGxldCB0aGlzV2Vla0RhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG4gICAgICB0aGlzV2Vla0RhdGVzVGFza3MucHVzaCh0aGlzV2Vla0RhdGUpO1xyXG5cclxuICAgICAgZGF5ID0gTnVtYmVyKGRheSkgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXNXZWVrRGF0ZXNUYXNrcy5mb3JFYWNoKCh3ZWVrVGFzaykgPT4ge1xyXG4gICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICBpZiAodGFzay5kdWVEYXRlID09IHdlZWtUYXNrKSB7XHJcbiAgICAgICAgICB0aGlzV2Vla1Rhc2tzLnB1c2godGFzayk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXNXZWVrVGFza3MuZm9yRWFjaCgodGhpc1dlZWtUYXNrKSA9PiB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIodGhpc1dlZWtUYXNrLm5hbWUsIHRoaXNXZWVrVGFzay5kdWVEYXRlLCB0aGlzV2Vla1Rhc2sucHJpb3JpdHksIHRoaXNXZWVrVGFzay5jaGVja2VkLCB0aGlzV2Vla1Rhc2sucHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJUYXNrcygpIHtcclxuICAgIHRoaXMudGFza1RvRG8uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHRoaXMucHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSB0aGlzLmFjdGl2ZVByb2plY3Q7XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJpbmJveFwiKSByZXR1cm4gdGhpcy5yZW5kZXJBbGxUYXNrcygpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0b2RheVwiKSByZXR1cm4gdGhpcy5yZW5kZXJBbGxUb2RheXNUYXNrcygpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0aGlzd2Vla1wiKSByZXR1cm4gdGhpcy5yZW5kZXJBbGxXZWVrc1Rhc2tzKCk7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3RpdmVQcm9qZWN0VGFzaygpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ2hlY2tlZCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWVXaXRob3V0U3BhY2VzID0gdGFza05hbWVcclxuICAgICAgLnJlcGxhY2UoL1xcKChbXildKylcXCkvLCBcIlwiKVxyXG4gICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuICAgIGNvbnN0IGFjdGl2ZVByb2plY3RXaXRob3V0U3BhY2VzID0gdGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWVXaXRob3V0U3BhY2VzICYmIGFjdGl2ZVByb2plY3RXaXRob3V0U3BhY2VzID09IHRhc2sucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgdGFzay5jaGVja2VkID0gIXRhc2suY2hlY2tlZDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9O1xyXG5cclxuICByZW1vdmVBbGxUYXNrRnJvbVByb2plY3QocmVtb3ZlUHJvamVjdCkge1xyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKChyZW1vdmVUYXNrKSA9PiB7XHJcbiAgICAgIGlmIChyZW1vdmVUYXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSByZW1vdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVRhc2tzSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleCgodGFza0luZGV4KSA9PiB0YXNrSW5kZXgucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHJlbW92ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKTtcclxuICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShkZWxldGVUYXNrc0luZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVQcm9qZWN0ID0gXCJpbmJveFwiO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVGFzayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCB0YXNrRGVsZXRlSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleCgodGFzaykgPT4gdGFzay5uYW1lID09IHRhc2tOYW1lKTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyVGFza3NSZW1haW5pbmlnID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbnVtYmVyT2ZUYXNrcyA9IHRoaXMudGFza1RvRG8ucXVlcnlTZWxlY3RvckFsbChgLnRhc2sgaW5wdXRbbmFtZT1cImNoZWNrYm94LXRhc2tcIl06bm90KDpjaGVja2VkKWApLmxlbmd0aDtcclxuICAgIHRoaXMucHJvamVjdFRhc2tRdWFudGl0eS50ZXh0Q29udGVudCA9IG51bWJlck9mVGFza3M7XHJcbiAgfTtcclxuXHJcbiAgY2xlYXJDb21wbGV0ZWRUYXNrID0gKCkgPT4ge1xyXG4gICAgbGV0IGNvbXBsZXRlVGFza3MgPSBbXTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRUYXNrc0NoZWNrYm94ZXMgPSB0aGlzLnRhc2tUb0RvLnF1ZXJ5U2VsZWN0b3JBbGwoYC50YXNrIGlucHV0W25hbWU9XCJjaGVja2JveC10YXNrXCJdOmNoZWNrZWRgKTtcclxuICAgIGNvbXBsZXRlZFRhc2tzQ2hlY2tib3hlcy5mb3JFYWNoKChjb21wbGV0ZVRhc2tjaGVja2JveCkgPT4gY29tcGxldGVUYXNrcy5wdXNoKGNvbXBsZXRlVGFza2NoZWNrYm94LmNsb3Nlc3QoXCIudGFza1wiKSkpO1xyXG5cclxuICAgIGNvbXBsZXRlVGFza3MuZm9yRWFjaCgoY29tcGxldGVUYXNrKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhc2tOYW1lID0gY29tcGxldGVUYXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpLnRleHRDb250ZW50O1xyXG4gICAgICBjb25zdCB0YXNrRGVsZXRlSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleCgodGFzaykgPT4gdGFzay5uYW1lID09IHRhc2tOYW1lKTtcclxuICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGFza0RlbGV0ZUluZGV4LCAxKTtcclxuICAgICAgY29tcGxldGVUYXNrLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVaSB7XHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLW1lbnVcIik7XHJcbiAgICB0aGlzLnRvZ2dsZVNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblNpZGViYXIpO1xyXG4gICAgdGhpcy5zaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xyXG4gIH1cclxuXHJcbiAgb3BlblNpZGViYXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMudG9nZ2xlU2lkZWJhcikge1xyXG4gICAgICBjb25zdCB0b2dnbGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtbWVudVwiKTtcclxuICAgICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcclxuICAgICAgdG9nZ2xlU2lkZWJhci5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcInNpZGViYXItYWN0aXZlXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJzaWRlYmFyLWFjdGl2ZVwiKTtcclxuICB9O1xyXG5cclxuICBzY3JlZW5EaW1taW5nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcG9wdXBTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXNjcmVlblwiKTtcclxuICAgIHBvcHVwU2NyZWVuLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gIH07XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVWkgZnJvbSBcIi4vbW9kdWxlcy9VSVwiO1xyXG5pbXBvcnQgVGFzayBmcm9tIFwiLi9tb2R1bGVzL1Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdHNcIjtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgY29uc3QgdWkgPSBuZXcgVWkoKTtcclxuICAvLyBjb25zdCB0YXNrID0gbmV3IFRhc2soKTtcclxuICBjb25zdCBQcm9qZWN0ID0gbmV3IFByb2plY3RzKCk7XHJcblxyXG4gIHVpLmluaXQoKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
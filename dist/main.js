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

    project.innerHTML = `<img src="img/task-list.svg" aria-label="none"/> ${projectName}`;
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

    this.taskToDo = document.querySelector(".task-to-do");
    this.popupForm = document.querySelector(".popup-task-form");

    this.buttonTaskAdd.addEventListener("click", this.toggleAddTask);
    this.buttonTaskClear.addEventListener("click", this.clearCompletedTask);
    this.popupTaskActionCancel.addEventListener("click", this.togglePopupForm);

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

    this.popupForm.addEventListener("submit", this.createNewTask, {once: true});
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

    this.popupForm.addEventListener(
      "submit",
      () => {
        this.editTask(event, task);
      },
      {once: true}
    );
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
    checkbox.id = taskName.toLowerCase().replace(/\s+/g, "");

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

  addTaskToArray(activeProject, taskName, dueDate, priority) {
    const task = {
      projectName: activeProject,
      name: taskName,
      dueDate: dueDate,
      priority: priority,
    };

    this.tasks.push(task);
  }

  createNewTask = (e) => {
    e.preventDefault();

    if (this.popupNameActionText.textContent == "Edit Task") return;

    let isAlreadyExist = false;

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    this.tasks.forEach((task) => {
      if (task.name == taskName && task.projectName == this.activeProject) isAlreadyExist = true;
    });

    if (isAlreadyExist) return;

    this.addTaskToArray(this.activeProject, taskName, dueDate, priority);
    this.renderTasks();
    this.togglePopupForm();
    this.renderTasksRemaininig();
  };

  editTask = (e, task) => {
    e.preventDefault();
    if (this.popupNameActionText.textContent == "New Task") return;

    const taskName = task.querySelector(".task-name");
    const editedTaskName = document.getElementById("task-name").value;
    const editedDueDate = document.getElementById("date").value;
    const editedPriority = document.getElementById("priority").value;

    const taskNameToChange = taskName.textContent
      .replace(/\(([^)]+)\)/, "")
      .toLowerCase()
      .replace(/\s+/g, "");

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
        if (task.name.toLowerCase().replace(/\s+/g, "") == taskNameToChange || task.projectName.toLowerCase().replace(/\s+/g, "") == this.activeProject.toLowerCase().replace(/\s+/g, "")) {
          task.name = editedTaskName;
          task.dueDate = editedDueDate;
          task.priority = editedPriority;
        }
      });
    }

    this.renderTasks();
    this.togglePopupForm();
  };

  renderAllTasks() {
    let allTasks = [];

    this.tasks.forEach((task) => {
      allTasks.push(task);
    });

    allTasks.forEach((task) => this.createTaskContainer(task.name, task.dueDate, task.priority, task.projectName));
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

    let fullDate = `${year}-${month}-${day}`;

    this.tasks.forEach((task) => {
      if (task.dueDate == fullDate) {
        todayTasks.push(task);
      }
    });

    todayTasks.forEach((todayTask) => this.createTaskContainer(todayTask.name, todayTask.dueDate, todayTask.priority, todayTask.projectName));
    this.renderTasksRemaininig();
  }

  renderAllWeeksTasks() {}

  renderTasks() {
    this.taskToDo.innerHTML = "";
    this.projectName.textContent = this.activeProject;

    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "inbox") return this.renderAllTasks();
    if (this.activeProject.toLowerCase().replace(/\s+/g, "") == "today") return this.renderAllTodaysTasks();
    // if (this.activeProject.toLocaleLowerCase() == "this week") return this.renderAllWeeksTasks();

    let activeProjectTask = [];

    this.tasks.forEach((task) => {
      if (task.projectName.toLowerCase().replace(/\s+/g, "") == this.activeProject.toLowerCase().replace(/\s+/g, "")) {
        activeProjectTask.push(task);
      }
    });

    activeProjectTask.forEach((activeTask) => this.createTaskContainer(activeTask.name, activeTask.dueDate, activeTask.priority));
    this.renderTasksRemaininig();
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsbURBQUU7QUFDbkI7QUFDQSxzQkFBc0IseURBQVE7QUFDOUI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiO1xyXG5pbXBvcnQgVWkgZnJvbSBcIi4vVUlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RzIHtcclxuICBwcm9qZWN0TGlzdCA9IFtcIkNyZWF0ZSBUbyBEbyBBcHBcIiwgXCJNYWtlIGEgdmlkZW9cIiwgXCJNYWtlIGRpbm5lclwiXTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhclwiKTtcclxuICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXByb2plY3QtYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtcHJvamVjdC1hZGRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXByb2plY3QtaW5wdXRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYnV0dG9uLWNhbmNlbFwiKTtcclxuICAgIHRoaXMucHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWRlbGV0ZS1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy51c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1saXN0XCIpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLWRlYWZ1bHQtcHJvamVjdFwiKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25BZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWRkUHJvamVjdCk7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUlucHV0UHJvamVjdEFkZCk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KSk7XHJcbiAgICB0aGlzLnByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZGVsZXRlUHJvamVjdCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgdGhpcy50YXNrID0gbmV3IFRhc2soKTtcclxuICAgIHRoaXMudWkgPSBuZXcgVWkoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgcHJvamVjdC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCJpbWcvdGFzay1saXN0LnN2Z1wiIGFyaWEtbGFiZWw9XCJub25lXCIvPiAke3Byb2plY3ROYW1lfWA7XHJcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpO1xyXG5cclxuICAgIHJldHVybiBwcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSB7XHJcbiAgICBsZXQgaXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBidG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0blByb2plY3QpID0+IHtcclxuICAgICAgaWYgKGJ0blByb2plY3QudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG5Qcm9qZWN0KSA9PiB7XHJcbiAgICAgIGlmIChidG5Qcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBwcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpIHtcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpc0FscmVhZHlFeGlzdDtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXByb2plY3ROYW1lIHx8IHRoaXMuaXNQcm9qZWN0QWxyZWFkeUV4aXN0KHByb2plY3ROYW1lKSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucHJvamVjdExpc3QucHVzaChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGQoKTtcclxuICB9O1xyXG5cclxuICBkZWxldGVQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWN0aXZlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXByb2plY3QuYWN0aXZlXCIpO1xyXG5cclxuICAgIGlmICghYWN0aXZlUHJvamVjdCkgcmV0dXJuO1xyXG5cclxuICAgIGFjdGl2ZVByb2plY3QucmVtb3ZlKCk7XHJcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlSW5kZXggPSB0aGlzLnByb2plY3RMaXN0LmZpbmRJbmRleCgocHJvamVjdCkgPT4gcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gYWN0aXZlUHJvamVjdC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpO1xyXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IHRoaXMucHJvamVjdExpc3Quc3BsaWNlKHByb2plY3REZWxldGVJbmRleCwgMSk7XHJcblxyXG4gICAgdGhpcy50YXNrLnJlbW92ZUFsbFRhc2tGcm9tUHJvamVjdChyZW1vdmVQcm9qZWN0WzBdKTtcclxuICB9O1xyXG5cclxuICBjaGFuZ2VQcm9qZWN0ID0gKGUpID0+IHtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHJcbiAgICB0aGlzLnRhc2suYWN0aXZlUHJvamVjdCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgdGhpcy50YXNrLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnVpLm9wZW5TaWRlYmFyKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICB0aGlzLnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3ROYW1lKSA9PiB0aGlzLnVzZXJQcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSkpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlSW5wdXRQcm9qZWN0QWRkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgVWkgZnJvbSBcIi4vVUlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgdGFza3MgPSBbXHJcbiAgICB7XHJcbiAgICAgIHByb2plY3ROYW1lOiBcIkNyZWF0ZSBUbyBEbyBBcHBcIixcclxuICAgICAgbmFtZTogXCJDcmVhdGUgQ1NTXCIsXHJcbiAgICAgIGR1ZURhdGU6IFwiMjAyMy0wMi0wN1wiLFxyXG4gICAgICBwcmlvcml0eTogXCJsb3dcIixcclxuICAgIH0sXHJcbiAgXTtcclxuICBhY3RpdmVQcm9qZWN0ID0gXCJpbmJveFwiO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudWkgPSBuZXcgVWkoKTtcclxuICAgIHRoaXMucHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbmFtZVwiKTtcclxuICAgIHRoaXMucHJvamVjdFRhc2tRdWFudGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10YXNrLXF1YW50aXR5XCIpO1xyXG4gICAgdGhpcy5idXR0b25UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tdGFzay1hZGRcIik7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXRhc2stY2xlYXJcIik7XHJcblxyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1uYW1lLWFjdGlvbiBwXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stYWN0aW9uXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stZXZlbnQtY2FuY2VsXCIpO1xyXG5cclxuICAgIHRoaXMudGFza1RvRG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdG8tZG9cIik7XHJcbiAgICB0aGlzLnBvcHVwRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtdGFzay1mb3JtXCIpO1xyXG5cclxuICAgIHRoaXMuYnV0dG9uVGFza0FkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVBZGRUYXNrKTtcclxuICAgIHRoaXMuYnV0dG9uVGFza0NsZWFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsZWFyQ29tcGxldGVkVGFzayk7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVQb3B1cEZvcm0pO1xyXG5cclxuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVQb3B1cEZvcm0gPSAoKSA9PiB7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcclxuICAgIHRoaXMudWkuc2NyZWVuRGltbWluZygpO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUFkZFRhc2sgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID0gXCJOZXcgVGFza1wiO1xyXG5cclxuICAgIGNvbnN0IGZvcm1UYXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZm9ybUR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIik7XHJcbiAgICBjb25zdCBmb3JtUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpO1xyXG5cclxuICAgIGZvcm1UYXNrTmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICBmb3JtRHVlRGF0ZS52YWx1ZSA9IFwiXCI7XHJcbiAgICBmb3JtUHJpb3JpdHkudmFsdWUgPSBcImxvd1wiO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5jcmVhdGVOZXdUYXNrLCB7b25jZTogdHJ1ZX0pO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUVkaXRUYXNrID0gKGUpID0+IHtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPSBcIkVkaXQgVGFza1wiO1xyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3QgZm9ybVRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIik7XHJcbiAgICBjb25zdCBmb3JtRHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKTtcclxuICAgIGNvbnN0IGZvcm1Qcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIik7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIik7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IHRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLWNoZWNrYm94XCIpO1xyXG5cclxuICAgIGZvcm1UYXNrTmFtZS52YWx1ZSA9IHRhc2tOYW1lLnRleHRDb250ZW50LnJlcGxhY2UoL1xcKChbXildKylcXCkvLCBcIlwiKTtcclxuICAgIGZvcm1EdWVEYXRlLnZhbHVlID0gZHVlRGF0ZS50ZXh0Q29udGVudDtcclxuICAgIGZvcm1Qcmlvcml0eS52YWx1ZSA9IHByaW9yaXR5LmNsYXNzTGlzdFsxXTtcclxuXHJcbiAgICB0aGlzLnBvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcInN1Ym1pdFwiLFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lZGl0VGFzayhldmVudCwgdGFzayk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHtvbmNlOiB0cnVlfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjcmVhdGVUYXNrQ29udGFpbmVyKHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSwgd2hpY2hQcm9qZWN0KSB7XHJcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcblxyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKGAke3ByaW9yaXR5fWApO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94Lm5hbWUgPSBcImNoZWNrYm94LXRhc2tcIjtcclxuICAgIGNoZWNrYm94LmlkID0gdGFza05hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpO1xyXG5cclxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgbGFiZWwuaHRtbEZvciA9IHRhc2tOYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcclxuXHJcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBuYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XHJcbiAgICB3aGljaFByb2plY3QgPyAobmFtZS50ZXh0Q29udGVudCA9IGAke3Rhc2tOYW1lfSAoJHt3aGljaFByb2plY3R9KWApIDogKG5hbWUudGV4dENvbnRlbnQgPSBgJHt0YXNrTmFtZX1gKTtcclxuXHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBkYXRlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRhdGVcIik7XHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gYCR7ZHVlRGF0ZX1gO1xyXG5cclxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWVkaXRcIik7XHJcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUVkaXRUYXNrKTtcclxuXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJidXR0b24tZGVsZXRlXCIpO1xyXG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlbGV0ZVRhc2spO1xyXG5cclxuICAgIGxhYmVsLmFwcGVuZENoaWxkKG5hbWUpO1xyXG4gICAgbGFiZWwuYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChlZGl0QnRuKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgICB0aGlzLnRhc2tUb0RvLmFwcGVuZCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2tUb0FycmF5KGFjdGl2ZVByb2plY3QsIHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSkge1xyXG4gICAgY29uc3QgdGFzayA9IHtcclxuICAgICAgcHJvamVjdE5hbWU6IGFjdGl2ZVByb2plY3QsXHJcbiAgICAgIG5hbWU6IHRhc2tOYW1lLFxyXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU5ld1Rhc2sgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPT0gXCJFZGl0IFRhc2tcIikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBpc0FscmVhZHlFeGlzdCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5uYW1lID09IHRhc2tOYW1lICYmIHRhc2sucHJvamVjdE5hbWUgPT0gdGhpcy5hY3RpdmVQcm9qZWN0KSBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXNBbHJlYWR5RXhpc3QpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmFkZFRhc2tUb0FycmF5KHRoaXMuYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5KTtcclxuICAgIHRoaXMucmVuZGVyVGFza3MoKTtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH07XHJcblxyXG4gIGVkaXRUYXNrID0gKGUsIHRhc2spID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICh0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPT0gXCJOZXcgVGFza1wiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSB0YXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZWRpdGVkVGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGVkaXRlZER1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIikudmFsdWU7XHJcbiAgICBjb25zdCBlZGl0ZWRQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWVUb0NoYW5nZSA9IHRhc2tOYW1lLnRleHRDb250ZW50XHJcbiAgICAgIC5yZXBsYWNlKC9cXCgoW14pXSspXFwpLywgXCJcIilcclxuICAgICAgLnRvTG93ZXJDYXNlKClcclxuICAgICAgLnJlcGxhY2UoL1xccysvZywgXCJcIik7XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJpbmJveFwiIHx8IHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0b2RheVwiIHx8IHRoaXMuYWN0aXZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gXCJ0aGlzd2Vla1wiKSB7XHJcbiAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgIGlmICh0YXNrLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHRhc2tOYW1lVG9DaGFuZ2UpIHtcclxuICAgICAgICAgIHRhc2submFtZSA9IGVkaXRlZFRhc2tOYW1lO1xyXG4gICAgICAgICAgdGFzay5kdWVEYXRlID0gZWRpdGVkRHVlRGF0ZTtcclxuICAgICAgICAgIHRhc2sucHJpb3JpdHkgPSBlZGl0ZWRQcmlvcml0eTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2submFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGFza05hbWVUb0NoYW5nZSB8fCB0YXNrLnByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSB0aGlzLmFjdGl2ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgICB0YXNrLm5hbWUgPSBlZGl0ZWRUYXNrTmFtZTtcclxuICAgICAgICAgIHRhc2suZHVlRGF0ZSA9IGVkaXRlZER1ZURhdGU7XHJcbiAgICAgICAgICB0YXNrLnByaW9yaXR5ID0gZWRpdGVkUHJpb3JpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclRhc2tzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckFsbFRhc2tzKCkge1xyXG4gICAgbGV0IGFsbFRhc2tzID0gW107XHJcblxyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGFsbFRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhbGxUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIodGFzay5uYW1lLCB0YXNrLmR1ZURhdGUsIHRhc2sucHJpb3JpdHksIHRhc2sucHJvamVjdE5hbWUpKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJBbGxUb2RheXNUYXNrcygpIHtcclxuICAgIGxldCB0b2RheVRhc2tzID0gW107XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICBsZXQgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgbW9udGggPj0gMTAgPyAobW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxKSA6IChtb250aCA9IGAwJHtkYXRlLmdldE1vbnRoKCkgKyAxfWApO1xyXG4gICAgZGF5ID49IDEwID8gKGRheSA9IGRhdGUuZ2V0RGF0ZSgpKSA6IChkYXkgPSBgMCR7ZGF0ZS5nZXREYXRlKCl9YCk7XHJcblxyXG4gICAgbGV0IGZ1bGxEYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2suZHVlRGF0ZSA9PSBmdWxsRGF0ZSkge1xyXG4gICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdG9kYXlUYXNrcy5mb3JFYWNoKCh0b2RheVRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcih0b2RheVRhc2submFtZSwgdG9kYXlUYXNrLmR1ZURhdGUsIHRvZGF5VGFzay5wcmlvcml0eSwgdG9kYXlUYXNrLnByb2plY3ROYW1lKSk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQWxsV2Vla3NUYXNrcygpIHt9XHJcblxyXG4gIHJlbmRlclRhc2tzKCkge1xyXG4gICAgdGhpcy50YXNrVG9Eby5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRoaXMuYWN0aXZlUHJvamVjdDtcclxuXHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcImluYm94XCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFRhc2tzKCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PSBcInRvZGF5XCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFRvZGF5c1Rhc2tzKCk7XHJcbiAgICAvLyBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ0aGlzIHdlZWtcIikgcmV0dXJuIHRoaXMucmVuZGVyQWxsV2Vla3NUYXNrcygpO1xyXG5cclxuICAgIGxldCBhY3RpdmVQcm9qZWN0VGFzayA9IFtdO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5wcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gdGhpcy5hY3RpdmVQcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSkge1xyXG4gICAgICAgIGFjdGl2ZVByb2plY3RUYXNrLnB1c2godGFzayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGFjdGl2ZVByb2plY3RUYXNrLmZvckVhY2goKGFjdGl2ZVRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcihhY3RpdmVUYXNrLm5hbWUsIGFjdGl2ZVRhc2suZHVlRGF0ZSwgYWN0aXZlVGFzay5wcmlvcml0eSkpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUFsbFRhc2tGcm9tUHJvamVjdChyZW1vdmVQcm9qZWN0KSB7XHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHJlbW92ZVRhc2spID0+IHtcclxuICAgICAgaWYgKHJlbW92ZVRhc2sucHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09IHJlbW92ZVByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlVGFza3NJbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KCh0YXNrSW5kZXgpID0+IHRhc2tJbmRleC5wcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT0gcmVtb3ZlUHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpO1xyXG4gICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGRlbGV0ZVRhc2tzSW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFjdGl2ZVByb2plY3QgPSBcImluYm94XCI7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVUYXNrID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKS50ZXh0Q29udGVudDtcclxuICAgIGNvbnN0IHRhc2tEZWxldGVJbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KCh0YXNrKSA9PiB0YXNrLm5hbWUgPT0gdGFza05hbWUpO1xyXG5cclxuICAgIHRoaXMudGFza3Muc3BsaWNlKHRhc2tEZWxldGVJbmRleCwgMSk7XHJcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJUYXNrc1JlbWFpbmluaWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBudW1iZXJPZlRhc2tzID0gdGhpcy50YXNrVG9Eby5xdWVyeVNlbGVjdG9yQWxsKGAudGFzayBpbnB1dFtuYW1lPVwiY2hlY2tib3gtdGFza1wiXTpub3QoOmNoZWNrZWQpYCkubGVuZ3RoO1xyXG4gICAgdGhpcy5wcm9qZWN0VGFza1F1YW50aXR5LnRleHRDb250ZW50ID0gbnVtYmVyT2ZUYXNrcztcclxuICB9O1xyXG5cclxuICBjbGVhckNvbXBsZXRlZFRhc2sgPSAoKSA9PiB7XHJcbiAgICBsZXQgY29tcGxldGVUYXNrcyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzQ2hlY2tib3hlcyA9IHRoaXMudGFza1RvRG8ucXVlcnlTZWxlY3RvckFsbChgLnRhc2sgaW5wdXRbbmFtZT1cImNoZWNrYm94LXRhc2tcIl06Y2hlY2tlZGApO1xyXG4gICAgY29tcGxldGVkVGFza3NDaGVja2JveGVzLmZvckVhY2goKGNvbXBsZXRlVGFza2NoZWNrYm94KSA9PiBjb21wbGV0ZVRhc2tzLnB1c2goY29tcGxldGVUYXNrY2hlY2tib3guY2xvc2VzdChcIi50YXNrXCIpKSk7XHJcblxyXG4gICAgY29tcGxldGVUYXNrcy5mb3JFYWNoKChjb21wbGV0ZVRhc2spID0+IHtcclxuICAgICAgY29uc3QgdGFza05hbWUgPSBjb21wbGV0ZVRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IHRhc2tEZWxldGVJbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KCh0YXNrKSA9PiB0YXNrLm5hbWUgPT0gdGFza05hbWUpO1xyXG4gICAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgICBjb21wbGV0ZVRhc2sucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpIHtcclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtbWVudVwiKTtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2lkZWJhcik7XHJcbiAgICB0aGlzLnNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XHJcbiAgfVxyXG5cclxuICBvcGVuU2lkZWJhciA9ICgpID0+IHtcclxuICAgIGlmICghdGhpcy50b2dnbGVTaWRlYmFyKSB7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZVNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1tZW51XCIpO1xyXG4gICAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xyXG4gICAgICB0b2dnbGVTaWRlYmFyLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKFwic2lkZWJhci1hY3RpdmVcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcInNpZGViYXItYWN0aXZlXCIpO1xyXG4gIH07XHJcblxyXG4gIHNjcmVlbkRpbW1pbmcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3B1cFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtc2NyZWVuXCIpO1xyXG4gICAgcG9wdXBTY3JlZW4uY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgfTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVaSBmcm9tIFwiLi9tb2R1bGVzL1VJXCI7XHJcbmltcG9ydCBUYXNrIGZyb20gXCIuL21vZHVsZXMvVGFza1wiO1xyXG5pbXBvcnQgUHJvamVjdHMgZnJvbSBcIi4vbW9kdWxlcy9Qcm9qZWN0c1wiO1xyXG5cclxuaW5pdCgpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBjb25zdCB1aSA9IG5ldyBVaSgpO1xyXG4gIC8vIGNvbnN0IHRhc2sgPSBuZXcgVGFzaygpO1xyXG4gIGNvbnN0IFByb2plY3QgPSBuZXcgUHJvamVjdHMoKTtcclxuXHJcbiAgdWkuaW5pdCgpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
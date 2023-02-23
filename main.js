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


class Projects {
  constructor() {
    this.task = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.btnAddProject = document.querySelector(".button-project-add");

    this.projectAddSection = document.querySelector(".popup-project-add");
    this.projectSectionInput = document.querySelector(".popup-project-input");
    this.projectSectionAddBtn = document.querySelector(".popup-button-add");
    this.projectSectionCancelBtn = document.querySelector(".popup-button-cancel");
    this.projectName = document.querySelector(".project-name");

    this.userProjectsList = document.querySelector(".projects-list");
    this.btnsDeafultsProjects = document.querySelectorAll(".button-deafult-project");
    this.btnsUserProjects = document.querySelectorAll(".button-project");

    this.btnAddProject.addEventListener("click", this.toggleInputProjectAdd);
    this.projectSectionAddBtn.addEventListener("click", this.addProject);
    this.projectSectionCancelBtn.addEventListener("click", this.toggleInputProjectAdd);

    this.btnsDeafultsProjects.forEach((btn) => btn.addEventListener("click", this.changeProject));
    this.btnsUserProjects.forEach((btn) => btn.addEventListener("click", this.changeProject));
  }

  createProjectBtn(projectName) {
    const project = document.createElement("button");
    project.classList.add("button-project");

    project.innerHTML = `<img src="img/task-list.svg" aria-label="none"/> ${projectName}`;
    project.addEventListener("click", this.changeProject);

    return project;
  }

  addProject = () => {
    const projectName = this.projectSectionInput.value;

    if (!projectName) return;

    this.userProjectsList.appendChild(this.createProjectBtn(projectName));

    this.toggleInputProjectAdd();
  };

  changeProject = (e) => {
    this.btnsUserProjects = document.querySelectorAll(".button-project");
    this.btnsUserProjects.forEach((btn) => btn.classList.remove("active"));
    this.btnsDeafultsProjects.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    this.projectName.textContent = e.target.textContent;

    this.task.activeProject = e.target.textContent;
    this.task.renderTasks();
  };

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
class Task {
  tasks = [];
  popupAction = "New Task";
  activeProject = "Create To Do App";

  constructor() {
    this.buttonTaskAdd = document.querySelector(".button-task-add");
    this.buttonTaskClear = document.querySelector(".button-task-clear");

    this.popupNameActionText = document.querySelector(".popup-name-action p");
    this.popupTaskAction = document.querySelector(".popup-task-action");
    this.popupTaskActionCancel = document.querySelector(".popup-task-event-cancel");
    this.taskToDo = document.querySelector(".task-to-do");
    this.popupForm = document.querySelector(".popup-task-form");
    this.projectTaskQuantity = document.querySelector(".project-task-quantity");

    this.buttonTaskAdd.addEventListener("click", this.toggleAddTask);
    this.buttonTaskClear.addEventListener("click", this.clearCompletedTask);
    this.popupTaskActionCancel.addEventListener("click", this.removeFormListeners);
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

  createTaskContainer(taskName, dueDate, priority) {
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
    this.popupForm.removeEventListener("submit", this.createNewTask);

    let isAlreadyExist = false;

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    this.tasks.forEach((task) => {
      if (task.name == taskName && task.projectName == this.activeProject) isAlreadyExist = true;
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

    allTasks.forEach((task) => this.createTaskContainer(task.name, task.dueDate, task.priority));
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

    todayTasks.forEach((todayTask) => this.createTaskContainer(todayTask.name, todayTask.dueDate, todayTask.priority));
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

    if (this.activeProject.toLocaleLowerCase() == "inbox") return this.renderAllTasks();
    if (this.activeProject.toLocaleLowerCase() == "today") return this.renderAllTodaysTasks();
    // if (this.activeProject.toLocaleLowerCase() == "this week") return this.renderAllWeeksTasks();

    let activeProjectTask = [];

    this.tasks.forEach((task) => {
      if (task.projectName == this.activeProject) {
        activeProjectTask.push(task);
      }
    });

    activeProjectTask.forEach((activeTask) => this.createTaskContainer(activeTask.name, activeTask.dueDate, activeTask.priority));
    this.renderTasksRemaininig();
  }

  deleteTask = (e) => {
    const taskName = e.target.parentNode.querySelector(".task-name").textContent;
    const taskDeleteIndex = this.tasks.findIndex((task) => task.name == taskName);

    this.tasks.splice(taskDeleteIndex, 1);
    e.target.parentNode.remove();
  };

  editTask = (e) => {
    this.toggleEditTask();

    const taskName = e.target.parentNode.querySelector(".task-name");
    const dueDate = e.target.parentNode.querySelector(".task-date");
    const priority = e.target.parentNode.querySelector(".task-checkbox");

    this.popupForm.addEventListener("submit", this.changeTaskProperty, { once: true });
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

// const editedTaskName = document.getElementById("task-name").value;
// const editedDueDate = document.getElementById("date").value;
// const editedPriority = document.getElementById("priority").value;

// taskName.textContent = editedTaskName;
// dueDate.textContent = editedDueDate;
// priority.classList.add(editedPriority);


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
  }

  openSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-active");
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcFBlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNWQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDSTtBQUNRO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1EQUFFO0FBQ25CO0FBQ0Esc0JBQXNCLHlEQUFRO0FBQzlCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RzIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1wcm9qZWN0LWFkZFwiKTtcclxuXHJcbiAgICB0aGlzLnByb2plY3RBZGRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1wcm9qZWN0LWFkZFwiKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtcHJvamVjdC1pbnB1dFwiKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25BZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWJ1dHRvbi1hZGRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tY2FuY2VsXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1uYW1lXCIpO1xyXG5cclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtbGlzdFwiKTtcclxuICAgIHRoaXMuYnRuc0RlYWZ1bHRzUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1kZWFmdWx0LXByb2plY3RcIik7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1wcm9qZWN0XCIpO1xyXG5cclxuICAgIHRoaXMuYnRuQWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGQpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5hZGRQcm9qZWN0KTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25DYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKTtcclxuXHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1wcm9qZWN0XCIpO1xyXG5cclxuICAgIHByb2plY3QuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiaW1nL3Rhc2stbGlzdC5zdmdcIiBhcmlhLWxhYmVsPVwibm9uZVwiLz4gJHtwcm9qZWN0TmFtZX1gO1xyXG4gICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KTtcclxuXHJcbiAgICByZXR1cm4gcHJvamVjdDtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRoaXMucHJvamVjdFNlY3Rpb25JbnB1dC52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXByb2plY3ROYW1lKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy51c2VyUHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlUHJvamVjdEJ0bihwcm9qZWN0TmFtZSkpO1xyXG5cclxuICAgIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKCk7XHJcbiAgfTtcclxuXHJcbiAgY2hhbmdlUHJvamVjdCA9IChlKSA9PiB7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJ1dHRvbi1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnByb2plY3ROYW1lLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XHJcblxyXG4gICAgdGhpcy50YXNrLmFjdGl2ZVByb2plY3QgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcclxuICAgIHRoaXMudGFzay5yZW5kZXJUYXNrcygpO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUlucHV0UHJvamVjdEFkZCA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvamVjdEFkZFNlY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIH07XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgdGFza3MgPSBbXTtcclxuICBwb3B1cEFjdGlvbiA9IFwiTmV3IFRhc2tcIjtcclxuICBhY3RpdmVQcm9qZWN0ID0gXCJDcmVhdGUgVG8gRG8gQXBwXCI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5idXR0b25UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tdGFzay1hZGRcIik7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXRhc2stY2xlYXJcIik7XHJcblxyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1uYW1lLWFjdGlvbiBwXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stYWN0aW9uXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stZXZlbnQtY2FuY2VsXCIpO1xyXG4gICAgdGhpcy50YXNrVG9EbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10by1kb1wiKTtcclxuICAgIHRoaXMucG9wdXBGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC10YXNrLWZvcm1cIik7XHJcbiAgICB0aGlzLnByb2plY3RUYXNrUXVhbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGFzay1xdWFudGl0eVwiKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvblRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlQWRkVGFzayk7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGVhckNvbXBsZXRlZFRhc2spO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlRm9ybUxpc3RlbmVycyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVQb3B1cEZvcm0oKSB7XHJcbiAgICB0aGlzLnBvcHVwVGFza0FjdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZvcm1MaXN0ZW5lcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnBvcHVwRm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuY3JlYXRlTmV3VGFzayk7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUVkaXRUYXNrID0gKCkgPT4ge1xyXG4gICAgdGhpcy50b2dnbGVQb3B1cEZvcm0oKTtcclxuICAgIHRoaXMucG9wdXBOYW1lQWN0aW9uVGV4dC50ZXh0Q29udGVudCA9IFwiRWRpdCBUYXNrXCI7XHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlQWRkVGFzayA9ICgpID0+IHtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPSBcIk5ldyBUYXNrXCI7XHJcblxyXG4gICAgdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmNyZWF0ZU5ld1Rhc2spO1xyXG4gIH07XHJcblxyXG4gIGNyZWF0ZVRhc2tDb250YWluZXIodGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcblxyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKGAke3ByaW9yaXR5fWApO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94Lm5hbWUgPSBcImNoZWNrYm94LXRhc2tcIjtcclxuICAgIGNoZWNrYm94LmlkID0gdGFza05hbWU7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICBsYWJlbC5odG1sRm9yID0gdGFza05hbWU7XHJcblxyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgbmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgbmFtZS50ZXh0Q29udGVudCA9IGAke3Rhc2tOYW1lfWA7XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xyXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGAke2R1ZURhdGV9YDtcclxuXHJcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1lZGl0XCIpO1xyXG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5lZGl0VGFzayk7XHJcblxyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWRlbGV0ZVwiKTtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVUYXNrKTtcclxuXHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xyXG5cclxuICAgIHRoaXMudGFza1RvRG8uYXBwZW5kKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFza1RvQXJyYXkoYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCB0YXNrID0ge1xyXG4gICAgICBwcm9qZWN0TmFtZTogYWN0aXZlUHJvamVjdCxcclxuICAgICAgbmFtZTogdGFza05hbWUsXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTmV3VGFzayA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnBvcHVwRm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuY3JlYXRlTmV3VGFzayk7XHJcblxyXG4gICAgbGV0IGlzQWxyZWFkeUV4aXN0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stbmFtZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIikudmFsdWU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XHJcblxyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLm5hbWUgPT0gdGFza05hbWUgJiYgdGFzay5wcm9qZWN0TmFtZSA9PSB0aGlzLmFjdGl2ZVByb2plY3QpIGlzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpc0FscmVhZHlFeGlzdCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuYWRkVGFza1RvQXJyYXkodGhpcy5hY3RpdmVQcm9qZWN0LCB0YXNrTmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xyXG4gICAgdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSk7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcoKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJBbGxUYXNrcygpIHtcclxuICAgIGxldCBhbGxUYXNrcyA9IFtdO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBhbGxUYXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWxsVGFza3MuZm9yRWFjaCgodGFzaykgPT4gdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKHRhc2submFtZSwgdGFzay5kdWVEYXRlLCB0YXNrLnByaW9yaXR5KSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJBbGxUb2RheXNUYXNrcygpIHtcclxuICAgIGxldCB0b2RheVRhc2tzID0gW107XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICBsZXQgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgbW9udGggPj0gMTAgPyAobW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxKSA6IChtb250aCA9IGAwJHtkYXRlLmdldE1vbnRoKCkgKyAxfWApO1xyXG4gICAgZGF5ID49IDEwID8gKGRheSA9IGRhdGUuZ2V0RGF0ZSgpKSA6IChkYXkgPSBgMCR7ZGF0ZS5nZXREYXRlKCl9YCk7XHJcblxyXG4gICAgbGV0IGZ1bGxEYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2suZHVlRGF0ZSA9PSBmdWxsRGF0ZSkge1xyXG4gICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdG9kYXlUYXNrcy5mb3JFYWNoKCh0b2RheVRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcih0b2RheVRhc2submFtZSwgdG9kYXlUYXNrLmR1ZURhdGUsIHRvZGF5VGFzay5wcmlvcml0eSkpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQWxsV2Vla3NUYXNrcygpIHtcclxuICAgIC8vIGxldCB0aGlzV2Vla3NUYXNrcyA9IFtdO1xyXG4gICAgLy8gY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAvLyBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCkgKyAxMDtcclxuICAgIC8vIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAvLyBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIC8vIGZ1bmN0aW9uIGdldFdlZWtOdW1iZXIoZCkge1xyXG4gICAgLy8gICAvLyBDb3B5IGRhdGUgc28gZG9uJ3QgbW9kaWZ5IG9yaWdpbmFsXHJcbiAgICAvLyAgIGQgPSBuZXcgRGF0ZShEYXRlLlVUQyhkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpKTtcclxuICAgIC8vICAgLy8gU2V0IHRvIG5lYXJlc3QgVGh1cnNkYXk6IGN1cnJlbnQgZGF0ZSArIDQgLSBjdXJyZW50IGRheSBudW1iZXJcclxuICAgIC8vICAgLy8gTWFrZSBTdW5kYXkncyBkYXkgbnVtYmVyIDdcclxuICAgIC8vICAgZC5zZXRVVENEYXRlKGQuZ2V0VVRDRGF0ZSgpICsgNCAtIChkLmdldFVUQ0RheSgpIHx8IDcpKTtcclxuICAgIC8vICAgLy8gR2V0IGZpcnN0IGRheSBvZiB5ZWFyXHJcbiAgICAvLyAgIHZhciB5ZWFyU3RhcnQgPSBuZXcgRGF0ZShEYXRlLlVUQyhkLmdldFVUQ0Z1bGxZZWFyKCksIDAsIDEpKTtcclxuICAgIC8vICAgLy8gQ2FsY3VsYXRlIGZ1bGwgd2Vla3MgdG8gbmVhcmVzdCBUaHVyc2RheVxyXG4gICAgLy8gICB2YXIgd2Vla05vID0gTWF0aC5jZWlsKCgoZCAtIHllYXJTdGFydCkgLyA4NjQwMDAwMCArIDEpIC8gNyk7XHJcbiAgICAvLyAgIC8vIFJldHVybiBhcnJheSBvZiB5ZWFyIGFuZCB3ZWVrIG51bWJlclxyXG4gICAgLy8gICByZXR1cm4gW2QuZ2V0VVRDRnVsbFllYXIoKSwgd2Vla05vXTtcclxuICAgIC8vIH1cclxuICAgIC8vIHZhciByZXN1bHQgPSBnZXRXZWVrTnVtYmVyKG5ldyBEYXRlKCkpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgIC8vIG1vbnRoID49IDEwID8gKG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSkgOiAobW9udGggPSBgMCR7ZGF0ZS5nZXRNb250aCgpICsgMX1gKTtcclxuICAgIC8vIC8vIGRheSA+PSAxMCA/IChkYXkgPSBkYXRlLmdldERhdGUoKSkgOiAoZGF5ID0gYDAke2RhdGUuZ2V0RGF0ZSgpfWApO1xyXG4gICAgLy8gbGV0IGZ1bGxEYXRlID0gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxuICAgIC8vIGNvbnNvbGUubG9nKGZ1bGxEYXRlKTtcclxuICAgIC8vIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgLy8gICBpZiAodGFzay5kdWVEYXRlID09IGZ1bGxEYXRlKSB7XHJcbiAgICAvLyAgICAgdGhpc1dlZWtzVGFza3MucHVzaCh0YXNrKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSk7XHJcbiAgICAvLyB0aGlzV2Vla3NUYXNrcy5mb3JFYWNoKCh0aGlzV2Vla3NUYXNrKSA9PiB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIodGhpc1dlZWtzVGFzay5uYW1lLCB0aGlzV2Vla3NUYXNrLmR1ZURhdGUsIHRoaXNXZWVrc1Rhc2sucHJpb3JpdHkpKTtcclxuICB9XHJcblxyXG4gIHJlbmRlclRhc2tzKCkge1xyXG4gICAgdGhpcy50YXNrVG9Eby5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGlmICh0aGlzLmFjdGl2ZVByb2plY3QudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSBcImluYm94XCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFRhc2tzKCk7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJ0b2RheVwiKSByZXR1cm4gdGhpcy5yZW5kZXJBbGxUb2RheXNUYXNrcygpO1xyXG4gICAgLy8gaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvY2FsZUxvd2VyQ2FzZSgpID09IFwidGhpcyB3ZWVrXCIpIHJldHVybiB0aGlzLnJlbmRlckFsbFdlZWtzVGFza3MoKTtcclxuXHJcbiAgICBsZXQgYWN0aXZlUHJvamVjdFRhc2sgPSBbXTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2sucHJvamVjdE5hbWUgPT0gdGhpcy5hY3RpdmVQcm9qZWN0KSB7XHJcbiAgICAgICAgYWN0aXZlUHJvamVjdFRhc2sucHVzaCh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYWN0aXZlUHJvamVjdFRhc2suZm9yRWFjaCgoYWN0aXZlVGFzaykgPT4gdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKGFjdGl2ZVRhc2submFtZSwgYWN0aXZlVGFzay5kdWVEYXRlLCBhY3RpdmVUYXNrLnByaW9yaXR5KSk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVGFzayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCB0YXNrRGVsZXRlSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleCgodGFzaykgPT4gdGFzay5uYW1lID09IHRhc2tOYW1lKTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBlZGl0VGFzayA9IChlKSA9PiB7XHJcbiAgICB0aGlzLnRvZ2dsZUVkaXRUYXNrKCk7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIik7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLWNoZWNrYm94XCIpO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5jaGFuZ2VUYXNrUHJvcGVydHksIHsgb25jZTogdHJ1ZSB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJUYXNrc1JlbWFpbmluaWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBudW1iZXJPZlRhc2tzID0gdGhpcy50YXNrVG9Eby5xdWVyeVNlbGVjdG9yQWxsKGAudGFzayBpbnB1dFtuYW1lPVwiY2hlY2tib3gtdGFza1wiXTpub3QoOmNoZWNrZWQpYCkubGVuZ3RoO1xyXG4gICAgdGhpcy5wcm9qZWN0VGFza1F1YW50aXR5LnRleHRDb250ZW50ID0gbnVtYmVyT2ZUYXNrcztcclxuICB9O1xyXG5cclxuICBjbGVhckNvbXBsZXRlZFRhc2sgPSAoKSA9PiB7XHJcbiAgICBsZXQgY29tcGxldGVUYXNrcyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzQ2hlY2tib3hlcyA9IHRoaXMudGFza1RvRG8ucXVlcnlTZWxlY3RvckFsbChgLnRhc2sgaW5wdXRbbmFtZT1cImNoZWNrYm94LXRhc2tcIl06Y2hlY2tlZGApO1xyXG4gICAgY29tcGxldGVkVGFza3NDaGVja2JveGVzLmZvckVhY2goKGNvbXBsZXRlVGFza2NoZWNrYm94KSA9PiBjb21wbGV0ZVRhc2tzLnB1c2goY29tcGxldGVUYXNrY2hlY2tib3guY2xvc2VzdChcIi50YXNrXCIpKSk7XHJcblxyXG4gICAgY29tcGxldGVUYXNrcy5mb3JFYWNoKChjb21wbGV0ZVRhc2spID0+IHtcclxuICAgICAgY29uc3QgdGFza05hbWUgPSBjb21wbGV0ZVRhc2sucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IHRhc2tEZWxldGVJbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KCh0YXNrKSA9PiB0YXNrLm5hbWUgPT0gdGFza05hbWUpO1xyXG4gICAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgICBjb21wbGV0ZVRhc2sucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcblxyXG4vLyBjb25zdCBlZGl0ZWRUYXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpLnZhbHVlO1xyXG4vLyBjb25zdCBlZGl0ZWREdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlO1xyXG4vLyBjb25zdCBlZGl0ZWRQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XHJcblxyXG4vLyB0YXNrTmFtZS50ZXh0Q29udGVudCA9IGVkaXRlZFRhc2tOYW1lO1xyXG4vLyBkdWVEYXRlLnRleHRDb250ZW50ID0gZWRpdGVkRHVlRGF0ZTtcclxuLy8gcHJpb3JpdHkuY2xhc3NMaXN0LmFkZChlZGl0ZWRQcmlvcml0eSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpIHtcclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtbWVudVwiKTtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2lkZWJhcik7XHJcbiAgfVxyXG5cclxuICBvcGVuU2lkZWJhcigpIHtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XHJcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJzaWRlYmFyLWFjdGl2ZVwiKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVWkgZnJvbSBcIi4vbW9kdWxlcy9VSVwiO1xyXG5pbXBvcnQgVGFzayBmcm9tIFwiLi9tb2R1bGVzL1Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdHNcIjtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgY29uc3QgdWkgPSBuZXcgVWkoKTtcclxuICAvLyBjb25zdCB0YXNrID0gbmV3IFRhc2soKTtcclxuICBjb25zdCBQcm9qZWN0ID0gbmV3IFByb2plY3RzKCk7XHJcblxyXG4gIHVpLmluaXQoKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
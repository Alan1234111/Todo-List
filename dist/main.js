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
    this.btnsDeafultsProjects.forEach((btn) => btn.classList.remove("active"));
    this.btnsUserProjects.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDMUI7QUFDZTtBQUNmO0FBQ0Esb0JBQW9CLDZDQUFJO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsWUFBWTtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzFEZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hKZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDVkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQ0k7QUFDUTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtREFBRTtBQUNuQjtBQUNBLHNCQUFzQix5REFBUTtBQUM5QjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9UYXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0cyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgdGhpcy5idG5BZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tcHJvamVjdC1hZGRcIik7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtcHJvamVjdC1hZGRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXByb2plY3QtaW5wdXRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtYnV0dG9uLWNhbmNlbFwiKTtcclxuXHJcbiAgICB0aGlzLnVzZXJQcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLWxpc3RcIik7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tZGVhZnVsdC1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25BZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWRkUHJvamVjdCk7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUlucHV0UHJvamVjdEFkZCk7XHJcblxyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KSk7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2hhbmdlUHJvamVjdCkpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUHJvamVjdEJ0bihwcm9qZWN0TmFtZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJidXR0b24tcHJvamVjdFwiKTtcclxuXHJcbiAgICBwcm9qZWN0LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cImltZy90YXNrLWxpc3Quc3ZnXCIgYXJpYS1sYWJlbD1cIm5vbmVcIi8+ICR7cHJvamVjdE5hbWV9YDtcclxuICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2hhbmdlUHJvamVjdCk7XHJcblxyXG4gICAgcmV0dXJuIHByb2plY3Q7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQudmFsdWU7XHJcblxyXG4gICAgaWYgKCFwcm9qZWN0TmFtZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudXNlclByb2plY3RzTGlzdC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RCdG4ocHJvamVjdE5hbWUpKTtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZUlucHV0UHJvamVjdEFkZCgpO1xyXG4gIH07XHJcblxyXG4gIGNoYW5nZVByb2plY3QgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idXR0b24tcHJvamVjdFwiKTtcclxuICAgIHRoaXMuYnRuc0RlYWZ1bHRzUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cclxuICAgIHRoaXMudGFzay5hY3RpdmVQcm9qZWN0ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XHJcbiAgICB0aGlzLnRhc2sucmVuZGVyVGFza3MoKTtcclxuICB9O1xyXG5cclxuICB0b2dnbGVJbnB1dFByb2plY3RBZGQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnByb2plY3RBZGRTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbklucHV0LnZhbHVlID0gXCJcIjtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIHRhc2tzID0gW107XHJcblxyXG4gIHBvcHVwQWN0aW9uID0gXCJOZXcgVGFza1wiO1xyXG4gIGFjdGl2ZVByb2plY3QgPSBcIkNyZWF0ZSBUbyBEbyBBcHBcIjtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYnV0dG9uVGFza0FkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXRhc2stYWRkXCIpO1xyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1uYW1lLWFjdGlvbiBwXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stYWN0aW9uXCIpO1xyXG4gICAgdGhpcy5wb3B1cEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stZm9ybVwiKTtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC10YXNrLWV2ZW50LWNhbmNlbFwiKTtcclxuICAgIHRoaXMudGFza1RvRG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdG8tZG9cIik7XHJcblxyXG4gICAgdGhpcy5idXR0b25UYXNrQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm5ld1Rhc2spO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlQWRkVGFzayk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBZGRUYXNrID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wb3B1cEZvcm0ucmVwbGFjZVdpdGgodGhpcy5wb3B1cEZvcm0uY2xvbmVOb2RlKHRydWUpKTtcclxuICAgIHRoaXMucG9wdXBUYXNrQWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID0gdGhpcy5wb3B1cEFjdGlvbjtcclxuICB9O1xyXG5cclxuICBjcmVhdGVUYXNrQ29udGFpbmVyKHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSkge1xyXG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKGAke3ByaW9yaXR5fWApO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94Lm5hbWUgPSBcImNoZWNrYm94LXRhc2tcIjtcclxuICAgIGNoZWNrYm94LmlkID0gdGFza05hbWU7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICBsYWJlbC5odG1sRm9yID0gdGFza05hbWU7XHJcblxyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgbmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgbmFtZS50ZXh0Q29udGVudCA9IGAke3Rhc2tOYW1lfWA7XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xyXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGAke2R1ZURhdGV9YDtcclxuXHJcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1lZGl0XCIpO1xyXG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5lZGl0VGFzayk7XHJcblxyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWRlbGV0ZVwiKTtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVUYXNrKTtcclxuXHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xyXG5cclxuICAgIHRoaXMudGFza1RvRG8uYXBwZW5kKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTmV3VGFzayA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnBvcHVwQWN0aW9uID09IFwiTmV3IFRhc2tcIikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBpc0FscmVhZHlFeGlzdCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5uYW1lID09IHRhc2tOYW1lICYmIHRhc2sucHJvamVjdE5hbWUgPT0gdGhpcy5hY3RpdmVQcm9qZWN0KSBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXNBbHJlYWR5RXhpc3QpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0YXNrID0ge1xyXG4gICAgICBwcm9qZWN0TmFtZTogdGhpcy5hY3RpdmVQcm9qZWN0LFxyXG4gICAgICBuYW1lOiB0YXNrTmFtZSxcclxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIodGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5KTtcclxuICAgIHRoaXMudG9nZ2xlQWRkVGFzaygpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclRhc2tzKCkge1xyXG4gICAgdGhpcy50YXNrVG9Eby5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgbGV0IGFjdGl2ZVByb2plY3RUYXNrID0gW107XHJcblxyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLnByb2plY3ROYW1lID09IHRoaXMuYWN0aXZlUHJvamVjdCkge1xyXG4gICAgICAgIGFjdGl2ZVByb2plY3RUYXNrLnB1c2godGFzayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGFjdGl2ZVByb2plY3RUYXNrLmZvckVhY2goKGFjdGl2ZVRhc2spID0+IHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcihhY3RpdmVUYXNrLm5hbWUsIGFjdGl2ZVRhc2suZHVlRGF0ZSwgYWN0aXZlVGFzay5wcmlvcml0eSkpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVGFzayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCB0YXNrRGVsZXRlSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleCgodGFzaykgPT4gdGFzay5uYW1lID09IHRhc2tOYW1lKTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBuZXdUYXNrID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wb3B1cEFjdGlvbiA9IFwiTmV3IFRhc2tcIjtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMucG9wdXBGb3JtKTtcclxuICAgIHRoaXMudG9nZ2xlQWRkVGFzaygpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5wb3B1cEZvcm0pO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwic3VibWl0XCIsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5ld1Rhc2soZXZlbnQpO1xyXG4gICAgICB9LFxyXG4gICAgICB7b25jZTogdHJ1ZX1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZWRpdFRhc2sgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5wb3B1cEFjdGlvbiA9IFwiRWRpdCBUYXNrXCI7XHJcbiAgICB0aGlzLnRvZ2dsZUFkZFRhc2soKTtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIik7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZS50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY2hlY2tib3hcIik7XHJcblxyXG4gICAgdGhpcy5wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJzdWJtaXRcIixcclxuICAgICAgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBlZGl0ZWRUYXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGVkaXRlZER1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZWRpdGVkUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG5cclxuICAgICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IGVkaXRlZFRhc2tOYW1lO1xyXG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBlZGl0ZWREdWVEYXRlO1xyXG4gICAgICAgIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoZWRpdGVkUHJpb3JpdHkpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWRkVGFzaygpO1xyXG4gICAgICB9LFxyXG4gICAgICB7b25jZTogdHJ1ZX1cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVaSB7XHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLW1lbnVcIik7XHJcbiAgICB0aGlzLnRvZ2dsZVNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3BlblNpZGViYXIpO1xyXG4gIH1cclxuXHJcbiAgb3BlblNpZGViYXIoKSB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyXCIpO1xyXG4gICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKFwic2lkZWJhci1hY3RpdmVcIik7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVpIGZyb20gXCIuL21vZHVsZXMvVUlcIjtcclxuaW1wb3J0IFRhc2sgZnJvbSBcIi4vbW9kdWxlcy9UYXNrXCI7XHJcbmltcG9ydCBQcm9qZWN0cyBmcm9tIFwiLi9tb2R1bGVzL1Byb2plY3RzXCI7XHJcblxyXG5pbml0KCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIGNvbnN0IHVpID0gbmV3IFVpKCk7XHJcbiAgLy8gY29uc3QgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgY29uc3QgUHJvamVjdCA9IG5ldyBQcm9qZWN0cygpO1xyXG5cclxuICB1aS5pbml0KCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
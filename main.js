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
  projectList = ["Create To Do App", "Make a video", "Make dinner"];
  constructor() {
    this.btnAddProject = document.querySelector(".button-project-add");
    this.projectAddSection = document.querySelector(".popup-project-add");
    this.projectSectionInput = document.querySelector(".popup-project-input");
    this.projectSectionAddBtn = document.querySelector(".popup-button-add");
    this.projectSectionCancelBtn = document.querySelector(
      ".popup-button-cancel"
    );
    this.projectDeleteBtn = document.querySelector(".btn-delete-project");
    this.projectName = document.querySelector(".project-name");
    this.userProjectsList = document.querySelector(".projects-list");
    this.btnsDeafultsProjects = document.querySelectorAll(
      ".button-deafult-project"
    );
    this.btnsUserProjects = document.querySelectorAll(".button-project");

    // Event Listeners
    this.btnAddProject.addEventListener("click", this.toggleInputProjectAdd);
    this.projectSectionAddBtn.addEventListener("click", this.addProject);
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
    this.projectDeleteBtn.addEventListener("click", this.deleteProject);

    this.renderProjects();
    this.task = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.projectName.textContent = this.task.activeProject;
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
  };

  deleteProject = () => {
    const activeProject = document.querySelector(".button-project.active");

    if (!activeProject) return;

    activeProject.remove();
    const projectDeleteIndex = this.projectList.findIndex(
      (project) =>
        project.toLowerCase().replace(/\s+/g, "") ==
        activeProject.textContent.toLowerCase().replace(/\s+/g, "")
    );

    this.projectList.splice(projectDeleteIndex, 1);
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
class Task {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDSTtBQUNRO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1EQUFFO0FBQ25CO0FBQ0Esc0JBQXNCLHlEQUFRO0FBQzlCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RzIHtcclxuICBwcm9qZWN0TGlzdCA9IFtcIkNyZWF0ZSBUbyBEbyBBcHBcIiwgXCJNYWtlIGEgdmlkZW9cIiwgXCJNYWtlIGRpbm5lclwiXTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYnRuQWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXByb2plY3QtYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0QWRkU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtcHJvamVjdC1hZGRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXByb2plY3QtaW5wdXRcIik7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1idXR0b24tYWRkXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbkNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnBvcHVwLWJ1dHRvbi1jYW5jZWxcIlxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWRlbGV0ZS1wcm9qZWN0XCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1uYW1lXCIpO1xyXG4gICAgdGhpcy51c2VyUHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy1saXN0XCIpO1xyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgIFwiLmJ1dHRvbi1kZWFmdWx0LXByb2plY3RcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXHJcbiAgICB0aGlzLmJ0bkFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKTtcclxuICAgIHRoaXMucHJvamVjdFNlY3Rpb25BZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWRkUHJvamVjdCk7XHJcbiAgICB0aGlzLnByb2plY3RTZWN0aW9uQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2xpY2tcIixcclxuICAgICAgdGhpcy50b2dnbGVJbnB1dFByb2plY3RBZGRcclxuICAgICk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT5cclxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpXHJcbiAgICApO1xyXG4gICAgdGhpcy5idG5zVXNlclByb2plY3RzLmZvckVhY2goKGJ0bikgPT5cclxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNoYW5nZVByb2plY3QpXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcm9qZWN0RGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlbGV0ZVByb2plY3QpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICB0aGlzLnByb2plY3ROYW1lLnRleHRDb250ZW50ID0gdGhpcy50YXNrLmFjdGl2ZVByb2plY3Q7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1wcm9qZWN0XCIpO1xyXG5cclxuICAgIHByb2plY3QuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiaW1nL3Rhc2stbGlzdC5zdmdcIiBhcmlhLWxhYmVsPVwibm9uZVwiLz4gJHtwcm9qZWN0TmFtZX1gO1xyXG4gICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQcm9qZWN0KTtcclxuXHJcbiAgICByZXR1cm4gcHJvamVjdDtcclxuICB9XHJcblxyXG4gIGlzUHJvamVjdEFscmVhZHlFeGlzdChwcm9qZWN0TmFtZSkge1xyXG4gICAgbGV0IGlzQWxyZWFkeUV4aXN0ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcblxyXG4gICAgdGhpcy5idG5zRGVhZnVsdHNQcm9qZWN0cy5mb3JFYWNoKChidG5Qcm9qZWN0KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBidG5Qcm9qZWN0LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSA9PVxyXG4gICAgICAgIHByb2plY3ROYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKVxyXG4gICAgICApIHtcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuUHJvamVjdCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgYnRuUHJvamVjdC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikgPT1cclxuICAgICAgICBwcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIilcclxuICAgICAgKSB7XHJcbiAgICAgICAgaXNBbHJlYWR5RXhpc3QgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaXNBbHJlYWR5RXhpc3Q7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLnByb2plY3RTZWN0aW9uSW5wdXQudmFsdWU7XHJcblxyXG4gICAgaWYgKCFwcm9qZWN0TmFtZSB8fCB0aGlzLmlzUHJvamVjdEFscmVhZHlFeGlzdChwcm9qZWN0TmFtZSkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnVzZXJQcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSk7XHJcbiAgICB0aGlzLnByb2plY3RMaXN0LnB1c2gocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIHRoaXMudG9nZ2xlSW5wdXRQcm9qZWN0QWRkKCk7XHJcbiAgfTtcclxuXHJcbiAgZGVsZXRlUHJvamVjdCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1wcm9qZWN0LmFjdGl2ZVwiKTtcclxuXHJcbiAgICBpZiAoIWFjdGl2ZVByb2plY3QpIHJldHVybjtcclxuXHJcbiAgICBhY3RpdmVQcm9qZWN0LnJlbW92ZSgpO1xyXG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUluZGV4ID0gdGhpcy5wcm9qZWN0TGlzdC5maW5kSW5kZXgoXHJcbiAgICAgIChwcm9qZWN0KSA9PlxyXG4gICAgICAgIHByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpID09XHJcbiAgICAgICAgYWN0aXZlUHJvamVjdC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgXCJcIilcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0TGlzdC5zcGxpY2UocHJvamVjdERlbGV0ZUluZGV4LCAxKTtcclxuICB9O1xyXG5cclxuICBjaGFuZ2VQcm9qZWN0ID0gKGUpID0+IHtcclxuICAgIHRoaXMuYnRuc1VzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnV0dG9uLXByb2plY3RcIik7XHJcbiAgICB0aGlzLmJ0bnNVc2VyUHJvamVjdHMuZm9yRWFjaCgoYnRuKSA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmJ0bnNEZWFmdWx0c1Byb2plY3RzLmZvckVhY2goKGJ0bikgPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMucHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcclxuXHJcbiAgICB0aGlzLnRhc2suYWN0aXZlUHJvamVjdCA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgdGhpcy50YXNrLnJlbmRlclRhc2tzKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICB0aGlzLnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3ROYW1lKSA9PlxyXG4gICAgICB0aGlzLnVzZXJQcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcm9qZWN0QnRuKHByb2plY3ROYW1lKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVJbnB1dFByb2plY3RBZGQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnByb2plY3RBZGRTZWN0aW9uLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xyXG4gICAgdGhpcy5wcm9qZWN0U2VjdGlvbklucHV0LnZhbHVlID0gXCJcIjtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIHRhc2tzID0gW1xyXG4gICAge1xyXG4gICAgICBwcm9qZWN0TmFtZTogXCJDcmVhdGUgVG8gRG8gQXBwXCIsXHJcbiAgICAgIG5hbWU6IFwiQ3JlYXRlIEh0bWxcIixcclxuICAgICAgZHVlRGF0ZTogXCIyMDIzLTAyLTA3XCIsXHJcbiAgICAgIHByaW9yaXR5OiBcImxvd1wiLFxyXG4gICAgfSxcclxuICBdO1xyXG4gIHBvcHVwQWN0aW9uID0gXCJOZXcgVGFza1wiO1xyXG4gIGFjdGl2ZVByb2plY3QgPSBcImluYm94XCI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5idXR0b25UYXNrQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tdGFzay1hZGRcIik7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnV0dG9uLXRhc2stY2xlYXJcIik7XHJcblxyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1uYW1lLWFjdGlvbiBwXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLXRhc2stYWN0aW9uXCIpO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5wb3B1cC10YXNrLWV2ZW50LWNhbmNlbFwiXHJcbiAgICApO1xyXG4gICAgdGhpcy50YXNrVG9EbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay10by1kb1wiKTtcclxuICAgIHRoaXMucG9wdXBGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC10YXNrLWZvcm1cIik7XHJcbiAgICB0aGlzLnByb2plY3RUYXNrUXVhbnRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtdGFzay1xdWFudGl0eVwiKTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvblRhc2tBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlQWRkVGFzayk7XHJcbiAgICB0aGlzLmJ1dHRvblRhc2tDbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGVhckNvbXBsZXRlZFRhc2spO1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLnJlbW92ZUZvcm1MaXN0ZW5lcnNcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUYXNrcygpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUG9wdXBGb3JtKCkge1xyXG4gICAgdGhpcy5wb3B1cFRhc2tBY3Rpb24uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGb3JtTGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5wb3B1cEZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmNyZWF0ZU5ld1Rhc2spO1xyXG4gICAgdGhpcy50b2dnbGVQb3B1cEZvcm0oKTtcclxuICB9O1xyXG5cclxuICB0b2dnbGVFZGl0VGFzayA9ICgpID0+IHtcclxuICAgIHRoaXMudG9nZ2xlUG9wdXBGb3JtKCk7XHJcbiAgICB0aGlzLnBvcHVwTmFtZUFjdGlvblRleHQudGV4dENvbnRlbnQgPSBcIkVkaXQgVGFza1wiO1xyXG4gIH07XHJcblxyXG4gIHRvZ2dsZUFkZFRhc2sgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnRvZ2dsZVBvcHVwRm9ybSgpO1xyXG4gICAgdGhpcy5wb3B1cE5hbWVBY3Rpb25UZXh0LnRleHRDb250ZW50ID0gXCJOZXcgVGFza1wiO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5jcmVhdGVOZXdUYXNrKTtcclxuICB9O1xyXG5cclxuICBjcmVhdGVUYXNrQ29udGFpbmVyKHRhc2tOYW1lLCBkdWVEYXRlLCBwcmlvcml0eSwgd2hpY2hQcm9qZWN0KSB7XHJcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcblxyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW5kZXJUYXNrc1JlbWFpbmluaWcpO1xyXG4gICAgY2hlY2tib3guY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3hcIik7XHJcbiAgICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKGAke3ByaW9yaXR5fWApO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94Lm5hbWUgPSBcImNoZWNrYm94LXRhc2tcIjtcclxuICAgIGNoZWNrYm94LmlkID0gdGFza05hbWU7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICBsYWJlbC5odG1sRm9yID0gdGFza05hbWU7XHJcblxyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgbmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xyXG4gICAgd2hpY2hQcm9qZWN0XHJcbiAgICAgID8gKG5hbWUudGV4dENvbnRlbnQgPSBgJHt0YXNrTmFtZX0gKCR7d2hpY2hQcm9qZWN0fSlgKVxyXG4gICAgICA6IChuYW1lLnRleHRDb250ZW50ID0gYCR7dGFza05hbWV9YCk7XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xyXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGAke2R1ZURhdGV9YDtcclxuXHJcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImJ1dHRvbi1lZGl0XCIpO1xyXG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5lZGl0VGFzayk7XHJcblxyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLWRlbGV0ZVwiKTtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5kZWxldGVUYXNrKTtcclxuXHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgIHRhc2suYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgICB0YXNrLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xyXG4gICAgdGFzay5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xyXG5cclxuICAgIHRoaXMudGFza1RvRG8uYXBwZW5kKHRhc2spO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFza1RvQXJyYXkoYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XHJcbiAgICBjb25zdCB0YXNrID0ge1xyXG4gICAgICBwcm9qZWN0TmFtZTogYWN0aXZlUHJvamVjdCxcclxuICAgICAgbmFtZTogdGFza05hbWUsXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgY29uc29sZS5sb2codGhpcy50YXNrcyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVOZXdUYXNrID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMucG9wdXBGb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5jcmVhdGVOZXdUYXNrKTtcclxuXHJcbiAgICBsZXQgaXNBbHJlYWR5RXhpc3QgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1uYW1lXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgaWYgKHRhc2submFtZSA9PSB0YXNrTmFtZSAmJiB0YXNrLnByb2plY3ROYW1lID09IHRoaXMuYWN0aXZlUHJvamVjdClcclxuICAgICAgICBpc0FscmVhZHlFeGlzdCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaXNBbHJlYWR5RXhpc3QpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmFkZFRhc2tUb0FycmF5KHRoaXMuYWN0aXZlUHJvamVjdCwgdGFza05hbWUsIGR1ZURhdGUsIHByaW9yaXR5KTtcclxuICAgIHRoaXMuY3JlYXRlVGFza0NvbnRhaW5lcih0YXNrTmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xyXG4gICAgdGhpcy50b2dnbGVQb3B1cEZvcm0oKTtcclxuICAgIHRoaXMucmVuZGVyVGFza3NSZW1haW5pbmlnKCk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQWxsVGFza3MoKSB7XHJcbiAgICBsZXQgYWxsVGFza3MgPSBbXTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgYWxsVGFza3MucHVzaCh0YXNrKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGFsbFRhc2tzKTtcclxuXHJcbiAgICBhbGxUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PlxyXG4gICAgICB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIoXHJcbiAgICAgICAgdGFzay5uYW1lLFxyXG4gICAgICAgIHRhc2suZHVlRGF0ZSxcclxuICAgICAgICB0YXNrLnByaW9yaXR5LFxyXG4gICAgICAgIHRhc2sucHJvamVjdE5hbWVcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckFsbFRvZGF5c1Rhc2tzKCkge1xyXG4gICAgbGV0IHRvZGF5VGFza3MgPSBbXTtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICAgIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBtb250aCA+PSAxMFxyXG4gICAgICA/IChtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEpXHJcbiAgICAgIDogKG1vbnRoID0gYDAke2RhdGUuZ2V0TW9udGgoKSArIDF9YCk7XHJcbiAgICBkYXkgPj0gMTAgPyAoZGF5ID0gZGF0ZS5nZXREYXRlKCkpIDogKGRheSA9IGAwJHtkYXRlLmdldERhdGUoKX1gKTtcclxuXHJcbiAgICBsZXQgZnVsbERhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG5cclxuICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBpZiAodGFzay5kdWVEYXRlID09IGZ1bGxEYXRlKSB7XHJcbiAgICAgICAgdG9kYXlUYXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0b2RheVRhc2tzLmZvckVhY2goKHRvZGF5VGFzaykgPT5cclxuICAgICAgdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKFxyXG4gICAgICAgIHRvZGF5VGFzay5uYW1lLFxyXG4gICAgICAgIHRvZGF5VGFzay5kdWVEYXRlLFxyXG4gICAgICAgIHRvZGF5VGFzay5wcmlvcml0eSxcclxuICAgICAgICB0b2RheVRhc2sucHJvamVjdE5hbWVcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckFsbFdlZWtzVGFza3MoKSB7XHJcbiAgICAvLyBsZXQgdGhpc1dlZWtzVGFza3MgPSBbXTtcclxuICAgIC8vIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgLy8gbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpICsgMTA7XHJcbiAgICAvLyBsZXQgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgLy8gbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAvLyBmdW5jdGlvbiBnZXRXZWVrTnVtYmVyKGQpIHtcclxuICAgIC8vICAgLy8gQ29weSBkYXRlIHNvIGRvbid0IG1vZGlmeSBvcmlnaW5hbFxyXG4gICAgLy8gICBkID0gbmV3IERhdGUoRGF0ZS5VVEMoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKSk7XHJcbiAgICAvLyAgIC8vIFNldCB0byBuZWFyZXN0IFRodXJzZGF5OiBjdXJyZW50IGRhdGUgKyA0IC0gY3VycmVudCBkYXkgbnVtYmVyXHJcbiAgICAvLyAgIC8vIE1ha2UgU3VuZGF5J3MgZGF5IG51bWJlciA3XHJcbiAgICAvLyAgIGQuc2V0VVRDRGF0ZShkLmdldFVUQ0RhdGUoKSArIDQgLSAoZC5nZXRVVENEYXkoKSB8fCA3KSk7XHJcbiAgICAvLyAgIC8vIEdldCBmaXJzdCBkYXkgb2YgeWVhclxyXG4gICAgLy8gICB2YXIgeWVhclN0YXJ0ID0gbmV3IERhdGUoRGF0ZS5VVEMoZC5nZXRVVENGdWxsWWVhcigpLCAwLCAxKSk7XHJcbiAgICAvLyAgIC8vIENhbGN1bGF0ZSBmdWxsIHdlZWtzIHRvIG5lYXJlc3QgVGh1cnNkYXlcclxuICAgIC8vICAgdmFyIHdlZWtObyA9IE1hdGguY2VpbCgoKGQgLSB5ZWFyU3RhcnQpIC8gODY0MDAwMDAgKyAxKSAvIDcpO1xyXG4gICAgLy8gICAvLyBSZXR1cm4gYXJyYXkgb2YgeWVhciBhbmQgd2VlayBudW1iZXJcclxuICAgIC8vICAgcmV0dXJuIFtkLmdldFVUQ0Z1bGxZZWFyKCksIHdlZWtOb107XHJcbiAgICAvLyB9XHJcbiAgICAvLyB2YXIgcmVzdWx0ID0gZ2V0V2Vla051bWJlcihuZXcgRGF0ZSgpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAvLyBtb250aCA+PSAxMCA/IChtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEpIDogKG1vbnRoID0gYDAke2RhdGUuZ2V0TW9udGgoKSArIDF9YCk7XHJcbiAgICAvLyAvLyBkYXkgPj0gMTAgPyAoZGF5ID0gZGF0ZS5nZXREYXRlKCkpIDogKGRheSA9IGAwJHtkYXRlLmdldERhdGUoKX1gKTtcclxuICAgIC8vIGxldCBmdWxsRGF0ZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhmdWxsRGF0ZSk7XHJcbiAgICAvLyB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIC8vICAgaWYgKHRhc2suZHVlRGF0ZSA9PSBmdWxsRGF0ZSkge1xyXG4gICAgLy8gICAgIHRoaXNXZWVrc1Rhc2tzLnB1c2godGFzayk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pO1xyXG4gICAgLy8gdGhpc1dlZWtzVGFza3MuZm9yRWFjaCgodGhpc1dlZWtzVGFzaykgPT4gdGhpcy5jcmVhdGVUYXNrQ29udGFpbmVyKHRoaXNXZWVrc1Rhc2submFtZSwgdGhpc1dlZWtzVGFzay5kdWVEYXRlLCB0aGlzV2Vla3NUYXNrLnByaW9yaXR5KSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJUYXNrcygpIHtcclxuICAgIHRoaXMudGFza1RvRG8uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBpZiAodGhpcy5hY3RpdmVQcm9qZWN0LnRvTG9jYWxlTG93ZXJDYXNlKCkgPT0gXCJpbmJveFwiKVxyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJBbGxUYXNrcygpO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlUHJvamVjdC50b0xvY2FsZUxvd2VyQ2FzZSgpID09IFwidG9kYXlcIilcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWxsVG9kYXlzVGFza3MoKTtcclxuICAgIC8vIGlmICh0aGlzLmFjdGl2ZVByb2plY3QudG9Mb2NhbGVMb3dlckNhc2UoKSA9PSBcInRoaXMgd2Vla1wiKSByZXR1cm4gdGhpcy5yZW5kZXJBbGxXZWVrc1Rhc2tzKCk7XHJcblxyXG4gICAgbGV0IGFjdGl2ZVByb2plY3RUYXNrID0gW107XHJcblxyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgIGlmICh0YXNrLnByb2plY3ROYW1lID09IHRoaXMuYWN0aXZlUHJvamVjdCkge1xyXG4gICAgICAgIGFjdGl2ZVByb2plY3RUYXNrLnB1c2godGFzayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGFjdGl2ZVByb2plY3RUYXNrKTtcclxuXHJcbiAgICBhY3RpdmVQcm9qZWN0VGFzay5mb3JFYWNoKChhY3RpdmVUYXNrKSA9PlxyXG4gICAgICB0aGlzLmNyZWF0ZVRhc2tDb250YWluZXIoXHJcbiAgICAgICAgYWN0aXZlVGFzay5uYW1lLFxyXG4gICAgICAgIGFjdGl2ZVRhc2suZHVlRGF0ZSxcclxuICAgICAgICBhY3RpdmVUYXNrLnByaW9yaXR5XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlclRhc2tzUmVtYWluaW5pZygpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlVGFzayA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrTmFtZSA9XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLW5hbWVcIikudGV4dENvbnRlbnQ7XHJcbiAgICBjb25zdCB0YXNrRGVsZXRlSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleChcclxuICAgICAgKHRhc2spID0+IHRhc2submFtZSA9PSB0YXNrTmFtZVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnRhc2tzLnNwbGljZSh0YXNrRGVsZXRlSW5kZXgsIDEpO1xyXG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICB9O1xyXG5cclxuICBlZGl0VGFzayA9IChlKSA9PiB7XHJcbiAgICB0aGlzLnRvZ2dsZUVkaXRUYXNrKCk7XHJcblxyXG4gICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLWRhdGVcIik7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi50YXNrLWNoZWNrYm94XCIpO1xyXG5cclxuICAgIHRoaXMucG9wdXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5jaGFuZ2VUYXNrUHJvcGVydHksIHtcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclRhc2tzUmVtYWluaW5pZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IG51bWJlck9mVGFza3MgPSB0aGlzLnRhc2tUb0RvLnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgIGAudGFzayBpbnB1dFtuYW1lPVwiY2hlY2tib3gtdGFza1wiXTpub3QoOmNoZWNrZWQpYFxyXG4gICAgKS5sZW5ndGg7XHJcbiAgICB0aGlzLnByb2plY3RUYXNrUXVhbnRpdHkudGV4dENvbnRlbnQgPSBudW1iZXJPZlRhc2tzO1xyXG4gIH07XHJcblxyXG4gIGNsZWFyQ29tcGxldGVkVGFzayA9ICgpID0+IHtcclxuICAgIGxldCBjb21wbGV0ZVRhc2tzID0gW107XHJcblxyXG4gICAgY29uc3QgY29tcGxldGVkVGFza3NDaGVja2JveGVzID0gdGhpcy50YXNrVG9Eby5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICBgLnRhc2sgaW5wdXRbbmFtZT1cImNoZWNrYm94LXRhc2tcIl06Y2hlY2tlZGBcclxuICAgICk7XHJcbiAgICBjb21wbGV0ZWRUYXNrc0NoZWNrYm94ZXMuZm9yRWFjaCgoY29tcGxldGVUYXNrY2hlY2tib3gpID0+XHJcbiAgICAgIGNvbXBsZXRlVGFza3MucHVzaChjb21wbGV0ZVRhc2tjaGVja2JveC5jbG9zZXN0KFwiLnRhc2tcIikpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbXBsZXRlVGFza3MuZm9yRWFjaCgoY29tcGxldGVUYXNrKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhc2tOYW1lID0gY29tcGxldGVUYXNrLnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpLnRleHRDb250ZW50O1xyXG4gICAgICBjb25zdCB0YXNrRGVsZXRlSW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleChcclxuICAgICAgICAodGFzaykgPT4gdGFzay5uYW1lID09IHRhc2tOYW1lXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRhc2tEZWxldGVJbmRleCwgMSk7XHJcbiAgICAgIGNvbXBsZXRlVGFzay5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIGNvbnN0IGVkaXRlZFRhc2tOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLW5hbWVcIikudmFsdWU7XHJcbi8vIGNvbnN0IGVkaXRlZER1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIikudmFsdWU7XHJcbi8vIGNvbnN0IGVkaXRlZFByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcclxuXHJcbi8vIHRhc2tOYW1lLnRleHRDb250ZW50ID0gZWRpdGVkVGFza05hbWU7XHJcbi8vIGR1ZURhdGUudGV4dENvbnRlbnQgPSBlZGl0ZWREdWVEYXRlO1xyXG4vLyBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKGVkaXRlZFByaW9yaXR5KTtcclxuXHJcbntcclxuICAvKiA8ZGl2IGNsYXNzPVwidGFza1wiPlxyXG48aW5wdXRcclxuICBjbGFzcz1cInRhc2stY2hlY2tib3ggbWVkaXVtXCJcclxuICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gIG5hbWU9XCJjaGVja2JveC10YXNrXCJcclxuICBpZD1cInR3b1wiXHJcbi8+XHJcbjxsYWJlbCBmb3I9XCJ0d29cIj48L2xhYmVsPlxyXG48cCBjbGFzcz1cInRhc2stbmFtZVwiPkNyZWF0ZSBDU1M8L3A+XHJcbjxwIGNsYXNzPVwidGFzay1kYXRlXCI+MTIvMDcvMjAyMzwvcD5cclxuPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1lZGl0XCI+PC9idXR0b24+XHJcbjxidXR0b24gY2xhc3M9XCJidXR0b24tZGVsZXRlXCI+PC9idXR0b24+XHJcbjwvZGl2PiAqL1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpIHtcclxuICBpbml0KCkge1xyXG4gICAgdGhpcy50b2dnbGVTaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtbWVudVwiKTtcclxuICAgIHRoaXMudG9nZ2xlU2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2lkZWJhcik7XHJcbiAgfVxyXG5cclxuICBvcGVuU2lkZWJhcigpIHtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIik7XHJcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJzaWRlYmFyLWFjdGl2ZVwiKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVWkgZnJvbSBcIi4vbW9kdWxlcy9VSVwiO1xyXG5pbXBvcnQgVGFzayBmcm9tIFwiLi9tb2R1bGVzL1Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL21vZHVsZXMvUHJvamVjdHNcIjtcclxuXHJcbmluaXQoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgY29uc3QgdWkgPSBuZXcgVWkoKTtcclxuICAvLyBjb25zdCB0YXNrID0gbmV3IFRhc2soKTtcclxuICBjb25zdCBQcm9qZWN0ID0gbmV3IFByb2plY3RzKCk7XHJcblxyXG4gIHVpLmluaXQoKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
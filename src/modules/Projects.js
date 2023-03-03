import Task from "./Task";
import Ui from "./UI";

export default class Projects {
  projectList = ["Create To Do App", "Make a video", "Make dinner"];
  constructor() {
    this.task = new Task();
    this.ui = new Ui();
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

import Task from "./Task";

export default class Projects {
  constructor() {
    this.task = new Task();
    this.btnAddProject = document.querySelector(".button-project-add");

    this.projectAddSection = document.querySelector(".popup-project-add");
    this.projectSectionInput = document.querySelector(".popup-project-input");
    this.projectSectionAddBtn = document.querySelector(".popup-button-add");
    this.projectSectionCancelBtn = document.querySelector(
      ".popup-button-cancel"
    );
    this.projectName = document.querySelector(".project-name");

    this.userProjectsList = document.querySelector(".projects-list");
    this.btnsDeafultsProjects = document.querySelectorAll(
      ".button-deafult-project"
    );
    this.btnsUserProjects = document.querySelectorAll(".button-project");

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

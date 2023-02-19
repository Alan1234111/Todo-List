import Task from "./Task";

export default class Projects {
  constructor() {
    this.task = new Task();
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

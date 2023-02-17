import Task from "./Task";

export default class Projects {
  constructor() {
    const task = new Task();

    this.btnAddProject = document.querySelector(".button-project-add");

    this.projectAddSection = document.querySelector(".popup-project-add");
    this.projectSectionInput = document.querySelector(".popup-project-input");
    this.projectSectionAddBtn = document.querySelector(".popup-button-add");
    this.projectSectionCancelBtn = document.querySelector(".popup-button-cancel");

    this.userProjectsList = document.querySelector(".projects-list");

    this.btnAddProject.addEventListener("click", this.toggleInputProjectAdd);

    this.projectSectionAddBtn.addEventListener("click", this.addProject);
    this.projectSectionCancelBtn.addEventListener("click", this.toggleInputProjectAdd);
  }

  //   createProjectBtn() {
  // <button class="button-project"><img src="img/task-list.svg" aria-label="none" />Create To Do App</button>

  //   }

  addProject = () => {
    if (!this.projectSectionInput.value) return;

    createProjectBtn();

    this.toggleInputProjectAdd();
  };

  toggleInputProjectAdd = () => {
    this.projectAddSection.classList.toggle("hide");
    this.projectSectionInput.value = "";
  };
}

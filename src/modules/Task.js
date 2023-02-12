export default class Task {
  constructor() {
    this.buttonTaskAdd = document.querySelector(".button-task-add");
    this.popupActionTask = document.querySelector(".popup-task-action");

    this.buttonTaskAdd.addEventListener("click", this.addTask);
  }

  addTask = () => {
    console.log(this.popupActionTask);
    this.popupActionTask.classList.toggle("hide");
  };
}

import Ui from "./modules/UI";
import Task from "./modules/Task";
import Projects from "./modules/Projects";

init();

function init() {
  const ui = new Ui();
  // const task = new Task();
  const Project = new Projects();

  ui.init();
}

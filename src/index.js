import Ui from "./modules/UI";
import Task from "./modules/Task";
import Projects from "./modules/Projects";
// import Storage from "./modules/Storage";

init();

function init() {
  // const storage = new Storage();
  const ui = new Ui();
  // const task = new Task();
  const Project = new Projects();

  ui.init();
}

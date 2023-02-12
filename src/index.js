import Ui from "./modules/UI";
import Task from "./modules/Task";

init();

function init() {
  const ui = new Ui();
  const task = new Task();
  
  ui.init();
}

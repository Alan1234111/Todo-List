import Ui from "./modules/UI";
import Projects from "./modules/Projects";

init();

function init() {
  const ui = new Ui();
  const Project = new Projects();

  ui.init();
}

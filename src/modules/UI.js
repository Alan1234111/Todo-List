export default class Ui {
  init() {
    this.toggleSidebar = document.querySelector(".toggle-menu");
    this.toggleSidebar.addEventListener("click", this.openSidebar);
    this.sidebar = document.querySelector(".sidebar");
  }

  openSidebar = () => {
    if (!this.toggleSidebar) {
      const toggleSidebar = document.querySelector(".toggle-menu");
      const sidebar = document.querySelector(".sidebar");
      toggleSidebar.checked = false;
      sidebar.classList.toggle("sidebar-active");
      return;
    }

    this.sidebar.classList.toggle("sidebar-active");
  };

  screenDimming = () => {
    const popupScreen = document.querySelector(".popup-screen");
    popupScreen.classList.toggle("show");
  };
}

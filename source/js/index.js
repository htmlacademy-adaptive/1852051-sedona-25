function toggleClassActiveButton() {
  let navMain = document.querySelector('.main-nav');
  navMain.classList.remove('main-nav--nojs');

  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let mainNavElements = document.getElementsByClassName("main-nav__toggle")
  if (mainNavElements.length === 1) {
    mainNavElements[0].addEventListener("click", toggleClassActiveButton)
    toggleClassActiveButton()
  }
})

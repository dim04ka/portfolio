//-------open/show top-menu
var btn = document.getElementById('btn');
var menu = document.querySelector('.header__middle');
btn.addEventListener('click', showHide);
function showHide() {
  menu.classList.toggle('header__middle-active');
}



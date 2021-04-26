let subMenu = document.querySelectorAll('.main-nav__item--sub-menu');
for (let elem of subMenu) {
  // console.log(elem, elem.offsetWidth);
  console.dir(elem)

  elem.style.width = `${elem.offsetWidth + 33.5}px`;
}

//selects the HTML element with the ID mobile menu and assigns to variable menu
const menu = document.querySelector("#mobile-menu");
//selects the HTML element with the class navbar_menu and assings to the variable menuLinks
const menuLinks = document.querySelector(".navbar__menu");

//add click event listener to the menu element
menu.addEventListener("click", function () {
  //toggles is-active class on the menu element when the function runs
  menu.classList.toggle("is-active");
  //toggles active class on the menuLinks element when the function runs
  menuLinks.classList.toggle("active");
});

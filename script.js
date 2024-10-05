// Memberi togle ketika menu-bar klik akan muncul
const menuBar = document.querySelector(".navbar-menu");
// Ketika menu-bar di klik
document.querySelector("#menu-bar").onclick = (e) => {
  menuBar.classList.toggle("active");
  e.preventDefault(); //Buat aksi default tidak dilakukan
};

// //Membuat ketika menu-bar yang sudah diklik user klik luar sidebar maka sidebar hilang
const sideMenu = document.querySelector("#menu-bar");
document.addEventListener("click", function (e) {
  if (!sideMenu.contains(e.target) && !menuBar.contains(e.target)) {
    menuBar.classList.remove("active");
  }
});

// Memberi togle ketika shopping-cart klik akan muncul
const shoppingCart = document.querySelector(".shopping-cart");
// Ketika shopping-cart di klik
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};
//Membuat ketika shopping-cart yang sudah diklik user klik luar sidebar maka sidebar hilang
const sideCart = document.querySelector("#shopping-cart-button");
document.addEventListener("click", function (e) {
  if (!sideCart.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

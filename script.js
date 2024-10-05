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

// product
let products = {
  items: [
    {
      id: 1,
      name: "The Alchemist",
      img: "/images/theAlchemist.jpg",
      price: 216000,
      discount: 80 / 100,
    },
    {
      id: 2,
      name: "Rich Dad Poor Dad",
      img: "/images/Richdad.jpg",
      price: 60000,
      discount: 90 / 100, // discount = 100 -discount = 100 - 90 = 10%
    },
    {
      id: 3,
      name: "I Want Die But I Want To Eat Tteokbokki",
      img: "/images/iWantDie.jpg",
      price: 150000,
      discount: 70 / 100,
    },
    {
      id: 4,
      name: "Chicken Soup For The Soul",
      img: "/images/chickenSoup.jpg",
      price: 119000,
      discount: 65 / 100,
    },
    {
      id: 5,
      name: "Start With Why",
      img: "/images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
  ],
};

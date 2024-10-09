// Memberi togle ketika menu-bar klik akan muncul
const menuBar = document.querySelector(".navbar-menu");
// Ketika menu-bar di klik
document.querySelector("#menu-bar").onclick = (e) => {
  menuBar.classList.toggle("active");
  e.preventDefault(); //Buat aksi default tidak dilakukan
};

//Membuat ketika menu-bar yang sudah diklik user klik luar sidebar maka sidebar hilang
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

// Membuat ketika shopping - cart yang sudah diklik user, lalu user klik produk diluar shooping card tetep mmuncul.

const sideCart = document.querySelector("#shopping-cart-button");
document.addEventListener("click", function (e) {
  if (!sideCart.contains(e.target) && !shoppingCart.contains(e.target)) {
    if (!e.target.closest(".add-to-cart")) {
      shoppingCart.classList.remove("active");
    }
  }
});

// Mencegah keranjang tertutup saat berinteraksi di dalam keranjang
shoppingCart.addEventListener("click", (e) => {
  e.stopPropagation(); // Mencegah event bubbling ke atas
});

// Membuat format mata uang rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, //Jumlah angka dibelakang koma hilang
  }).format(number);
};
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
      name: "Chicken Soup",
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
    {
      id: 6,
      name: "Start With Why",
      img: "/images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
    {
      id: 7,
      name: "Start With Why",
      img: "/images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
    {
      id: 8,
      name: "Start With Why",
      img: "/images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
    {
      id: 9,
      name: "Start With Why",
      img: "/images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
    {
      id: 10,
      name: "Start With Why",
      img: "/images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
  ],
};

// Keranjang belanja
let cart = [];

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
  cartContainer.innerHTML = ""; // Kosongkan keranjang
  let totalPriceBeforeDiscount = 0;
  let totalDiscount = 0;
  let totalPriceAfterDiscount = 0;

  cart.forEach((item) => {
    const discountedPrice = item.price * item.discount;
    const itemDiscount = item.price - discountedPrice;

    // Update total harga dan diskon
    totalPriceBeforeDiscount += item.price * item.quantity;
    totalDiscount += itemDiscount * item.quantity;
    totalPriceAfterDiscount += discountedPrice * item.quantity;

    const cartItemHTML = `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="detail-item">
          <h3>${item.name}</h3>
          <div class="item-price">${rupiah(discountedPrice)}</div>
          <div class="quantity-control">
            <button class="decrease-quantity" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-quantity" data-id="${item.id}">+</button>
          </div>
        </div>
        <i data-feather="trash-2" class="delete-item" data-id="${item.id}"></i>
      </div>
    `;
    cartContainer.innerHTML += cartItemHTML;
  });

  // Menambahkan summary keranjang
  const cartSummaryHTML = `
    <div class="cart-summary">
      <p>Total harga (sebelum diskon): ${rupiah(totalPriceBeforeDiscount)}</p>
      <p>Total diskon: ${rupiah(totalDiscount)}</p>
      <p>Total harga (setelah diskon): ${rupiah(totalPriceAfterDiscount)}</p>
    </div>
  `;
  cartContainer.innerHTML += cartSummaryHTML;

  feather.replace(); // Render ulang Feather Icons

  // Menambahkan event listener ke tombol hapus dan kontrol quantity
  document.querySelectorAll(".delete-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    });
  });

  document.querySelectorAll(".increase-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      increaseQuantity(id);
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      decreaseQuantity(id);
    });
  });
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (!existingItem) {
    cart.push({ ...product, quantity: 1 }); // Jika produk belum ada, tambahkan dengan quantity 1
  } else {
    existingItem.quantity += 1; // Jika sudah ada, tambahkan quantity
  }

  updateCart(); // Perbarui keranjang
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Fungsi untuk menambah jumlah barang
function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// Fungsi untuk mengurangi jumlah barang
function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  } else {
    removeFromCart(productId); // Jika jumlah barang jadi 0, hapus dari keranjang
  }
}

// Mencari container produk
const productContainer = document.querySelector(".row");
const cartContainer = document.querySelector(".shopping-cart");

// Looping untuk menampilkan produk di halaman
products.items.forEach((product) => {
  const productHTML = `
    <div class="product-card">
      <div class="product-icons">
        <a href="#" class="add-to-cart" data-id="${
          product.id
        }"><i data-feather="shopping-cart"></i></a>
      </div>
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" />
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <div class="product-stars">
          <i data-feather="star"></i>
          <i data-feather="star"></i>
          <i data-feather="star"></i>
          <i data-feather="star"></i>
          <i data-feather="star"></i>
        </div>
        <div class="product-price">${rupiah(
          product.price * product.discount
        )} <span>${rupiah(product.price)}</span></div>
      </div>
    </div>
  `;

  productContainer.innerHTML += productHTML;
  feather.replace(); // Render ulang Feather Icons
});

// Event listener untuk tombol "Add to Cart"
productContainer.addEventListener("click", (e) => {
  if (e.target.closest(".add-to-cart")) {
    e.preventDefault();
    const productId = parseInt(
      e.target.closest(".add-to-cart").getAttribute("data-id")
    );
    const product = products.items.find((item) => item.id === productId);
    addToCart(product);
  }
});

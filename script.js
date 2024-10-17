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
  //Jika klik terjadi diluar target menu-bar dan sidebar menghapus class active
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

// Membuat ketika shopping - cart yang sudah diklik user, lalu user klik produk diluar shooping card tetep muncul.
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

// Mengambil data keranjang dari Local Storage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cart = JSON.parse(savedCart); // Mengubah kembali ke objek
    updateCart(); // Memperbarui tampilan keranjang
  }
}

// Menyimpan data keranjang ke Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  // saat kita menyimpan objek JavaScript ke Local Storage, objek itu diubah menjadi string terlebih dahulu dengan menggunakan JSON.stringify()
}

// Menyimpan buku yang dilihat di Session Storage
function saveViewedBookToSession(book) {
  sessionStorage.setItem("viewedBook", JSON.stringify(book));
}

// Memuat buku yang dilihat dari Session Storage
function loadViewedBookFromSession() {
  const viewedBook = sessionStorage.getItem("viewedBook");
  if (viewedBook) {
    console.log("Buku terakhir yang dilihat:", JSON.parse(viewedBook));
  }
}

// product
let products = {
  items: [
    {
      id: 1,
      name: "The Alchemist",
      img: "images/theAlchemist.jpg",
      price: 216000,
      discount: 80 / 100,
    },
    {
      id: 2,
      name: "Rich Dad Poor Dad",
      img: "images/Richdad.jpg",
      price: 60000,
      discount: 90 / 100, // discount = 100 -discount = 100 - 90 = 10%
    },
    {
      id: 3,
      name: "I Want Die But I Want To Eat Tteokbokki",
      img: "images/iWantDie.jpg",
      price: 150000,
      discount: 70 / 100,
    },
    {
      id: 4,
      name: "Chicken Soup For The Soul",
      img: "images/chickenSoup.jpg",
      price: 119000,
      discount: 65 / 100,
    },
    {
      id: 5,
      name: "Start With Why",
      img: "images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
    {
      id: 6,
      name: "Dunia Sophie",
      img: "images/DuniaSophie.jpg",
      price: 169000,
      discount: 85 / 100,
    },
    {
      id: 7,
      name: "Educated",
      img: "images/Educated.jpg",
      price: 126000,
      discount: 95 / 100,
    },
    {
      id: 8,
      name: "How To Win Friends And Influence People",
      img: "images/HowToWin.jpg",
      price: 98000,
      discount: 80 / 100,
    },
    {
      id: 9,
      name: "The Black Swan",
      img: "images/AngsaHitam.jpg",
      price: 103000,
      discount: 75 / 100,
    },
    {
      id: 10,
      name: "Principles 80/20",
      img: "images/principle8020.jpg",
      price: 298000,
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
    // Menghitung harga setelah diskon
    const discountedPrice = item.price * item.discount;
    // Menghitung jumlah diskon
    const jmlDiscount = item.price - discountedPrice;

    // Update total harga dan diskon
    // total harga sebelum diskon
    totalPriceBeforeDiscount += item.price * item.quantity;
    // total diskon
    totalDiscount += jmlDiscount * item.quantity;
    // total harga setelah diskon
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
  saveCartToLocalStorage(); // Simpan keranjang ke Local Storage

  // Menambahkan event listener ke tombol hapus dan kontrol quantity
  // Event listener untuk tombol hapus
  document.querySelectorAll(".delete-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    });
  });

  // Event listener untuk tombol kontrol quantity
  document.querySelectorAll(".increase-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      increaseQuantity(id);
    });
  });

  // Event listener untuk tombol kontrol quantity
  document.querySelectorAll(".decrease-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      decreaseQuantity(id);
    });
  });
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
  // Cek apakah produk sudah ada di keranjang
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
  // Filter produk yang tidak dihapus
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

    // Simpan produk yang dilihat di Session Storage
    saveViewedBookToSession(product);
  }
});

// Memuat data saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage(); // Muat keranjang dari Local Storage
  loadViewedBookFromSession(); // Muat buku yang terakhir dilihat dari Session Storage
});
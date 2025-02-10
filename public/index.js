const showMoreBtn = document.querySelector(".load-button");
const productsContainer = document.querySelector(".products-container");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const cartBtn = document.querySelector(".cart-button");
const productsCart = document.querySelector(".cart-container");
const closeBtn = document.querySelector(".close-btn");
const deleteBtn = document.querySelector(".delete-btn");
const buyBtn = document.querySelector(".buy-btn");
/* Carrito Desktop */
const cartMenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
/* Menu burguer mobile */
const menuBtn = document.querySelector(".cart-button2");
const hambMenu = document.querySelector(".open-hamb");
const menu = document.querySelector(".hamb-menu");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

const createProductTemplate = (product) => {
  const { id, name, precio, category, descripcion, cardImg } = product;
  return `<div class="bg-white rounded-xl p-4 cursor-pointer hover:-translate-y-1 transition-all relative">    
          <div class="mb-4 bg-gray-100 rounded p-2">
          <img src="${cardImg}" alt="${name}" class="aspect-[33/35] w-full object-contain" />
          </div>
          <div>
            <div class="flex gap-2">
              <h5 class="text-base font-bold text-gray-800">${name}</h5>
              <h6 class="text-base text-gray-800 font-bold ml-auto">$ ${precio}</h6>
            </div>
            <p class="text-gray-500 text-[13px] mt-2">${descripcion}</p>
            <div class="flex items-center gap-2 mt-4">
             
            <button type="button" class="text-sm px-2 h-9 font-semibold w-full bg-red-600 hover:bg-red-700 text-white tracking-wide ml-auto outline-none border-none rounded btn-add" data-id="${id}" data-name="${name}" data-price="${precio}" data-img="${cardImg}" data-desc="${descripcion}" >Agregar</button>
          </div>
        </div>
      </div>`;
};

const renderProducts = (products) => {
  productsContainer.innerHTML += products.map(createProductTemplate).join("");
};

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex, productsLimit } = appState;

  renderProducts(products[currentProductsIndex]);

  if (currentProductsIndex === productsLimit - 1) {
    showMoreBtn.classList.add("hidden");
  }
};

const applyFilter = (e) => {
  if (!isInactiveFilterBtn(e.target)) return;
  changeFilterState(e.target);
  productsContainer.innerHTML = "";

  if (appState.activeFilter) {
    const filteredProducts = productsData.filter(
      (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
    appState.currentProductsIndex = 0;
    return;
  }

  renderProducts(appState.products[0]);
};

const changeBtnActiveState = (activeFilter) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== activeFilter) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const showCartTotal = () => {
  total.innerHTML = `$${getCartTotal()}`;
};

const updateCartState = () => {
  saveCart();
  showCartTotal();
  renderCart();
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

const closeCart = () => {
  cartMenu.classList.add("hidden");
};

const addCart = () => {
  cartMenu.classList.remove("hidden");
};

const addCartMobile = () => {
  cartMenu.classList.remove("hidden");
};

const openMenuHamb = () => {
  menu.classList.toggle("hidden");
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p> No hay productos en el carrito</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductHTML).join("");
};

const getCartTotal = () => {
  const total = cart.reduce(
    (acc, cur) => acc + Number(cur.price) * cur.quantity,
    0
  );
  console.log(total);
  return total;
};

const createCartProductHTML = (cartProduct) => {
  const { id, name, price, img, quantity, desc } = cartProduct;
  return `<div class="flex justify-center">
  <div class="product-card bg-white rounded-lg shadow-md p-4 mb-4 transition transform hover:scale-105 max-w-lg flex justify-between">
    <div class="flex items-center">
      <img src="${img}" alt="Pad Gamer" class="w-16 h-16 rounded-md mr-4 border border-gray-200">
      <div class="flex flex-col">
        <h3 class="text-md font-bold text-gray-900 mb-2">${name}</h3>
        <p class="text-sm text-gray-600 mb-2">${desc}</p>
        <p class="text-md font-extrabold text-black mt-1">$${price}</p>
      </div>
    </div>
    <div class="flex items-center">
      <button class="quantity-down bg-gray-300 text-gray-800 py-1 px-3 rounded-lg hover:bg-gray-400" data-id="${id}">-</button>
      <span class="mx-2 text-lg font-semibold text-gray-800">${quantity}</span>
      <button class="quantity-up bg-gray-300 text-gray-800 py-1 px-3 rounded-lg hover:bg-gray-400" data-id="${id}" >+</button>
    </div>
  </div>
</div>

`;
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = createProductData(e.target.dataset);

  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
  } else {
    cart = [...cart, { ...product, quantity: 1 }];
  }
  updateCartState();
  console.log(cart);
};

const addUnitToProduct = (product) => {
  // console.log("existe en el carro, le agrego uno mas");
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

const createProductData = (product) => {
  const { id, name, price, img, desc } = product;
  return { id, name, price, img, desc };
};

const handlePlusEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  console.log(existingCartProduct);
  addUnitToProduct(existingCartProduct);
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    removeProductFromCart(existingCartProduct);
    return;
  }

  substractProductUnit(existingCartProduct);
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  updateCartState();
};

const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const handleQuantity = (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("quantity-down")) {
    console.log("resta");
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("quantity-up")) {
    // console.log("suma");
    handlePlusEvent(e.target.dataset.id);
  }

  updateCartState();
};

const resetCartItems = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems(alert(successMsg));
  }
};

const deleteCart = () => {
  completeCartAction(
    "¿Deseas vaciar el carrito?",
    "No hay productos en el carrito"
  );
};

const completeBuy = () => {
  completeCartAction(
    "¿Queres terminar la compra?",
    "Gracias por confiar en Unique Gamers"
  );
};

const init = () => {
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", addCart);
  closeBtn.addEventListener("click", closeCart);
  menuBtn.addEventListener("click", addCartMobile);
  hambMenu.addEventListener("click", openMenuHamb);
  productsContainer.addEventListener("click", addProduct);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsCart.addEventListener("click", handleQuantity);
  deleteBtn.addEventListener("click", deleteCart);
  buyBtn.addEventListener("click", completeBuy);
};

init();

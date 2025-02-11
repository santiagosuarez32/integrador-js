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
  return `<div class="product-card">
  <div class="image-container">
    <img src="${cardImg}" alt="${name}" class="product-image"/>
  </div>
  <div class="product-details">
    <div class="product-header">
      <h5 class="product-name">${name}</h5>
      <h6 class="product-price">$ ${precio}</h6>
    </div>
    <p class="product-description">${descripcion}</p>
    <div class="product-actions">
      <button type="button" class="btn-add" data-id="${id}" data-name="${name}" data-price="${precio}" data-img="${cardImg}" data-desc="${descripcion}">Agregar</button>
    </div>
  </div>
</div>
`;
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
  return `<div class="product-container2">
  <div class="product-card2">
    <div class="product-details2">
      <img src="${img}" alt="Pad Gamer" class="product-image2">
      <div class="product-info2">
        <h3 class="product-name2">${name}</h3>
        <p class="product-desc2">${desc}</p>
        <p class="product-price2">$${price}</p>
      </div>
    </div>
    <div class="product-quantity2">
      <button class="quantity-down" data-id="${id}">-</button>
      <span class="quantity-value">${quantity}</span>
      <button class="quantity-up" data-id="${id}">+</button>
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

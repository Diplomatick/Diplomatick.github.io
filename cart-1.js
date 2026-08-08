/* ---------- Expressionale Designz — shared cart engine ---------- */
/* Persists cart items across pages using localStorage.            */

const CART_KEY = 'expressionale_cart';

function getCart(){
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart){
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) { /* storage unavailable — fail silently */ }
  updateCartBadge();
}

function addToCart(product){
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, swatch: product.swatch, qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(id){
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

function setQuantity(id, qty){
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = qty;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart(cart);
}

function clearCart(){
  saveCart([]);
}

function getCartCount(){
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal(){
  return getCart().reduce((sum, item) => sum + item.qty * item.price, 0);
}

function updateCartBadge(){
  const el = document.getElementById('cartCount');
  if (el) el.textContent = getCartCount();
}

document.addEventListener('DOMContentLoaded', updateCartBadge);

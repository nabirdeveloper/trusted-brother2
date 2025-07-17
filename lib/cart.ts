import { CartItem } from './types';

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const addToCart = (item: CartItem) => {
  const cart = getCartFromStorage();
  const existingItem = cart.find(cartItem => cartItem.productId === item.productId);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  
  saveCartToStorage(cart);
  return cart;
};

export const removeFromCart = (productId: string) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCartFromStorage();
  const item = cart.find(cartItem => cartItem.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCartToStorage(cart);
  }
  
  return cart;
};

export const clearCart = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
  }
  return [];
};

export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};
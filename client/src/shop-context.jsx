import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from './api';
import { CATALOG, mergeCatalog, productId } from './catalog';

const ShopContext = createContext(null);

function readLocal(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function refreshSavedProducts(items) {
  if (!Array.isArray(items)) return [];
  return items.map((saved) => {
    const current = CATALOG.find((product) => product.name.toLowerCase() === String(saved.name || '').toLowerCase())
      || CATALOG.find((product) => productId(product) === productId(saved));
    if (!current) return saved;
    const id = productId(saved) || productId(current);
    return { ...current, ...saved, id, _id: id, name: current.name, price: current.price, image: current.image, category: current.category };
  });
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(CATALOG);
  const [catalogSource, setCatalogSource] = useState('sample');
  const [cart, setCart] = useState(() => refreshSavedProducts(readLocal('aura-cart', [])));
  const [wishlist, setWishlist] = useState(() => refreshSavedProducts(readLocal('aura-wishlist', [])));
  const [user, setUser] = useState(() => readLocal('aura-user', null));
  const [toast, setToast] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/products').then(({ data }) => {
      if (active && Array.isArray(data) && data.length) {
        setProducts(mergeCatalog(data));
        setCatalogSource('database');
      }
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => { localStorage.setItem('aura-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('aura-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('aura-user', JSON.stringify(user)); }, [user]);

  const notify = useCallback((message) => {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(''), 2400);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    const id = productId(product);
    setCart((current) => {
      const existing = current.find((item) => item.id === id);
      return existing
        ? current.map((item) => item.id === id ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item)
        : [...current, { id, _id: id, name: product.name, price: Number(product.price), image: product.image, category: product.category, quantity, stock: product.stock ?? 20 }];
    });
    notify(`${product.name} added to your cart`);
  }, [notify]);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((current) => current.map((item) => item.id === id
      ? { ...item, quantity: Math.max(1, Math.min(20, Number(quantity) || 1)) }
      : item));
  }, []);

  const removeFromCart = useCallback((id) => setCart((current) => current.filter((item) => item.id !== id)), []);

  const toggleWishlist = useCallback((product) => {
    const id = productId(product);
    const exists = wishlist.some((item) => productId(item) === id);
    setWishlist((current) => exists
      ? current.filter((item) => productId(item) !== id)
      : [...current, { ...product, id, _id: id }]);
    notify(exists ? 'Removed from your wishlist' : 'Saved to your wishlist');
  }, [notify, wishlist]);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('aura-user');
    setUser(null);
    notify('You are signed out');
  }, [notify]);

  const value = useMemo(() => ({
    products, catalogSource, cart, setCart, wishlist, setWishlist, user, setUser,
    toast, notify, addToCart, updateQuantity, removeFromCart, toggleWishlist, signOut
  }), [products, catalogSource, cart, wishlist, user, toast, notify, addToCart, updateQuantity, removeFromCart, toggleWishlist, signOut]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}

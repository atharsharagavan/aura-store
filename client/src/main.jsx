import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header, Toast } from './components';
import { ShopProvider } from './shop-context';
import { Auth, Cart, Checkout, Confirmation, Home, NotFound, Orders, ProductDetail, Products, TrackOrder, Wishlist } from './pages';
import './styles.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function App() {
  return <ShopProvider><ScrollToTop /><Header /><main className="site-main"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/confirmation/:id" element={<Confirmation />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/track" element={<TrackOrder />} />
    <Route path="/track/:id" element={<TrackOrder />} />
    <Route path="*" element={<NotFound />} />
  </Routes></main><Footer /><Toast /></ShopProvider>;
}

createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);

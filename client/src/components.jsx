import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES, CLOTHING_AUDIENCES, formatINR, productId } from './catalog';
import { useShop } from './shop-context';

const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v9l9 5 9-5V8M12 13v9" /></>,
  truck: <><path d="M3 6h12v12H3zM15 10h4l3 3v5h-7z" /><circle cx="7.5" cy="18.5" r="1.5" /><circle cx="18.5" cy="18.5" r="1.5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>
};

export function Icon({ name, size = 20, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function Header() {
  const { cart, wishlist, user, signOut } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  const activeCategory = new URLSearchParams(location.search).get('category') || '';
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [query, setQuery] = useState('');

  function search(event) {
    event.preventDefault();
    navigate(`/products${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  }

  return <header className="site-header">
    <div className="topbar">
      <Link className="brand" to="/" aria-label="Aura Store home"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 22.5 15.9 7l9.1 15.5M11.1 16h9.8M5 26h22" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span>aura<span className="brand-period">.</span></span></Link>
      <form className="searchbar" onSubmit={search} role="search">
        <label className="sr-only" htmlFor="site-search">Search products</label>
        <select aria-label="Search department" defaultValue="All departments" onChange={(event) => {
          if (event.target.value !== 'All departments') navigate(`/products?category=${encodeURIComponent(event.target.value)}`);
        }}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select>
        <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Aura Store" />
        <button aria-label="Search"><Icon name="search" size={21} /></button>
      </form>
      <div className="top-actions">
        <Link className="header-action account-action" to={user ? '/orders' : '/auth'}><small>{user ? `Hello, ${user.name?.split(' ')[0] || 'there'}` : 'Hello, sign in'}</small><b>{user ? 'Account' : 'Account & Lists'}</b></Link>
        <Link className="header-action orders-action" to="/orders"><small>Returns</small><b>& Orders</b></Link>
        <Link className="icon-action wishlist-action" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}><Icon name="heart" size={21} /><span className="icon-action-label">Saved</span><span className="count-badge">{wishlist.length}</span></Link>
        {user && <button className="header-signout" onClick={signOut}>Sign out</button>}
        <Link className="cart-action" to="/cart" aria-label={`Cart, ${count} items`}><span className="cart-count">{count}</span><Icon name="bag" size={24} /><b>Cart</b></Link>
      </div>
    </div>
    <nav className="category-nav" aria-label="Shop departments">
      <Link className={location.pathname === '/products' && !activeCategory ? 'active' : ''} to="/products">Shop all</Link>
      {CATEGORIES.slice(1).map((category) => category === 'Clothing'
        ? <div className="nav-dropdown" key={category}><Link className={activeCategory === category ? 'active' : ''} to="/products?category=Clothing">Clothing</Link><div className="nav-submenu">{CLOTHING_AUDIENCES.map((audience) => <Link key={audience} to={`/products?category=Clothing&audience=${audience}`}>{audience}</Link>)}</div></div>
        : <Link key={category} className={activeCategory === category ? 'active' : ''} to={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>)}
      <span className="nav-spacer" />
      <Link className={location.pathname.startsWith('/track') ? 'active' : ''} to="/track">Track an order</Link>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div><Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7 22.5 15.9 7l9.1 15.5M11.1 16h9.8M5 26h22" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span>aura<span className="brand-period">.</span></span></Link></div>
      <div><b>Shop</b><Link to="/products">All products</Link><Link to="/wishlist">Wishlist</Link><Link to="/cart">Your cart</Link></div>
      <div><b>Your account</b><Link to="/auth">Sign in or create an account</Link><Link to="/orders">Orders</Link><Link to="/track">Track an order</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Aura Store</span><span>Designed for daily use</span></div>
  </footer>;
}

export function ProductCard({ product, compact = false }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const id = productId(product);
  const saved = wishlist.some((item) => productId(item) === id);
  return <article className={`product-card${compact ? ' product-card-compact' : ''}`}>
    <div className="product-image-wrap">
      <Link to={`/products/${id}`} className="product-image-link" aria-label={`View ${product.name}`}>
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 viewBox=%220 0 400 400%22%3E%3Crect width=%22400%22 height=%22400%22 fill=%22%23f0eee9%22/%3E%3Cpath d=%22M145 195h110v80H145zM165 175h70v20h-70z%22 fill=%22%23d8d4cc%22/%3E%3C/svg%3E'; }} />
      </Link>
      <button className={`save-button${saved ? ' is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={saved}><Icon name="heart" size={19} /></button>
    </div>
    <div className="product-info">
      <span className="product-category">{product.audience ? `${product.audience} · Clothing` : product.category}</span>
      <Link className="product-name" to={`/products/${id}`}>{product.name}</Link>
      <div className="product-price">{formatINR(product.price)}</div>
      <button className="add-button" onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  </article>;
}

export function ProductGrid({ products, compact = false }) {
  return <div className={`product-grid${compact ? ' product-grid-compact' : ''}`}>
    {products.map((product) => <ProductCard key={productId(product)} product={product} compact={compact} />)}
  </div>;
}

export function Breadcrumbs({ items }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item.label}>{index > 0 && <span className="breadcrumb-separator">/</span>}{item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function Toast() {
  const { toast } = useShop();
  if (!toast) return null;
  return <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={16} /></span>{toast}</div>;
}


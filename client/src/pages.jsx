import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from './api';
import { CATEGORIES, CLOTHING_AUDIENCES, formatINR, productId } from './catalog';
import { useShop } from './shop-context';
import { Breadcrumbs, Icon, ProductGrid } from './components';

const currency = formatINR;
const subtotal = (items) => items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
const FREE_SHIPPING_AT = 1499;
const SHIPPING_FEE = 79;
const shippingFor = (items) => subtotal(items) >= FREE_SHIPPING_AT || !items.length ? 0 : SHIPPING_FEE;

function EmptyState({ icon, title, detail, action, to }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name={icon} size={28} /></div><h2>{title}</h2><p>{detail}</p><Link className="primary-button" to={to}>{action}</Link></div>;
}

export function Home() {
  const { products } = useShop();
  const featured = products.filter((product) => product.badge).slice(0, 8);
  const departments = ['Clothing', 'Accessories', 'Tech', 'Home'];

  return <>
    <section className="home-hero">
      <div className="hero-copy">
        <h1>Good things,<br /><span>for every day.</span></h1>
        <Link className="primary-button hero-button" to="/products">Shop products <Icon name="arrow" size={17} /></Link>
      </div>
    </section>

    <div className="content-shell">
      <section className="home-section department-section">
        <div className="section-heading"><div><h2>Shop by department</h2></div><Link className="subtle-link" to="/products">View all <Icon name="arrow" size={16} /></Link></div>
        <div className="department-grid">{departments.map((item, index) => <Link key={item} className={`department-card department-${index + 1}`} to={`/products?category=${encodeURIComponent(item)}`}><div><b>{item}</b></div><span className="department-arrow"><Icon name="arrow" size={17} /></span></Link>)}</div>
      </section>

      <section className="home-section featured-section">
        <div className="section-heading"><div><h2>Popular products</h2></div><Link className="subtle-link" to="/products">View all {products.length} <Icon name="arrow" size={16} /></Link></div>
        <ProductGrid products={featured.length ? featured : products.slice(0, 8)} compact />
      </section>

    </div>
  </>;
}

export function Products() {
  const { products } = useShop();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const audience = params.get('audience') || '';
  const query = params.get('q') || '';
  const [sort, setSort] = useState('name');
  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    const list = products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesAudience = !audience || product.audience === audience;
      const matchesSearch = !term || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term);
      return matchesCategory && matchesAudience && matchesSearch;
    });
    return [...list].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [products, category, audience, query, sort]);

  function setCategory(value) {
    const next = new URLSearchParams(params);
    if (value) next.set('category', value); else next.delete('category');
    if (value !== 'Clothing') next.delete('audience');
    setParams(next);
  }

  function setAudience(value) {
    const next = new URLSearchParams(params);
    if (value) next.set('audience', value); else next.delete('audience');
    setParams(next);
  }

  return <div className="content-shell page-shell">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop' }, ...(category ? [{ label: category }] : [])]} />
    <div className="catalog-layout">
      <aside className="catalog-sidebar"><h2>Departments</h2><div className="department-list"><button className={!category ? 'selected' : ''} onClick={() => setCategory('')}>All products <span>{products.length}</span></button>{CATEGORIES.slice(1).map((item) => <div key={item}><button className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}<span>{products.filter((p) => p.category === item).length}</span></button>{item === 'Clothing' && category === 'Clothing' && <div className="audience-list">{CLOTHING_AUDIENCES.map((group) => <button key={group} className={audience === group ? 'selected' : ''} onClick={() => setAudience(audience === group ? '' : group)}>{group}<span>{products.filter((product) => product.category === 'Clothing' && product.audience === group).length}</span></button>)}</div>}</div>)}</div></aside>
      <section className="catalog-main">
        <div className="catalog-title-row"><div><h1>{query ? `Results for “${query}”` : audience || category || 'All products'}</h1><p className="catalog-count">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</p></div><label className="sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Name: A to Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
        <div className="mobile-department-filter"><label htmlFor="mobile-department">Department</label><select id="mobile-department" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All products</option>{CATEGORIES.slice(1).map((item) => <option key={item}>{item}</option>)}</select>{category === 'Clothing' && <select aria-label="Clothing audience" value={audience} onChange={(event) => setAudience(event.target.value)}><option value="">All clothing</option>{CLOTHING_AUDIENCES.map((item) => <option key={item}>{item}</option>)}</select>}</div>
        {filtered.length ? <ProductGrid products={filtered} /> : <EmptyState icon="search" title="Nothing in this aisle yet" detail="Try another search or clear the department filter." action="View all products" to="/products" />}
      </section>
    </div>
  </div>;
}

export function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const product = products.find((item) => productId(item) === id);
  if (!product) return <div className="content-shell page-shell"><EmptyState icon="search" title="We couldn't find that item" detail="It may have moved, or the link may be out of date." action="Browse the collection" to="/products" /></div>;
  const saved = wishlist.some((item) => productId(item) === id);
  return <div className="content-shell page-shell">
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/products' }, { label: product.category, to: `/products?category=${encodeURIComponent(product.category)}` }, { label: product.name }]} />
    <section className="product-detail" id="details"><div className="detail-image"><img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect width=%22400%22 height=%22400%22 fill=%22%23f0eee9%22/%3E%3C/svg%3E'; }} /></div><div className="detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="detail-price">{currency(product.price)}</p><p className="detail-description">{product.description}</p><p className="detail-stock"><span className="stock-dot" /> In stock</p><button className="primary-button detail-add" onClick={() => addToCart(product)}>Add to cart <Icon name="bag" size={18} /></button><button className={`outline-button detail-save${saved ? ' is-saved' : ''}`} onClick={() => toggleWishlist(product)}><Icon name="heart" size={18} />{saved ? 'Saved to wishlist' : 'Add to wishlist'}</button><div className="detail-service"><Icon name="box" size={19} /><p><b>Delivery</b><span>Shipping options are shown at checkout.</span></p></div><div className="detail-disclaimer">Demo store · no payment is collected.</div></div></section>
    <section className="home-section related-section"><div className="section-heading"><div><p className="eyebrow">Keep looking</p><h2>More from {product.category}</h2></div><Link className="subtle-link" to={`/products?category=${encodeURIComponent(product.category)}`}>See the department <Icon name="arrow" size={16} /></Link></div><ProductGrid products={products.filter((item) => item.category === product.category && productId(item) !== id).slice(0, 4)} compact /></section>
  </div>;
}

export function Wishlist() {
  const { wishlist } = useShop();
  return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} /><div className="page-title-row"><div><p className="eyebrow">Kept for later</p><h1>Your wishlist</h1><p className="muted-copy">A place for the things you want to come back to.</p></div><span className="item-count-pill">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span></div>{wishlist.length ? <ProductGrid products={wishlist} /> : <EmptyState icon="heart" title="Your wishlist is taking shape" detail="Tap the heart on anything you like and it will be waiting here." action="Browse the collection" to="/products" />}</div>;
}

export function Cart() {
  const { cart, updateQuantity, removeFromCart, toggleWishlist } = useShop();
  const total = subtotal(cart);
  const shipping = shippingFor(cart);
  const remaining = Math.max(0, FREE_SHIPPING_AT - total);
  if (!cart.length) return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Your cart' }]} /><EmptyState icon="bag" title="Your cart is empty" detail="Take a look around. You can save anything you like for later, too." action="Start shopping" to="/products" /></div>;

  return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Your cart' }]} /><div className="page-title-row cart-title-row"><div><p className="eyebrow">Your picks</p><h1>Your cart</h1></div><Link className="subtle-link" to="/products">Continue shopping <Icon name="arrow" size={16} /></Link></div>
    <div className="cart-layout"><section className="cart-items-panel"><div className="panel-heading"><span>Item</span><span>Price</span></div>{cart.map((item) => <article className="cart-item" key={item.id}><Link to={`/products/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} /></Link><div className="cart-item-description"><p className="product-category">{item.category}</p><Link to={`/products/${item.id}`} className="product-name">{item.name}</Link><span className="cart-stock"><span className="stock-dot" /> In stock</span><div className="cart-item-actions"><label className="quantity-select">Qty <select value={item.quantity} onChange={(event) => updateQuantity(item.id, event.target.value)} aria-label={`Quantity for ${item.name}`}>{Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select></label><button onClick={() => removeFromCart(item.id)}>Delete</button><span className="action-divider" /><button onClick={() => { toggleWishlist(item); removeFromCart(item.id); }}>Save for later</button></div></div><strong className="cart-item-price">{currency(item.price * item.quantity)}</strong></article>)}</section>
      <aside className="order-summary"><h2>Order summary</h2><p className="free-shipping-message">{remaining ? `You’re ${currency(remaining)} away from free shipping.` : 'You qualify for free shipping.'}</p><div className="shipping-meter"><span style={{ width: `${Math.min(100, total / FREE_SHIPPING_AT * 100)}%` }} /></div><div className="summary-line"><span>Subtotal ({cart.reduce((n, item) => n + item.quantity, 0)} items)</span><b>{currency(total)}</b></div><div className="summary-line"><span>Shipping</span><b>{shipping ? currency(shipping) : 'FREE'}</b></div><div className="summary-line total-line"><span>Estimated total</span><b>{currency(total + shipping)}</b></div><p className="tax-note">Taxes, if applicable, are calculated at checkout.</p><Link className="primary-button checkout-link" to="/checkout">Continue to checkout <Icon name="arrow" size={17} /></Link><div className="checkout-safe"><Icon name="check" size={16} />No payment is collected in this demo.</div></aside>
    </div>
  </div>;
}

export function Auth() {
  const { setUser, notify } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [signup, setSignup] = useState(searchParams.get('mode') === 'signup');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const next = searchParams.get('next') || '/';

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await api.post(`/auth/${signup ? 'signup' : 'login'}`, data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      notify(signup ? 'Your account is ready' : 'Welcome back');
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'We couldn’t reach the account service. Check the store connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    const nextMode = !signup;
    setSignup(nextMode);
    setError('');
    const params = new URLSearchParams(searchParams);
    if (nextMode) params.set('mode', 'signup'); else params.delete('mode');
    setSearchParams(params, { replace: true });
  }

  return <div className="content-shell page-shell auth-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: signup ? 'Create account' : 'Sign in' }]} /><div className="auth-card"><div className="auth-intro"><p className="eyebrow">Your Aura account</p><h1>{signup ? 'A little more personal.' : 'Good to see you again.'}</h1><p>Keep your saved pieces close and follow every order from one place.</p><div className="auth-points"><span><Icon name="heart" size={17} /> Your wishlist stays yours</span><span><Icon name="box" size={17} /> Order details in one place</span></div></div><div className="auth-form-side"><div className="auth-form-heading"><span className="auth-icon"><Icon name="user" size={20} /></span><div><h2>{signup ? 'Create your account' : 'Sign in'}</h2><p>{signup ? 'It only takes a moment.' : 'Use the email linked to your account.'}</p></div></div><form className="form-stack" onSubmit={submit}>{signup && <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" minLength="2" required /></label>}<label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Password<input name="password" type="password" autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'At least 8 characters' : 'Your password'} minLength={signup ? 8 : 6} required /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button form-submit" disabled={loading}>{loading ? 'Please wait…' : signup ? 'Create account' : 'Sign in'} <Icon name="arrow" size={17} /></button></form><p className="auth-switch">{signup ? 'Already have an account?' : 'New to Aura Store?'} <button onClick={toggleMode}>{signup ? 'Sign in' : 'Create an account'}</button></p><p className="form-disclaimer">Your details are used only to manage your account and orders.</p></div></div><p className="auth-demo-note">Shopping is open to everyone. An account is needed to save order history and place an order.</p></div>;
}

export function Checkout() {
  const { cart, user, setCart } = useShop();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedAddress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aura-checkout-address') || '{}'); } catch { return {}; }
  });
  const total = subtotal(cart);
  const shipping = shippingFor(cart);
  const navigate = useNavigate();

  if (!cart.length) return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} /><EmptyState icon="bag" title="Nothing to check out yet" detail="Your cart is empty. Find something good and come back when you’re ready." action="Browse products" to="/products" /></div>;

  async function submit(event) {
    event.preventDefault();
    setError('');
    const address = Object.fromEntries(new FormData(event.currentTarget));
    localStorage.setItem('aura-checkout-address', JSON.stringify(address));
    if (!user) {
      navigate('/auth?next=%2Fcheckout');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/orders', {
        address,
        items: cart.map(({ id, name, price, quantity }) => ({ product: id, name, price, quantity }))
      });
      setCart([]);
      navigate(`/confirmation/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'We couldn’t place the order. Your cart is still here; please try again.');
    } finally {
      setLoading(false);
    }
  }

  return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Your cart', to: '/cart' }, { label: 'Checkout' }]} /><div className="page-title-row"><div><p className="eyebrow">One last step</p><h1>Checkout</h1><p className="muted-copy">Add a delivery address to finish your order.</p></div><span className="checkout-step-pill"><span>1</span> Delivery <i /> <span>2</span> Review</span></div>
    <div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><section className="checkout-section"><div className="checkout-section-title"><span className="step-number">1</span><div><h2>Delivery address</h2><p>Where should we send your order?</p></div></div><div className="address-grid"><label>Full name<input name="fullName" autoComplete="name" defaultValue={savedAddress.fullName || ''} required /></label><label>Phone number <span className="optional-label">(optional)</span><input name="phone" autoComplete="tel" type="tel" defaultValue={savedAddress.phone || ''} /></label><label className="address-wide">Street address<input name="line1" autoComplete="street-address" defaultValue={savedAddress.line1 || ''} placeholder="House number and street" required /></label><label>City<input name="city" autoComplete="address-level2" defaultValue={savedAddress.city || ''} required /></label><label>Postal code<input name="postalCode" autoComplete="postal-code" defaultValue={savedAddress.postalCode || ''} required /></label><label className="address-wide">Country<input name="country" autoComplete="country-name" defaultValue={savedAddress.country || ''} required /></label></div></section><section className="checkout-section delivery-option"><div className="checkout-section-title"><span className="step-number"><Icon name="truck" size={17} /></span><div><h2>Delivery option</h2><p>Standard delivery · 3–5 business days</p></div></div><span className="delivery-price">{shipping ? currency(shipping) : 'Free'}</span></section><section className="checkout-section review-section"><div className="checkout-section-title"><span className="step-number">2</span><div><h2>Review your order</h2><p>{cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart</p></div></div>{cart.map((item) => <div className="review-item" key={item.id}><img src={item.image} alt="" /><div><b>{item.name}</b><span>Qty {item.quantity}</span></div><strong>{currency(item.price * item.quantity)}</strong></div>)}</section>{error && <p className="form-error checkout-error" role="alert">{error}</p>}{!user && <p className="checkout-login-note">You’ll be asked to sign in or create an account before the order is placed.</p>}<button className="primary-button place-order-button" disabled={loading}>{loading ? 'Placing order…' : `Place your order · ${currency(total + shipping)}`} <Icon name="arrow" size={17} /></button><p className="payment-note">Demo checkout · No payment information is collected and no charge is made.</p></form><aside className="order-summary checkout-summary"><h2>Order summary</h2>{cart.map((item) => <div className="summary-product" key={item.id}><span>{item.name} <small>× {item.quantity}</small></span><b>{currency(item.price * item.quantity)}</b></div>)}<div className="summary-line"><span>Subtotal</span><b>{currency(total)}</b></div><div className="summary-line"><span>Shipping</span><b>{shipping ? currency(shipping) : 'FREE'}</b></div><div className="summary-line total-line"><span>Estimated total</span><b>{currency(total + shipping)}</b></div><p className="tax-note">Taxes, if applicable, are calculated at checkout.</p></aside></div>
  </div>;
}

function OrderTimeline({ status }) {
  const stages = ['Processing', 'Shipped', 'Delivered'];
  const current = Math.max(0, stages.indexOf(status));
  return <div className="order-timeline">{stages.map((stage, index) => <div key={stage} className={`timeline-stage${index <= current ? ' complete' : ''}`}><span className="timeline-dot">{index < current ? <Icon name="check" size={13} /> : <b>{index + 1}</b>}</span><div><b>{stage}</b><small>{index === 0 ? 'Order received' : index === 1 ? 'On the way' : 'Delivered to you'}</small></div></div>)}</div>;
}

export function Confirmation() {
  const { id } = useParams();
  const shortId = id.slice(-8).toUpperCase();
  return <div className="content-shell page-shell"><div className="confirmation-card"><div className="confirmation-icon"><Icon name="check" size={29} /></div><p className="eyebrow">Order received</p><h1>Thank you for your order.</h1><p className="confirmation-copy">We’ve saved your order as <b>#{shortId}</b>. You can follow its progress from your orders page.</p><OrderTimeline status="Processing" /><div className="confirmation-actions"><Link className="primary-button" to={`/track/${id}`}>Track this order <Icon name="arrow" size={17} /></Link><Link className="outline-button" to="/products">Continue shopping</Link></div><p className="payment-note">Demo store · No payment was taken.</p></div></div>;
}

export function Orders() {
  const { user } = useShop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!user) { setLoading(false); return () => { active = false; }; }
    api.get('/orders/mine').then(({ data }) => { if (active) setOrders(data); }).catch((err) => { if (active) setError(err.response?.data?.message || 'Your orders are temporarily unavailable.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user]);
  if (!user) return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Orders' }]} /><EmptyState icon="box" title="Sign in to see your orders" detail="Your order history and delivery updates are kept with your account." action="Sign in" to="/auth?next=%2Forders" /></div>;
  return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Orders' }]} /><div className="page-title-row"><div><p className="eyebrow">Your account</p><h1>Orders & tracking</h1><p className="muted-copy">A clear view of what you’ve ordered and where it is.</p></div><Link className="outline-button" to="/track">Track an order</Link></div>{error && <p className="form-error" role="alert">{error}</p>}{loading ? <p className="loading-copy">Loading your orders…</p> : orders.length ? <div className="orders-list">{orders.map((order) => <article className="order-card" key={order._id}><div className="order-card-head"><div><span className="order-number">Order #{order._id.slice(-8).toUpperCase()}</span><span className="order-date">Placed {new Date(order.createdAt).toLocaleDateString()}</span></div><div className="order-status"><span className="status-dot" />{order.status}</div></div><div className="order-card-body"><div className="order-thumbnails">{order.items.slice(0, 4).map((item) => <img key={`${order._id}-${item.product}`} src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=75'} alt={item.name} />)}</div><div className="order-items-copy"><b>{order.items.map((item) => item.name).join(', ')}</b><span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span></div><div className="order-total"><small>Order total</small><b>{currency(order.totalPrice)}</b></div><Link className="outline-button order-track-link" to={`/track/${order._id}`}>Track order <Icon name="arrow" size={15} /></Link></div></article>)}</div> : <EmptyState icon="box" title="No orders yet" detail="When you place an order, you’ll find updates and tracking details here." action="Browse products" to="/products" />}</div>;
}

export function TrackOrder() {
  const { id = '' } = useParams();
  const { user } = useShop();
  const navigate = useNavigate();
  const [search, setSearch] = useState(id);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    if (!id || !user) return () => { active = false; };
    setLoading(true);
    api.get('/orders/mine').then(({ data }) => {
      if (!active) return;
      const found = data.find((item) => item._id === id || item._id.endsWith(id));
      if (found) setOrder(found); else setError('We couldn’t find that order in your account. Check the order number and try again.');
    }).catch(() => { if (active) setError('Order tracking is temporarily unavailable. Please try again.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, user]);

  function submit(event) {
    event.preventDefault();
    setError('');
    const value = search.trim().replace(/^#/, '');
    if (!value) { setError('Enter the order number from your confirmation.'); return; }
    if (!user) {
      navigate(`/auth?next=${encodeURIComponent(`/track/${value}`)}`);
      return;
    }
    navigate(`/track/${encodeURIComponent(value)}`);
  }

  return <div className="content-shell page-shell"><Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Track an order' }]} /><div className="track-layout"><section className="track-search-panel"><p className="eyebrow">Delivery updates</p><h1>Track an order</h1><p className="muted-copy">Enter your order number to see the latest status and delivery steps.</p><form className="track-form" onSubmit={submit}><label htmlFor="order-id">Order number</label><div><input id="order-id" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="For example, 65f1a2b3" /><button className="primary-button">Find order <Icon name="arrow" size={16} /></button></div></form>{!user && <p className="track-signin-note">Sign in with the account used to place the order so we can show the right updates.</p>}{error && <p className="form-error" role="alert">{error}</p>}</section>
      <section className="track-result-panel">{loading ? <p className="loading-copy">Looking up your order…</p> : order ? <><div className="track-result-head"><div><span className="eyebrow">Order #{order._id.slice(-8).toUpperCase()}</span><h2>{order.status === 'Delivered' ? 'Delivered' : order.status === 'Shipped' ? 'On the way' : 'We’re preparing your order'}</h2></div><span className="order-status"><span className="status-dot" />{order.status}</span></div><OrderTimeline status={order.status} /><div className="track-items">{order.items.map((item) => <div className="track-item" key={`${order._id}-${item.product}`}><span>{item.name} × {item.quantity}</span><b>{currency(item.price * item.quantity)}</b></div>)}</div><div className="track-address"><b>Delivering to</b><span>{order.address.fullName}</span><span>{order.address.line1}, {order.address.city} {order.address.postalCode}</span><span>{order.address.country}</span></div></> : <div className="track-empty"><span className="track-empty-icon"><Icon name="truck" size={24} /></span><b>Your delivery updates will show here</b><span>Order status, items, and delivery address in one place.</span>{!user && <Link to="/auth?next=%2Forders">Sign in to continue <Icon name="arrow" size={14} /></Link>}</div>}</section></div></div>;
}

export function NotFound() {
  return <div className="content-shell page-shell"><EmptyState icon="search" title="This page wandered off" detail="Let’s get you back to the collection." action="Back to the store" to="/" /></div>;
}

import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = [
  { name: 'Minutes', icon: '⚡', tone: 'yellow' },
  { name: 'Mobiles & Tablets', icon: '📱', tone: 'blue' },
  { name: 'Fashion', icon: '👕', tone: 'orange' },
  { name: 'Electronics', icon: '🎧', tone: 'purple' },
  { name: 'Home & Furniture', icon: '🛋️', tone: 'pink' },
  { name: 'TVs & Appliances', icon: '📺', tone: 'cyan' },
  { name: 'Flight Bookings', icon: '✈️', tone: 'sky' },
  { name: 'Beauty, Food...', icon: '💄', tone: 'red' },
  { name: 'Grocery', icon: '🛒', tone: 'green' },
]

const products = [
  {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    price: 2499,
    oldPrice: 4999,
    discount: 50,
    rating: 4.7,
    reviews: '12,841',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 2,
    title: 'Smart Watch Series 9',
    brand: 'Noise',
    price: 1899,
    oldPrice: 3999,
    discount: 52,
    rating: 4.5,
    reviews: '8,294',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 3,
    title: 'Premium Running Shoes',
    brand: 'Nike',
    price: 2999,
    oldPrice: 5999,
    discount: 50,
    rating: 4.6,
    reviews: '5,901',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 4,
    title: 'Retro Instant Camera',
    brand: 'Fujifilm',
    price: 7499,
    oldPrice: 9999,
    discount: 25,
    rating: 4.8,
    reviews: '2,106',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 5,
    title: 'Minimal Analog Wrist Watch',
    brand: 'Titan',
    price: 2199,
    oldPrice: 3899,
    discount: 43,
    rating: 4.4,
    reviews: '6,435',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 6,
    title: 'Classic Leather Backpack',
    brand: 'Wildcraft',
    price: 1299,
    oldPrice: 2499,
    discount: 48,
    rating: 4.3,
    reviews: '9,182',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=85',
  },
]

const banners = [
  {
    eyebrow: 'BIG SAVINGS DAYS',
    title: 'Upgrade your style',
    copy: 'Up to 70% off on fashion essentials',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=90',
  },
  {
    eyebrow: 'EXCLUSIVE DEALS',
    title: 'New tech. Big energy.',
    copy: 'Top gadgets starting at ₹999',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=90',
  },
  {
    eyebrow: 'HOME REFRESH',
    title: 'Make every room yours',
    copy: 'Furniture & decor at 60% off',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=90',
  },
]

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`

function Icon({ name, size = 20 }) {
  const icons = {
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
    cart: <><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H7" /></>,
    store: <><path d="M4 10v11h16V10" /><path d="M3 10l2-6h14l2 6" /><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /></>,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function App() {
  const [slide, setSlide] = useState(0)
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [wish, setWish] = useState([])
  const [loginOpen, setLoginOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setSlide((value) => (value + 1) % banners.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(timer)
  }, [toast])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return products
    return products.filter((item) => `${item.title} ${item.brand}`.toLowerCase().includes(term))
  }, [query])

  const addToCart = (product) => {
    setCart((items) => [...items, product.id])
    setToast(`${product.title} added to cart`)
  }

  const toggleWish = (id) => {
    setWish((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  }

  return (
    <div className="store">
      <header className="header">
        <div className="header-inner">
          <button className="brand" aria-label="Flipkart home">
            <span className="brand-name">Flipkart</span>
            <span className="brand-plus">Explore <strong>Plus ✦</strong></span>
          </button>

          <label className="search">
            <Icon name="search" size={21} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for Products, Brands and More"
            />
          </label>

          <nav className="header-actions">
            <button className="action login" onClick={() => setLoginOpen(true)}>
              <span className="action-icon"><Icon name="user" /></span>
              <span>Login</span>
              <span className="chevron">⌄</span>
            </button>
            <button className="action cart-action" aria-label={`Cart with ${cart.length} items`}>
              <span className="action-icon"><Icon name="cart" /></span>
              <span>Cart</span>
              {cart.length > 0 && <b className="cart-count">{cart.length}</b>}
            </button>
            <button className="action seller">
              <span className="action-icon"><Icon name="store" /></span>
              <span>Become a Seller</span>
            </button>
            <button className="more" aria-label="More options"><Icon name="dots" /></button>
          </nav>
        </div>
      </header>

      <main>
        <section className="categories" aria-label="Product categories">
          {categories.map((category) => (
            <button className="category" key={category.name}>
              <span className={`category-icon ${category.tone}`}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </section>

        <section className="hero-carousel" aria-label="Promotions">
          {banners.map((banner, index) => (
            <article
              className={`hero-slide ${index === slide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(90deg, rgba(12,25,69,.92) 0%, rgba(12,25,69,.66) 44%, rgba(12,25,69,.05) 72%), url(${banner.image})` }}
              key={banner.title}
            >
              <div className="hero-copy">
                <span>{banner.eyebrow}</span>
                <h1>{banner.title}</h1>
                <p>{banner.copy}</p>
                <button>Shop Now <b>→</b></button>
              </div>
            </article>
          ))}
          <button className="slide-arrow left" onClick={() => setSlide((slide - 1 + banners.length) % banners.length)} aria-label="Previous slide">‹</button>
          <button className="slide-arrow right" onClick={() => setSlide((slide + 1) % banners.length)} aria-label="Next slide">›</button>
          <div className="slide-dots">
            {banners.map((banner, index) => (
              <button className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} key={banner.title} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="deal-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">TODAY’S SPECIAL</span>
              <h2>Best of Electronics</h2>
            </div>
            <div className="countdown">
              <span>Ends in</span>
              <b>08</b><i>:</i><b>42</b><i>:</i><b>16</b>
            </div>
            <button className="view-all">View All <span>›</span></button>
          </div>

          {filtered.length > 0 ? (
            <div className="products">
              {filtered.map((product) => (
                <article className="product-card" key={product.id}>
                  <button className={`wish ${wish.includes(product.id) ? 'active' : ''}`} onClick={() => toggleWish(product.id)} aria-label="Add to wishlist">
                    <Icon name="heart" size={18} />
                  </button>
                  <button className="product-image" onClick={() => addToCart(product)}>
                    <img src={product.image} alt={product.title} />
                    <span className="discount">{product.discount}% off</span>
                  </button>
                  <div className="product-info">
                    <p className="brand-name-text">{product.brand}</p>
                    <h3>{product.title}</h3>
                    <div className="rating-row">
                      <span className="rating">{product.rating} ★</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="price-row">
                      <strong>{formatPrice(product.price)}</strong>
                      <del>{formatPrice(product.oldPrice)}</del>
                    </div>
                    <button className="add-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try searching for mobiles, fashion or electronics</p>
              <button onClick={() => setQuery('')}>Clear search</button>
            </div>
          )}
        </section>

        <section className="promo-grid">
          <article>
            <span>APPLE DAYS</span>
            <h2>iPhone power</h2>
            <p>From ₹54,999</p>
            <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=85" alt="Smartphone" />
          </article>
          <article>
            <span>FESTIVE PICK</span>
            <h2>Fresh fashion</h2>
            <p>Min. 40% off</p>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85" alt="Fashion shopping" />
          </article>
          <article>
            <span>NEW ARRIVALS</span>
            <h2>Home stories</h2>
            <p>Starting ₹499</p>
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=85" alt="Home decor" />
          </article>
        </section>
      </main>

      {loginOpen && (
        <div className="modal-backdrop" onMouseDown={() => setLoginOpen(false)}>
          <section className="login-modal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setLoginOpen(false)}>×</button>
            <div className="login-aside">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
              <span>✦</span>
            </div>
            <div className="login-form">
              <label>
                <span>Enter Email/Mobile number</span>
                <input type="text" />
              </label>
              <p>By continuing, you agree to Flipkart’s Terms of Use and Privacy Policy.</p>
              <button onClick={() => { setLoginOpen(false); setToast('Welcome to Flipkart') }}>Request OTP</button>
              <button className="new-user" onClick={() => setLoginOpen(false)}>New to Flipkart? Create an account</button>
            </div>
          </section>
        </div>
      )}

      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  )
}

export default App

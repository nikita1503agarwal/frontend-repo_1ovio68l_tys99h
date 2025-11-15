import { useEffect, useState } from 'react'
import { ShoppingCart, Search, Menu, Star, Leaf, Phone, Truck } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar({ cartCount, onSearch }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 font-extrabold text-xl">
            <Leaf className="w-6 h-6 text-green-600" />
            <span>FreshBite</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 w-[420px]">
          <Search className="w-4 h-4 text-gray-500" />
          <input onChange={(e)=>onSearch(e.target.value)} placeholder="Search tasty products..." className="bg-transparent outline-none w-full text-sm" />
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:flex items-center gap-2 text-sm text-gray-700 hover:text-green-700">
            <Phone className="w-4 h-4" /> Support
          </a>
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input onChange={(e)=>onSearch(e.target.value)} placeholder="Search tasty products..." className="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Delicious food, made with real ingredients</h1>
          <p className="mt-4 text-gray-600">Shop our best-selling snacks, meals, and drinks. Fresh flavors, clean labels, and fast delivery to your door.</p>
          <div className="mt-6 flex gap-3">
            <a href="#products" className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full font-semibold">Shop now</a>
            <a href="#about" className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-5 py-3 rounded-full font-semibold">Learn more</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2"><Truck className="w-5 h-5 text-green-700"/>Fast delivery</div>
            <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500"/>4.8/5 rating</div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200" alt="Healthy food bowl" className="rounded-2xl shadow-lg w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          {product.featured && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Popular</span>}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-full">Add to cart</button>
        </div>
      </div>
    </div>
  )
}

function Cart({ items, onCheckout }) {
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)
  return (
    <section className="bg-white border border-gray-100 rounded-2xl p-4 sticky top-20">
      <h3 className="font-semibold text-gray-900 mb-2">Your cart</h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600">No items yet</p>
      ) : (
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{it.title} × {it.quantity}</p>
                <p className="text-xs text-gray-500">${(it.price * it.quantity).toFixed(2)}</p>
              </div>
              <img src={it.image} className="w-12 h-12 object-cover rounded" />
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">Checkout</button>
        </div>
      )}
    </section>
  )
}

function Footer(){
  return (
    <footer id="contact" className="mt-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-xl mb-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <span>FreshBite</span>
          </div>
          <p className="text-gray-600 text-sm">Wholesome, flavorful foods made simple. Ships nationwide.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><a href="#about" className="hover:text-green-700">About</a></li>
            <li><a href="#products" className="hover:text-green-700">Shop</a></li>
            <li><a href="#" className="hover:text-green-700">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Email support@freshbite.com</li>
            <li>Phone +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(()=>{
    const load = async () => {
      try{
        const res = await fetch(`${API_BASE}/api/products?limit=50`)
        if(res.ok){
          const data = await res.json()
          setProducts(data)
          setFiltered(data)
        }else{
          setMessage('Failed to load products.')
        }
      }catch(e){
        // Try to seed then reload
        try{
          await fetch(`${API_BASE}/api/seed`, { method: 'POST' })
          const res2 = await fetch(`${API_BASE}/api/products?limit=50`)
          const data2 = await res2.json()
          setProducts(data2)
          setFiltered(data2)
        }catch(err){
          setMessage('Backend unavailable.')
        }
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  const addToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(i => i.product_id === p.id || i.title === p.title)
      if(existing){
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { product_id: p.id || p._id || p.title, title: p.title, price: p.price, quantity: 1, image: p.image }]
    })
  }

  const handleSearch = (q) => {
    const s = q.toLowerCase()
    setFiltered(products.filter(p => p.title.toLowerCase().includes(s) || (p.category||'').toLowerCase().includes(s)))
  }

  const checkout = async () => {
    if(cart.length===0){
      setMessage('Your cart is empty.')
      return
    }
    setMessage('Processing order...')
    try{
      const res = await fetch(`${API_BASE}/api/checkout`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          customer_name: 'Guest',
          email: 'guest@example.com',
          address: '123 Market St',
          city: 'San Francisco',
          country: 'USA',
          items: cart
        })
      })
      const data = await res.json()
      if(res.ok && data.success){
        setMessage(`Order placed! Confirmation #${data.order_id}`)
        setCart([])
      }else{
        setMessage(data.detail || 'Checkout failed')
      }
    }catch(e){
      setMessage('Checkout error: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cart.length} onSearch={handleSearch} />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 py-12 w-full" id="products">
        {message && (
          <div className="mb-6 bg-yellow-50 text-yellow-800 border border-yellow-200 px-4 py-3 rounded">{message}</div>
        )}
        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {filtered.map((p, i)=> (
                <ProductCard key={i} product={p} onAdd={addToCart} />
              ))}
            </div>
            <Cart items={cart} onCheckout={checkout} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

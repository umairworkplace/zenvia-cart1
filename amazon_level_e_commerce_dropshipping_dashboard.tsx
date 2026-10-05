import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Search,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Trash2,
  Edit,
  RefreshCw,
  Plus,
  CheckCircle,
  Clock,
  Globe,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Star,
  Eye,
  Zap,
  ShieldCheck,
  Send,
  Github,
  Server,
  Layers,
  ArrowUpRight,
  Info,
  X,
  Check,
  AlertCircle,
  ChevronDown
} from 'lucide-react';


// Initial Sample Products
const INITIAL_PRODUCTS = [
  {
    id: 'prod-101',
    title: 'Wireless Active Noise-Cancelling Earbuds Pro',
    price: 49.99,
    originalPrice: 129.99,
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-AUDIO-998',
    supplierCost: 18.50,
    category: 'Tech',
    rating: 4.8,
    reviewsCount: 342,
    stock: 210,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-clear sound experience with active noise cancellation, low latency mode for gaming, and up to 32 hours of total playback time.'
  },
  {
    id: 'prod-102',
    title: 'Smart Fitness Watch with SpO2 & Heart Rate Tracker',
    price: 39.95,
    originalPrice: 89.99,
    supplier: 'AliExpress',
    supplierSku: 'ALI-WATCH-441',
    supplierCost: 12.00,
    category: 'Tech',
    rating: 4.6,
    reviewsCount: 189,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    description: 'Track daily steps, heart rate, sleep quality, and SpO2 levels with IP68 waterproof resistance and sleek curved AMOLED screen.'
  },
  {
    id: 'prod-103',
    title: 'Minimalist Waterproof Anti-Theft Backpack',
    price: 54.00,
    originalPrice: 110.00,
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-BAG-7721',
    supplierCost: 19.80,
    category: 'Fashion',
    rating: 4.9,
    reviewsCount: 512,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Designed for digital nomads with USB charging port, hidden anti-theft back pocket, TSA-approved laptop lock layer, and rainproof fabric.'
  },
  {
    id: 'prod-104',
    title: 'RGB LED Sunset Projection Desk Ambient Lamp',
    price: 24.99,
    originalPrice: 45.00,
    supplier: 'Amazon',
    supplierSku: 'AMZ-LAMP-104',
    supplierCost: 7.50,
    category: 'Home',
    rating: 4.5,
    reviewsCount: 98,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    description: 'Transform your room atmosphere with 16 customizable RGB color modes, remote control, app synchronization, and 360-degree rotation.'
  }
];

// Initial Orders
const INITIAL_ORDERS = [
  {
    id: 'ORD-9821',
    customer: 'Usman Ali',
    email: 'usman.ali@example.com',
    items: ['Wireless Active Noise-Cancelling Earbuds Pro'],
    total: 49.99,
    status: 'Pending Fulfillment',
    supplier: 'CJ Dropshipping',
    date: '2026-10-05 14:22',
    address: 'Lahore, Pakistan'
  },
  {
    id: 'ORD-9820',
    customer: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    items: ['Smart Fitness Watch'],
    total: 39.95,
    status: 'Shipped',
    supplier: 'AliExpress',
    date: '2026-10-05 11:05',
    address: 'Texas, USA'
  },
  {
    id: 'ORD-9819',
    customer: 'David Miller',
    email: 'dmiller@example.com',
    items: ['Minimalist Waterproof Anti-Theft Backpack'],
    total: 54.00,
    status: 'Processing',
    supplier: 'CJ Dropshipping',
    date: '2026-10-04 19:40',
    address: 'London, UK'
  }
];

// Live Visitors Initial Log
const INITIAL_VISITORS = [
  { id: 1, ip: '182.180.121.4', location: 'Karachi, PK', page: '/product/prod-101', duration: '2m 14s', device: 'Mobile (Android)' },
  { id: 2, ip: '72.229.28.185', location: 'New York, US', page: '/cart', duration: '5m 40s', device: 'Desktop (Chrome)' },
  { id: 3, ip: '86.154.102.91', location: 'London, UK', page: '/checkout', duration: '1m 10s', device: 'Desktop (Safari)' },
  { id: 4, ip: '103.255.4.12', location: 'Lahore, PK', page: '/', duration: '0m 45s', device: 'Mobile (iOS)' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('storefront'); // 'storefront' | 'admin'
  const [adminSubTab, setAdminSubTab] = useState('overview'); // 'overview' | 'cj-import' | 'products' | 'orders' | 'visitors' | 'guide'
  
  // E-commerce state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Quick view modal
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currency, setCurrency] = useState('USD');

  // Admin / CJ Import State
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [visitors, setVisitors] = useState(INITIAL_VISITORS);
  const [activeVisitorsCount, setActiveVisitorsCount] = useState(14);
  const [importSku, setImportSku] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importNotification, setImportNotification] = useState(null);

  // New product manual form modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    price: '',
    supplierCost: '',
    supplier: 'CJ Dropshipping',
    category: 'Tech',
    image: '',
    description: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate live active visitors count
      const change = Math.floor(Math.random() * 5) - 2;
      setActiveVisitorsCount(prev => Math.max(8, prev + change));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Filter products for storefront
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate Cart Total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCjImport = (e) => {
    e.preventDefault();
    if (!importSku.trim()) return;

    setIsImporting(true);
    setImportNotification(null);

    setTimeout(() => {
      const newImportedProduct = {
        id: `prod-${Date.now()}`,
        title: `CJ Imported: Premium Smart ${importSku.toUpperCase()} Gadget`,
        price: 34.99,
        originalPrice: 79.99,
        supplier: 'CJ Dropshipping',
        supplierSku: importSku,
        supplierCost: 11.20,
        category: 'Gadgets',
        rating: 4.9,
        reviewsCount: 88,
        stock: 500,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
        description: 'Auto-synchronized directly from CJ Dropshipping API. High profit margin item ready for instant delivery.'
      };

      setProducts(prev => [newImportedProduct, ...prev]);
      setIsImporting(false);
      setImportSku('');
      setImportNotification({
        type: 'success',
        message: `Product "${newImportedProduct.title}" successfully imported from CJ Dropshipping!`
      });
    }, 1800);
  };

  // Handle Manual Product Add
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `prod-${Date.now()}`,
      title: newProd.title || 'Custom Drop Product',
      price: parseFloat(newProd.price) || 29.99,
      originalPrice: (parseFloat(newProd.price) || 29.99) * 2,
      supplier: newProd.supplier,
      supplierSku: `MANUAL-${Math.floor(Math.random() * 9000 + 1000)}`,
      supplierCost: parseFloat(newProd.supplierCost) || 10.00,
      category: newProd.category,
      rating: 5.0,
      reviewsCount: 1,
      stock: 100,
      image: newProd.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      description: newProd.description || 'Quality item sourced for quick delivery.'
    };
    setProducts(prev => [created, ...prev]);
    setShowAddProductModal(false);
    setNewProd({ title: '', price: '', supplierCost: '', supplier: 'CJ Dropshipping', category: 'Tech', image: '', description: '' });
  };

  // Auto Fulfill CJ Order
  const fulfillOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Shipped via CJ API' } : o));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-xs py-1.5 px-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-4 text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <strong>Store Status:</strong> Live & Operational
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-blue-400" /> CJ API Integration Active
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {/* Mode Switch Button */}
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex items-center">
            <button
              onClick={() => setActiveTab('storefront')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'storefront'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 inline mr-1" />
              Storefront View
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 inline mr-1" />
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('storefront')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-xl text-slate-950 shadow-lg shadow-amber-500/20">
              A
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white leading-none">
                AMAZON<span className="text-amber-500">PRO</span>
              </h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">CJ Dropshipping Hub</p>
            </div>
          </div>

          {/* Search Bar (Storefront context) */}
          {activeTab === 'storefront' && (
            <div className="flex-1 max-w-2xl hidden md:flex items-center">
              <div className="relative w-full flex">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-800 border border-r-0 border-slate-700 text-slate-300 text-xs rounded-l-lg px-3 py-2 focus:outline-none hover:bg-slate-750"
                >
                  <option value="All">All Categories</option>
                  <option value="Tech">Tech & Electronics</option>
                  <option value="Fashion">Fashion & Apparel</option>
                  <option value="Home">Home & Living</option>
                  <option value="Gadgets">Gadgets</option>
                </select>
                <input
                  type="text"
                  placeholder="Search over 1,000+ dropshipping products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm px-4 py-2 focus:outline-none focus:border-amber-500"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 rounded-r-lg font-bold flex items-center justify-center transition-all">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Actions & Stats */}
          <div className="flex items-center space-x-3">
            {activeTab === 'storefront' ? (
              <>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2.5 rounded-lg text-slate-200 transition-all flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                  {cart.length > 0 && (
                    <span className="bg-amber-500 text-slate-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {activeVisitorsCount} Live Visitors
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body Switcher */}
      <main className="flex-1 bg-slate-950">
        {activeTab === 'storefront' ? (
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Promo Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-amber-950 border border-slate-800 p-8 md:p-12 mb-8 shadow-2xl">
              <div className="relative z-10 max-w-xl">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-4 inline-block">
                  Trending Dropshipping Deals
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  Next-Gen Tech & Premium Accessories
                </h2>
                <p className="text-slate-300 text-sm md:text-base mb-6">
                  Direct from CJ Dropshipping & Top Suppliers. Express 3-7 days global shipping with guaranteed tracking.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 text-sm"
                  >
                    Shop All Products <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 md:opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-blue-600 to-transparent"></div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {['All', 'Tech', 'Fashion', 'Home', 'Gadgets'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500">Showing {filteredProducts.length} Products</p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col group"
                >
                  {/* Image container */}
                  <div className="relative h-52 bg-slate-800 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Layers className="w-3 h-3" /> {product.supplier}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute bottom-3 right-3 bg-slate-950/80 hover:bg-slate-900 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1 text-amber-400 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-bold">{product.rating}</span>
                        <span className="text-slate-500 text-xs">({product.reviewsCount})</span>
                      </div>
                      <h3 className="font-semibold text-slate-100 text-sm line-clamp-2 mb-2 group-hover:text-amber-400 transition-colors">
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-black text-white">${product.price.toFixed(2)}</div>
                        {product.originalPrice && (
                          <div className="text-xs text-slate-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md shadow-amber-500/10"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Admin Sub Navigation Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'cj-import', label: '1-Click CJ Importer', icon: Download },
                { id: 'products', label: 'Product Manager', icon: Package },
                { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
                { id: 'visitors', label: 'Live Visitor Analytics', icon: Users },
                { id: 'guide', label: 'GitHub & Vercel Deployment Guide', icon: Server }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAdminSubTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      adminSubTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Admin Tab Content */}
            {adminSubTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-slate-400 text-xs font-medium">Total Revenue</span>
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">$14,892.50</div>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-2">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +24% this week
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-slate-400 text-xs font-medium">Total Orders</span>
                      <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">{orders.length + 184}</div>
                    <span className="text-xs text-blue-400 font-semibold flex items-center gap-1 mt-2">
                      <ArrowUpRight className="w-3.5 h-3.5" /> 18 pending CJ fulfillment
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-slate-400 text-xs font-medium">Active Products</span>
                      <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                        <Package className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">{products.length}</div>
                    <span className="text-xs text-amber-400 font-semibold mt-2 block">
                      Synced with Suppliers
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-slate-400 text-xs font-medium">Active Live Visitors</span>
                      <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">{activeVisitorsCount}</div>
                    <span className="text-xs text-purple-400 font-semibold flex items-center gap-1 mt-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span> Tracking real-time
                    </span>
                  </div>
                </div>

                {/* Quick Action Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" /> CJ Dropshipping Quick Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setAdminSubTab('cj-import')}
                      className="p-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-left transition-all group"
                    >
                      <Download className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-white text-sm">Import New Product</h4>
                      <p className="text-xs text-slate-400 mt-1">Paste CJ SKU or URL for 1-click catalog injection</p>
                    </button>

                    <button
                      onClick={() => setAdminSubTab('orders')}
                      className="p-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-left transition-all group"
                    >
                      <RefreshCw className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-white text-sm">Auto-Fulfill Orders</h4>
                      <p className="text-xs text-slate-400 mt-1">Send pending orders directly to supplier system</p>
                    </button>

                    <button
                      onClick={() => setAdminSubTab('guide')}
                      className="p-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-left transition-all group"
                    >
                      <Server className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-white text-sm">Deploy Code Live</h4>
                      <p className="text-xs text-slate-400 mt-1">Setup backend server & database on Vercel/Render</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CJ Import Tab */}
            {adminSubTab === 'cj-import' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400">
                      <Download className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">1-Click CJ Dropshipping Product Import</h3>
                      <p className="text-xs text-slate-400">Enter CJ SKU ID or Web link to automatically sync details & margin</p>
                    </div>
                  </div>

                  {importNotification && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> {importNotification.message}
                      </span>
                      <button onClick={() => setImportNotification(null)} className="text-emerald-300 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleCjImport} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        CJ Dropshipping Product SKU / API URL
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. CJ-AUDIO-998 or https://cjdropshipping.com/product/..."
                          value={importSku}
                          onChange={(e) => setImportSku(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs">
                      <div>
                        <span className="text-slate-400">Target Profit Margin:</span>
                        <p className="text-emerald-400 font-bold text-sm mt-0.5">+180% Auto Calculated</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Inventory Sync:</span>
                        <p className="text-blue-400 font-bold text-sm mt-0.5">Real-time Stock API</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isImporting}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 text-sm"
                    >
                      {isImporting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Fetching CJ Product Specs...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" /> Import Product into Storefront Now
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Product Manager Tab */}
            {adminSubTab === 'products' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl text-white">Active Product Catalog</h3>
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Product Manually
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="p-4">Product</th>
                          <th className="p-4">Supplier</th>
                          <th className="p-4">Cost Price</th>
                          <th className="p-4">Selling Price</th>
                          <th className="p-4">Margin</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {products.map(prod => {
                          const margin = prod.price - prod.supplierCost;
                          return (
                            <tr key={prod.id} className="hover:bg-slate-850">
                              <td className="p-4 flex items-center space-x-3">
                                <img src={prod.image} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                                <div>
                                  <p className="font-bold text-white text-xs">{prod.title}</p>
                                  <span className="text-[10px] text-slate-500">SKU: {prod.supplierSku}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md text-[10px] font-semibold text-amber-400">
                                  {prod.supplier}
                                </span>
                              </td>
                              <td className="p-4">${prod.supplierCost.toFixed(2)}</td>
                              <td className="p-4 font-bold text-white">${prod.price.toFixed(2)}</td>
                              <td className="p-4 text-emerald-400 font-bold">+${margin.toFixed(2)}</td>
                              <td className="p-4 text-right space-x-2">
                                <button
                                  onClick={() => setProducts(products.filter(p => p.id !== prod.id))}
                                  className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {adminSubTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="font-black text-xl text-white">Order Fulfillment & Tracking</h3>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Items</th>
                          <th className="p-4">Total</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Fulfillment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {orders.map(order => (
                          <tr key={order.id} className="hover:bg-slate-850">
                            <td className="p-4 font-bold text-white">{order.id}</td>
                            <td className="p-4">
                              <p className="font-semibold text-slate-200">{order.customer}</p>
                              <span className="text-[10px] text-slate-500">{order.address}</span>
                            </td>
                            <td className="p-4 text-slate-400">{order.items.join(', ')}</td>
                            <td className="p-4 font-bold text-emerald-400">${order.total.toFixed(2)}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.status.includes('Shipped')
                                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {order.status !== 'Shipped' && !order.status.includes('CJ API') ? (
                                <button
                                  onClick={() => fulfillOrder(order.id)}
                                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 ml-auto"
                                >
                                  <Zap className="w-3.5 h-3.5" /> Fulfill via CJ
                                </button>
                              ) : (
                                <span className="text-emerald-400 font-medium text-[11px] flex items-center justify-end gap-1">
                                  <Check className="w-4 h-4" /> Auto-Fulfilled
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Visitors Analytics */}
            {adminSubTab === 'visitors' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl text-white">Live Website Traffic Log</h3>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Tracking Active
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="p-4">IP Address</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Current Page</th>
                          <th className="p-4">Duration</th>
                          <th className="p-4">Device</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {visitors.map(v => (
                          <tr key={v.id} className="hover:bg-slate-850">
                            <td className="p-4 font-mono text-slate-400">{v.ip}</td>
                            <td className="p-4 font-semibold text-white">{v.location}</td>
                            <td className="p-4 text-blue-400 font-mono">{v.page}</td>
                            <td className="p-4">{v.duration}</td>
                            <td className="p-4 text-slate-400">{v.device}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Deployment Guide */}
            {adminSubTab === 'guide' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center text-purple-400">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">GitHub & Vercel / Render Deployment Guide</h3>
                      <p className="text-xs text-slate-400">Steps to publish this codebase live on custom domains</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-xs text-slate-300">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm mb-2">Step 1: Push Code to GitHub</h4>
                      <pre className="bg-slate-900 p-3 rounded-lg text-slate-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
                        {`git init
git add .
git commit -m "Initial Amazon-level Dropshipping Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/amazon-dropship.git
git push -u origin main`}
                      </pre>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-blue-400 text-sm mb-2">Step 2: Deploy Frontend on Vercel</h4>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400">
                        <li>Go to <strong className="text-white">Vercel.com</strong> and link your GitHub account.</li>
                        <li>Select the repository <strong className="text-white">amazon-dropship</strong> and click <strong className="text-white">Deploy</strong>.</li>
                        <li>Add environment variables in Vercel settings if needed.</li>
                      </ol>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-emerald-400 text-sm mb-2">Step 3: Add CJ Dropshipping API Key</h4>
                      <p className="text-slate-400 mb-2">In your backend or environment settings, configure:</p>
                      <pre className="bg-slate-900 p-3 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                        {`CJ_API_KEY=your_cj_official_api_key
CJ_API_SECRET=your_cj_secret_token
DATABASE_URL=mongodb+srv://...`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 h-full border-l border-slate-800 flex flex-col p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" /> Your Shopping Cart
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-slate-500 py-12">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your cart is currently empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <img src={item.image} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-xs text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-amber-400 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Amount:</span>
                  <span className="font-black text-white text-lg">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => alert('Order Placed Successfully! Simulated Checkout completed.')}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-base">Add New Product</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 mb-1 block">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Product Title"
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 mb-1 block">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="29.99"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">Supplier Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="10.00"
                    value={newProd.supplierCost}
                    onChange={(e) => setNewProd({ ...newProd, supplierCost: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 mb-1 block">Supplier</label>
                <select
                  value={newProd.supplier}
                  onChange={(e) => setNewProd({ ...newProd, supplier: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                >
                  <option value="CJ Dropshipping">CJ Dropshipping</option>
                  <option value="AliExpress">AliExpress</option>
                  <option value="Amazon">Amazon</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-4"
              >
                Save & Publish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
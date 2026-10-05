/* Omni Cart front-end demo. Replace PRODUCTS with data from your backend/API later. */
(function () {
  "use strict";

  var PRODUCTS = [
    { id: 1, name: "Smart Watch Pro", emoji: "⌚", price: 129.99, old: 199.99, rating: 4.5, reviews: 128, cat: "Electronics", h: 225, sold: 980, stock: 8 },
    { id: 2, name: "Wireless Headphones", emoji: "🎧", price: 89.99, old: 139.99, rating: 4.7, reviews: 96, cat: "Electronics", h: 265, sold: 870 },
    { id: 3, name: "Leather Backpack", emoji: "🎒", price: 59.99, old: 89.99, rating: 4.4, reviews: 74, cat: "Fashion", h: 25, sold: 640 },
    { id: 4, name: "Running Shoes", emoji: "👟", price: 66.99, old: 119.99, rating: 4.6, reviews: 63, cat: "Sports", h: 160, sold: 720, stock: 5 },
    { id: 5, name: "Smartphone 128GB", emoji: "📱", price: 699.99, old: 899.99, rating: 4.8, reviews: 112, cat: "Electronics", h: 200, sold: 1100 },
    { id: 6, name: "Sunglasses UV400", emoji: "🕶️", price: 19.99, old: 39.99, rating: 4.3, reviews: 88, cat: "Fashion", h: 45, sold: 530 },
    { id: 7, name: "Cozy Armchair", emoji: "🛋️", price: 249.0, old: 329.0, rating: 4.5, reviews: 41, cat: "Home", h: 190, sold: 210, stock: 3 },
    { id: 8, name: "Glow Skincare Set", emoji: "🧴", price: 34.5, old: 54.0, rating: 4.6, reviews: 57, cat: "Beauty", h: 330, sold: 460 },
    { id: 9, name: "Yoga Mat Plus", emoji: "🧘", price: 24.99, old: 39.99, rating: 4.4, reviews: 49, cat: "Sports", h: 140, sold: 390 },
    { id: 10, name: "Plush Teddy Bear", emoji: "🧸", price: 17.99, old: 29.99, rating: 4.9, reviews: 143, cat: "Toys", h: 30, sold: 610 },
    { id: 11, name: "Ceramic Table Lamp", emoji: "💡", price: 42.0, old: 64.0, rating: 4.5, reviews: 36, cat: "Home", h: 50, sold: 180 },
    { id: 12, name: "Board Game Night", emoji: "🎲", price: 27.5, old: 39.0, rating: 4.7, reviews: 71, cat: "Toys", h: 280, sold: 330 }
  ];

  var FREE_SHIP = 99;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return "$" + n.toFixed(2); };

  /* Safe storage (works even if the browser blocks it) */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  var cart = store.get("oc_cart", {});      // { id: qty }
  var wish = store.get("oc_wish", []);      // [id]
  var state = { cat: "all", q: "", sort: "popular" };

  /* ---------- Products ---------- */
  var grid = $("#grid");
  var heartSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';

  function stars(r) {
    var full = Math.round(r), s = "";
    for (var i = 0; i < 5; i++) s += i < full ? "★" : "☆";
    return s;
  }

  function visible() {
    var list = PRODUCTS.filter(function (p) {
      var okCat = state.cat === "all" || p.cat === state.cat;
      var okQ = !state.q || (p.name + " " + p.cat).toLowerCase().indexOf(state.q) !== -1;
      return okCat && okQ;
    });
    var sorters = {
      popular: function (a, b) { return b.sold - a.sold; },
      low: function (a, b) { return a.price - b.price; },
      high: function (a, b) { return b.price - a.price; },
      rating: function (a, b) { return b.rating - a.rating; }
    };
    return list.sort(sorters[state.sort]);
  }

  function renderProducts() {
    var list = visible();
    grid.innerHTML = list.map(function (p) {
      var off = Math.round((1 - p.price / p.old) * 100);
      return '<article class="card glass">' +
        '<span class="badge">-' + off + '%</span>' +
        '<button class="heart' + (wish.indexOf(p.id) > -1 ? " on" : "") + '" data-wish="' + p.id + '" aria-label="Add ' + p.name + ' to wishlist">' + heartSvg + '</button>' +
        '<div class="thumb" style="--h:' + p.h + '"><span>' + p.emoji + '</span></div>' +
        '<h3>' + p.name + '</h3>' +
        '<div class="rate"><span class="stars">' + stars(p.rating) + '</span> (' + p.reviews + ')</div>' +
        '<div class="price"><b>' + money(p.price) + '</b><s>' + money(p.old) + '</s></div>' +
        (p.stock ? '<div class="stock">Only ' + p.stock + ' left</div>' : "") +
        '<button class="add" data-add="' + p.id + '">Add to cart</button>' +
        '</article>';
    }).join("");
    $("#empty").hidden = list.length > 0;
    var title = state.cat === "all" ? "Best selling products" : state.cat + " products";
    if (state.q) title = 'Results for "' + state.q + '"';
    $("#productsTitle").textContent = title;
  }

  grid.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    var w = e.target.closest("[data-wish]");
    if (add) addToCart(+add.dataset.add);
    if (w) toggleWish(+w.dataset.wish, w);
  });

  /* Category, search, sort */
  $$("[data-cat]").forEach(function (b) {
    b.addEventListener("click", function () {
      state.cat = b.dataset.cat; state.q = ""; $("#searchInput").value = "";
      $$(".cat").forEach(function (c) { c.classList.toggle("on", c === b); });
      renderProducts();
      $("#products").scrollIntoView({ behavior: "smooth" });
    });
  });
  $("#searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    state.q = $("#searchInput").value.trim().toLowerCase();
    state.cat = "all"; $$(".cat").forEach(function (c) { c.classList.remove("on"); });
    renderProducts();
    $("#products").scrollIntoView({ behavior: "smooth" });
  });
  $("#searchInput").addEventListener("input", function () {
    state.q = this.value.trim().toLowerCase(); renderProducts();
  });
  $("#sortSel").addEventListener("change", function () { state.sort = this.value; renderProducts(); });

  /* ---------- Wishlist ---------- */
  function toggleWish(id, btn) {
    var i = wish.indexOf(id);
    if (i > -1) wish.splice(i, 1); else wish.push(id);
    store.set("oc_wish", wish);
    btn.classList.toggle("on", i === -1);
    updateCounts(); bump("#wishCount");
    toast(i === -1 ? "Saved to your wishlist" : "Removed from your wishlist");
  }
  $("#wishBtn").addEventListener("click", function () {
    toast(wish.length + (wish.length === 1 ? " item" : " items") + " in your wishlist");
  });

  /* ---------- Cart ---------- */
  var drawer = $("#drawer"), scrim = $("#scrim");

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart(); bump("#cartCount");
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    toast(p.name + " added to cart");
  }
  function saveCart() { store.set("oc_cart", cart); renderCart(); updateCounts(); }

  function renderCart() {
    var ids = Object.keys(cart), total = 0, html = "";
    ids.forEach(function (id) {
      var p = PRODUCTS.filter(function (x) { return x.id === +id; })[0];
      if (!p) { delete cart[id]; return; }
      var qty = cart[id]; total += p.price * qty;
      html += '<li class="cart-item"><div class="ci" style="--h:' + p.h + '">' + p.emoji + '</div>' +
        '<div><b>' + p.name + '</b><small>' + money(p.price) + '</small>' +
        '<div class="qty"><button data-dec="' + id + '" aria-label="Decrease quantity">−</button><span>' + qty + '</span><button data-inc="' + id + '" aria-label="Increase quantity">+</button></div></div>' +
        '<div><b>' + money(p.price * qty) + '</b><br><button class="rm" data-rm="' + id + '">Remove</button></div></li>';
    });
    $("#cartList").innerHTML = html || '<li class="cart-empty">Your cart is empty. Add something you like.</li>';
    $("#subtotal").textContent = money(total);
    var left = FREE_SHIP - total;
    $("#shipMsg").textContent = total === 0 ? "Free shipping on orders over " + money(FREE_SHIP)
      : left > 0 ? "Add " + money(left) + " more for free shipping" : "You've unlocked free shipping";
    $("#shipBar").style.width = Math.min(100, (total / FREE_SHIP) * 100) + "%";
  }

  $("#cartList").addEventListener("click", function (e) {
    var t = e.target;
    if (t.dataset.inc) cart[t.dataset.inc]++;
    if (t.dataset.dec) { cart[t.dataset.dec]--; if (cart[t.dataset.dec] < 1) delete cart[t.dataset.dec]; }
    if (t.dataset.rm) delete cart[t.dataset.rm];
    if (t.dataset.inc || t.dataset.dec || t.dataset.rm) saveCart();
  });

  function updateCounts() {
    var n = Object.keys(cart).reduce(function (s, k) { return s + cart[k]; }, 0);
    $("#cartCount").textContent = n;
    $("#wishCount").textContent = wish.length;
  }
  function bump(sel) {
    var el = $(sel); el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  }

  function openCart() { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); scrim.hidden = false; }
  function closeCart() { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); scrim.hidden = true; }
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });
  $("#checkoutBtn").addEventListener("click", function () {
    toast(Object.keys(cart).length ? "Checkout will connect to your backend and Stripe" : "Your cart is empty");
  });

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------- Mobile menu ---------- */
  $("#burger").addEventListener("click", function () {
    var open = $("#menu").classList.toggle("open");
    this.setAttribute("aria-expanded", open);
  });
  $$("#menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      $("#menu").classList.remove("open");
      $$("#menu a").forEach(function (x) { x.classList.toggle("active", x === a); });
    });
  });

  /* ---------- Sale countdown ---------- */
  var end = store.get("oc_sale_end", 0);
  if (!end || end < Date.now()) {
    end = Date.now() + (2 * 86400 + 14 * 3600 + 37 * 60) * 1000;
    store.set("oc_sale_end", end);
  }
  function tick() {
    var s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    var pad = function (n) { return String(n).padStart(2, "0"); };
    $("#tD").textContent = pad(Math.floor(s / 86400));
    $("#tH").textContent = pad(Math.floor(s % 86400 / 3600));
    $("#tM").textContent = pad(Math.floor(s % 3600 / 60));
    $("#tS").textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Testimonials ---------- */
  var reviews = [
    { n: "Michael Brown", i: "MB", t: "Amazing quality and fast delivery. The products are exactly as described. Highly recommended." },
    { n: "Sarah Johnson", i: "SJ", t: "Easy checkout and the tracking updates were spot on. My order arrived two days early." },
    { n: "David Lee", i: "DL", t: "Great prices and the return process was painless. I will definitely shop here again." }
  ];
  var ri = 0, dots = $("#dots");
  reviews.forEach(function (_, i) {
    var b = document.createElement("button"); b.setAttribute("aria-label", "Show review " + (i + 1));
    b.addEventListener("click", function () { show(i); }); dots.appendChild(b);
  });
  function show(i) {
    ri = i; var r = reviews[i];
    $("#qText").textContent = r.t; $("#qName").textContent = r.n; $("#qAvatar").textContent = r.i;
    $$("button", dots).forEach(function (d, k) { d.classList.toggle("on", k === i); });
  }
  show(0); setInterval(function () { show((ri + 1) % reviews.length); }, 7000);

  /* ---------- Newsletter ---------- */
  $("#newsForm").addEventListener("submit", function (e) {
    e.preventDefault();
    $("#newsMsg").textContent = "Thanks for subscribing. Check your inbox for a welcome offer.";
    this.reset();
  });

  /* ---------- 3D tilt on hero ---------- */
  var stage = $("#stage"), scene = $("#scene");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
             window.matchMedia("(pointer: coarse)").matches;
  if (!calm) {
    var hero = $(".hero");
    hero.addEventListener("mousemove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width / 2)) / r.width;
      var y = (e.clientY - (r.top + r.height / 2)) / r.height;
      scene.style.setProperty("--ry", (x * 24).toFixed(1) + "deg");
      scene.style.setProperty("--rx", (6 - y * 18).toFixed(1) + "deg");
    });
    hero.addEventListener("mouseleave", function () {
      scene.style.setProperty("--ry", "-14deg"); scene.style.setProperty("--rx", "6deg");
    });
  }

  /* ---------- Init ---------- */
  renderProducts(); renderCart(); updateCounts();
})();

/**
 * DANTI BIKES - MULTI-PAGE ROUTING, CART & STATE ENGINE
 * Official Brands: MOOVE, ZEST, PRK, SAMURAI, VENZO
 */

// Initial Seed Products Catalog featuring official Danti Bikes brands
const INITIAL_PRODUCTS = [
  {
    id: "db-001",
    model: "Venzo Raptor EX R29",
    brand: "VENZO",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "M",
    color: "Naranja",
    condition: "NUEVO",
    price: 890000,
    stock: 4,
    featured: true,
    image: "assets/venzo_raptor.jpg",
    specs: {
      cuadro: "Aluminio 6061 Venzo Raptor EX cableado interno",
      transmision: "Shimano Deore 1x11v",
      frenos: "Hidráulicos Shimano MT200",
      suspension: "B1 Team Aire con bloqueo al manubrio",
      peso: "13.2 kg"
    }
  },
  {
    id: "db-002",
    model: "Moove Sport Pro 29\"",
    brand: "MOOVE",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "L",
    color: "Negro",
    condition: "NUEVO",
    price: 780000,
    stock: 3,
    featured: true,
    image: "assets/specialized_chisel.jpg",
    specs: {
      cuadro: "Aluminio Hidroformado Moove Pro Lightweight",
      transmision: "Shimano Tourney/Altus 2x9v",
      frenos: "Disco Hidráulico Logan/Shimano 160mm",
      suspension: "Horquilla con bloqueo manual 100mm",
      peso: "13.5 kg"
    }
  },
  {
    id: "db-003",
    model: "Zest Elite Carbon Gravel",
    brand: "ZEST",
    category: "RUTA",
    wheelSize: "29\"",
    frameSize: "M",
    color: "Gris",
    condition: "NUEVO",
    price: 1450000,
    stock: 2,
    featured: true,
    image: "assets/cannondale_road.jpg",
    specs: {
      cuadro: "Cuadro Zest Carbon Gravel Tapered",
      transmision: "Sensah SRX Pro 1x11v Gravel",
      frenos: "Hidráulicos Monoblock Zest",
      suspension: "Rígida Horquilla Carbono Zest",
      peso: "9.6 kg"
    }
  },
  {
    id: "db-004",
    model: "Samurai Cobra Dirt BMX 20\"",
    brand: "SAMURAI",
    category: "BMX",
    wheelSize: "20\"",
    frameSize: "Único",
    color: "Negro",
    condition: "NUEVO",
    price: 620000,
    stock: 5,
    featured: false,
    image: "assets/cult_bmx.jpg",
    specs: {
      cuadro: "Samurai Reinforced Hi-Ten 20.5\"",
      transmision: "Palancas 3 piezas Samurai, Plato 25T",
      frenos: "U-Brake trasero de aluminio",
      suspension: "Rígida Horquilla Samurai Dirt",
      peso: "11.4 kg"
    }
  },
  {
    id: "db-005",
    model: "PRK Stealth XC 29\"",
    brand: "PRK",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "S",
    color: "Azul",
    condition: "NUEVO",
    price: 820000,
    stock: 3,
    featured: true,
    image: "assets/scott_scale.jpg",
    specs: {
      cuadro: "Aluminio 6061 PRK Stealth Geometry",
      transmision: "Microshift Advent X 1x10v Monoplato",
      frenos: "Hidráulicos Tektro HD-M275",
      suspension: "Horquilla PRK Air 100mm con bloqueo",
      peso: "13.0 kg"
    }
  },
  {
    id: "db-006",
    model: "Venzo Skyline EVO R29",
    brand: "VENZO",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "M",
    color: "Rojo",
    condition: "NUEVO",
    price: 740000,
    stock: 4,
    featured: false,
    image: "assets/giant_talon.jpg",
    specs: {
      cuadro: "Aluminio Venzo Skyline EVO R29",
      transmision: "Shimano 21 velocidades",
      frenos: "Disco mecánico Shimano",
      suspension: "Horquilla Venzo con regulación",
      peso: "14.1 kg"
    }
  },
  {
    id: "db-007",
    model: "Casco Venzo V-10 MIPS",
    brand: "VENZO",
    category: "CASCOS",
    wheelSize: "N/A",
    frameSize: "Único",
    color: "Naranja",
    condition: "NUEVO",
    price: 85000,
    stock: 8,
    featured: false,
    image: "assets/casco_specialized.jpg",
    specs: {
      cuadro: "Estructura EPS inyectada de alta densidad",
      transmision: "Sistema MIPS contra impactos",
      frenos: "Ajuste micrométrico posterior",
      suspension: "21 canales de ventilación aerodinámica",
      peso: "280 g"
    }
  }
];

class DantiBikesApp {
  constructor() {
    this.products = this.loadProducts();
    this.cart = this.loadCart();
    this.currentView = "home";
    this.editingProductId = null;
    
    // Filters State
    this.filters = {
      search: "",
      category: "ALL",
      brand: "ALL",
      wheelSizes: [],
      frameSize: null,
      color: "ALL",
      sortBy: "featured"
    };

    this.initElements();
    this.initEvents();
    this.renderHomeFeatured();
    this.updateMetrics();
    this.updateCartUI();
  }

  loadProducts() {
    // Refresh catalog seed for Moove, Zest, PRK, Samurai, Venzo
    localStorage.setItem("danti_bikes_products", JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }

  saveProducts() {
    localStorage.setItem("danti_bikes_products", JSON.stringify(this.products));
    this.updateMetrics();
  }

  loadCart() {
    const saved = localStorage.getItem("danti_bikes_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
    return [];
  }

  saveCart() {
    localStorage.setItem("danti_bikes_cart", JSON.stringify(this.cart));
    this.updateCartUI();
  }

  initElements() {
    // Views
    this.views = {
      home: document.getElementById("homeView"),
      catalog: document.getElementById("catalogView"),
      service: document.getElementById("serviceView"),
      about: document.getElementById("aboutView"),
      admin: document.getElementById("adminView")
    };

    // Search bar inside Catalog Page
    this.catalogSearchInput = document.getElementById("catalogSearchInput");
    this.btnSearchCatalog = document.getElementById("btnSearchCatalog");

    // Filter Controls
    this.filterBrand = document.getElementById("filterBrand");
    this.filterColor = document.getElementById("filterColor");
    this.sortSelect = document.getElementById("sortSelect");
    this.sortSelectMobile = document.getElementById("sortSelectMobile");
    this.productGrid = document.getElementById("productGrid");
    this.homeFeaturedGrid = document.getElementById("homeFeaturedGrid");
    this.emptyState = document.getElementById("emptyState");
    this.productResultsCount = document.getElementById("productResultsCount");
    this.clearFiltersBtn = document.getElementById("clearFiltersBtn");

    // Modal
    this.productDetailModal = document.getElementById("productDetailModal");
    this.modalProductBody = document.getElementById("modalProductBody");
    this.closeDetailModalBtn = document.getElementById("closeDetailModalBtn");

    // Cart Drawer
    this.cartDrawer = document.getElementById("cartDrawer");
    this.cartDrawerBody = document.getElementById("cartDrawerBody");
    this.cartTotalPrice = document.getElementById("cartTotalPrice");
    this.cartBadgeCount = document.getElementById("cartBadgeCount");
    this.openCartDrawerBtn = document.getElementById("openCartDrawerBtn");
    this.closeCartDrawerBtn = document.getElementById("closeCartDrawerBtn");
    this.btnCheckoutWhatsApp = document.getElementById("btnCheckoutWhatsApp");

    // Admin
    this.adminProductForm = document.getElementById("adminProductForm");
    this.adminProductTableBody = document.getElementById("adminProductTableBody");
    this.adminTableSearch = document.getElementById("adminTableSearch");
    this.adminFormTitle = document.getElementById("adminFormTitle");
    this.cancelEditBtn = document.getElementById("cancelEditBtn");
    this.openAdminViewBtn = document.getElementById("openAdminViewBtn");
    this.exitAdminViewBtn = document.getElementById("exitAdminViewBtn");

    // Metrics
    this.metricTotalBikes = document.getElementById("metricTotalBikes");
    this.metricInStock = document.getElementById("metricInStock");
    this.metricFeatured = document.getElementById("metricFeatured");
  }

  initEvents() {
    // Nav Routing Links
    document.querySelectorAll("[data-view]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = link.getAttribute("data-view");
        const category = link.getAttribute("data-category");
        this.navigateTo(targetView, category);
      });
    });

    // Logo Click -> Home
    document.getElementById("logoLink").addEventListener("click", (e) => {
      e.preventDefault();
      this.navigateTo("home");
    });

    // Home CTAs
    const btnGoCatalog = document.getElementById("btnGoToCatalog");
    if (btnGoCatalog) btnGoCatalog.addEventListener("click", () => this.navigateTo("catalog", "ALL"));
    
    const btnGoService = document.getElementById("btnGoToService");
    if (btnGoService) btnGoService.addEventListener("click", () => this.navigateTo("service"));

    const btnSeeAllCatalog = document.getElementById("btnSeeAllCatalog");
    if (btnSeeAllCatalog) btnSeeAllCatalog.addEventListener("click", () => this.navigateTo("catalog", "ALL"));

    // Solutions Cards on Home Page
    const cardBikes = document.getElementById("solutionCardBikes");
    if (cardBikes) cardBikes.addEventListener("click", () => this.navigateTo("catalog", "ALL"));

    const cardService = document.getElementById("solutionCardService");
    if (cardService) cardService.addEventListener("click", () => this.navigateTo("service"));

    // Brand Marquee Cards Click (MOOVE, ZEST, PRK, SAMURAI, VENZO)
    document.querySelectorAll(".brand-marquee-card").forEach(card => {
      card.addEventListener("click", () => {
        const brand = card.getAttribute("data-brand");
        this.filters.brand = brand;
        if (this.filterBrand) this.filterBrand.value = brand;
        this.navigateTo("catalog");
      });
    });

    // Category Cards & Nav Links
    document.querySelectorAll(".cat-card, .nav-cat-link").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = item.getAttribute("data-cat") || item.getAttribute("data-category");
        this.navigateTo("catalog", cat);
      });
    });

    // Search bar inside Catalog Page
    if (this.catalogSearchInput) {
      this.catalogSearchInput.addEventListener("input", (e) => {
        this.filters.search = e.target.value;
        this.renderCatalog();
      });
    }
    if (this.btnSearchCatalog) {
      this.btnSearchCatalog.addEventListener("click", () => {
        if (this.catalogSearchInput) this.filters.search = this.catalogSearchInput.value;
        this.renderCatalog();
      });
    }

    // Category Pills in Filter Sidebar
    document.querySelectorAll(".category-pills .pill-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = btn.getAttribute("data-cat");
        this.setCategoryFilter(cat);
      });
    });

    // Brand Select
    if (this.filterBrand) {
      this.filterBrand.addEventListener("change", (e) => {
        this.filters.brand = e.target.value;
        this.renderCatalog();
      });
    }

    // Color Select
    if (this.filterColor) {
      this.filterColor.addEventListener("change", (e) => {
        this.filters.color = e.target.value;
        this.renderCatalog();
      });
    }

    // Wheel Sizes Checkboxes
    document.querySelectorAll("input[name='wheelSize']").forEach(cb => {
      cb.addEventListener("change", () => {
        const checked = Array.from(document.querySelectorAll("input[name='wheelSize']:checked")).map(c => c.value);
        this.filters.wheelSizes = checked;
        this.renderCatalog();
      });
    });

    // Frame Size Buttons
    document.querySelectorAll(".size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const size = btn.getAttribute("data-size");
        if (this.filters.frameSize === size) {
          this.filters.frameSize = null;
          btn.classList.remove("active");
        } else {
          document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
          this.filters.frameSize = size;
          btn.classList.add("active");
        }
        this.renderCatalog();
      });
    });

    // Sort Select
    const handleSort = (e) => {
      this.filters.sortBy = e.target.value;
      if (this.sortSelect) this.sortSelect.value = e.target.value;
      if (this.sortSelectMobile) this.sortSelectMobile.value = e.target.value;
      this.renderCatalog();
    };
    if (this.sortSelect) this.sortSelect.addEventListener("change", handleSort);
    if (this.sortSelectMobile) this.sortSelectMobile.addEventListener("change", handleSort);

    // Clear Filters
    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener("click", () => this.resetFilters());
    }
    const emptyReset = document.getElementById("emptyResetFiltersBtn");
    if (emptyReset) emptyReset.addEventListener("click", () => this.resetFilters());

    // Mobile Filter Drawer Toggle
    const mobileFilterBtn = document.getElementById("toggleMobileFilterBtn");
    const sidebar = document.getElementById("filterSidebar");
    if (mobileFilterBtn && sidebar) {
      mobileFilterBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active-mobile");
      });
    }

    // Detail Modal Events
    if (this.closeDetailModalBtn) {
      this.closeDetailModalBtn.addEventListener("click", () => this.closeDetailModal());
    }
    if (this.productDetailModal) {
      this.productDetailModal.addEventListener("click", (e) => {
        if (e.target === this.productDetailModal) this.closeDetailModal();
      });
    }

    // Cart Drawer Events
    if (this.openCartDrawerBtn) this.openCartDrawerBtn.addEventListener("click", () => this.toggleCartDrawer(true));
    if (this.closeCartDrawerBtn) this.closeCartDrawerBtn.addEventListener("click", () => this.toggleCartDrawer(false));
    if (this.cartDrawer) {
      this.cartDrawer.addEventListener("click", (e) => {
        if (e.target === this.cartDrawer) this.toggleCartDrawer(false);
      });
    }
    if (this.btnCheckoutWhatsApp) {
      this.btnCheckoutWhatsApp.addEventListener("click", () => this.checkoutWhatsApp());
    }

    // Admin Events
    if (this.openAdminViewBtn) this.openAdminViewBtn.addEventListener("click", () => this.navigateTo("admin"));
    if (this.exitAdminViewBtn) this.exitAdminViewBtn.addEventListener("click", () => this.navigateTo("home"));
    if (this.adminProductForm) this.adminProductForm.addEventListener("submit", (e) => this.handleAdminFormSubmit(e));
    if (this.cancelEditBtn) this.cancelEditBtn.addEventListener("click", () => this.resetAdminForm());
    
    const resetFormBtn = document.getElementById("resetAdminFormBtn");
    if (resetFormBtn) resetFormBtn.addEventListener("click", () => this.resetAdminForm());
    if (this.adminTableSearch) this.adminTableSearch.addEventListener("input", () => this.renderAdminTable());
  }

  // Multi-View Navigation Router
  navigateTo(viewName, filterCategory = null) {
    this.currentView = viewName;

    // Hide all views
    Object.keys(this.views).forEach(key => {
      if (this.views[key]) this.views[key].classList.add("hidden");
    });

    // Show target view
    if (this.views[viewName]) {
      this.views[viewName].classList.remove("hidden");
    }

    // Update Nav Active state
    document.querySelectorAll(".nav-link").forEach(link => {
      const linkView = link.getAttribute("data-view");
      if (linkView === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // View specific actions
    if (viewName === "catalog") {
      if (filterCategory) {
        this.setCategoryFilter(filterCategory);
      } else {
        this.renderCatalog();
      }
    } else if (viewName === "home") {
      this.renderHomeFeatured();
    } else if (viewName === "admin") {
      this.renderAdminTable();
    }
  }

  setCategoryFilter(cat) {
    this.filters.category = cat || "ALL";
    document.querySelectorAll(".category-pills .pill-btn").forEach(btn => {
      if (btn.getAttribute("data-cat") === this.filters.category) btn.classList.add("active");
      else btn.classList.remove("active");
    });
    this.renderCatalog();
  }

  resetFilters() {
    this.filters = {
      search: "",
      category: "ALL",
      brand: "ALL",
      wheelSizes: [],
      frameSize: null,
      color: "ALL",
      sortBy: "featured"
    };

    if (this.catalogSearchInput) this.catalogSearchInput.value = "";
    if (this.filterBrand) this.filterBrand.value = "ALL";
    if (this.filterColor) this.filterColor.value = "ALL";
    if (this.sortSelect) this.sortSelect.value = "featured";

    document.querySelectorAll("input[name='wheelSize']").forEach(cb => cb.checked = false);
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));

    this.setCategoryFilter("ALL");
  }

  getFilteredProducts() {
    return this.products.filter(item => {
      if (this.filters.search) {
        const query = this.filters.search.toLowerCase();
        const matchModel = item.model.toLowerCase().includes(query);
        const matchBrand = item.brand.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchModel && !matchBrand && !matchCategory) return false;
      }

      if (this.filters.category !== "ALL" && item.category !== this.filters.category) return false;
      if (this.filters.brand !== "ALL" && item.brand.toLowerCase() !== this.filters.brand.toLowerCase()) return false;
      if (this.filters.wheelSizes.length > 0 && !this.filters.wheelSizes.includes(item.wheelSize)) return false;
      if (this.filters.frameSize && item.frameSize !== this.filters.frameSize) return false;
      if (this.filters.color !== "ALL" && !item.color.toLowerCase().includes(this.filters.color.toLowerCase())) return false;

      return true;
    }).sort((a, b) => {
      if (this.filters.sortBy === "price-asc") return a.price - b.price;
      if (this.filters.sortBy === "price-desc") return b.price - a.price;
      if (this.filters.sortBy === "model-asc") return a.model.localeCompare(b.model);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  // --- CART FUNCTIONS ---
  addToCart(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId);
    if (existingIndex !== -1) {
      this.cart[existingIndex].qty += 1;
    } else {
      this.cart.push({ ...prod, qty: 1 });
    }

    this.saveCart();
    this.toggleCartDrawer(true);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateCartQty(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    }
  }

  toggleCartDrawer(show) {
    if (!this.cartDrawer) return;
    if (show) {
      this.cartDrawer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      this.cartDrawer.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }

  updateCartUI() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (this.cartBadgeCount) this.cartBadgeCount.textContent = totalItems;
    if (this.cartTotalPrice) {
      this.cartTotalPrice.textContent = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(totalPrice) + " ARS";
    }

    if (!this.cartDrawerBody) return;
    if (this.cart.length === 0) {
      this.cartDrawerBody.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color:var(--text-muted)">
          <i class="fa-solid fa-cart-shopping" style="font-size:2.5rem; color:var(--accent-orange); margin-bottom:12px"></i>
          <p>Tu carrito de compras está vacío.</p>
          <button class="btn-hero-primary" onclick="app.toggleCartDrawer(false); app.navigateTo('catalog')" style="margin-top:16px; font-size:0.8rem; padding:10px 18px">Explorar Catálogo</button>
        </div>
      `;
      return;
    }

    this.cartDrawerBody.innerHTML = "";
    this.cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item-card";
      const itemPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(item.price * item.qty);

      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.model}" class="cart-item-img" onerror="this.onerror=null; this.src='assets/venzo_raptor.jpg';">
        <div class="cart-item-details">
          <span class="cart-item-title">${item.model}</span>
          <div class="cart-item-price">${itemPrice} ARS</div>
          <div class="cart-item-qty">
            <button class="btn-qty" onclick="app.updateCartQty('${item.id}', -1)">-</button>
            <span style="font-family:var(--font-mono); font-size:0.85rem">${item.qty}</span>
            <button class="btn-qty" onclick="app.updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="btn-cart-remove" onclick="app.removeFromCart('${item.id}')" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
      `;
      this.cartDrawerBody.appendChild(itemEl);
    });
  }

  checkoutWhatsApp() {
    if (this.cart.length === 0) {
      alert("Tu carrito de compras está vacío.");
      return;
    }

    let msgLines = ["Hola Danti Bikes! Quisiera realizar el siguiente pedido desde la web:"];
    let totalPrice = 0;

    this.cart.forEach((item, idx) => {
      const sub = item.price * item.qty;
      totalPrice += sub;
      msgLines.push(`${idx + 1}. ${item.model} (x${item.qty}) - $ ${sub.toLocaleString('es-AR')} ARS`);
    });

    msgLines.push(`\nTotal Estimado: $ ${totalPrice.toLocaleString('es-AR')} ARS`);
    msgLines.push("Por favor confirmenme stock e instrucciones de pago por Mercado Pago / Transferencia.");

    const waUrl = `https://wa.me/5493411234567?text=${encodeURIComponent(msgLines.join('\n'))}`;
    window.open(waUrl, '_blank');
  }

  // Render Home Page Featured Preview Grid
  renderHomeFeatured() {
    if (!this.homeFeaturedGrid) return;
    const featuredList = this.products.filter(p => p.featured).slice(0, 4);
    this.homeFeaturedGrid.innerHTML = "";

    featuredList.forEach(prod => {
      this.homeFeaturedGrid.appendChild(this.createProductCardElement(prod));
    });
  }

  // Render Full Catalog Grid
  renderCatalog() {
    if (!this.productGrid) return;
    const list = this.getFilteredProducts();
    if (this.productResultsCount) this.productResultsCount.textContent = list.length;

    if (list.length === 0) {
      this.productGrid.classList.add("hidden");
      this.emptyState.classList.remove("hidden");
      return;
    }

    this.emptyState.classList.add("hidden");
    this.productGrid.classList.remove("hidden");
    this.productGrid.innerHTML = "";

    list.forEach(prod => {
      this.productGrid.appendChild(this.createProductCardElement(prod));
    });
  }

  // Helper method to create Card HTML Element
  createProductCardElement(prod) {
    const card = document.createElement("div");
    card.className = "product-card";

    const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(prod.price);
    const waMsg = encodeURIComponent(`Hola Danti Bikes, me interesa la bicicleta ${prod.model} (Marca ${prod.brand}, Talle ${prod.frameSize}, Rodado ${prod.wheelSize}) publicada en $ ${prod.price.toLocaleString('es-AR')} ARS. Quisiera consultar stock.`);
    const waUrl = `https://wa.me/5493411234567?text=${waMsg}`;

    card.innerHTML = `
      <div class="card-image-wrap" onclick="app.openDetailModal('${prod.id}')" style="cursor:pointer">
        <img src="${prod.image}" alt="${prod.model}" class="card-img" loading="lazy" onerror="this.onerror=null; this.src='assets/venzo_raptor.jpg';">
        <div class="card-badges">
          <span class="badge-status nuevo">NUEVO 0KM</span>
          ${prod.featured ? `<span class="badge-featured"><i class="fa-solid fa-star"></i> DESTACADO</span>` : ''}
        </div>
      </div>

      <div class="card-content">
        <span class="card-category">${prod.brand} // ${prod.category}</span>
        <h3 class="card-title" onclick="app.openDetailModal('${prod.id}')" style="cursor:pointer">${prod.model}</h3>
        
        <div class="card-specs-tags">
          ${prod.wheelSize !== 'N/A' ? `<span class="spec-tag"><i class="fa-solid fa-circle-dot"></i> Rod. ${prod.wheelSize}</span>` : ''}
          ${prod.frameSize !== 'Único' ? `<span class="spec-tag"><i class="fa-solid fa-ruler-combined"></i> Talle ${prod.frameSize}</span>` : ''}
          <span class="spec-tag"><i class="fa-solid fa-palette"></i> ${prod.color}</span>
        </div>

        <div class="card-footer">
          <div class="price-wrap">
            <span class="price-currency">${formattedPrice} ARS</span>
            <span class="price-installments"><i class="fa-solid fa-credit-card"></i> Hasta 12 Cuotas Fijas</span>
          </div>

          <div class="card-btn-group">
            <button class="btn-card-add-cart" onclick="app.addToCart('${prod.id}')" title="Agregar al Carrito">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
            <a href="${waUrl}" target="_blank" class="btn-card-wa" title="Consultar por WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <button class="btn-card-detail" onclick="app.openDetailModal('${prod.id}')" title="Ver ficha técnica completa">
              <i class="fa-solid fa-circle-info"></i> Ficha
            </button>
          </div>
        </div>
      </div>
    `;
    return card;
  }

  openDetailModal(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(prod.price);
    const waMsg = encodeURIComponent(`Hola Danti Bikes, me interesa el modelo ${prod.model} (${prod.brand}). Quisiera consultar disponibilidad y reservarlo.`);
    const waUrl = `https://wa.me/5493411234567?text=${waMsg}`;

    this.modalProductBody.innerHTML = `
      <div class="detail-grid">
        <div class="gallery-wrap">
          <div class="main-img-box">
            <img src="${prod.image}" alt="${prod.model}" onerror="this.onerror=null; this.src='assets/venzo_raptor.jpg';">
          </div>
          <div class="detail-badge-row">
            <span class="badge-status nuevo">NUEVO 0KM</span>
            <span class="badge-featured"><i class="fa-solid fa-shield-check"></i> Garantía Oficial Danti Bikes</span>
          </div>
        </div>

        <div class="detail-info">
          <span class="tech-tag">${prod.brand} // ${prod.category}</span>
          <h2 class="detail-title" id="modalProductTitle">${prod.model}</h2>
          <p class="detail-subtitle">Color: <strong>${prod.color}</strong> | Stock disponible: <strong>${prod.stock} unidades</strong></p>

          <div class="detail-price">${formattedPrice} ARS</div>
          <p class="price-installments" style="font-size:0.9rem"><i class="fa-solid fa-tag"></i> 15% Descuento en Pago Contado Efectivo / Transferencia</p>

          <div style="display:flex; gap:12px; margin: 10px 0;">
            ${prod.wheelSize !== 'N/A' ? `<span class="spec-tag" style="font-size:0.85rem; padding:8px 14px"><i class="fa-solid fa-circle-dot"></i> Rodado ${prod.wheelSize}</span>` : ''}
            ${prod.frameSize !== 'Único' ? `<span class="spec-tag" style="font-size:0.85rem; padding:8px 14px"><i class="fa-solid fa-ruler-combined"></i> Talle ${prod.frameSize}</span>` : ''}
          </div>

          <div style="display:flex; flex-direction:column; gap:12px; margin-top: 15px;">
            <button class="btn-hero-primary" onclick="app.addToCart('${prod.id}'); app.closeDetailModal();" style="width:100%; justify-content:center">
              <i class="fa-solid fa-cart-plus"></i> AGREGAR AL CARRITO DE COMPRAS
            </button>
            <a href="${waUrl}" target="_blank" class="btn-whatsapp-large" style="width:100%; justify-content:center">
              <i class="fa-brands fa-whatsapp"></i> CONSULTAR DIRECTO POR WHATSAPP
            </a>
          </div>
        </div>

        <div class="spec-table-card">
          <h4><i class="fa-solid fa-microchip highlight-orange"></i> FICHA TÉCNICA Y ESPECIFICACIONES DE INGENIERÍA</h4>
          <div class="spec-grid">
            <div class="spec-item">
              <span class="spec-name">Cuadro</span>
              <span class="spec-val">${prod.specs?.cuadro || 'Aluminio Hydroformed'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name">Transmisión</span>
              <span class="spec-val">${prod.specs?.transmision || 'Shimano / Microshift'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name">Frenos</span>
              <span class="spec-val">${prod.specs?.frenos || 'Disco Hidráulico'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name">Suspensión</span>
              <span class="spec-val">${prod.specs?.suspension || 'Horquilla con regulación'}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name">Peso Total</span>
              <span class="spec-val">${prod.specs?.peso || '13.0 kg'}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.productDetailModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeDetailModal() {
    if (this.productDetailModal) {
      this.productDetailModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }

  // --- ADMIN FUNCTIONS ---
  updateMetrics() {
    if (this.metricTotalBikes) this.metricTotalBikes.textContent = this.products.length;
    if (this.metricInStock) this.metricInStock.textContent = this.products.filter(p => p.stock > 0).length;
    if (this.metricFeatured) this.metricFeatured.textContent = this.products.filter(p => p.featured).length;
  }

  renderAdminTable() {
    if (!this.adminProductTableBody) return;
    const filterTerm = (this.adminTableSearch ? this.adminTableSearch.value : "").toLowerCase();
    const list = this.products.filter(p => p.model.toLowerCase().includes(filterTerm) || p.brand.toLowerCase().includes(filterTerm));
    this.adminProductTableBody.innerHTML = "";

    list.forEach(p => {
      const tr = document.createElement("tr");
      const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p.price);

      tr.innerHTML = `
        <td><img src="${p.image}" class="table-img" alt="${p.model}" onerror="this.onerror=null; this.src='assets/venzo_raptor.jpg';"></td>
        <td><strong>${p.model}</strong><br><span style="color:var(--text-muted); font-size:0.75rem">${p.brand}</span></td>
        <td><span class="spec-tag">${p.category}</span></td>
        <td>${p.wheelSize} / Talle ${p.frameSize}</td>
        <td class="table-price">${formattedPrice}</td>
        <td class="table-stock">${p.stock} u.</td>
        <td>
          <button class="btn-tb-edit" onclick="app.toggleFeatured('${p.id}')">
            ${p.featured ? '<i class="fa-solid fa-star" style="color:#FA9D00"></i> Sí' : '<i class="fa-regular fa-star"></i> No'}
          </button>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-tb-edit" onclick="app.startEditProduct('${p.id}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-tb-delete" onclick="app.deleteProduct('${p.id}')" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;
      this.adminProductTableBody.appendChild(tr);
    });
  }

  handleAdminFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("adminProductId").value;
    const model = document.getElementById("adminModel").value;
    const brand = document.getElementById("adminBrand").value;
    const category = document.getElementById("adminCategory").value;
    const wheelSize = document.getElementById("adminWheelSize").value;
    const frameSize = document.getElementById("adminFrameSize").value;
    const color = document.getElementById("adminColor").value || "Negro";
    const price = parseFloat(document.getElementById("adminPrice").value) || 0;
    const stock = parseInt(document.getElementById("adminStock").value) || 1;
    const condition = "NUEVO";
    const image = document.getElementById("adminImage").value || "assets/venzo_raptor.jpg";
    const specsRaw = document.getElementById("adminSpecs").value;
    const featured = document.getElementById("adminFeatured").checked;

    const specsObj = {
      cuadro: specsRaw || "Aluminio de alto rendimiento",
      transmision: "Transmisión 2x9v / 1x11v",
      frenos: "Frenos de disco hidráulicos",
      suspension: "Horquilla con bloqueo",
      peso: "13 kg"
    };

    if (id) {
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], model, brand, category, wheelSize, frameSize, color, price, stock, condition, image, featured, specs: specsObj };
      }
    } else {
      const newProd = {
        id: "db-" + Date.now(),
        model, brand, category, wheelSize, frameSize, color, price, stock, condition, image, featured, specs: specsObj
      };
      this.products.unshift(newProd);
    }

    this.saveProducts();
    this.resetAdminForm();
    this.renderAdminTable();
    alert("¡Producto guardado exitosamente!");
  }

  startEditProduct(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    this.editingProductId = prod.id;
    document.getElementById("adminProductId").value = prod.id;
    document.getElementById("adminModel").value = prod.model;
    document.getElementById("adminBrand").value = prod.brand;
    document.getElementById("adminCategory").value = prod.category;
    document.getElementById("adminWheelSize").value = prod.wheelSize;
    document.getElementById("adminFrameSize").value = prod.frameSize;
    document.getElementById("adminColor").value = prod.color;
    document.getElementById("adminPrice").value = prod.price;
    document.getElementById("adminStock").value = prod.stock;
    document.getElementById("adminImage").value = prod.image;
    document.getElementById("adminSpecs").value = prod.specs ? `${prod.specs.cuadro} | ${prod.specs.transmision}` : "";
    document.getElementById("adminFeatured").checked = prod.featured;

    this.adminFormTitle.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editando: ${prod.model}`;
    this.cancelEditBtn.style.display = "inline-flex";
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  resetAdminForm() {
    this.editingProductId = null;
    this.adminProductForm.reset();
    document.getElementById("adminProductId").value = "";
    this.adminFormTitle.innerHTML = `<i class="fa-solid fa-plus-circle"></i> Cargar Nuevo Producto`;
    this.cancelEditBtn.style.display = "none";
  }

  deleteProduct(productId) {
    if (confirm("¿Estás seguro de eliminar este producto del inventario?")) {
      this.products = this.products.filter(p => p.id !== productId);
      this.saveProducts();
      this.renderAdminTable();
    }
  }

  toggleFeatured(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      prod.featured = !prod.featured;
      this.saveProducts();
      this.renderAdminTable();
    }
  }
}

// Global App Instance
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new DantiBikesApp();
});

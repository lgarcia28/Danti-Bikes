/**
 * DANTI BIKES - MULTI-PAGE ROUTING, CART & STATE ENGINE
 * Official Brands: MOOVE, ZEST, PRK, SAMURAI, VENZO
 */

// Initial Seed Products Catalog featuring official bike models
const INITIAL_PRODUCTS = [
  {
    id: "db-001",
    model: "Venzo Primal R29",
    brand: "VENZO",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "M",
    colorPrimary: "Naranja",
    colorSecondary: "Negro",
    colorHex: "#FA9D00",
    condition: "NUEVO",
    price: 890000,
    stock: 5,
    featured: true,
    image: "assets/venzo_primal.jpg",
    specs: {
      cuadro: "Aluminio 6061 Venzo Primal cableado interno",
      transmision: "Shimano Deore 1x11v Monoplato",
      frenos: "Disco Hidráulico Shimano MT200",
      suspension: "B1 Team Aire con bloqueo al manubrio",
      peso: "13.1 kg"
    }
  },
  {
    id: "db-002",
    model: "Moove Cronos 29\"",
    brand: "MOOVE",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "L",
    colorPrimary: "Gris",
    colorSecondary: "Naranja",
    colorHex: "#71717A",
    condition: "NUEVO",
    price: 795000,
    stock: 4,
    featured: true,
    image: "assets/moove_cronos.jpg",
    specs: {
      cuadro: "Aluminio Hidroformado Moove Cronos Lightweight",
      transmision: "Shimano Altus 2x9v",
      frenos: "Disco Hidráulico Logan 160mm",
      suspension: "Horquilla con bloqueo manual 100mm",
      peso: "13.4 kg"
    }
  },
  {
    id: "db-003",
    model: "Venzo Loki R29",
    brand: "VENZO",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "M",
    colorPrimary: "Naranja",
    colorSecondary: "Negro",
    colorHex: "#FA9D00",
    condition: "NUEVO",
    price: 920000,
    stock: 3,
    featured: true,
    image: "assets/venzo_loki.jpg",
    specs: {
      cuadro: "Aluminio 6061 T6 Venzo Loki Trail Geometry",
      transmision: "Shimano Cues 1x10v",
      frenos: "Frenos Hidráulicos Shimano MT200",
      suspension: "Suntour XCM 100mm con Bloqueo",
      peso: "13.6 kg"
    }
  },
  {
    id: "db-004",
    model: "Venzo Skyline R29",
    brand: "VENZO",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "L",
    colorPrimary: "Negro",
    colorSecondary: "Gris",
    colorHex: "#121214",
    condition: "NUEVO",
    price: 840000,
    stock: 4,
    featured: true,
    image: "assets/venzo_raptor.jpg",
    specs: {
      cuadro: "Aluminio 6061 Venzo Skyline",
      transmision: "Shimano Tourney TX 3x7v",
      frenos: "Frenos a Disco Mecánicos 160mm",
      suspension: "Horquilla con suspensión 80mm",
      peso: "14.1 kg"
    }
  },
  {
    id: "db-005",
    model: "Venzo Raptor EX R29",
    brand: "VENZO",
    category: "MTB",
    wheelSize: "29\"",
    frameSize: "S",
    colorPrimary: "Rojo",
    colorSecondary: "Negro",
    colorHex: "#EF4444",
    condition: "NUEVO",
    price: 960000,
    stock: 3,
    featured: false,
    image: "assets/venzo_raptor.jpg",
    specs: {
      cuadro: "Aluminio 6061 Venzo Raptor EX Competición",
      transmision: "Shimano Deore 1x12v",
      frenos: "Disco Hidráulico Shimano MT400",
      suspension: "Horquilla con bloqueo al manubrio Aire 100mm",
      peso: "12.9 kg"
    }
  },
  {
    id: "db-006",
    model: "Zest Elite Carbon Gravel",
    brand: "ZEST",
    category: "RUTA",
    wheelSize: "29\"",
    frameSize: "M",
    colorPrimary: "Gris",
    colorSecondary: "Negro",
    colorHex: "#71717A",
    condition: "NUEVO",
    price: 1450000,
    stock: 2,
    featured: false,
    image: "assets/cannondale_road.jpg",
    specs: {
      cuadro: "Fibra de Carbono Monocasco Zest Aero",
      transmision: "Shimano 105 2x11v",
      frenos: "Frenos de Disco Hidráulicos Shimano 105",
      suspension: "Horquilla Rígida de Carbono Tapered",
      peso: "8.9 kg"
    }
  }
];

// Application State Store
class DantiBikesApp {
  constructor() {
    this.products = this.loadProductsFromStorage();
    this.cart = this.loadCartFromStorage();
    this.activeView = "home";
    this.filters = {
      search: "",
      category: "ALL",
      brand: "ALL",
      wheelSizes: [],
      frameSizes: [],
      color: "ALL",
      sort: "featured"
    };

    this.adminFilters = {
      brand: "ALL",
      category: "ALL",
      stock: "ALL",
      search: ""
    };

    this.initDOM();
    this.bindEvents();
    this.initScrollReveal();
    this.renderCurrentView();
    this.updateCartBadge();
  }

  // Load / Save Local Storage
  loadProductsFromStorage() {
    const saved = localStorage.getItem("danti_bikes_products_v7");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  }

  saveProductsToStorage() {
    localStorage.setItem("danti_bikes_products_v7", JSON.stringify(this.products));
  }

  loadCartFromStorage() {
    const saved = localStorage.getItem("danti_bikes_cart_v7");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  }

  saveCartToStorage() {
    localStorage.setItem("danti_bikes_cart_v7", JSON.stringify(this.cart));
  }

  // Initialize DOM References
  initDOM() {
    // Views
    this.views = {
      home: document.getElementById("homeView"),
      catalog: document.getElementById("catalogView"),
      service: document.getElementById("serviceView"),
      about: document.getElementById("aboutView"),
      admin: document.getElementById("adminView")
    };

    // Nav elements
    this.navLinks = document.querySelectorAll(".nav-link, .nav-cat-link, .footer-nav-link");
    this.cartBadgeCount = document.getElementById("cartBadgeCount");
    
    // Mobile Drawer
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
    this.mobileNavDrawer = document.getElementById("mobileNavDrawer");
    this.mobileNavItems = document.querySelectorAll(".mobile-nav-item");

    // Cart Drawer
    this.cartDrawer = document.getElementById("cartDrawer");
    this.cartDrawerBody = document.getElementById("cartDrawerBody");
    this.cartTotalPrice = document.getElementById("cartTotalPrice");
    this.openCartDrawerBtn = document.getElementById("openCartDrawerBtn");
    this.closeCartDrawerBtn = document.getElementById("closeCartDrawerBtn");
    this.btnCheckoutWhatsApp = document.getElementById("btnCheckoutWhatsApp");

    // Product Detail Modal
    this.productDetailModal = document.getElementById("productDetailModal");
    this.modalProductBody = document.getElementById("modalProductBody");
    this.closeDetailModalBtn = document.getElementById("closeDetailModalBtn");

    // Catalog view elements
    this.catalogSearchInput = document.getElementById("catalogSearchInput");
    this.btnSearchCatalog = document.getElementById("btnSearchCatalog");
    this.productGrid = document.getElementById("productGrid");
    this.homeFeaturedGrid = document.getElementById("homeFeaturedGrid");
    this.productResultsCount = document.getElementById("productResultsCount");
    this.emptyState = document.getElementById("emptyState");

    // Mobile Filter Panel controls
    this.filterSidebar = document.getElementById("filterSidebar");
    this.toggleMobileFilterBtn = document.getElementById("toggleMobileFilterBtn");
    this.closeFilterMobileBtn = document.getElementById("closeFilterMobileBtn");
    this.btnApplyMobileFilters = document.getElementById("btnApplyMobileFilters");
    this.btnBackMobileFilters = document.getElementById("btnBackMobileFilters");

    // Admin Panel elements
    this.openAdminViewBtn = document.getElementById("openAdminViewBtn");
    this.exitAdminViewBtn = document.getElementById("exitAdminViewBtn");
    this.openAdminModalBtn = document.getElementById("openAdminModalBtn");
    this.adminProductModal = document.getElementById("adminProductModal");
    this.closeAdminModalBtn = document.getElementById("closeAdminModalBtn");
    this.adminProductForm = document.getElementById("adminProductForm");
    this.adminFormTitle = document.getElementById("adminFormTitle");
    this.adminProductId = document.getElementById("adminProductId");
    this.adminProductTableBody = document.getElementById("adminProductTableBody");
    this.adminTableSearch = document.getElementById("adminTableSearch");
    this.resetAdminFormBtn = document.getElementById("resetAdminFormBtn");
    this.cancelEditBtn = document.getElementById("cancelEditBtn");

    // Admin Table Filters
    this.adminFilterBrand = document.getElementById("adminFilterBrand");
    this.adminFilterCategory = document.getElementById("adminFilterCategory");
    this.adminFilterStock = document.getElementById("adminFilterStock");

    // Custom option triggers inside Admin form
    this.btnAddCustomBrand = document.getElementById("btnAddCustomBrand");
    this.btnAddCustomCategory = document.getElementById("btnAddCustomCategory");
    this.btnAddCustomWheelSize = document.getElementById("btnAddCustomWheelSize");
    this.btnAddCustomFrameSize = document.getElementById("btnAddCustomFrameSize");

    // Dual Color Pickers
    this.btnOpenCustomColorPickerPrimary = document.getElementById("btnOpenCustomColorPickerPrimary");
    this.btnOpenCustomColorPickerSecondary = document.getElementById("btnOpenCustomColorPickerSecondary");
    this.adminColorPrimaryPicker = document.getElementById("adminColorPrimaryPicker");
    this.adminColorPrimaryName = document.getElementById("adminColorPrimaryName");
    this.adminColorSecondaryPicker = document.getElementById("adminColorSecondaryPicker");
    this.adminColorSecondaryName = document.getElementById("adminColorSecondaryName");

    // Metrics
    this.metricTotalBikes = document.getElementById("metricTotalBikes");
    this.metricInStock = document.getElementById("metricInStock");
    this.metricFeatured = document.getElementById("metricFeatured");
  }

  // Scroll Reveal Observer
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
  }

  // Bind Event Listeners
  bindEvents() {
    // Navigation routing
    this.navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const view = link.dataset.view || "home";
        const cat = link.dataset.category;
        
        if (cat) {
          this.filters.category = cat;
          this.syncCategoryPillsUI();
        }
        
        this.navigateTo(view);
      });
    });

    // Mobile Menu Drawer Handlers
    this.mobileMenuBtn?.addEventListener("click", () => {
      this.mobileNavDrawer?.classList.remove("hidden");
    });
    this.closeMobileMenuBtn?.addEventListener("click", () => {
      this.mobileNavDrawer?.classList.add("hidden");
    });
    this.mobileNavDrawer?.addEventListener("click", (e) => {
      if (e.target === this.mobileNavDrawer) this.mobileNavDrawer.classList.add("hidden");
    });
    this.mobileNavItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const view = item.dataset.view || "home";
        const cat = item.dataset.category;
        if (cat) {
          this.filters.category = cat;
          this.syncCategoryPillsUI();
        }
        this.mobileNavDrawer?.classList.add("hidden");
        this.navigateTo(view);
      });
    });

    // Logo Home Link
    const logoLink = document.getElementById("logoLink");
    if (logoLink) {
      logoLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.navigateTo("home");
      });
    }

    // Hero CTA Buttons
    document.getElementById("btnGoToCatalog")?.addEventListener("click", () => this.navigateTo("catalog"));
    document.getElementById("btnGoToService")?.addEventListener("click", () => this.navigateTo("service"));
    document.getElementById("btnSeeAllCatalog")?.addEventListener("click", () => this.navigateTo("catalog"));
    document.getElementById("solutionCardBikes")?.addEventListener("click", () => this.navigateTo("catalog"));
    document.getElementById("solutionCardService")?.addEventListener("click", () => this.navigateTo("service"));

    // Cart Drawer Controls
    this.openCartDrawerBtn?.addEventListener("click", () => this.openCart());
    this.closeCartDrawerBtn?.addEventListener("click", () => this.closeCart());
    this.cartDrawer?.addEventListener("click", (e) => {
      if (e.target === this.cartDrawer) this.closeCart();
    });
    this.btnCheckoutWhatsApp?.addEventListener("click", () => this.checkoutWhatsApp());

    // Product Detail Modal Close
    this.closeDetailModalBtn?.addEventListener("click", () => this.closeDetailModal());
    this.productDetailModal?.addEventListener("click", (e) => {
      if (e.target === this.productDetailModal) this.closeDetailModal();
    });

    // Catalog Search Input & Button Sync
    this.catalogSearchInput?.addEventListener("input", (e) => {
      this.filters.search = e.target.value;
      this.renderCatalogGrid();
    });
    this.btnSearchCatalog?.addEventListener("click", () => {
      this.filters.search = this.catalogSearchInput.value;
      this.renderCatalogGrid();
    });

    // Catalog Sidebar Filters Sync
    const filterBrand = document.getElementById("filterBrand");
    filterBrand?.addEventListener("change", (e) => {
      this.filters.brand = e.target.value;
      this.renderCatalogGrid();
    });

    const filterColor = document.getElementById("filterColor");
    filterColor?.addEventListener("change", (e) => {
      this.filters.color = e.target.value;
      this.renderCatalogGrid();
    });

    const sortSelect = document.getElementById("sortSelect");
    sortSelect?.addEventListener("change", (e) => {
      this.filters.sort = e.target.value;
      this.renderCatalogGrid();
    });

    const sortSelectMobile = document.getElementById("sortSelectMobile");
    sortSelectMobile?.addEventListener("change", (e) => {
      this.filters.sort = e.target.value;
      this.renderCatalogGrid();
    });

    // Category Pills inside Catalog
    const pills = document.querySelectorAll("#catalogCategoryPills .pill-btn");
    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.filters.category = pill.dataset.cat;
        this.renderCatalogGrid();
      });
    });

    // Wheel Size Checkboxes inside Catalog
    const wheelBoxes = document.querySelectorAll("#catalogWheelSizeGrid input[name='wheelSize']");
    wheelBoxes.forEach(box => {
      box.addEventListener("change", () => {
        this.filters.wheelSizes = Array.from(wheelBoxes).filter(b => b.checked).map(b => b.value);
        this.renderCatalogGrid();
      });
    });

    // Frame Size Buttons inside Catalog
    const sizeBtns = document.querySelectorAll("#catalogFrameSizeGroup .size-btn");
    sizeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        this.filters.frameSizes = Array.from(sizeBtns).filter(b => b.classList.contains("active")).map(b => b.dataset.size);
        this.renderCatalogGrid();
      });
    });

    // Clear Filters
    document.getElementById("clearFiltersBtn")?.addEventListener("click", () => this.resetFilters());
    document.getElementById("emptyResetFiltersBtn")?.addEventListener("click", () => this.resetFilters());

    // Mobile Filter Sidebar Toggle, Apply & Close Actions
    this.toggleMobileFilterBtn?.addEventListener("click", () => {
      this.filterSidebar?.classList.add("active-mobile");
    });
    this.closeFilterMobileBtn?.addEventListener("click", () => {
      this.filterSidebar?.classList.remove("active-mobile");
    });
    this.btnBackMobileFilters?.addEventListener("click", () => {
      this.filterSidebar?.classList.remove("active-mobile");
    });
    this.btnApplyMobileFilters?.addEventListener("click", () => {
      this.filterSidebar?.classList.remove("active-mobile");
      this.renderCatalogGrid();
      document.getElementById("productGrid")?.scrollIntoView({ behavior: "smooth" });
    });

    // Admin Navigation & Modal
    this.openAdminViewBtn?.addEventListener("click", () => this.navigateTo("admin"));
    this.exitAdminViewBtn?.addEventListener("click", () => this.navigateTo("home"));
    this.openAdminModalBtn?.addEventListener("click", () => this.openAdminModal());
    this.closeAdminModalBtn?.addEventListener("click", () => this.closeAdminModal());
    this.adminProductModal?.addEventListener("click", (e) => {
      if (e.target === this.adminProductModal) this.closeAdminModal();
    });

    // Admin Form Submit & Reset
    this.adminProductForm?.addEventListener("submit", (e) => this.handleAdminFormSubmit(e));
    this.resetAdminFormBtn?.addEventListener("click", () => this.resetAdminForm());
    this.cancelEditBtn?.addEventListener("click", () => this.closeAdminModal());

    // Admin Table Filters Handlers
    this.adminTableSearch?.addEventListener("input", (e) => {
      this.adminFilters.search = e.target.value;
      this.renderAdminTable();
    });
    this.adminFilterBrand?.addEventListener("change", (e) => {
      this.adminFilters.brand = e.target.value;
      this.renderAdminTable();
    });
    this.adminFilterCategory?.addEventListener("change", (e) => {
      this.adminFilters.category = e.target.value;
      this.renderAdminTable();
    });
    this.adminFilterStock?.addEventListener("change", (e) => {
      this.adminFilters.stock = e.target.value;
      this.renderAdminTable();
    });

    // Dynamic Custom Option Triggers inside Admin Form
    this.btnAddCustomBrand?.addEventListener("click", () => this.addCustomOption("adminBrand", "marca"));
    this.btnAddCustomCategory?.addEventListener("click", () => this.addCustomOption("adminCategory", "categoría"));
    this.btnAddCustomWheelSize?.addEventListener("click", () => this.addCustomOption("adminWheelSize", "rodado"));
    this.btnAddCustomFrameSize?.addEventListener("click", () => this.addCustomOption("adminFrameSize", "talle"));

    // DUAL COLOR PRESET PILLS HANDLERS (PRIMARY & SECONDARY)
    const primaryPills = document.querySelectorAll("#primaryColorPresetsGrid .color-preset-pill");
    primaryPills.forEach(pill => {
      pill.addEventListener("click", () => {
        primaryPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        if (this.adminColorPrimaryName) this.adminColorPrimaryName.value = pill.dataset.name;
        if (this.adminColorPrimaryPicker) this.adminColorPrimaryPicker.value = pill.dataset.hex;
      });
    });

    const secondaryPills = document.querySelectorAll("#secondaryColorPresetsGrid .color-preset-pill");
    secondaryPills.forEach(pill => {
      pill.addEventListener("click", () => {
        secondaryPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        if (this.adminColorSecondaryName) this.adminColorSecondaryName.value = pill.dataset.name;
        if (this.adminColorSecondaryPicker) this.adminColorSecondaryPicker.value = pill.dataset.hex;
      });
    });

    // Open Custom Color Picker Triggers
    this.btnOpenCustomColorPickerPrimary?.addEventListener("click", () => {
      if (this.adminColorPrimaryPicker) this.adminColorPrimaryPicker.click();
    });
    this.btnOpenCustomColorPickerSecondary?.addEventListener("click", () => {
      if (this.adminColorSecondaryPicker) this.adminColorSecondaryPicker.click();
    });
  }

  // Add Dynamic Custom Option to Select Dropdowns
  addCustomOption(selectId, labelName) {
    const newVal = prompt(`Ingrese el nombre de la nueva ${labelName}:`);
    if (!newVal || !newVal.trim()) return;

    const trimmed = newVal.trim();
    const select = document.getElementById(selectId);
    if (!select) return;

    let existing = Array.from(select.options).find(opt => opt.value.toLowerCase() === trimmed.toLowerCase());
    if (!existing) {
      const opt = document.createElement("option");
      opt.value = trimmed;
      opt.textContent = trimmed;
      opt.selected = true;
      select.appendChild(opt);
    } else {
      existing.selected = true;
    }
  }

  // View Navigation Router
  navigateTo(viewName) {
    if (!this.views[viewName]) viewName = "home";

    Object.keys(this.views).forEach(key => {
      if (key === viewName) {
        this.views[key].classList.remove("hidden");
        this.views[key].classList.add("active");
      } else {
        this.views[key].classList.add("hidden");
        this.views[key].classList.remove("active");
      }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.view === viewName) link.classList.add("active");
      else link.classList.remove("active");
    });

    this.activeView = viewName;
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewName === "home") this.renderHomeFeaturedGrid();
    if (viewName === "catalog") this.renderCatalogGrid();
    if (viewName === "admin") {
      this.renderAdminTable();
      this.updateAdminMetrics();
    }

    setTimeout(() => this.initScrollReveal(), 100);
  }

  renderCurrentView() {
    this.renderHomeFeaturedGrid();
    this.renderCatalogGrid();
  }

  // Sync Category Pills UI
  syncCategoryPillsUI() {
    const pills = document.querySelectorAll("#catalogCategoryPills .pill-btn");
    pills.forEach(pill => {
      if (pill.dataset.cat === this.filters.category) pill.classList.add("active");
      else pill.classList.remove("active");
    });
  }

  // Reset All Filters
  resetFilters() {
    this.filters = {
      search: "",
      category: "ALL",
      brand: "ALL",
      wheelSizes: [],
      frameSizes: [],
      color: "ALL",
      sort: "featured"
    };

    if (this.catalogSearchInput) this.catalogSearchInput.value = "";
    
    const filterBrand = document.getElementById("filterBrand");
    if (filterBrand) filterBrand.value = "ALL";
    
    const filterColor = document.getElementById("filterColor");
    if (filterColor) filterColor.value = "ALL";

    this.syncCategoryPillsUI();

    document.querySelectorAll("#catalogWheelSizeGrid input").forEach(b => b.checked = false);
    document.querySelectorAll("#catalogFrameSizeGroup .size-btn").forEach(b => b.classList.remove("active"));

    this.renderCatalogGrid();
  }

  // Filter Products Engine
  getFilteredProducts() {
    return this.products.filter(prod => {
      if (this.filters.search) {
        const query = this.filters.search.toLowerCase();
        const matchModel = prod.model.toLowerCase().includes(query);
        const matchBrand = prod.brand.toLowerCase().includes(query);
        const matchCat = prod.category.toLowerCase().includes(query);
        const matchWheel = prod.wheelSize.toLowerCase().includes(query);
        if (!matchModel && !matchBrand && !matchCat && !matchWheel) return false;
      }

      if (this.filters.category !== "ALL" && prod.category !== this.filters.category) return false;
      if (this.filters.brand !== "ALL" && prod.brand !== this.filters.brand) return false;
      if (this.filters.wheelSizes.length > 0 && !this.filters.wheelSizes.includes(prod.wheelSize)) return false;
      if (this.filters.frameSizes.length > 0 && !this.filters.frameSizes.includes(prod.frameSize)) return false;

      if (this.filters.color !== "ALL") {
        const prodColor = (prod.colorPrimary || prod.color || "").toLowerCase();
        if (!prodColor.includes(this.filters.color.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.filters.sort === "price-asc") return a.price - b.price;
      if (this.filters.sort === "price-desc") return b.price - a.price;
      if (this.filters.sort === "model-asc") return a.model.localeCompare(b.model);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  // Render Home Featured Grid
  renderHomeFeaturedGrid() {
    if (!this.homeFeaturedGrid) return;
    const featuredList = this.products.filter(p => p.featured).slice(0, 4);
    this.homeFeaturedGrid.innerHTML = featuredList.map(prod => this.createProductCardHTML(prod)).join("");
    this.attachCardEventListeners(this.homeFeaturedGrid);
  }

  // Render Main Catalog Grid
  renderCatalogGrid() {
    if (!this.productGrid) return;

    const list = this.getFilteredProducts();

    if (this.productResultsCount) {
      this.productResultsCount.textContent = list.length;
    }

    if (list.length === 0) {
      this.productGrid.classList.add("hidden");
      if (this.emptyState) this.emptyState.classList.remove("hidden");
      return;
    }

    this.productGrid.classList.remove("hidden");
    if (this.emptyState) this.emptyState.classList.add("hidden");

    this.productGrid.innerHTML = list.map(prod => this.createProductCardHTML(prod)).join("");
    this.attachCardEventListeners(this.productGrid);
  }

  // Create Product Card HTML
  createProductCardHTML(prod) {
    const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(prod.price);
    const colorDisplay = prod.colorSecondary ? `${prod.colorPrimary} / ${prod.colorSecondary}` : (prod.colorPrimary || prod.color || "Negro");

    return `
      <article class="product-card reveal-on-scroll" data-id="${prod.id}">
        <div class="card-image-wrap">
          <img src="${prod.image}" alt="${prod.model}" class="card-img" loading="lazy">
          <div class="card-badges">
            <span class="badge-status nuevo">NUEVO 0KM</span>
            ${prod.featured ? `<span class="badge-featured"><i class="fa-solid fa-star"></i> DESTACADO</span>` : ""}
          </div>
        </div>

        <div class="card-content">
          <span class="card-category"><i class="fa-solid fa-bicycle"></i> ${prod.brand} • ${prod.category}</span>
          <h3 class="card-title">${prod.model}</h3>

          <div class="card-specs-tags">
            ${prod.wheelSize !== "N/A" ? `<span class="spec-tag"><i class="fa-solid fa-circle-dot"></i> R${prod.wheelSize}</span>` : ""}
            ${prod.frameSize ? `<span class="spec-tag"><i class="fa-solid fa-ruler"></i> Talle ${prod.frameSize}</span>` : ""}
            <span class="spec-tag"><i class="fa-solid fa-palette"></i> ${colorDisplay}</span>
          </div>

          <div class="card-footer">
            <div class="price-wrap">
              <span class="price-currency">${formattedPrice}</span>
              <span class="price-installments"><i class="fa-solid fa-credit-card"></i> 6 cuotas fijas</span>
            </div>

            <div class="card-btn-group">
              <button class="btn-card-add-cart" data-id="${prod.id}" title="Agregar al Carrito">
                <i class="fa-solid fa-cart-plus"></i> Agregar
              </button>
              <a href="https://wa.me/5493411234567?text=Hola%20Danti%20Bikes,%20quisiera%20consultar%20por%20la%20bicicleta%20${encodeURIComponent(prod.model)}." target="_blank" class="btn-card-wa" title="Consultar por WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <button class="btn-card-detail" data-id="${prod.id}" title="Ver Ficha Técnica">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // Attach Event Listeners to Product Cards
  attachCardEventListeners(container) {
    container.querySelectorAll(".btn-card-add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.addToCart(btn.dataset.id);
      });
    });

    container.querySelectorAll(".btn-card-detail").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openDetailModal(btn.dataset.id);
      });
    });
  }

  // Open Product Detail Modal
  openDetailModal(prodId) {
    const prod = this.products.find(p => p.id === prodId);
    if (!prod || !this.modalProductBody) return;

    const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(prod.price);
    const colorDisplay = prod.colorSecondary ? `${prod.colorPrimary} / ${prod.colorSecondary}` : (prod.colorPrimary || prod.color || "Negro");
    const specs = prod.specs || {};

    this.modalProductBody.innerHTML = `
      <div class="detail-grid">
        <div class="gallery-wrap">
          <div class="main-img-box">
            <img src="${prod.image}" alt="${prod.model}">
          </div>
        </div>

        <div class="detail-info">
          <div class="detail-badge-row">
            <span class="badge-status nuevo">NUEVO 0KM</span>
            <span class="tech-tag">${prod.brand}</span>
          </div>
          <h2 class="detail-title">${prod.model}</h2>
          <p class="detail-subtitle">Bicicleta 100% nueva 0km en caja con garantía oficial Danti Bikes.</p>
          <div class="detail-price">${formattedPrice} ARS</div>

          <div class="hero-cta-group">
            <button class="btn-hero-primary btn-modal-add" data-id="${prod.id}">
              <i class="fa-solid fa-cart-shopping"></i> Agregar al Carrito
            </button>
            <a href="https://wa.me/5493411234567?text=Hola%20Danti%20Bikes,%20quisiera%20comprar%20la%20${encodeURIComponent(prod.model)}." target="_blank" class="btn-whatsapp-large">
              <i class="fa-brands fa-whatsapp"></i> Comprar por WhatsApp
            </a>
          </div>
        </div>

        <!-- STRUCTURED SEPARATED TECHNICAL SPECIFICATIONS -->
        <div class="spec-table-card">
          <h4><i class="fa-solid fa-list-check highlight-orange"></i> FICHA TÉCNICA Y COMPONENTES DETALLADOS</h4>
          <div class="spec-grid">
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-bicycle"></i> Cuadro</span>
              <span class="spec-val">${specs.cuadro || "Aluminio 6061 Hidroformado Danti Pro"}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-gears"></i> Transmisión</span>
              <span class="spec-val">${specs.transmision || "Transmisión de precisión"}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-circle-dot"></i> Frenos</span>
              <span class="spec-val">${specs.frenos || "Frenos de disco hidráulicos"}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-sliders"></i> Suspensión</span>
              <span class="spec-val">${specs.suspension || "Horquilla con bloqueo 100mm"}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-ruler-combined"></i> Rodado y Talle</span>
              <span class="spec-val">Rodado ${prod.wheelSize} | Talle ${prod.frameSize}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-palette"></i> Colores</span>
              <span class="spec-val">${colorDisplay}</span>
            </div>
            <div class="spec-item">
              <span class="spec-name"><i class="fa-solid fa-weight-hanging"></i> Peso Estimado</span>
              <span class="spec-val">${specs.peso || "13.0 kg"}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.modalProductBody.querySelector(".btn-modal-add")?.addEventListener("click", () => {
      this.addToCart(prod.id);
      this.closeDetailModal();
    });

    this.productDetailModal.classList.remove("hidden");
  }

  closeDetailModal() {
    if (this.productDetailModal) this.productDetailModal.classList.add("hidden");
  }

  // Shopping Cart Logic
  addToCart(prodId) {
    const prod = this.products.find(p => p.id === prodId);
    if (!prod) return;

    const existing = this.cart.find(item => item.id === prodId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...prod, qty: 1 });
    }

    this.saveCartToStorage();
    this.updateCartBadge();
    this.renderCartDrawer();
    this.openCart();
  }

  updateCartBadge() {
    const totalQty = this.cart.reduce((sum, item) => sum + item.qty, 0);
    if (this.cartBadgeCount) this.cartBadgeCount.textContent = totalQty;
  }

  openCart() {
    this.renderCartDrawer();
    if (this.cartDrawer) this.cartDrawer.classList.remove("hidden");
  }

  closeCart() {
    if (this.cartDrawer) this.cartDrawer.classList.add("hidden");
  }

  renderCartDrawer() {
    if (!this.cartDrawerBody) return;

    if (this.cart.length === 0) {
      this.cartDrawerBody.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-cart-shopping icon-empty"></i>
          <p>Tu carrito de compras está vacío.</p>
        </div>
      `;
      if (this.cartTotalPrice) this.cartTotalPrice.textContent = "$ 0 ARS";
      return;
    }

    let total = 0;
    this.cartDrawerBody.innerHTML = this.cart.map(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(item.price);

      return `
        <div class="cart-item-card">
          <img src="${item.image}" alt="${item.model}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.model}</h4>
            <div class="cart-item-price">${formattedPrice}</div>
            <div class="cart-item-qty">
              <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
              <span>${item.qty}</span>
              <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="btn-cart-remove" data-id="${item.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
    }).join("");

    if (this.cartTotalPrice) {
      this.cartTotalPrice.textContent = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(total) + " ARS";
    }

    this.cartDrawerBody.querySelectorAll(".btn-minus").forEach(btn => {
      btn.addEventListener("click", () => this.changeCartQty(btn.dataset.id, -1));
    });
    this.cartDrawerBody.querySelectorAll(".btn-plus").forEach(btn => {
      btn.addEventListener("click", () => this.changeCartQty(btn.dataset.id, 1));
    });
    this.cartDrawerBody.querySelectorAll(".btn-cart-remove").forEach(btn => {
      btn.addEventListener("click", () => this.removeFromCart(btn.dataset.id));
    });
  }

  changeCartQty(prodId, delta) {
    const item = this.cart.find(i => i.id === prodId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(prodId);
    } else {
      this.saveCartToStorage();
      this.updateCartBadge();
      this.renderCartDrawer();
    }
  }

  removeFromCart(prodId) {
    this.cart = this.cart.filter(i => i.id !== prodId);
    this.saveCartToStorage();
    this.updateCartBadge();
    this.renderCartDrawer();
  }

  checkoutWhatsApp() {
    if (this.cart.length === 0) return;
    let text = "Hola Danti Bikes! Quisiera realizar el siguiente pedido:\n\n";
    let total = 0;
    this.cart.forEach(item => {
      text += `• ${item.model} (x${item.qty}) - $${(item.price * item.qty).toLocaleString("es-AR")} ARS\n`;
      total += item.price * item.qty;
    });
    text += `\n*Total Estimado:* $${total.toLocaleString("es-AR")} ARS`;
    window.open(`https://wa.me/5493411234567?text=${encodeURIComponent(text)}`, "_blank");
  }

  // ==========================================================================
  // ADMIN PANEL & MODAL CRUD OPERATIONS
  // ==========================================================================

  openAdminModal(editProdId = null) {
    if (editProdId) {
      const prod = this.products.find(p => p.id === editProdId);
      if (prod) {
        if (this.adminFormTitle) this.adminFormTitle.innerHTML = `<i class="fa-solid fa-pen-to-square highlight-orange"></i> Editar Producto: ${prod.model}`;
        if (this.adminProductId) this.adminProductId.value = prod.id;
        
        document.getElementById("adminModel").value = prod.model;
        document.getElementById("adminBrand").value = prod.brand;
        document.getElementById("adminCategory").value = prod.category;
        document.getElementById("adminWheelSize").value = prod.wheelSize;
        document.getElementById("adminFrameSize").value = prod.frameSize;
        document.getElementById("adminPrice").value = prod.price;
        document.getElementById("adminStock").value = prod.stock;
        document.getElementById("adminImage").value = prod.image;
        document.getElementById("adminFeatured").checked = !!prod.featured;

        // Dual Colors
        this.adminColorPrimaryName.value = prod.colorPrimary || prod.color || "";
        this.adminColorSecondaryName.value = prod.colorSecondary || "";
        if (prod.colorHex) this.adminColorPrimaryPicker.value = prod.colorHex;

        // Specs
        const specs = prod.specs || {};
        document.getElementById("adminSpecCuadro").value = specs.cuadro || "";
        document.getElementById("adminSpecTransmision").value = specs.transmision || "";
        document.getElementById("adminSpecFrenos").value = specs.frenos || "";
        document.getElementById("adminSpecSuspension").value = specs.suspension || "";
        document.getElementById("adminSpecPeso").value = specs.peso || "";

        if (this.cancelEditBtn) this.cancelEditBtn.style.display = "inline-flex";
      }
    } else {
      this.resetAdminForm();
    }

    if (this.adminProductModal) this.adminProductModal.classList.remove("hidden");
  }

  closeAdminModal() {
    if (this.adminProductModal) this.adminProductModal.classList.add("hidden");
    this.resetAdminForm();
  }

  resetAdminForm() {
    if (this.adminProductForm) this.adminProductForm.reset();
    if (this.adminProductId) this.adminProductId.value = "";
    if (this.adminFormTitle) this.adminFormTitle.innerHTML = `<i class="fa-solid fa-plus-circle highlight-orange"></i> Cargar Nuevo Producto`;
    if (this.cancelEditBtn) this.cancelEditBtn.style.display = "none";
    document.querySelectorAll(".color-preset-pill").forEach(p => p.classList.remove("active"));
  }

  handleAdminFormSubmit(e) {
    e.preventDefault();

    const id = this.adminProductId.value || `db-${Date.now().toString().slice(-5)}`;
    const model = document.getElementById("adminModel").value.trim();
    const brand = document.getElementById("adminBrand").value;
    const category = document.getElementById("adminCategory").value;
    const wheelSize = document.getElementById("adminWheelSize").value;
    const frameSize = document.getElementById("adminFrameSize").value;
    const price = parseFloat(document.getElementById("adminPrice").value) || 0;
    const stock = parseInt(document.getElementById("adminStock").value, 10) || 0;
    const image = document.getElementById("adminImage").value.trim() || "assets/venzo_raptor.jpg";
    const featured = document.getElementById("adminFeatured").checked;

    // Dual Colors
    const colorPrimary = this.adminColorPrimaryName.value.trim() || "Naranja";
    const colorSecondary = this.adminColorSecondaryName.value.trim() || "";
    const colorHex = this.adminColorPrimaryPicker.value || "#FA9D00";

    const specs = {
      cuadro: document.getElementById("adminSpecCuadro").value.trim() || "Aluminio Danti Pro",
      transmision: document.getElementById("adminSpecTransmision").value.trim() || "Shimano 1x11v",
      frenos: document.getElementById("adminSpecFrenos").value.trim() || "Frenos Hidráulicos",
      suspension: document.getElementById("adminSpecSuspension").value.trim() || "Horquilla con bloqueo",
      peso: document.getElementById("adminSpecPeso").value.trim() || "13.0 kg"
    };

    const newProd = {
      id,
      model,
      brand,
      category,
      wheelSize,
      frameSize,
      colorPrimary,
      colorSecondary,
      colorHex,
      condition: "NUEVO",
      price,
      stock,
      featured,
      image,
      specs
    };

    const existingIndex = this.products.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
      this.products[existingIndex] = newProd;
    } else {
      this.products.unshift(newProd);
    }

    this.saveProductsToStorage();
    this.renderAdminTable();
    this.updateAdminMetrics();
    this.renderCatalogGrid();
    this.closeAdminModal();
    alert(`¡Producto "${model}" guardado correctamente!`);
  }

  deleteProduct(prodId) {
    if (!confirm("¿Está seguro de eliminar este producto del inventario?")) return;
    this.products = this.products.filter(p => p.id !== prodId);
    this.saveProductsToStorage();
    this.renderAdminTable();
    this.updateAdminMetrics();
    this.renderCatalogGrid();
  }

  renderAdminTable() {
    if (!this.adminProductTableBody) return;

    const filteredList = this.products.filter(p => {
      if (this.adminFilters.search) {
        const query = this.adminFilters.search.toLowerCase();
        if (!p.model.toLowerCase().includes(query) && !p.brand.toLowerCase().includes(query)) return false;
      }
      if (this.adminFilters.brand !== "ALL" && p.brand !== this.adminFilters.brand) return false;
      if (this.adminFilters.category !== "ALL" && p.category !== this.adminFilters.category) return false;
      if (this.adminFilters.stock === "in-stock" && p.stock <= 0) return false;
      if (this.adminFilters.stock === "featured" && !p.featured) return false;

      return true;
    });

    this.adminProductTableBody.innerHTML = filteredList.map(p => {
      const formattedPrice = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p.price);
      const colorDisplay = p.colorSecondary ? `${p.colorPrimary} / ${p.colorSecondary}` : (p.colorPrimary || p.color || "Negro");

      return `
        <tr>
          <td><img src="${p.image}" alt="${p.model}" class="table-img"></td>
          <td><strong>${p.model}</strong><br><small class="accent-text">${p.brand}</small></td>
          <td><span class="spec-tag">${p.category}</span></td>
          <td>${p.wheelSize} / ${p.frameSize}</td>
          <td><small>${colorDisplay}</small></td>
          <td><span class="table-price">${formattedPrice}</span></td>
          <td><span class="table-stock">${p.stock} u.</span></td>
          <td>${p.featured ? `<i class="fa-solid fa-star accent-text"></i> Sí` : 'No'}</td>
          <td>
            <div class="table-actions">
              <button class="btn-tb-edit" data-id="${p.id}"><i class="fa-solid fa-pen"></i> Editar</button>
              <button class="btn-tb-delete" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    this.adminProductTableBody.querySelectorAll(".btn-tb-edit").forEach(btn => {
      btn.addEventListener("click", () => this.openAdminModal(btn.dataset.id));
    });

    this.adminProductTableBody.querySelectorAll(".btn-tb-delete").forEach(btn => {
      btn.addEventListener("click", () => this.deleteProduct(btn.dataset.id));
    });
  }

  updateAdminMetrics() {
    if (this.metricTotalBikes) this.metricTotalBikes.textContent = this.products.length;
    if (this.metricInStock) this.metricInStock.textContent = this.products.filter(p => p.stock > 0).length;
    if (this.metricFeatured) this.metricFeatured.textContent = this.products.filter(p => p.featured).length;
  }
}

// Instantiate App when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.dantiApp = new DantiBikesApp();
});

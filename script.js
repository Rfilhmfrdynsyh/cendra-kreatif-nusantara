// ==========================================================
// DATA SIMULASI PRODUK (Diperbarui dengan Kategori Baru)
// ==========================================================
const PRODUCTS = {
    // PATTERN SERIES
    'Tumbler': { 
        name: 'Tumbler', 
        category: 'Tumbler',
        images: ['fp/tumbler.png', 'fp/tumbler2.png', 'fp/tumbler3.png'],
        specs: ['2 kompartemen', 'Pengait besi', 'Branding Sablon', 'Material: Stainless Steel'],
        categoryLink: 'product-list.html?category=tumbler'
    },
    'Handbag': { 
        name: 'Handbag', 
        category: 'Handbag',
        images: ['fp/handbag.png', 'fp/handbag2.png', 'fp/handbag3.png'],
        specs: ['2 kompartemen di bagian depan', 'Pengait besi', 'Branding Emboss, Laser', 'Material: Kulit Sintetis Premium'],
        categoryLink: 'product-list.html?category=handbag'
    },
    'Emoney': { 
        name: 'EMONEY', 
        category: 'Emoney',
        images: ['fp/EMONEY.png', 'fp/EMONEY2.png', 'fp/EMONEY3.png'],
        specs: ['Tempat Kartu E-Money', 'Desain Etnik', 'Material: PVC Tebal'],
        categoryLink: 'product-list.html?category=Emoney'
    },
    'Payung':{
        name: 'Payung', 
        category: 'payung',
        images: ['fp/payung.png', 'fp/payung2.png', 'fp/payung3.png'],
        specs: ['Payung Lipat Otomatis', 'Desain Etnik', 'Material: Kain Tahan Air'],
        categoryLink: 'product-list.html?category=payung'
    },
    'pulpen': { 
        name: 'Pulpen', 
        category: 'pulpen',
        images: ['fp/pen.png', 'fp/pen2.png', 'fp/pen3.png'],
        specs: ['Pulpen Ballpoint', 'Material: Plastik dan Logam', 'Tinta: Biru'],
        categoryLink: 'product-list.html?category=pulpen'
    },
    'Giftset 01': {
        name: 'Giftset 01',
        category: 'Hardbox',
        images: ['fp/gifset1.png', 'fp/gifset2.png', 'fp/gifset3.png'],
        specs: ['Set Hadiah Eksklusif', 'Isi: Tumbler, Pulpen, Notebook', 'Kemasan: Hardbox Premium'],
        categoryLink: 'product-list.html?category=Hardbox'
    },
    'giftset 02': {
        name: 'Giftset 02',
        category: 'Hardbox',
        images: ['fp/giftsetbox2.png', 'fp/giftsetbox2-2.png', 'fp/giftsetbox2-3.png'],
        specs: ['Set Hadiah Elegan', 'Isi: Handbag, Payung, Emoney', 'Kemasan: Hardbox Eksklusif'],
        categoryLink: 'product-list.html?category=Hardbox'
    },
    'giftset 03': {
        name: 'Giftset 03',
        category: 'Hardbox',
        images: ['fp/giftset3.png', 'fp/giftset3-2.png', 'fp/giftset3-3.png'],
        specs: ['Set Hadiah Mewah', 'Isi: Tumbler, Handbag, Pulpen, Payung', 'Kemasan: Hardbox Mewah'],
        categoryLink: 'product-list.html?category=Hardbox'
    },
    // ... produk lainnya

    // Tambahkan produk dummy untuk kategori baru
    'Agenda': { 
        name: 'Agenda', 
        category: 'Agenda',
        images: ['fp/agenda.png', 'fp/agenda2.png   ', 'fp/agenda3.png'],
        specs: ['Tas Ransel', 'Kotak Pensil', 'Buku Agenda', 'Material: Poliester'],
        categoryLink: 'product-list.html?category=Agenda'
    },
    'giftbox-premium': { 
        name: 'Giftbox Premium', 
        category: 'Hardbox',
        images: ['fp/Box.png'],
        specs: ['Gift Box eksklusif', 'Custom logo', 'Cocok untuk event perusahaan'],
        categoryLink: 'product-list.html?category=Hardbox'
    },
    // ... produk lainnya
};

// Semua slug kategori yang ada di Index.html dan Sidebar
const ALL_CATEGORY_SLUGS = [
    'all', 
    'Tumbler', 
    'Agenda', 
    'Emoney', 
    'Handbag', 
    'Hardbox', 
    'pulpen', 
    'payung', 
];


// ==========================================================
// 1. Fungsi Utama Navigasi & Utility
// ==========================================================

// Navigasi (Hamburger Menu & Smooth Scrolling sudah bagus)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    // ... (Logika Hamburger sudah benar)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Efek scroll pada header (sudah bagus)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Smooth Scrolling (sudah bagus)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Fungsi untuk mendapatkan parameter dari URL (sudah bagus)
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fungsi untuk memformat slug menjadi judul (Diperbarui untuk casing yang lebih baik)
function formatSlugToTitle(slug) {
    if (slug === 'all') return 'All Products';
    
    // Kasus khusus
    const specialCase = {
        'gift-set': 'Gift Set',
        'employee-kit': 'Employee Kit',
        'customer-gift': 'Customer Gift',
        'luxury-package': 'Luxury Package',
        'business-kit': 'Business Kit',
        'student-kit': 'Student Kit',
        'blue-ethnic': 'Blue Ethnic',
    };

    if (specialCase[slug]) return specialCase[slug];

    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


// ==========================================================
// 2. Logika Halaman List (product-list.html)
// ==========================================================

function renderSidebarCategories(currentCategory) {
    const sidebarContainer = document.getElementById('sidebar-categories');
    if (!sidebarContainer) return;

    // Menghilangkan duplikasi kategori umum dan utama
    const uniqueSlugs = [...new Set(ALL_CATEGORY_SLUGS)];

    sidebarContainer.innerHTML = uniqueSlugs.map(slug => {
        const title = formatSlugToTitle(slug);
        const isActive = slug === currentCategory ? 'active' : '';
        return `
            <li class="${isActive}">
                <a href="product-list.html?category=${slug}">${title}</a>
            </li>
        `;
    }).join('');
}


function handleProductList() {
    const categoryParam = getQueryParameter('category');
    const listingTitle = document.getElementById('listing-title');
    const pageTitle = document.getElementById('page-title');
    const productGrid = document.getElementById('product-listing-grid');

    if (!listingTitle || !pageTitle || !productGrid) return; 

    let currentCategory = categoryParam || 'all';

    const formattedCategory = currentCategory === 'all' 
        ? 'Semua Produk' 
        : formatSlugToTitle(currentCategory);
    
    listingTitle.textContent = formattedCategory;
    pageTitle.textContent = `${formattedCategory} - PT CENDRA KREATIF NUSANTARA`;
    
    // 1. Render Sidebar
    renderSidebarCategories(currentCategory);

    // 2. Filter produk (Logika filter disempurnakan)
    const filteredProducts = Object.keys(PRODUCTS).filter(id => {
        const product = PRODUCTS[id];
        
        if (currentCategory === 'all') return true;
        
        // Cek kategori utama (pattern-series, gift-set, dll)
        if (product.category === currentCategory) return true;
        
        // Cek kategori umum (agenda, tumbler, pulpen, dll) - HANYA SIMULASI!
        if (currentCategory === 'agenda' && ['rogy'].includes(id)) return true;
        if (currentCategory === 'tumbler' && ['vertus'].includes(id)) return true;
        
        return false;
    });

    // 3. Generate HTML untuk produk
    productGrid.innerHTML = filteredProducts.map(id => {
        const product = PRODUCTS[id];
        return `
            <div class="product-card list-card animate">
                 <a href="product-detail.html?id=${id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${formatSlugToTitle(product.category)}</p>
                    </div>
                </a>
                <button class="add-to-cart-btn">+</button>
            </div>
        `;
    }).join('');
    
    if (filteredProducts.length === 0) {
         productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 50px;">Belum ada produk untuk kategori ini.</p>';
    }
}


// ==========================================================
// 3. Logika Halaman Detail (product-detail.html)
// ==========================================================

function handleProductDetail() {
    const productId = getQueryParameter('id');
    const product = PRODUCTS[productId];
    
    if (!product) return; 

    const mainImg = document.getElementById('main-product-img');
    const productNameElement = document.getElementById('detail-product-name');
    const pageTitle = document.getElementById('detail-page-title');
    const thumbnailContainer = document.getElementById('thumbnail-images');
    const productSpecs = document.getElementById('product-specs');
    const chatLink1 = document.querySelector('.sales-contact .contact-card:nth-child(1) a.btn-chat');
    const chatLink2 = document.querySelector('.sales-contact .contact-card:nth-child(2) a.btn-chat');


    productNameElement.textContent = `${product.name} - ${formatSlugToTitle(product.category)}`;
    pageTitle.textContent = `${product.name} - Detail Produk`;

    // 1. Update Galeri Gambar
    mainImg.src = product.images[0];
    
    // 2. Update Thumbnail
    thumbnailContainer.innerHTML = product.images.map((src, index) => {
        return `<img src="${src}" alt="Thumbnail ${index + 1}" class="${index === 0 ? 'active-thumb' : ''}">`;
    }).join('');

    const thumbnails = thumbnailContainer.querySelectorAll('img');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImg.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active-thumb'));
            thumb.classList.add('active-thumb');
        });
    });

    // 3. Update Spesifikasi
    productSpecs.innerHTML = product.specs.map(spec => `<li>• ${spec}</li>`).join('');

    // 4. Update Link Kategori
    const categoryLinkElement = document.querySelector('.product-category-link a');
    if (categoryLinkElement) {
        categoryLinkElement.href = product.categoryLink;
        categoryLinkElement.textContent = formatSlugToTitle(product.category);
    }
    
    // 5. Update Link Chat WhatsApp
    const chatText = `Halo, saya tertarik dengan produk ${product.name} - ${formatSlugToTitle(product.category)}.`;
    const encodedChatText = encodeURIComponent(chatText);
    const waBaseUrl = 'https://wa.me/6289653648383?text=';
    
    if (chatLink1) chatLink1.href = `${waBaseUrl}Halo%20Sally%2C%20${encodedChatText}`;
    if (chatLink2) chatLink2.href = `${waBaseUrl}Halo%20Rey%2C%20${encodedChatText}`;
}


// ==========================================================
// 4. Eksekusi Berdasarkan Halaman
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('product-list.html')) {
        handleProductList();
    } else if (path.includes('product-detail.html')) {
        handleProductDetail();
    }
});

// ==========================================================
// 5. Logika Logo Carousel (Auto-Scroll)
// ==========================================================

function initLogoCarousel() {
    const logoInner = document.querySelector('.logo-carousel-inner');
    const logoSlider = document.querySelector('.logo-slider');

    if (logoInner && logoSlider) {
        // Duplikasi konten logoSlider
        const clonedSlider = logoSlider.cloneNode(true);
        
        // Hapus animasi dari duplikat sementara agar tidak bentrok saat kloning
        clonedSlider.style.animation = 'none'; 
        
        // Tambahkan duplikat ke inner container
        logoInner.appendChild(clonedSlider);

        // Setelah duplikat ditambahkan, kita tambahkan kembali class logo-slider
        // yang sudah memiliki animasi (ini penting agar total lebar menjadi 2x)
        clonedSlider.classList.add('logo-slider');
    }
}

// Panggil fungsi saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', () => {
    // ... (Logika handleProductList dan handleProductDetail Anda) ...
    
    // Panggil fungsi inisialisasi logo carousel
    initLogoCarousel(); 
});

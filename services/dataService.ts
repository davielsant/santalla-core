
export interface Product {
    id: number;
    name: string;
    sku: string;
    price: number; // In Local Currency
    cost: number;
    stock: number;
    image: string;
    category: string;
    barcode?: string;
}

export interface AppSettings {
    exchangeRate: number; // Local per 1 USD
}

export interface GlobalStats {
    cashInBox: number;
    tips: number;
    totalSales: number;
    transactionCount: number;
}

export interface SaleItem {
    productId: number;
    productName: string;
    productImage: string;
    category: string;
    qty: number;
    price: number;
    total: number;
}

export interface SaleRecord {
    id: string;
    date: string; // ISO string
    items: SaleItem[];
    total: number;
    seller: string;
    status: 'Completado' | 'Pendiente' | 'Cancelado';
    paymentMethod: 'Efectivo' | 'Tarjeta';
}

const DEFAULT_PRODUCTS: Product[] = [
    { id: 1, name: 'Coca Cola Original 600ml', sku: 'BEB-001', price: 18.00, cost: 12.00, stock: 50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80', category: 'Bebidas', barcode: '7501055300075' },
    { id: 2, name: 'Agua Mineral Topo Chico', sku: 'BEB-002', price: 22.00, cost: 15.00, stock: 8, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=150&q=80', category: 'Bebidas', barcode: '7501055310807' },
    { id: 3, name: 'Papas Sabritas Sal', sku: 'SNK-001', price: 18.50, cost: 14.00, stock: 20, image: 'https://images.unsplash.com/photo-1566478919030-26174a2912fb?auto=format&fit=crop&w=150&q=80', category: 'Snacks', barcode: '7501011123456' },
    { id: 4, name: 'Gansito Marinela', sku: 'SNK-002', price: 15.00, cost: 10.00, stock: 5, image: 'https://images.unsplash.com/photo-1630384060421-a4323ce66488?auto=format&fit=crop&w=150&q=80', category: 'Snacks', barcode: '7501000111222' },
    { id: 5, name: 'Cafe Americano 12oz', sku: 'CAF-001', price: 35.00, cost: 15.00, stock: 100, image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=150&q=80', category: 'Cafetería', barcode: 'CAFE001' },
    { id: 6, name: 'Nike Air Max', sku: 'ZAP-001', price: 2400.00, cost: 1200.00, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80', category: 'Calzado', barcode: 'NIKE001' },
    { id: 7, name: 'Sony WH-1000XM5', sku: 'AUD-001', price: 6500.00, cost: 4500.00, stock: 8, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=150&q=80', category: 'Electrónica', barcode: 'SONY001' },
];

const DEFAULT_SETTINGS: AppSettings = {
    exchangeRate: 18.50 // Example: 18.50 Local Currency = 1 USD
};

const DEFAULT_STATS: GlobalStats = {
    cashInBox: 1500.00,
    tips: 0,
    totalSales: 0,
    transactionCount: 0
};

// Keys
const K_PRODUCTS = 'santalla_products';
const K_SETTINGS = 'santalla_settings';
const K_STATS = 'santalla_stats';
const K_SALES = 'santalla_sales_history';

const generateMockSales = (): SaleRecord[] => {
    // Generate history for the chart (spanning last 6 months)
    const records: SaleRecord[] = [];
    const sellers = ['Carlos Ruiz', 'Juan Pérez', 'Ana Lopez'];
    const statuses: ('Completado' | 'Pendiente')[] = ['Completado', 'Completado', 'Completado', 'Pendiente'];
    
    // Create sales for last 180 days (approx 6 months)
    for (let i = 0; i < 150; i++) {
        // Skew random towards more recent dates
        const daysAgo = Math.floor(Math.pow(Math.random(), 2) * 180);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        
        const prod = DEFAULT_PRODUCTS[Math.floor(Math.random() * DEFAULT_PRODUCTS.length)];
        const qty = Math.floor(Math.random() * 4) + 1;
        
        records.push({
            id: `ORD-${1000 + i}`,
            date: date.toISOString(),
            seller: sellers[Math.floor(Math.random() * sellers.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            paymentMethod: Math.random() > 0.5 ? 'Efectivo' : 'Tarjeta',
            total: prod.price * qty,
            items: [{
                productId: prod.id,
                productName: prod.name,
                productImage: prod.image,
                category: prod.category,
                qty: qty,
                price: prod.price,
                total: prod.price * qty
            }]
        });
    }
    return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const DataService = {
    getProducts: (): Product[] => {
        const stored = localStorage.getItem(K_PRODUCTS);
        return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    },

    saveProducts: (products: Product[]) => {
        localStorage.setItem(K_PRODUCTS, JSON.stringify(products));
    },

    addProduct: (product: Product) => {
        const products = DataService.getProducts();
        product.id = Date.now();
        products.push(product);
        DataService.saveProducts(products);
    },

    deleteProduct: (id: number) => {
        const products = DataService.getProducts();
        const filtered = products.filter(p => p.id !== id);
        DataService.saveProducts(filtered);
    },

    clearProducts: () => {
        localStorage.setItem(K_PRODUCTS, JSON.stringify([]));
        return [];
    },

    getSettings: (): AppSettings => {
        const stored = localStorage.getItem(K_SETTINGS);
        return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    },

    saveSettings: (settings: AppSettings) => {
        localStorage.setItem(K_SETTINGS, JSON.stringify(settings));
    },

    getStats: (): GlobalStats => {
        const stored = localStorage.getItem(K_STATS);
        return stored ? JSON.parse(stored) : { ...DEFAULT_STATS };
    },

    saveStats: (stats: GlobalStats) => {
        localStorage.setItem(K_STATS, JSON.stringify(stats));
    },

    distributeTips: () => {
        const stats = DataService.getStats();
        // Force tips to 0
        stats.tips = 0;
        DataService.saveStats(stats);
        return stats;
    },

    resetCashRegister: () => {
        const stats = DataService.getStats();
        stats.cashInBox = 0;
        stats.transactionCount = 0;
        stats.totalSales = 0;
        DataService.saveStats(stats);
        localStorage.setItem(K_SALES, JSON.stringify([]));
        return stats;
    },

    clearSales: () => {
        localStorage.setItem(K_SALES, JSON.stringify([]));
        return [];
    },

    getSales: (): SaleRecord[] => {
        const stored = localStorage.getItem(K_SALES);
        if (stored) return JSON.parse(stored);
        
        // Return Mock Data if empty to populate the UI
        const mocks = generateMockSales();
        localStorage.setItem(K_SALES, JSON.stringify(mocks));
        
        // Also update stats based on mocks if stats are empty
        const currentStats = DataService.getStats();
        if (currentStats.totalSales === 0) {
            const total = mocks.reduce((acc, s) => acc + s.total, 0);
            const count = mocks.length;
            const newStats = { ...currentStats, totalSales: total, transactionCount: count };
            localStorage.setItem(K_STATS, JSON.stringify(newStats));
        }

        return mocks;
    },

    processSale: (cartItems: {product: Product, qty: number}[], paymentAmount: number, total: number) => {
        const products = DataService.getProducts();
        const stats = DataService.getStats();
        const sales = DataService.getSales();

        // 1. Update Stock
        cartItems.forEach(item => {
            const productIndex = products.findIndex(p => p.id === item.product.id);
            if (productIndex !== -1) {
                products[productIndex].stock = Math.max(0, products[productIndex].stock - item.qty);
            }
        });
        DataService.saveProducts(products);

        // 2. Create Sale Record
        const newSale: SaleRecord = {
            id: `ORD-${Date.now().toString().slice(-6)}`,
            date: new Date().toISOString(),
            total: total,
            seller: 'Carlos Ruiz', // Default logged user
            status: 'Completado',
            paymentMethod: 'Efectivo',
            items: cartItems.map(item => ({
                productId: item.product.id,
                productName: item.product.name,
                productImage: item.product.image,
                category: item.product.category,
                price: item.product.price,
                qty: item.qty,
                total: item.product.price * item.qty
            }))
        };
        
        // Add to history (top)
        sales.unshift(newSale);
        localStorage.setItem(K_SALES, JSON.stringify(sales));

        // 3. Update Global Stats
        const tip = Math.max(0, paymentAmount - total);
        stats.cashInBox += total; // Adding revenue to box
        stats.tips += tip;
        stats.totalSales += total;
        stats.transactionCount += 1;
        localStorage.setItem(K_STATS, JSON.stringify(stats));

        return { success: true, tipAmount: tip };
    }
};

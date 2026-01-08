
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import NavigationOverlay from '../components/NavigationOverlay';
import { DataService, SaleRecord, Product, GlobalStats } from '../services/dataService';

const ScreenDashboard = () => {
    const [sales, setSales] = useState<SaleRecord[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [stats, setStats] = useState<GlobalStats | null>(null);

    useEffect(() => {
        const loadedSales = DataService.getSales();
        const loadedProducts = DataService.getProducts();
        const loadedStats = DataService.getStats();
        setSales(loadedSales);
        setProducts(loadedProducts);
        setStats(loadedStats);
    }, []);

    // --- KPI CALCULATIONS ---
    const financialMetrics = useMemo(() => {
        // 1. Total Revenue (Ingresos Netos)
        // If we have GlobalStats use that, otherwise sum sales
        const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

        // 2. Estimate COGS (Cost of Goods Sold) and Expenses for Demo
        // In a real app, this comes from Purchase Orders. Here we sum the 'cost' of items sold.
        let totalCOGS = 0;
        sales.forEach(sale => {
            sale.items.forEach(item => {
                // Find current cost of product (simplification)
                const product = products.find(p => p.id === item.productId);
                const cost = product ? product.cost : (item.price * 0.6); // Fallback estimate
                totalCOGS += cost * item.qty;
            });
        });

        // 3. Operating Expenses (Gastos Operativos)
        // Simulated as fixed overhead + 10% of revenue for prototype
        const operatingExpenses = 12000 + (totalRevenue * 0.05);

        // 4. Net Income & Margins
        const netIncome = totalRevenue - totalCOGS - operatingExpenses;
        const operatingMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0;

        // 5. Assets (for ROA)
        // Assets = Cash in Box + Inventory Value
        const inventoryValue = products.reduce((acc, p) => acc + (p.cost * p.stock), 0);
        const totalAssets = (stats?.cashInBox || 0) + inventoryValue + 50000; // +50k Fixed Assets (equipment)
        const roa = totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0;

        return {
            revenue: totalRevenue,
            expenses: operatingExpenses + totalCOGS,
            margin: operatingMargin,
            roa: roa
        };
    }, [sales, products, stats]);

    // --- CHART DATA (Last 6 Months) ---
    const chartData = useMemo(() => {
        const today = new Date();
        const months = [];
        
        // Generate last 6 month labels
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push({
                name: d.toLocaleString('default', { month: 'short' }), // e.g., 'Feb'
                fullName: d.toLocaleString('default', { month: 'long' }),
                year: d.getFullYear(),
                monthIndex: d.getMonth(),
                revenue: 0,
                expenses: 0
            });
        }

        // Aggregate Sales
        sales.forEach(sale => {
            const saleDate = new Date(sale.date);
            const monthEntry = months.find(m => m.monthIndex === saleDate.getMonth() && m.year === saleDate.getFullYear());
            if (monthEntry) {
                monthEntry.revenue += sale.total;
                // Estimate expenses per sale for the chart bars
                monthEntry.expenses += (sale.total * 0.65); 
            }
        });

        // Max value for scaling bars
        const maxVal = Math.max(...months.map(m => m.revenue), 1);

        return months.map(m => ({
            ...m,
            heightPct: `${Math.min((m.revenue / maxVal) * 90, 100)}%`, // Bar height
            expenseHeight: `${Math.min((m.expenses / maxVal) * 90, 90)}%` // Expense overlay height
        }));

    }, [sales]);

    // --- ALERTS ---
    const lowStockAlerts = useMemo(() => {
        return products.filter(p => p.stock < 10).slice(0, 3);
    }, [products]);

    // --- UNIT BREAKDOWN (Simulated by Sellers) ---
    const unitPerformance = useMemo(() => {
        // Map specific sellers to "Units" for the UI demo
        const unitMap: {[key: string]: { name: string, code: string, color: string }} = {
            'Ana Lopez': { name: 'Sucursal Centro', code: 'SC', color: 'blue' },
            'Carlos Ruiz': { name: 'Sucursal Norte', code: 'SN', color: 'purple' },
            'Juan Pérez': { name: 'Distribución Local', code: 'DL', color: 'orange' }
        };

        const breakdown: {[key: string]: { revenue: number, name: string, code: string, color: string, seller: string }} = {};

        sales.forEach(sale => {
            const unit = unitMap[sale.seller] || { name: 'Ventas Generales', code: 'VG', color: 'gray' };
            if (!breakdown[sale.seller]) {
                breakdown[sale.seller] = { revenue: 0, seller: sale.seller, ...unit };
            }
            breakdown[sale.seller].revenue += sale.total;
        });

        const maxRev = Math.max(...Object.values(breakdown).map(b => b.revenue), 1);

        return Object.values(breakdown).map(b => ({
            ...b,
            efficiency: Math.min(Math.round((b.revenue / maxRev) * 98), 100)
        })).sort((a, b) => b.revenue - a.revenue);

    }, [sales]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display selection:bg-primary selection:text-black">
            <Sidebar />
            <NavigationOverlay />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 lg:py-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        
                        {/* Header Section */}
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                    Hola, Juan Santalla
                                </h2>
                                <p className="text-slate-500 dark:text-[#a2c398] text-base">
                                    Resumen ejecutivo del estado de tu negocio.
                                </p>
                            </div>
                            {/* Date Filters / Chips */}
                            <div className="flex gap-2 bg-white dark:bg-surface-dark p-1.5 rounded-full border border-slate-200 dark:border-[#2e4328] shadow-sm">
                                <button className="px-5 py-2 rounded-full bg-primary text-black text-sm font-bold shadow-sm transition-transform active:scale-95">Hoy</button>
                                <button className="px-5 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2e4328] text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors">Semana</button>
                                <button className="px-5 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2e4328] text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors">Mes</button>
                            </div>
                        </header>

                        {/* KPI Cards Section */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            {/* Ingresos Netos Card */}
                            <div className="group relative flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(83,210,45,0.1)]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">account_balance_wallet</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Ingresos Netos</p>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                        ${financialMetrics.revenue.toLocaleString('en-US', {maximumFractionDigits: 0})}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-end justify-between">
                                    <div className="flex items-center gap-1 text-primary text-sm font-bold bg-primary/10 px-2 py-1 rounded-md">
                                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                        <span>+12.5%</span>
                                    </div>
                                    <svg className="w-24 h-8 text-primary opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 30">
                                        <path d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 12 L70 5 L80 8 L90 2 L100 0" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* ROA Card (Gauge Viz) */}
                            <div className="group relative flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(83,210,45,0.1)]">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">ROA (Activos)</p>
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                            {financialMetrics.roa.toFixed(1)}%
                                        </h3>
                                    </div>
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-col items-center relative">
                                    {/* CSS Gauge */}
                                    <div className="w-32 h-16 bg-slate-200 dark:bg-[#2e4328] rounded-t-full relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 w-full h-full origin-bottom transition-transform duration-1000" 
                                             style={{
                                                 background: `conic-gradient(from 180deg at 50% 100%, #53d22d 0deg, #53d22d ${Math.min(financialMetrics.roa * 5, 180)}deg, transparent ${Math.min(financialMetrics.roa * 5, 180)}deg)`, 
                                                 transform: 'rotate(0deg)'
                                             }}>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-white dark:bg-surface-dark rounded-t-full flex items-end justify-center pb-1">
                                            <span className="text-xs text-slate-400 font-medium">Meta: 18%</span>
                                        </div>
                                    </div>
                                    <p className="text-primary text-sm font-bold mt-2">+2.1% vs mes ant.</p>
                                </div>
                            </div>

                            {/* Margen Operativo */}
                            <div className="group relative flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(83,210,45,0.1)]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                        <span className="material-symbols-outlined">pie_chart</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Margen Operativo</p>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                        {financialMetrics.margin.toFixed(1)}%
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-end justify-between">
                                    <div className="flex items-center gap-1 text-primary text-sm font-bold">
                                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                        <span>+0.8%</span>
                                    </div>
                                    <div className="h-1.5 w-24 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{width: `${Math.min(financialMetrics.margin * 2, 100)}%`}}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Gastos Operativos */}
                            <div className="group relative flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] hover:border-red-500/50 transition-all hover:shadow-[0_4px_20px_rgba(250,75,56,0.1)]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-red-500/10 text-[#fa4b38]">
                                        <span className="material-symbols-outlined">trending_down</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-[#fa4b38] transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Gastos Operativos</p>
                                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                        ${financialMetrics.expenses.toLocaleString('en-US', {maximumFractionDigits: 0})}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-end justify-between">
                                    <div className="flex items-center gap-1 text-[#fa4b38] text-sm font-bold bg-red-500/10 px-2 py-1 rounded-md">
                                        <span className="material-symbols-outlined text-[16px]">trending_down</span>
                                        <span>-5.3%</span>
                                    </div>
                                    <svg className="w-24 h-8 text-[#fa4b38] opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 30">
                                        <path d="M0 5 L10 8 L20 12 L30 10 L40 15 L50 12 L60 20 L70 18 L80 25 L90 22 L100 28" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                            </div>
                        </section>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Chart Section */}
                            <div className="lg:col-span-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-2xl p-6 lg:p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tendencias Financieras</h3>
                                        <p className="text-sm text-slate-500 dark:text-[#a2c398]">Ingresos vs Gastos (Últimos 6 meses)</p>
                                    </div>
                                    <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-white transition-colors">
                                        <span>Ver Reporte Completo</span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                </div>
                                
                                <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 h-64 w-full pt-4">
                                    <div className="hidden md:flex flex-col justify-between h-full text-xs text-slate-500 dark:text-slate-500 pb-8 mr-2">
                                        <span>$100k</span>
                                        <span>$50k</span>
                                        <span>$25k</span>
                                        <span>0</span>
                                    </div>
                                    
                                    {/* Dynamic Bars */}
                                    {chartData.map((d, i) => {
                                        const isCurrent = i === chartData.length - 1;
                                        return (
                                            <div key={i} className="flex flex-col justify-end items-center h-full flex-1 gap-2 group cursor-pointer">
                                                <div className={`relative w-full max-w-[40px] flex items-end justify-center rounded-t-lg bg-slate-100 dark:bg-[#2e4328] overflow-hidden ${isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#1c2b18] h-[95%]' : 'h-[85%]'}`}>
                                                    
                                                    {/* Revenue Bar */}
                                                    <div className="w-full bg-primary/30 group-hover:bg-primary transition-all duration-300 relative" style={{height: d.heightPct}}>
                                                        {/* Tooltip */}
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg pointer-events-none border border-white/10">
                                                            Ing: ${d.revenue.toLocaleString()} | Gas: ${d.expenses.toLocaleString()}
                                                        </div>
                                                        {/* Highlight Value for current month */}
                                                        {isCurrent && (
                                                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-bold text-xs py-1 px-2 whitespace-nowrap z-10">
                                                                ${d.revenue.toLocaleString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Expenses Overlay */}
                                                    <div className="absolute bottom-0 w-full bg-primary border-t border-black/20" style={{height: d.expenseHeight}}></div>
                                                </div>
                                                
                                                {/* Label */}
                                                <span className={`text-xs font-medium ${isCurrent ? 'text-white font-bold bg-primary/20 px-2 py-0.5 rounded-full' : 'text-slate-500'}`}>
                                                    {d.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Alerts Feed */}
                            <div className="lg:col-span-1 flex flex-col gap-4">
                                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-2xl p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="relative">
                                            <span className="material-symbols-outlined text-yellow-500 dark:text-yellow-400 animate-pulse">notifications_active</span>
                                            <span className="absolute top-0 right-0 size-2.5 bg-red-500 rounded-full border border-surface-dark"></span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alertas Críticas</h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                        {/* Dynamic Low Stock Alerts */}
                                        {lowStockAlerts.map(product => (
                                            <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500">
                                                <div className="mt-0.5">
                                                    <span className="material-symbols-outlined text-red-500 text-[20px]">warning</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-slate-900 dark:text-white text-sm font-bold">Stock Bajo: {product.name}</p>
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Inventario actual: {product.stock} unidades.</p>
                                                    <button className="text-red-500 text-xs font-bold text-left mt-1 hover:underline">Reordenar Ahora</button>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {/* Static Alerts for Context */}
                                        {lowStockAlerts.length === 0 && (
                                             <div className="flex gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500">
                                                 <div className="mt-0.5">
                                                     <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                                                 </div>
                                                 <div className="flex flex-col gap-1">
                                                     <p className="text-slate-900 dark:text-white text-sm font-bold">Inventario Saludable</p>
                                                     <p className="text-slate-500 dark:text-slate-400 text-xs">Todos los productos tienen stock suficiente.</p>
                                                 </div>
                                             </div>
                                        )}

                                        <div className="flex gap-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500">
                                            <div className="mt-0.5">
                                                <span className="material-symbols-outlined text-yellow-500 text-[20px]">schedule</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-slate-900 dark:text-white text-sm font-bold">3 Facturas Vencidas</p>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs">Total pendiente: $3,450. Clientes: TechSol, MueblesYA.</p>
                                                <button className="text-yellow-500 text-xs font-bold text-left mt-1 hover:underline">Enviar Recordatorio</button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-l-4 border-slate-500">
                                            <div className="mt-0.5">
                                                <span className="material-symbols-outlined text-slate-400 text-[20px]">dns</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-slate-900 dark:text-white text-sm font-bold">Mantenimiento Servidor</p>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs">Programado para: Mañana, 02:00 AM.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: Top Performing Units */}
                        <section className="mb-8">
                            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-2xl p-6 lg:p-8">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Desglose por Unidades</h3>
                                        <p className="text-sm text-slate-500 dark:text-[#a2c398]">Rendimiento de sucursales principales (Basado en Vendedores)</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2e4328] transition-colors">Exportar CSV</button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-[#2e4328]">
                                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Unidad</th>
                                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Responsable</th>
                                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ingresos</th>
                                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Eficiencia</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {unitPerformance.map((unit, idx) => {
                                                const bgColors: {[key: string]: string} = {
                                                    'blue': 'bg-blue-500/20 text-blue-500',
                                                    'purple': 'bg-purple-500/20 text-purple-500',
                                                    'orange': 'bg-orange-500/20 text-orange-500',
                                                    'gray': 'bg-slate-500/20 text-slate-500'
                                                };
                                                const barColors: {[key: string]: string} = {
                                                    'blue': 'bg-primary',
                                                    'purple': 'bg-primary',
                                                    'orange': 'bg-yellow-500',
                                                    'gray': 'bg-slate-500'
                                                };
                                                
                                                return (
                                                    <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-[#2e4328]/30 transition-colors border-b border-slate-100 dark:border-[#2e4328]/50 last:border-0">
                                                        <td className="py-4 px-2 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                                            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${bgColors[unit.color]}`}>
                                                                {unit.code}
                                                            </div>
                                                            {unit.name}
                                                        </td>
                                                        <td className="py-4 px-2 text-slate-600 dark:text-slate-400">{unit.seller}</td>
                                                        <td className="py-4 px-2">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${unit.efficiency > 80 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                                                <span className={`size-1.5 rounded-full ${unit.efficiency > 80 ? 'bg-primary animate-pulse' : 'bg-yellow-500'}`}></span>
                                                                {unit.efficiency > 80 ? 'Activo' : 'Revisión'}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-2 text-right font-medium text-slate-900 dark:text-white">${unit.revenue.toLocaleString()}</td>
                                                        <td className="py-4 px-2 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <span className={`text-xs font-bold ${unit.efficiency > 80 ? 'text-primary' : 'text-yellow-500'}`}>{unit.efficiency}%</span>
                                                                <div className="w-16 h-1.5 bg-slate-700 rounded-full">
                                                                    <div className={`h-full rounded-full ${barColors[unit.color]}`} style={{width: `${unit.efficiency}%`}}></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScreenDashboard;

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { DataService, SaleRecord, SaleItem } from '../services/dataService';

const ScreenReports = () => {
    const [sales, setSales] = useState<SaleRecord[]>([]);
    const [filterType, setFilterType] = useState<'item' | 'employee' | 'category'>('item');
    const [dateRange, setDateRange] = useState('Oct 1, 2023 - Oct 31, 2023'); // Visual placeholder mostly
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    useEffect(() => {
        setSales(DataService.getSales());
    }, []);

    // --- KPI CALCULATIONS ---
    const totalSales = sales.reduce((acc, s) => acc + s.total, 0);
    const transactionCount = sales.length;
    const averageTicket = transactionCount > 0 ? totalSales / transactionCount : 0;

    // --- CHART DATA PREPARATION ---
    // Group sales by day for the chart
    const chartData = useMemo(() => {
        const groups: {[key: string]: number} = {};
        sales.forEach(sale => {
            const date = new Date(sale.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });
            const key = `${day} ${month}`;
            groups[key] = (groups[key] || 0) + sale.total;
        });

        // Convert to array and sort by date (simplified, just taking last 7 keys for demo)
        const labels = Object.keys(groups).slice(0, 7).reverse(); // Showing random 7 for layout if unsorted, ideally sort by timestamp
        
        // Let's just normalize for the visual bars
        const maxVal = Math.max(...Object.values(groups), 1);
        
        return Object.entries(groups).slice(0, 7).map(([label, value]) => ({
            label,
            value,
            height: `${(value / maxVal) * 100}%`,
            displayValue: `$${(value / 1000).toFixed(1)}k`
        }));
    }, [sales]);

    // --- TABLE DATA PREPARATION ---
    // Flatten sales into line items for the "Detail" view and Sort them
    const tableData = useMemo(() => {
        const rows: (SaleItem & { 
            saleDate: string, 
            saleId: string, 
            seller: string, 
            status: string 
        })[] = [];

        sales.forEach(sale => {
            sale.items.forEach(item => {
                rows.push({
                    ...item,
                    saleDate: sale.date,
                    saleId: sale.id,
                    seller: sale.seller,
                    status: sale.status
                });
            });
        });

        // Sorting Logic based on filterType
        return rows.sort((a, b) => {
            if (filterType === 'item') {
                return a.productName.localeCompare(b.productName);
            } else if (filterType === 'employee') {
                return a.seller.localeCompare(b.seller);
            } else if (filterType === 'category') {
                return a.category.localeCompare(b.category);
            }
            return 0;
        });

    }, [sales, filterType]);

    // --- ACTIONS ---
    const handleDownloadCSV = () => {
        const headers = ["ID Venta", "Fecha", "Producto", "Categoria", "Vendedor", "Cantidad", "Precio Unit.", "Total", "Estado"];
        const csvRows = tableData.map(row => [
            row.saleId,
            new Date(row.saleDate).toLocaleDateString(),
            `"${row.productName}"`, // Quote to handle commas
            row.category,
            row.seller,
            row.qty,
            row.price,
            row.total,
            row.status
        ]);

        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + csvRows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "santalla_reporte_ventas.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRefresh = () => {
        // Reload data
        setSales(DataService.getSales());
    };

    const confirmClearReport = () => {
        DataService.clearSales();
        setSales([]);
        setShowClearConfirm(false);
    };

    const handleNewReport = () => {
        alert("Generando nuevo reporte personalizado...");
        // Logic to reset filters or open modal
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Top Navigation / Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#2e4328] px-6 py-4 bg-white dark:bg-background-dark sticky top-0 z-20">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 md:hidden">
                            <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Santalla Core</h2>
                        </div>
                        <div className="hidden md:flex relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 dark:text-[#a2c398]">search</span>
                            </div>
                            <input 
                                className="block w-full rounded-full border-0 py-2 pl-10 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#2e4328] dark:text-white dark:ring-0 dark:placeholder:text-[#a2c398] sm:text-sm sm:leading-6 w-64 transition-all duration-300 focus:w-80" 
                                placeholder="Buscar reporte, venta o empleado..." 
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2e4328] transition-colors">
                            <span className="material-symbols-outlined text-slate-500 dark:text-white">notifications</span>
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                        </button>
                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2e4328] transition-colors">
                            <span className="material-symbols-outlined text-slate-500 dark:text-white">settings</span>
                        </button>
                        <div className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5-slVsLQTkjPe8_4EU2V6Sj4F72J6zkDwCAkq5guGs_eXzTuYC7GNxBU7pcObyT8llAnA4t9BbAJ3e-AqY-I_D8Jp8D7jz2O2gs4TwIZ_gDiMiM2NL2Pk4bzWzDDhQaHgXUzgfbGDzWt2cv0c4hpWqxGF0VM7nny7X4Z1vzZa0KQdZUdzRkr-r4dGECJdMCfrDmvaMRtBMHDL88BbSLRwJfcTzLUmIlOrv1a3tFR1HtUPv7s2eGMklhnVGVLBiYkKZeZqdaOJmzzY')"}}></div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        {/* Page Header Area */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="space-y-2">
                                <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-[#a2c398]">
                                    <Link className="hover:text-primary transition-colors" to="/">Inicio</Link>
                                    <span className="material-symbols-outlined text-[10px]">arrow_forward_ios</span>
                                    <span className="text-slate-900 dark:text-white font-medium">Reportes de Ventas</span>
                                </nav>
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                    Reportes de Ventas
                                </h1>
                                <p className="text-slate-500 dark:text-[#a2c398] max-w-2xl">
                                    Analiza el rendimiento de tu negocio. Genera reportes detallados y exporta la data para tu contabilidad.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handleDownloadCSV}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 dark:border-[#2e4328] text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#2e4328] transition-all text-sm font-bold shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    CSV
                                </button>
                                <button 
                                    onClick={() => setShowClearConfirm(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 dark:border-[#2e4328] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all text-sm font-bold shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-lg">delete_sweep</span>
                                    Limpiar Reporte
                                </button>
                                <button 
                                    onClick={handleNewReport}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-green-500 transition-all text-sm font-bold shadow-lg shadow-primary/25"
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>
                                    Nuevo Reporte
                                </button>
                            </div>
                        </div>

                        {/* Filters & Controls Card */}
                        <div className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-100 dark:border-[#2e4328] p-1 shadow-sm">
                            <div className="flex flex-col lg:flex-row gap-4 p-4">
                                {/* Segmented Control */}
                                <div className="flex bg-slate-100 dark:bg-[#162013] p-1.5 rounded-full self-start lg:self-center">
                                    <label className="cursor-pointer" onClick={() => setFilterType('item')}>
                                        <input type="radio" name="report_type" className="peer sr-only" checked={filterType === 'item'} readOnly />
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-slate-500 dark:text-[#a2c398] peer-checked:bg-white dark:peer-checked:bg-[#2e4328] peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-sm transition-all select-none">
                                            <span className="material-symbols-outlined text-lg">category</span>
                                            Por Ítem
                                        </span>
                                    </label>
                                    <label className="cursor-pointer" onClick={() => setFilterType('employee')}>
                                        <input type="radio" name="report_type" className="peer sr-only" checked={filterType === 'employee'} readOnly />
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-slate-500 dark:text-[#a2c398] peer-checked:bg-white dark:peer-checked:bg-[#2e4328] peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-sm transition-all select-none">
                                            <span className="material-symbols-outlined text-lg">badge</span>
                                            Por Empleado
                                        </span>
                                    </label>
                                    <label className="cursor-pointer" onClick={() => setFilterType('category')}>
                                        <input type="radio" name="report_type" className="peer sr-only" checked={filterType === 'category'} readOnly />
                                        <span className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-slate-500 dark:text-[#a2c398] peer-checked:bg-white dark:peer-checked:bg-[#2e4328] peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-sm transition-all select-none">
                                            <span className="material-symbols-outlined text-lg">sell</span>
                                            Por Categoría
                                        </span>
                                    </label>
                                </div>
                                <div className="h-px lg:h-auto w-full lg:w-px bg-slate-200 dark:bg-[#2e4328]"></div>
                                {/* Date & Filter inputs */}
                                <div className="flex flex-1 flex-wrap items-center gap-3">
                                    <div className="relative group flex-1 min-w-[200px]">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400 dark:text-[#a2c398]">calendar_today</span>
                                        </div>
                                        <input 
                                            className="block w-full rounded-full border-0 py-2.5 pl-10 pr-4 text-slate-900 bg-slate-50 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#162013] dark:text-white dark:ring-[#2e4328] placeholder:text-slate-400 dark:placeholder:text-[#a2c398] sm:text-sm font-medium" 
                                            type="text" 
                                            value={dateRange}
                                            onChange={(e) => setDateRange(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative group flex-1 min-w-[150px]">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400 dark:text-[#a2c398]">filter_list</span>
                                        </div>
                                        <select className="block w-full rounded-full border-0 py-2.5 pl-10 pr-10 text-slate-900 bg-slate-50 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-[#162013] dark:text-white dark:ring-[#2e4328] sm:text-sm font-medium appearance-none cursor-pointer">
                                            <option>Todas las Sucursales</option>
                                            <option>Sucursal Norte</option>
                                            <option>Sucursal Centro</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleRefresh}
                                        className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-lg">refresh</span>
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-[#2e4328] shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-primary">payments</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 dark:text-[#a2c398] mb-1">Ventas Totales</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">${totalSales.toLocaleString('en-US', {minimumFractionDigits: 2})}</h3>
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400">
                                        <span className="material-symbols-outlined text-[12px] mr-1">trending_up</span>
                                        +12.5%
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Vs. periodo anterior</p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-[#2e4328] shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-blue-500">receipt_long</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 dark:text-[#a2c398] mb-1">Transacciones</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{transactionCount}</h3>
                                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/20">
                                        0.0%
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Total de órdenes procesadas</p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-[#2e4328] shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-orange-500">shopping_bag</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 dark:text-[#a2c398] mb-1">Ticket Promedio</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">${averageTicket.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/30 dark:text-red-400">
                                        <span className="material-symbols-outlined text-[12px] mr-1">trending_down</span>
                                        -2.1%
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Valor medio por compra</p>
                            </div>
                        </div>

                        {/* Main Chart & Table Section */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* Chart */}
                            <div className="col-span-1 xl:col-span-3 bg-white dark:bg-surface-dark rounded-3xl border border-slate-100 dark:border-[#2e4328] p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tendencia de Ventas</h3>
                                    <button className="text-xs font-bold text-primary hover:text-green-400 uppercase tracking-wider">Ver Detalles</button>
                                </div>
                                <div aria-label="Bar chart showing sales trends" className="h-64 w-full relative flex items-end justify-between gap-2 px-2" role="img">
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                        <div className="w-full h-px bg-slate-200 dark:bg-[#2e4328] border-dashed"></div>
                                        <div className="w-full h-px bg-slate-200 dark:bg-[#2e4328] border-dashed"></div>
                                        <div className="w-full h-px bg-slate-200 dark:bg-[#2e4328] border-dashed"></div>
                                        <div className="w-full h-px bg-slate-200 dark:bg-[#2e4328] border-dashed"></div>
                                        <div className="w-full h-px bg-slate-200 dark:bg-[#2e4328]"></div>
                                    </div>
                                    
                                    {chartData.map((bar, i) => (
                                        <div key={i} className="w-full h-full flex flex-col justify-end group relative">
                                            <div 
                                                className={`w-full rounded-t-lg transition-all relative ${i === chartData.length - 1 ? 'bg-primary shadow-[0_0_15px_rgba(83,210,45,0.3)]' : 'bg-primary/30 hover:bg-primary/60'}`} 
                                                style={{height: bar.height}}
                                            >
                                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                                                    {bar.displayValue}
                                                </div>
                                            </div>
                                            <div className="text-center mt-2 text-xs text-slate-400 dark:text-[#a2c398] font-mono truncate">
                                                {bar.label}
                                            </div>
                                        </div>
                                    ))}
                                    {chartData.length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            No hay datos disponibles
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="col-span-1 xl:col-span-3 bg-white dark:bg-surface-dark rounded-3xl border border-slate-100 dark:border-[#2e4328] shadow-sm overflow-hidden flex flex-col">
                                <div className="p-6 border-b border-slate-100 dark:border-[#2e4328] flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Detalle de Ventas</h3>
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">filter_alt</span>
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="bg-slate-50 dark:bg-[#162013] text-slate-500 dark:text-[#a2c398]">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold" scope="col">Producto</th>
                                                <th className="px-6 py-4 font-semibold" scope="col">Categoría</th>
                                                <th className="px-6 py-4 font-semibold" scope="col">Vendedor</th>
                                                <th className="px-6 py-4 font-semibold" scope="col">Fecha</th>
                                                <th className="px-6 py-4 font-semibold text-right" scope="col">Cantidad</th>
                                                <th className="px-6 py-4 font-semibold text-right" scope="col">Total</th>
                                                <th className="px-6 py-4 font-semibold text-center" scope="col">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-[#2e4328]">
                                            {tableData.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">No se encontraron ventas.</td>
                                                </tr>
                                            ) : (
                                                tableData.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#22301f] transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-[#2e4328] bg-cover bg-center shrink-0" style={{backgroundImage: `url('${row.productImage}')`}}></div>
                                                                <div className="font-bold text-slate-900 dark:text-white">{row.productName}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-300">{row.category}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center flex items-center justify-center text-xs font-bold text-slate-500">
                                                                    {row.seller.charAt(0)}
                                                                </div>
                                                                <span className="text-slate-600 dark:text-slate-300">{row.seller}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-500 dark:text-[#a2c398]">{new Date(row.saleDate).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4 text-right font-mono text-slate-600 dark:text-slate-300">{row.qty}</td>
                                                        <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">${row.total.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                                                                row.status === 'Completado' 
                                                                    ? 'bg-green-50 text-green-700 border-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:border-green-400/20' 
                                                                    : 'bg-yellow-50 text-yellow-800 border-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:border-yellow-400/20'
                                                            }`}>
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Pagination */}
                                <div className="p-4 border-t border-slate-100 dark:border-[#2e4328] flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-[#a2c398]">Mostrando <span className="font-medium text-slate-900 dark:text-white">{Math.min(tableData.length, 10)}</span> de <span className="font-medium text-slate-900 dark:text-white">{tableData.length}</span> resultados</span>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 text-sm font-medium rounded-full bg-slate-50 text-slate-400 dark:bg-[#162013] dark:text-[#a2c398] cursor-not-allowed" disabled>Anterior</button>
                                        <button className="px-4 py-2 text-sm font-medium rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-[#2e4328] dark:border-0 dark:text-white dark:hover:bg-[#3a5232] transition-colors">Siguiente</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Custom Clear Report Confirmation Modal */}
                {showClearConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-surface-dark border border-border-dark p-6 rounded-2xl max-w-sm w-full shadow-2xl relative transform scale-100 transition-all">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                                    <span className="material-symbols-outlined text-2xl">delete_sweep</span>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold mb-2">¿Limpiar Reporte?</h3>
                                    <p className="text-text-secondary text-sm">Esta acción eliminará todo el historial de ventas. No se puede deshacer.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                    <button 
                                        onClick={() => setShowClearConfirm(false)}
                                        className="py-2.5 rounded-xl bg-surface-hover text-white font-bold text-sm hover:bg-[#2e4328] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={confirmClearReport}
                                        className="py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                    >
                                        Sí, Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ScreenReports;
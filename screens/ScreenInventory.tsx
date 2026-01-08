import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { DataService, Product, GlobalStats, AppSettings } from '../services/dataService';

const ScreenInventory = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [stats, setStats] = useState<GlobalStats>(DataService.getStats());
    const [settings, setSettings] = useState<AppSettings>(DataService.getSettings());
    
    // Modals State
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showEmptyCashConfirm, setShowEmptyCashConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    
    // Form State
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCost, setNewCost] = useState('');
    const [newStock, setNewStock] = useState('');
    const [newSku, setNewSku] = useState('');
    const [newBarcode, setNewBarcode] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        setProducts(DataService.getProducts());
        setStats(DataService.getStats());
        setSettings(DataService.getSettings());
    }, []);

    // Sound Effect Utility
    const playClickSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Sophisticated "Mechanical Switch" sound
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    // Trash/Recycle Bin Sound Effect
    const playTrashSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            
            const ctx = new AudioContext();
            
            // Generate White Noise for "Crumple" effect
            const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            // Lowpass filter to make it sound muffled/hollow like a bin
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1200, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

            // Envelope to shape the sound (fade out)
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const inventoryValue = products.reduce((acc, p) => acc + (p.cost * p.stock), 0);
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;

    // Trigger delete modal
    const handleDeleteClick = (id: number) => {
        playClickSound();
        setProductToDelete(id);
    };

    // Confirm deletion action
    const confirmDeleteProduct = () => {
        if (productToDelete !== null) {
            playTrashSound();
            DataService.deleteProduct(productToDelete);
            setProducts(DataService.getProducts());
            setProductToDelete(null);
        }
    };

    const handleClearInventoryClick = () => {
        playClickSound();
        setShowClearConfirm(true);
    };

    const confirmClearInventory = () => {
        playTrashSound(); // Also play trash sound when clearing everything
        DataService.clearProducts();
        setProducts([]); 
        setShowClearConfirm(false);
    };

    const handleDistributeTips = () => {
        playClickSound();
        // Immediate action without confirmation
        DataService.distributeTips();
        setStats(prev => ({ ...prev, tips: 0 }));
    };

    const handleEmptyCashBoxClick = () => {
        playClickSound();
        setShowEmptyCashConfirm(true);
    };

    const confirmEmptyCashBox = () => {
        DataService.resetCashRegister();
        setStats(prev => ({ 
            ...prev, 
            cashInBox: 0, 
            totalSales: 0, 
            transactionCount: 0 
        }));
        setShowEmptyCashConfirm(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProduct = () => {
        if (!newName || !newPrice || !newStock) {
            alert("Por favor complete nombre, precio y stock.");
            return;
        }

        const newProduct: Product = {
            id: 0, // Assigned in service
            name: newName,
            price: parseFloat(newPrice),
            cost: parseFloat(newCost) || 0,
            stock: parseInt(newStock),
            sku: newSku || 'GEN-' + Date.now().toString().slice(-4),
            barcode: newBarcode,
            image: newImage || 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?auto=format&fit=crop&w=150&q=80',
            category: 'General'
        };

        DataService.addProduct(newProduct);
        setProducts(DataService.getProducts());
        
        // Reset Form
        setNewName(''); setNewPrice(''); setNewCost(''); setNewStock(''); 
        setNewSku(''); setNewBarcode(''); setNewImage(''); setNewDesc('');
        alert("Producto guardado correctamente.");
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-border-dark bg-background-dark/95 backdrop-blur z-10">
                    <div className="flex items-center gap-4 lg:hidden">
                        <span className="text-white font-bold text-lg">Santalla Core</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 text-sm">
                        <Link to="/" className="text-text-secondary hover:text-white transition-colors">Inicio</Link>
                        <span className="text-border-dark">/</span>
                        <span className="text-white font-medium px-2 py-1 rounded-md bg-surface-dark">Inventario</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-text-secondary">Tasa de Cambio</p>
                            <p className="text-white font-mono font-bold">1 USD = ${settings.exchangeRate.toFixed(2)}</p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth">
                    <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Card 1: Total Stock */}
                            <div className="bg-surface-dark border border-border-dark p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden group justify-between">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl text-white">inventory_2</span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Total Productos (Unidades)</p>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <p className="text-white text-3xl font-bold font-display">{totalStock}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleClearInventoryClick}
                                    className="w-full py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 text-xs font-bold transition-colors uppercase tracking-wide relative z-10 active:scale-95 transition-transform"
                                >
                                    Vaciar Inventario
                                </button>
                            </div>
                            {/* Card 2: Inventory Value */}
                             <div className="bg-surface-dark border border-border-dark p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden group justify-between">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl text-white">attach_money</span>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-sm font-medium">Valor Inventario (Costo)</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-white text-3xl font-bold font-display">${inventoryValue.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </div>
                                    <p className="text-xs text-text-secondary">USD: ${(inventoryValue / settings.exchangeRate).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                </div>
                            </div>
                            {/* Card 3: Propinas (Requested) */}
                            <div className="bg-surface-dark border border-green-500/30 p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden group justify-between">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl text-green-400">savings</span>
                                </div>
                                <div>
                                    <p className="text-green-300 text-sm font-medium">Acumulado Propinas</p>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <p className="text-white text-3xl font-bold font-display">${stats.tips.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleDistributeTips}
                                    className="w-full py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black border border-green-500/20 text-xs font-bold transition-colors uppercase tracking-wide relative z-10 active:scale-95 transition-transform"
                                >
                                    Repartir Propinas
                                </button>
                            </div>
                             {/* Card 4: Caja (Requested) */}
                             <div className="bg-surface-dark border border-blue-500/30 p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden group justify-between">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <span className="material-symbols-outlined text-6xl text-blue-400">point_of_sale</span>
                                </div>
                                <div>
                                    <p className="text-blue-300 text-sm font-medium">Dinero en Caja</p>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <p className="text-white text-3xl font-bold font-display">${stats.cashInBox.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleEmptyCashBoxClick}
                                    className="w-full py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 text-xs font-bold transition-colors uppercase tracking-wide relative z-10 active:scale-95 transition-transform"
                                >
                                    Vaciar Caja
                                </button>
                            </div>
                        </div>

                        {/* Split View */}
                        <div className="flex flex-col xl:flex-row gap-6 h-full min-h-[600px]">
                            {/* Left Column: Data Grid */}
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-dark/50 p-4 rounded-2xl border border-border-dark">
                                    <h2 className="text-white text-xl font-bold mr-4">Catálogo</h2>
                                </div>

                                <div className="flex-1 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-xl max-h-[600px] overflow-y-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-border-dark bg-background-dark/50 text-xs uppercase tracking-wider text-text-secondary sticky top-0 bg-surface-dark z-10">
                                                <th className="p-5 font-semibold">Producto</th>
                                                <th className="p-5 font-semibold">Precio (Local / USD)</th>
                                                <th className="p-5 font-semibold text-center">Stock</th>
                                                <th className="p-5 font-semibold text-center">Estado</th>
                                                <th className="p-5 font-semibold text-right">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-border-dark">
                                            {products.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="p-8 text-center text-text-secondary">
                                                        <span className="material-symbols-outlined text-4xl mb-2 block opacity-50">inventory_2</span>
                                                        Inventario Vacío
                                                    </td>
                                                </tr>
                                            ) : (
                                                products.map(product => (
                                                    <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-lg bg-cover bg-center border border-border-dark" style={{backgroundImage: `url('${product.image}')`}}></div>
                                                                <div>
                                                                    <p className="text-white font-bold">{product.name}</p>
                                                                    <p className="text-text-secondary text-xs">SKU: {product.sku}</p>
                                                                    {product.barcode && <p className="text-text-secondary text-[10px]">BC: {product.barcode}</p>}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className="text-white font-medium block">${product.price.toFixed(2)}</span>
                                                            <span className="text-primary text-xs block font-bold">USD: ${(product.price / settings.exchangeRate).toFixed(2)}</span>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <span className={`font-bold ${product.stock === 0 ? 'text-red-500' : 'text-white'}`}>{product.stock}</span>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            {product.stock === 0 ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                                                    Agotado
                                                                </span>
                                                            ) : product.stock < 10 ? (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                                    Bajo
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/20">
                                                                    En Stock
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <button 
                                                                onClick={() => handleDeleteClick(product.id)}
                                                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-full transition-colors"
                                                                title="Eliminar producto"
                                                            >
                                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Right Column: Add Product Form */}
                            <div className="w-full xl:w-[420px] shrink-0 flex flex-col gap-4">
                                <div className="flex-1 bg-surface-dark border border-border-dark rounded-2xl p-6 flex flex-col gap-6 shadow-2xl overflow-y-auto">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-white text-lg font-bold">Nuevo Producto</h3>
                                            <p className="text-text-secondary text-xs">Agregue items al inventario</p>
                                        </div>
                                    </div>
                                    {/* Form */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-text-secondary text-xs font-bold mb-1 ml-2">Nombre del Producto *</label>
                                            <input 
                                                className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary placeholder-text-secondary/30" 
                                                placeholder="Ej: Camisa Oxford" 
                                                value={newName}
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-text-secondary text-xs font-bold mb-1 ml-2">SKU</label>
                                                <input 
                                                    className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:border-primary"
                                                    value={newSku}
                                                    onChange={e => setNewSku(e.target.value)}
                                                    placeholder="AUTO"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-text-secondary text-xs font-bold mb-1 ml-2">Código Barras</label>
                                                <input 
                                                    className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:border-primary" 
                                                    value={newBarcode}
                                                    onChange={e => setNewBarcode(e.target.value)}
                                                    placeholder="Escaneado..."
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-text-secondary text-xs font-bold mb-1 ml-2">Imagen del Producto</label>
                                            <div className="flex items-center gap-3">
                                                {newImage && (
                                                    <div className="w-12 h-12 rounded-lg bg-cover bg-center border border-border-dark" style={{backgroundImage: `url('${newImage}')`}}></div>
                                                )}
                                                <label className="flex-1 cursor-pointer">
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                    />
                                                    <div className="w-full bg-background-dark border border-border-dark border-dashed rounded-xl px-4 py-2.5 text-text-secondary text-sm hover:text-white hover:border-primary transition-colors flex items-center justify-center gap-2">
                                                        <span className="material-symbols-outlined text-lg">cloud_upload</span>
                                                        {newImage ? 'Cambiar Imagen' : 'Subir Imagen Local'}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-text-secondary text-xs font-bold mb-1 ml-2">Descripción</label>
                                            <textarea 
                                                className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-2.5 text-white text-sm focus:border-primary resize-none" 
                                                value={newDesc}
                                                onChange={e => setNewDesc(e.target.value)}
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                    {/* Pricing */}
                                    <div className="p-4 bg-background-dark/50 rounded-xl border border-border-dark/50 space-y-3">
                                        <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">payments</span> Detalles Financieros
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-text-secondary text-[10px] uppercase font-bold">Costo</label>
                                                <input 
                                                    className="w-full bg-surface-dark border border-border-dark rounded-lg px-3 py-2 text-white text-sm focus:border-primary" 
                                                    placeholder="0.00" 
                                                    type="number"
                                                    value={newCost}
                                                    onChange={e => setNewCost(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-primary text-[10px] uppercase font-bold">Venta *</label>
                                                <input 
                                                    className="w-full bg-surface-dark border border-primary/50 rounded-lg px-3 py-2 text-white font-bold text-sm focus:border-primary" 
                                                    placeholder="0.00" 
                                                    type="number"
                                                    value={newPrice}
                                                    onChange={e => setNewPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-white text-[10px] uppercase font-bold">Stock Inicial *</label>
                                            <input 
                                                className="w-full bg-surface-dark border border-border-dark rounded-lg px-3 py-2 text-white text-sm focus:border-primary" 
                                                placeholder="0" 
                                                type="number"
                                                value={newStock}
                                                onChange={e => setNewStock(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="mt-auto pt-4 flex gap-3">
                                        <button 
                                            onClick={handleSaveProduct}
                                            className="w-full py-3 px-4 rounded-xl bg-primary text-background-dark font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(83,210,45,0.3)] flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">save</span>
                                            Guardar Producto
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Custom Clear Inventory Confirmation Modal */}
                {showClearConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-surface-dark border border-border-dark p-6 rounded-2xl max-w-sm w-full shadow-2xl relative transform scale-100 transition-all">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                                    <span className="material-symbols-outlined text-2xl">warning</span>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold mb-2">¿Vaciar Inventario?</h3>
                                    <p className="text-text-secondary text-sm">Esta acción eliminará todos los productos y no se puede deshacer.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                    <button 
                                        onClick={() => setShowClearConfirm(false)}
                                        className="py-2.5 rounded-xl bg-surface-hover text-white font-bold text-sm hover:bg-[#2e4328] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={confirmClearInventory}
                                        className="py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                    >
                                        Sí, Vaciar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Empty Cash Box Confirmation Modal */}
                {showEmptyCashConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-surface-dark border border-border-dark p-6 rounded-2xl max-w-sm w-full shadow-2xl relative transform scale-100 transition-all">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                                    <span className="material-symbols-outlined text-2xl">point_of_sale</span>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold mb-2">¿Vaciar Caja?</h3>
                                    <p className="text-text-secondary text-sm">Se reiniciarán las ventas y el efectivo en caja a 0.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                    <button 
                                        onClick={() => setShowEmptyCashConfirm(false)}
                                        className="py-2.5 rounded-xl bg-surface-hover text-white font-bold text-sm hover:bg-[#2e4328] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={confirmEmptyCashBox}
                                        className="py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                    >
                                        Sí, Vaciar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Delete Product Confirmation Modal */}
                {productToDelete !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-surface-dark border border-border-dark p-6 rounded-2xl max-w-sm w-full shadow-2xl relative transform scale-100 transition-all">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                                    <span className="material-symbols-outlined text-2xl">delete</span>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-bold mb-2">¿Eliminar Producto?</h3>
                                    <p className="text-text-secondary text-sm">Esta acción no se puede deshacer.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                    <button 
                                        onClick={() => setProductToDelete(null)}
                                        className="py-2.5 rounded-xl bg-surface-hover text-white font-bold text-sm hover:bg-[#2e4328] transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={confirmDeleteProduct}
                                        className="py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                    >
                                        Sí, Eliminar
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

export default ScreenInventory;
import React, { useState, useEffect, useMemo, useRef } from 'react';
import NavigationOverlay from '../components/NavigationOverlay';
import Sidebar from '../components/Sidebar';
import { DataService, Product, AppSettings } from '../services/dataService';

const ScreenPOS = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [settings, setSettings] = useState<AppSettings>(DataService.getSettings());
    const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [inputBuffer, setInputBuffer] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setProducts(DataService.getProducts());
        setSettings(DataService.getSettings());
    }, []);

    const addToCart = (product: Product) => {
        if (product.stock <= 0) return; // Prevent adding if out of stock

        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            // Check stock limit in cart
            if (existing && existing.qty >= product.stock) {
                alert("No hay más stock disponible de este producto.");
                return prev;
            }

            if (existing) {
                return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { product, qty: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0), [cart]);
    const tax = subtotal * 0.16;
    const total = subtotal + tax;
    
    const filteredProducts = useMemo(() => {
        if (!searchQuery) return products;
        return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode?.includes(searchQuery));
    }, [searchQuery, products]);

    const handleKeypad = (key: string | number) => {
        if (key === 'del') {
            setInputBuffer(prev => prev.slice(0, -1));
        } else if (key === '.') {
            if (!inputBuffer.includes('.')) setInputBuffer(prev => prev + key);
        } else {
            setInputBuffer(prev => prev + key);
        }
    };

    // Camera / AI Scanning Logic
    const startCamera = async () => {
        setShowCamera(true);
        setIsScanning(false);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Crucial for some browsers to actually show the video feed
                try {
                    await videoRef.current.play();
                } catch (e) {
                    console.error("Error playing video stream:", e);
                }
            }
        } catch (err) {
            console.error(err);
            alert("No se pudo acceder a la cámara. Verifique los permisos.");
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setShowCamera(false);
        setIsScanning(false);
    };

    const performScan = () => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            // Find a random in-stock product to simulate detection
            const available = products.filter(p => p.stock > 0);
            if (available.length > 0) {
                const randomProd = available[Math.floor(Math.random() * available.length)];
                addToCart(randomProd);
                alert(`¡Producto detectado!\n${randomProd.name}\n$${randomProd.price}`);
            } else {
                alert("No se detectó ningún producto en la base de datos.");
            }
            setIsScanning(false);
            // We do NOT close the camera automatically anymore, allowing multiple scans
        }, 1500);
    };

    const handlePayment = () => {
        const payment = parseFloat(inputBuffer || '0');
        if (payment >= total && total > 0) {
            // Process Sale in DataService
            const result = DataService.processSale(cart, payment, total);
            
            setPaymentSuccess(true);
            
            // Simulate Print
            console.log("IMPRIMIENDO RECIBO...");
            console.log("Total:", total);
            console.log("Pago:", payment);
            console.log("Cambio/Propina:", result.tipAmount);

            setTimeout(() => {
                setPaymentSuccess(false);
                setCart([]);
                setInputBuffer('');
                // Refresh products to show updated stock
                setProducts(DataService.getProducts());
            }, 2000);
        } else {
            alert("Monto insuficiente o carrito vacío");
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar className="hidden lg:flex" />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative text-[#162013] dark:text-white font-display">
                <NavigationOverlay />
                
                {/* Header */}
                <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-border-dark bg-background-dark select-none z-10">
                    <div className="flex items-center gap-3">
                         <h1 className="text-lg font-bold tracking-tight text-white opacity-90">Santalla Core <span className="font-light opacity-50">| POS</span></h1>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="px-3 py-1 rounded-full bg-surface-dark border border-border-dark text-xs font-bold text-white flex items-center gap-2">
                             1 USD = ${settings.exchangeRate}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 min-h-0">
                    
                    {/* Left Panel: Catalog & Cart */}
                    <div className="hidden md:flex md:col-span-7 lg:col-span-8 flex-col border-r border-border-dark relative bg-[#131b11]">
                        {/* Search & Quick Access */}
                        <div className="p-5 pb-2 flex flex-col gap-4">
                            <div className="relative w-full group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-[#5a7a50]">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input 
                                    className="w-full h-14 pl-12 pr-4 rounded-full bg-surface-dark border border-transparent focus:border-primary/50 text-white placeholder-[#5a7a50] focus:ring-0 focus:outline-none text-lg transition-all shadow-inner" 
                                    placeholder="Escanear o buscar producto..." 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                                    <button 
                                        onClick={startCamera}
                                        className="size-10 rounded-full bg-border-dark flex items-center justify-center text-[#a2c398] hover:text-white hover:bg-primary hover:text-background-dark transition-all"
                                    >
                                        <span className="material-symbols-outlined">barcode_scanner</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Product Grid (Catalog) */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {filteredProducts.map(product => {
                                    const isSoldOut = product.stock <= 0;
                                    return (
                                        <button 
                                            key={product.id}
                                            onClick={() => addToCart(product)}
                                            disabled={isSoldOut}
                                            className={`shrink-0 w-36 p-2 rounded-xl bg-surface-dark border border-border-dark transition-all flex flex-col items-center gap-2 group text-left ${isSoldOut ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:border-primary/50'}`}
                                        >
                                            <div className="size-16 rounded-lg bg-cover bg-center shadow-md group-hover:scale-105 transition-transform" style={{backgroundImage: `url('${product.image}')`}}></div>
                                            <div className="w-full">
                                                <p className="text-white text-xs font-bold truncate w-full">{product.name}</p>
                                                <div className="flex justify-between items-end w-full">
                                                    <p className="text-primary text-xs font-bold">${product.price.toFixed(2)}</p>
                                                    <p className="text-[10px] text-text-secondary">U${(product.price / settings.exchangeRate).toFixed(2)}</p>
                                                </div>
                                                {isSoldOut && <p className="text-red-500 text-[10px] font-bold mt-1 text-center bg-red-900/20 rounded">AGOTADO</p>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto p-5 pt-0 space-y-3 custom-scrollbar">
                            <h3 className="text-[#5a7a50] text-xs font-bold uppercase tracking-wider mb-2">Orden Actual</h3>
                            {cart.length === 0 ? (
                                <div className="h-40 flex flex-col items-center justify-center text-[#5a7a50] opacity-50 border-2 border-dashed border-[#2e4328] rounded-2xl">
                                    <span className="material-symbols-outlined text-4xl mb-2">shopping_cart</span>
                                    <p>Carrito vacío</p>
                                </div>
                            ) : (
                                cart.map((item, idx) => (
                                    <div key={idx} className="group flex items-center justify-between p-3 pr-6 rounded-[2rem] bg-surface-dark hover:bg-surface-active transition-all cursor-pointer border border-transparent hover:border-primary/20 shadow-sm relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/50"></div>
                                        <div className="flex items-center gap-4 pl-3">
                                            <div className="size-16 rounded-2xl bg-cover bg-center bg-no-repeat shadow-md shrink-0" style={{backgroundImage: `url("${item.product.image}")`}}></div>
                                            <div className="flex flex-col justify-center">
                                                <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{item.product.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-background-dark text-xs font-bold bg-primary px-2 py-0.5 rounded-md">x{item.qty}</span>
                                                    <span className="text-[#888] text-sm font-medium">@ ${item.product.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 z-10">
                                            <div className="text-right">
                                                <p className="text-white font-bold text-xl tabular-nums tracking-tight">${(item.product.price * item.qty).toFixed(2)}</p>
                                                <p className="text-text-secondary text-xs">U${((item.product.price * item.qty) / settings.exchangeRate).toFixed(2)}</p>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); removeFromCart(item.product.id); }}
                                                className="size-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Summary Footer */}
                        <div className="p-6 border-t border-border-dark bg-[#1a2517] rounded-tl-3xl">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[#a2c398] text-sm">Subtotal</span>
                                <span className="text-white font-medium tabular-nums">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[#a2c398] text-sm">Impuestos (16%)</span>
                                <span className="text-white font-medium tabular-nums">${tax.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Payment & Keypad */}
                    <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col bg-[#111a0e] p-4 md:p-6 gap-5 h-full relative overflow-y-auto">
                        {/* Total Display */}
                        <div className="shrink-0 flex flex-col items-end justify-center bg-gradient-to-br from-surface-dark to-[#162214] rounded-[2rem] p-6 shadow-2xl border border-border-dark relative overflow-hidden group">
                            <span className="text-[#a2c398] text-xs font-bold uppercase tracking-[0.2em] mb-1 z-10">Total a Pagar</span>
                            <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter tabular-nums leading-none z-10 drop-shadow-md">${total.toFixed(2)}</h2>
                            <p className="text-text-secondary font-mono mt-2 z-10">USD: ${(total / settings.exchangeRate).toFixed(2)}</p>
                        </div>

                        {/* Received Amount Input Display */}
                        <div className="bg-surface-dark border border-border-dark rounded-2xl p-4 flex justify-between items-center">
                            <span className="text-text-secondary text-sm font-bold uppercase">Recibido</span>
                            <span className="text-3xl text-white font-bold tabular-nums tracking-tight">
                                {inputBuffer ? `$${inputBuffer}` : <span className="opacity-30">$0.00</span>}
                            </span>
                        </div>

                        {/* Keypad */}
                        <div className="flex-1 flex flex-col gap-3 min-h-0">
                            <div className="grid grid-cols-3 gap-2 md:gap-3 flex-1">
                                {[1,2,3,4,5,6,7,8,9,'.',0,'del'].map((k) => (
                                    <button 
                                        key={k} 
                                        onClick={() => handleKeypad(k)}
                                        className={`btn-press rounded-2xl text-2xl font-bold transition-colors shadow-md border-b-4 border-[#162013] active:border-b-0 active:translate-y-1 flex items-center justify-center
                                            ${k === 'del' ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-surface-dark hover:bg-surface-active text-white'}
                                        `}
                                    >
                                        {k === 'del' ? <span className="material-symbols-outlined">backspace</span> : k}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pay Button */}
                        <div className="shrink-0 grid grid-cols-2 gap-3 pt-2">
                            <button 
                                onClick={handlePayment}
                                disabled={total === 0}
                                className={`col-span-2 h-20 md:h-24 rounded-[2rem] text-3xl font-black uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-4 group
                                    ${paymentSuccess 
                                        ? 'bg-white text-primary' 
                                        : 'bg-primary hover:bg-[#45b525] text-[#162013] shadow-[0_0_20px_rgba(83,210,45,0.4)] hover:scale-[1.02]'}
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                                `}
                            >
                                {paymentSuccess ? (
                                    <>
                                        <span className="material-symbols-outlined text-[40px] font-bold">print</span>
                                        Imprimiendo...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[40px] font-bold group-hover:rotate-12 transition-transform">payments</span>
                                        Cobrar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Camera Modal */}
                {showCamera && (
                    <div className="absolute inset-0 z-50 bg-black flex flex-col">
                        <div className="relative flex-1 bg-black">
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                muted 
                                className="absolute inset-0 w-full h-full object-cover"
                            ></video>
                            
                            {/* Scanning Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <div className="w-64 h-48 border-2 border-primary/50 rounded-2xl relative">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -mt-1 -ml-1"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary -mt-1 -mr-1"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -mb-1 -ml-1"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary -mb-1 -mr-1"></div>
                                    {isScanning && <div className="w-full h-0.5 bg-primary absolute top-1/2 animate-scan shadow-[0_0_15px_#53d22d]"></div>}
                                </div>
                                <p className="mt-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Apunta el código de barras</p>
                            </div>
                        </div>

                        <div className="h-32 bg-surface-dark flex flex-col items-center justify-center gap-4 relative z-50 border-t border-white/10">
                            {isScanning ? (
                                <div className="bg-primary text-black px-6 py-2 rounded-full font-bold animate-pulse flex items-center gap-2">
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Analizando...
                                </div>
                            ) : (
                                <button 
                                    onClick={performScan} 
                                    className="size-16 bg-white rounded-full border-4 border-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                                >
                                    <div className="size-12 bg-primary rounded-full"></div>
                                </button>
                            )}
                            <button 
                                onClick={stopCamera} 
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
                            >
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScreenPOS;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { DataService, AppSettings } from '../services/dataService';

const ScreenIntegrations = () => {
    const [settings, setSettings] = useState<AppSettings>(DataService.getSettings());
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        DataService.saveSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white font-display">
            <Sidebar />
            
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-border-dark bg-background-dark/80 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="text-text-secondary hover:text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                    
                    <div className="hidden md:flex flex-wrap gap-2 items-center">
                        <Link to="/" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Inicio</Link>
                        <span className="text-text-secondary text-sm">/</span>
                        <span className="text-white text-sm font-medium">Configuración</span>
                    </div>

                    <div className="flex flex-1 justify-end gap-4 items-center pl-8">
                        <button className="flex items-center justify-center size-10 rounded-full bg-surface-dark text-text-secondary hover:text-white hover:bg-surface-active transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full animate-pulse"></span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
                    <div className="max-w-6xl mx-auto space-y-12">
                        
                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div className="flex flex-col gap-3 max-w-2xl">
                                <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-none">Integraciones y Datos</h1>
                                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                    Gestiona tus conexiones y configuraciones globales.
                                </p>
                            </div>
                        </div>

                        {/* Financial Configuration Section (Requested) */}
                        <section className="bg-surface-dark border border-border-dark rounded-[2rem] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <span className="material-symbols-outlined">currency_exchange</span>
                                </div>
                                <h2 className="text-white text-xl font-bold">Configuración Financiera</h2>
                            </div>
                            
                            <div className="flex flex-col md:flex-row gap-8 items-end">
                                <div className="flex-1 w-full max-w-sm">
                                    <label className="block text-text-secondary text-sm font-bold mb-2">Tasa de Cambio (Local / USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold">$</span>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            value={settings.exchangeRate}
                                            onChange={(e) => setSettings({...settings, exchangeRate: parseFloat(e.target.value) || 0})}
                                            className="w-full bg-background-dark border border-border-dark rounded-xl pl-8 pr-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-xs">x 1 USD</span>
                                    </div>
                                    <p className="text-text-secondary text-xs mt-2">Esta tasa se usará para calcular precios en USD en el POS e Inventario.</p>
                                </div>
                                <button 
                                    onClick={handleSave}
                                    className={`px-8 py-3 rounded-xl font-bold text-background-dark transition-all ${saved ? 'bg-green-400' : 'bg-primary hover:bg-[#65e83e]'}`}
                                >
                                    {saved ? '¡Guardado!' : 'Guardar Configuración'}
                                </button>
                            </div>
                        </section>

                        {/* Existing Integrations Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">hub</span>
                                    Software Conectado
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {/* Card 1: QuickBooks (Connected) */}
                                <div className="group relative flex flex-col justify-between p-6 rounded-[2rem] bg-surface-dark border border-border-dark hover:border-primary/50 transition-all duration-300 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                                            Activo
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 mb-8">
                                        <div className="size-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-green-900/20">
                                            <span className="text-[#2ca01c] font-bold text-3xl font-display">qb</span>
                                        </div>
                                        <div>
                                            <h3 className="text-white text-lg font-bold mb-1">QuickBooks</h3>
                                            <p className="text-text-secondary text-sm">Sincronización automática de facturas.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default ScreenIntegrations;
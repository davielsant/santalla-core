import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ScreenNewProduct = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="w-full bg-background-dark/95 backdrop-blur-sm border-b border-[#2e4328] z-20 px-6 py-4 flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-black text-white tracking-tight">Creación de Producto</h1>
                    <div className="flex items-center gap-3">
                        <Link to="/inventory" className="h-10 px-6 rounded-full border border-text-secondary/30 text-text-secondary text-sm font-bold flex items-center justify-center">Cancelar</Link>
                        <button className="h-10 px-6 rounded-full bg-primary hover:bg-primary-dark text-[#0f1a0c] text-sm font-bold shadow-[0_0_15px_rgba(83,210,45,0.3)] transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">save</span> Guardar
                        </button>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 scroll-smooth">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6">
                        <section className="bg-surface-dark rounded-xl p-6 border border-[#2e4328] shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">Información General</h2>
                            <div className="space-y-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-text-secondary ml-2">Nombre</label>
                                    <input className="w-full bg-background-dark border border-[#2e4328] focus:border-primary rounded-full px-5 py-3 text-white" placeholder="Ej: Camiseta" type="text"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-text-secondary ml-2">Descripción</label>
                                    <textarea className="w-full bg-background-dark border border-[#2e4328] focus:border-primary rounded-2xl px-5 py-3 text-white resize-none" rows={3}></textarea>
                                </div>
                            </div>
                        </section>
                        <section className="bg-surface-dark rounded-xl p-6 border border-[#2e4328] shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-6">Precios</h2>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-text-secondary ml-2">Costo</label>
                                    <input className="w-full bg-background-dark border border-[#2e4328] focus:border-primary rounded-full px-5 py-3 text-white" type="number"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-text-secondary ml-2">Venta</label>
                                    <input className="w-full bg-background-dark border border-[#2e4328] focus:border-primary rounded-full px-5 py-3 text-white font-bold" type="number"/>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScreenNewProduct;

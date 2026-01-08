import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ScreenNewOrder = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 xl:px-20 text-slate-900 dark:text-white font-display">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    {/* Page Header */}
                    <div className="flex flex-wrap justify-between items-end gap-4 pb-2">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-[#a2c398] text-sm font-medium mb-1">
                                <Link to="/inventory" className="hover:text-white transition-colors">Gestión de Inventario</Link>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span>Órdenes de Compra</span>
                            </div>
                            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Nueva Orden de Compra</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex h-10 px-4 items-center justify-center rounded-full bg-[#2e4328] text-white text-sm font-bold hover:bg-[#3a5232] transition-colors gap-2">
                                <span className="material-symbols-outlined text-[18px]">history</span>
                                <span className="truncate">Historial</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Left Column: Order Header Details */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-surface-dark rounded-[2rem] p-6 border border-[#2e4328] flex flex-col gap-5 sticky top-6">
                                <div className="flex items-center gap-3 border-b border-[#2e4328] pb-4">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">inventory_2</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Detalles Generales</h3>
                                </div>
                                {/* Supplier Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#a2c398] text-xs font-bold uppercase tracking-wider pl-1">Proveedor</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#a2c398]">storefront</span>
                                        <input className="w-full bg-[#162013] border border-[#2e4328] text-white text-sm rounded-full h-12 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-[#a2c398]/50" placeholder="Buscar proveedor..."/>
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-[#2e4328] rounded-full text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">add</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Warehouse Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#a2c398] text-xs font-bold uppercase tracking-wider pl-1">Almacén de Destino</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#a2c398]">warehouse</span>
                                        <select className="w-full bg-[#162013] border border-[#2e4328] text-white text-sm rounded-full h-12 pl-12 pr-10 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                                            <option>Almacén Principal (Zona Norte)</option>
                                            <option>Sucursal Centro</option>
                                            <option>Bodega de Materiales</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#a2c398] pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                {/* Dates Row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#a2c398] text-xs font-bold uppercase tracking-wider pl-1">Emisión</label>
                                        <input className="w-full bg-[#162013] border border-[#2e4328] text-white text-sm rounded-2xl h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none" type="date" defaultValue="2023-10-24"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#a2c398] text-xs font-bold uppercase tracking-wider pl-1">Entrega Est.</label>
                                        <input className="w-full bg-[#162013] border border-[#2e4328] text-white text-sm rounded-2xl h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none" type="date"/>
                                    </div>
                                </div>
                                {/* Reference Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#a2c398] text-xs font-bold uppercase tracking-wider pl-1">Referencia / Orden #</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#a2c398]">tag</span>
                                        <input className="w-full bg-[#162013] border border-[#2e4328] text-white text-sm rounded-full h-12 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-[#a2c398]/50" placeholder="Ej: PO-2023-882" defaultValue="OC-AUTO-2023-094"/>
                                    </div>
                                </div>
                                {/* Status Badge Area */}
                                <div className="mt-4 p-4 rounded-xl bg-[#2e4328]/30 border border-[#2e4328] flex justify-between items-center">
                                    <span className="text-[#a2c398] text-sm">Estado actual</span>
                                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20 uppercase tracking-wide">Borrador</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Product Line Items */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="bg-surface-dark rounded-[2rem] p-6 border border-[#2e4328] min-h-[600px] flex flex-col">
                                <div className="flex items-center justify-between border-b border-[#2e4328] pb-4 mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                        Productos
                                        <span className="bg-[#2e4328] text-[#a2c398] text-xs px-2 py-1 rounded-full">3 ítems</span>
                                    </h3>
                                    <button className="text-primary hover:text-white hover:bg-primary/20 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                        Catálogo Rápido
                                    </button>
                                </div>
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-4 pb-2 text-[#a2c398] text-xs font-bold uppercase tracking-wider">
                                    <div className="col-span-5 md:col-span-5">Producto</div>
                                    <div className="col-span-2 md:col-span-2 text-center">Cantidad</div>
                                    <div className="col-span-2 md:col-span-2 text-right">Costo U.</div>
                                    <div className="col-span-2 md:col-span-2 text-right">Total</div>
                                    <div className="col-span-1 md:col-span-1 text-center"></div>
                                </div>
                                {/* Product List */}
                                <div className="flex flex-col gap-3 mb-6">
                                    {/* Item 1 */}
                                    <div className="group relative grid grid-cols-12 gap-4 items-center bg-[#162013] p-3 rounded-2xl border border-transparent hover:border-[#2e4328] transition-all">
                                        <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                                            <div className="size-12 rounded-lg bg-[#2e4328] bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpQrVrM2vyGllLePNIkgsjsMuGP30aNAykjfiC6C0GLDs_vQ2Gp_6Bn1tMTaDBrn_vVsY8LwbSqoeNpLsmTCwnzpS9jTTPv_nY8S1sYfsDLxnVnj-KhM9LWZKuyrTzmHjS2Kv-ajY4ZG5A_ug3QQ3q3ZRsvYqxWk8TOweoHkjR6k6Y1mEDhtlYlhs00ocuTsSSVQHvx4oUEPgs-wWqJ1iQ5bw2Q2XzkfA18ikwvBVE9JqA1joFFU9No9zOpPkn9it22-uGhVNIYqHh")'}}></div>
                                            <div className="min-w-0">
                                                <p className="text-white font-bold text-sm truncate">Tornillo Hexagonal 5mm</p>
                                                <p className="text-[#a2c398] text-xs">SKU: TH-005-BX</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <span className="size-1.5 rounded-full bg-orange-500"></span>
                                                    <span className="text-[10px] text-orange-400 font-medium">Stock bajo: 45 un.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-2">
                                            <input className="w-full bg-[#2e4328] border-none text-white text-center font-mono text-sm rounded-xl py-2 focus:ring-1 focus:ring-primary" type="number" defaultValue="200"/>
                                        </div>
                                        <div className="col-span-2 md:col-span-2">
                                            <input className="w-full bg-transparent border border-[#2e4328] text-white text-right font-mono text-sm rounded-xl py-2 px-3 focus:ring-1 focus:ring-primary focus:bg-[#2e4328] transition-colors" type="number" defaultValue="0.15"/>
                                        </div>
                                        <div className="col-span-2 md:col-span-2 text-right">
                                            <span className="text-white font-bold font-mono">$30.00</span>
                                        </div>
                                        <div className="col-span-1 md:col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-red-400 hover:bg-red-400/10 p-1.5 rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Item 2 */}
                                    <div className="group relative grid grid-cols-12 gap-4 items-center bg-[#162013] p-3 rounded-2xl border border-transparent hover:border-[#2e4328] transition-all">
                                        <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                                            <div className="size-12 rounded-lg bg-[#2e4328] bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxurnVweIzqeB8xHIE5JfocNArQTWa7wmZswP1UEXUZBAHPIl-1Fk4ZPj7FVmpqJ8FnIC7IWRcLGV2btzvq-sbvUrHGr57ANHXOodnBqHSP4M7YgEac2q6bdEf1aqKopH5EnBezKo4gGUbHiwvqZIXGMesY26H2xJ7-mXc0YE09IIcLf_BN00qUwrZBNDCUboZUwIbpnscW-9jtMcgglBmMBg0-JZEvuEdPZT4_Z3Y9-gxi1lRwEPNhwit70oCCvV-5p2F_HIqidE-")'}}></div>
                                            <div className="min-w-0">
                                                <p className="text-white font-bold text-sm truncate">Cemento Portland 50kg</p>
                                                <p className="text-[#a2c398] text-xs">SKU: CP-50-GR</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <span className="size-1.5 rounded-full bg-primary"></span>
                                                    <span className="text-[10px] text-[#a2c398] font-medium">Stock: 120 un.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-2">
                                            <input className="w-full bg-[#2e4328] border-none text-white text-center font-mono text-sm rounded-xl py-2 focus:ring-1 focus:ring-primary" type="number" defaultValue="50"/>
                                        </div>
                                        <div className="col-span-2 md:col-span-2">
                                            <input className="w-full bg-transparent border border-[#2e4328] text-white text-right font-mono text-sm rounded-xl py-2 px-3 focus:ring-1 focus:ring-primary focus:bg-[#2e4328] transition-colors" type="number" defaultValue="8.50"/>
                                        </div>
                                        <div className="col-span-2 md:col-span-2 text-right">
                                            <span className="text-white font-bold font-mono">$425.00</span>
                                        </div>
                                        <div className="col-span-1 md:col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-red-400 hover:bg-red-400/10 p-1.5 rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Item 3 */}
                                    <div className="group relative grid grid-cols-12 gap-4 items-center bg-[#162013] p-3 rounded-2xl border border-transparent hover:border-[#2e4328] transition-all">
                                        <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                                            <div className="size-12 rounded-lg bg-[#2e4328] bg-cover bg-center shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBpTIre3SmbcMLTVjBcFeL9YkNZCjkF4InCRLjtf5a92i_9C0digLKRqi17yut-L0FshFAvIJZim5P42r-p-mYa1NWPgv0V5bWJYSX8fERpkSg5OdbE4k59-T1pEohud9vGD7B46id4fvveZc3fYEF2XUvC1eL0GcLn3A6VOwgp7j7wzw8hZ2-3tfUc73Dv9FOV0GCdf_sfRfW7iIewXj-M3WOsI9lS6Nl4i5dnfitm2gbfxnmFk0YdybKG3l3i4Klfg91p21dOZ8o")'}}></div>
                                            <div className="min-w-0">
                                                <p className="text-white font-bold text-sm truncate">Guantes de Seguridad L</p>
                                                <p className="text-[#a2c398] text-xs">SKU: GS-L-YLW</p>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <span className="size-1.5 rounded-full bg-primary"></span>
                                                    <span className="text-[10px] text-[#a2c398] font-medium">Stock: 200 un.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-2">
                                            <input className="w-full bg-[#2e4328] border-none text-white text-center font-mono text-sm rounded-xl py-2 focus:ring-1 focus:ring-primary" type="number" defaultValue="20"/>
                                        </div>
                                        <div className="col-span-2 md:col-span-2">
                                            <input className="w-full bg-transparent border border-[#2e4328] text-white text-right font-mono text-sm rounded-xl py-2 px-3 focus:ring-1 focus:ring-primary focus:bg-[#2e4328] transition-colors" type="number" defaultValue="3.25"/>
                                        </div>
                                        <div className="col-span-2 md:col-span-2 text-right">
                                            <span className="text-white font-bold font-mono">$65.00</span>
                                        </div>
                                        <div className="col-span-1 md:col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-red-400 hover:bg-red-400/10 p-1.5 rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Add New Item Row */}
                                    <button className="w-full border border-dashed border-[#2e4328] rounded-2xl p-4 flex items-center justify-center gap-2 text-[#a2c398] hover:bg-[#2e4328]/30 hover:text-white transition-all group mt-2">
                                        <div className="size-8 rounded-full bg-[#2e4328] group-hover:bg-primary flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-white text-[20px]">add</span>
                                        </div>
                                        <span className="font-medium text-sm">Añadir producto</span>
                                    </button>
                                </div>
                                {/* Footer Summary */}
                                <div className="mt-auto pt-6 border-t border-[#2e4328]">
                                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                        <div className="w-full md:w-auto">
                                            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#162013] border border-[#2e4328] cursor-pointer hover:bg-[#2e4328] transition-colors">
                                                <div className="relative flex items-center">
                                                    <input className="peer size-5 appearance-none rounded border border-[#a2c398] bg-transparent checked:bg-primary checked:border-primary focus:ring-0" type="checkbox"/>
                                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-[16px]">check</span>
                                                </div>
                                                <span className="text-sm font-medium text-white select-none">Registrar entrada de mercancía automáticamente</span>
                                            </label>
                                            <p className="text-[#a2c398] text-xs mt-2 pl-3 max-w-xs">Si se marca, el stock se actualizará inmediatamente al guardar.</p>
                                        </div>
                                        <div className="flex flex-col gap-3 min-w-[280px]">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#a2c398]">Subtotal</span>
                                                <span className="text-white font-mono">$520.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#a2c398]">IVA (16%)</span>
                                                <span className="text-white font-mono">$83.20</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-t border-dashed border-[#2e4328] mt-1">
                                                <span className="text-white font-bold">Total a Pagar</span>
                                                <span className="text-primary text-2xl font-black font-mono tracking-tight">$603.20</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 mt-2">
                                                <button className="h-12 rounded-full border border-[#2e4328] text-white font-bold text-sm hover:bg-[#2e4328] transition-colors">
                                                    Guardar Borrador
                                                </button>
                                                <button className="h-12 rounded-full bg-primary text-[#152012] font-extrabold text-sm hover:bg-[#45b524] transition-colors shadow-[0_0_15px_rgba(83,210,45,0.3)]">
                                                    Crear Orden
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScreenNewOrder;
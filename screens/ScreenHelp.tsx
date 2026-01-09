
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import NavigationOverlay from '../components/NavigationOverlay';

const ScreenHelp = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
            <Sidebar />
            <NavigationOverlay />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="flex-1 overflow-y-auto w-full scroll-smooth">
                    <div className="w-full max-w-[1440px] mx-auto p-6 md:p-10 lg:px-16 flex flex-col gap-10 pb-20">
                        {/* Hero & Search Section */}
                        <section className="flex flex-col lg:flex-row gap-8 items-end lg:items-center justify-between mt-4">
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">Centro de Ayuda y <span className="text-primary">Aprendizaje</span></h1>
                                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg">Encuentra tutoriales, guías y asistencia inteligente para potenciar tu negocio.</p>
                            </div>
                            <div className="w-full lg:max-w-md">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input className="w-full h-14 pl-12 pr-4 bg-white dark:bg-surface-dark border-0 rounded-full ring-1 ring-slate-200 dark:ring-[#2e4328] focus:ring-2 focus:ring-primary text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm transition-all text-base" placeholder="Busca tutoriales, guías o consejos..." type="text"/>
                                </div>
                            </div>
                        </section>

                        {/* Chips / Quick Filters */}
                        <section className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-background-dark font-bold px-6 transition-transform active:scale-95 shadow-md shadow-primary/20">
                                Todo
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-surface-hover text-slate-700 dark:text-slate-300 font-medium px-6 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-white/10">
                                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                                Facturación
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-surface-hover text-slate-700 dark:text-slate-300 font-medium px-6 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-white/10">
                                <span className="material-symbols-outlined text-[18px]">groups</span>
                                RRHH
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-surface-hover text-slate-700 dark:text-slate-300 font-medium px-6 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-white/10">
                                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                                Inventario
                            </button>
                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-surface-hover text-slate-700 dark:text-slate-300 font-medium px-6 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-white/10">
                                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                Ventas
                            </button>
                        </section>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Onboarding & Tutorials */}
                            <div className="lg:col-span-8 flex flex-col gap-10">
                                {/* Onboarding Widget */}
                                <div className="bg-surface-dark rounded-lg p-1">
                                    <div className="bg-[#263522] rounded-[1.75rem] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border border-[#2e4328]">
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary">rocket_launch</span>
                                                    Configuración inicial
                                                </h3>
                                                <span className="text-primary font-mono font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">60%</span>
                                            </div>
                                            <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                                                <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out w-[60%] shadow-[0_0_10px_rgba(83,210,45,0.5)]"></div>
                                            </div>
                                            <p className="text-slate-300 text-sm">3 de 5 pasos completados. Próximo: <span className="text-white font-medium">Sube tu logo empresarial.</span></p>
                                        </div>
                                        <button className="bg-primary hover:bg-[#45b025] text-background-dark font-bold px-6 py-3 rounded-full transition-all active:scale-95 shadow-[0_0_15px_rgba(83,210,45,0.3)] whitespace-nowrap w-full sm:w-auto">
                                            Continuar Setup
                                        </button>
                                    </div>
                                </div>

                                {/* Tutorial Grid */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Aprende haciendo</h3>
                                        <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                                            Ver biblioteca completa
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Card 1 */}
                                        <div className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-lg p-5 hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(83,210,45,0.1)] flex flex-col">
                                            <div className="aspect-video w-full rounded-2xl bg-slate-800 mb-4 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2RHTeQnfgZalDj_X0vGtR0BPGhU0XfziC9jPGQDitjwtuqa-2JPaJTljDzhzeDbEu9NOv_FvNSzKkIQSDX5V8oXmlcSe0k0sgv-3AtryCYWTjJ478PaGGMNo-Ey-mpicQr39GvHGhAln6lkwyZLVv1TvpLmqK926u6X6O2h819aJuTBI49bBU5WS8X08BM8LgfUXpjAHg1tu1aCvAZPcpKXLtW-oKmFzhozFBuHxRvs7QS4zQKGuUrtJFUexrA70WqdjfrRs5_AI_")'}}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
                                                    <span className="material-symbols-outlined text-[14px]">play_circle</span>
                                                    Video • 3 min
                                                </div>
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <h4 className="text-white font-bold text-lg leading-snug">Gestión de Inventario</h4>
                                                </div>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">Aprende a registrar entradas, salidas y realizar ajustes de stock manualmente en tiempo real.</p>
                                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nivel Básico</span>
                                                <button className="text-primary font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                    Iniciar
                                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                        {/* Card 2 */}
                                        <div className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-lg p-5 hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(83,210,45,0.1)] flex flex-col">
                                            <div className="aspect-video w-full rounded-2xl bg-slate-800 mb-4 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXzjuGTtffrofDvqRzCk8XWuIA8tdE4GBaOKkYz1Gb_cC4J5Pv8XRNN-FDoI8TwwjWU8CVmcIcaJzIKLAFUmPXy8IMQs1kEkT3ULhjLzwVDMzS9L0o_ZxKPgJyxTVCb8jCKyVA_6bKbUFShPXvABdGwq7wNtAMzbQuZN8Be8S98XZklf4VO-fWRuNPjdB6EL6LSkySYKOOtf9pzE5gm9GnANNtY2OZGS4-V6rRZ2EwIZWjuupLxeZya3rLc6pR7BVih-Q029A57KYk")'}}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
                                                    <span className="material-symbols-outlined text-[14px]">touch_app</span>
                                                    Interactivo
                                                </div>
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <h4 className="text-white font-bold text-lg leading-snug">Facturación Electrónica</h4>
                                                </div>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">Emite tus facturas en segundos cumpliendo con toda la normativa vigente. Guía paso a paso.</p>
                                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Intermedio</span>
                                                <button className="text-primary font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                    Iniciar
                                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                        {/* Card 3 */}
                                        <div className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-lg p-5 hover:border-primary/50 transition-all hover:shadow-[0_4px_20px_rgba(83,210,45,0.1)] flex flex-col">
                                            <div className="aspect-video w-full rounded-2xl bg-slate-800 mb-4 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiCK_pVKewxASro2Dc_MnERdfaHLkminOrBVtAgMk11y0XnAhS6KQPQOWIL_RznuF2wuvVVnT0Q5XkEtGeAKXnlJAFf16zb4epmdQmoIlNumHzIlB92bokL0lwzFu2ShTClGQ_I2MWr6zcJUNg1pTrN91okU1BEzg8NOjeNdBGy3KjPOM-ehUqo8KbORAVe_M26n2DANoYt0QQysxTme_6wP7D0KlAR7EZpU9YnVF5i8pO7LvAWMKNZvtGhGGWgd_rRD-g-ZLkE7C2")'}}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
                                                    <span className="material-symbols-outlined text-[14px]">description</span>
                                                    Guía
                                                </div>
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <h4 className="text-white font-bold text-lg leading-snug">Gestión de Personal</h4>
                                                </div>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">Control de horarios, generación de nóminas y gestión de vacaciones para tu equipo.</p>
                                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avanzado</span>
                                                <button className="text-primary font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                    Leer
                                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                        {/* Card 4 (Placeholder) */}
                                        <div className="group relative bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] border-dashed rounded-lg p-5 hover:border-primary/50 transition-all flex flex-col items-center justify-center text-center gap-3">
                                            <div className="size-12 rounded-full bg-slate-100 dark:bg-surface-hover flex items-center justify-center mb-2">
                                                <span className="material-symbols-outlined text-slate-400">add</span>
                                            </div>
                                            <h4 className="text-slate-900 dark:text-white font-bold">Explorar más temas</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">Hay más de 50 guías disponibles</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: AI & Updates */}
                            <div className="lg:col-span-4 flex flex-col gap-8">
                                {/* AI Assistant Card (Distinctive) */}
                                <div className="relative rounded-lg p-[1px] bg-gradient-to-b from-primary/50 to-transparent">
                                    <div className="bg-surface-dark rounded-lg p-6 relative overflow-hidden h-full">
                                        {/* Background Glow */}
                                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
                                        <div className="flex items-center gap-3 mb-6 relative z-10">
                                            <div className="size-10 rounded-full bg-gradient-to-br from-white to-primary flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined text-background-dark">auto_awesome</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg leading-none">Santalla AI</h3>
                                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Beta Preview</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4 relative z-10">
                                            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200">
                                                <p>Hola Carlos, he analizado tus ventas de la semana. ¿Te gustaría ver un consejo para optimizar tu flujo de caja?</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button className="w-full text-left p-3 rounded-xl bg-surface-hover hover:bg-[#32452c] border border-transparent hover:border-primary/30 transition-all text-sm text-primary font-medium flex items-center justify-between group">
                                                    "Sí, dame el consejo"
                                                    <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">send</span>
                                                </button>
                                                <button className="w-full text-left p-3 rounded-xl bg-surface-hover hover:bg-[#32452c] border border-transparent hover:border-primary/30 transition-all text-sm text-slate-300 hover:text-white flex items-center justify-between group">
                                                    "¿Cómo registro un gasto?"
                                                    <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">send</span>
                                                </button>
                                            </div>
                                            <div className="pt-4 mt-2 border-t border-white/10">
                                                <label className="block relative">
                                                    <input className="w-full bg-black/20 border-0 rounded-full py-3 px-4 pr-10 text-sm text-white placeholder:text-slate-500 focus:ring-1 focus:ring-primary" placeholder="Escribe tu pregunta..." type="text"/>
                                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary rounded-full text-background-dark hover:bg-white transition-colors">
                                                        <span className="material-symbols-outlined text-[16px] block">arrow_upward</span>
                                                    </button>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Updates / Novedades */}
                                <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#2e4328] rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">new_releases</span>
                                        Novedades
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="flex gap-4 group cursor-pointer">
                                            <div className="flex flex-col items-center gap-1 pt-1">
                                                <div className="w-2 h-2 rounded-full bg-primary group-hover:shadow-[0_0_8px_rgba(83,210,45,0.8)] transition-shadow"></div>
                                                <div className="w-0.5 h-full bg-slate-200 dark:bg-white/10"></div>
                                            </div>
                                            <div className="pb-2">
                                                <p className="text-xs text-slate-500 mb-1">Hace 2 días</p>
                                                <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Integración con Bancos V2</h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">Ahora puedes sincronizar automáticamente tus movimientos.</p>
                                                <button className="text-primary text-xs font-bold hover:underline">Ver guía</button>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 group cursor-pointer">
                                            <div className="flex flex-col items-center gap-1 pt-1">
                                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-primary transition-colors"></div>
                                                <div className="w-0.5 h-full bg-slate-200 dark:bg-white/10"></div>
                                            </div>
                                            <div className="pb-2">
                                                <p className="text-xs text-slate-500 mb-1">Hace 1 semana</p>
                                                <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1 group-hover:text-primary transition-colors">Reportes Exportables PDF</h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs">Nuevas plantillas para tus informes mensuales.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 text-center text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-50 dark:hover:bg-white/5">
                                        Ver historial de cambios
                                    </button>
                                </div>

                                {/* Need Human Help? */}
                                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#263522] dark:to-surface-dark rounded-lg p-6 flex flex-col items-center text-center">
                                    <div className="size-12 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-3 text-slate-900 dark:text-white shadow-sm">
                                        <span className="material-symbols-outlined">support_agent</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">¿Necesitas ayuda humana?</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-4">Nuestro equipo de soporte está disponible de 9:00 a 18:00.</p>
                                    <button className="text-sm font-bold bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 text-slate-900 dark:text-white px-5 py-2.5 rounded-full transition-colors border border-slate-200 dark:border-transparent w-full shadow-sm">
                                        Contactar Soporte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <Link to="/ai-studio" className="absolute bottom-8 right-8 size-14 bg-primary text-background-dark rounded-full shadow-[0_4px_20px_rgba(83,210,45,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
                    <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform">chat_bubble</span>
                    <span className="absolute right-0 top-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                </Link>
            </main>
        </div>
    );
};

export default ScreenHelp;

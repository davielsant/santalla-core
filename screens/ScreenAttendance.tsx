import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ScreenAttendance = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                
                {/* Header */}
                <header className="flex-shrink-0 px-8 py-6 flex flex-col gap-2 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm">
                        <Link className="text-text-secondary hover:text-primary transition-colors" to="/">Santalla Core</Link>
                        <span className="text-text-secondary/40">/</span>
                        <Link className="text-text-secondary hover:text-primary transition-colors" to="/staff">Admin. Personal</Link>
                        <span className="text-text-secondary/40">/</span>
                        <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded text-xs">Registro Asistencia</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                                Registro de <span className="text-primary">Asistencia</span>
                            </h2>
                            <p className="text-text-secondary mt-1 text-base font-medium">Control biométrico y gestión horaria inteligente</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2e4328] rounded-full border border-primary/20">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-primary text-xs font-bold uppercase tracking-wider">Sistema En Línea</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 z-10">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full min-h-[600px]">
                        {/* LEFT COLUMN: Live Feed (Action Zone) */}
                        <div className="xl:col-span-8 flex flex-col gap-6">
                            {/* Camera Viewfinder */}
                            <div className="relative flex-1 bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group min-h-[400px]">
                                {/* Simulated Camera Feed Image */}
                                <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYcAaxRncm90qBWDYOsxOFsz8kvRYwSOcBrW7hdJUrstgJKIMHJ09aUt5jroThRvj9B8Ayov_9_dBNaOq62oAO0ulHxnkl7bDv2Q9wi2WtZKQ_R1S9K2XPJzDKjy-H2MDdfe-z69RBBD2jCz2tUyIgLpISCSgn1V9bb0NBF_iGc4e0gLfhMjqor7tznwtwRFMKktTLeelJNbUKZgnuBbDys43tNs98UgGh-mSEVmL3k281nnP7HTSFlYOC_bWrQowsxD1aTJI97Asi')", filter: "grayscale(20%) contrast(110%)"}}></div>
                                {/* Camera UI Overlays */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    {/* Top Info Bar */}
                                    <div className="flex justify-between items-start">
                                        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                                            <span className="material-symbols-outlined text-red-500 text-sm animate-pulse-slow">fiber_manual_record</span>
                                            <span className="text-white text-xs font-mono">CAM_01 • 1080p • 60FPS</span>
                                        </div>
                                        <div className="bg-primary text-black px-4 py-2 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(83,210,45,0.4)] flex items-center gap-2">
                                            <span className="material-symbols-outlined text-lg">face</span>
                                            Detectando rostro...
                                        </div>
                                    </div>
                                    {/* Face Reticle / Scanning Box */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 border-2 border-primary/50 rounded-3xl flex items-center justify-center">
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-xl"></div>
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-xl"></div>
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-xl"></div>
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-xl"></div>
                                        {/* Scan Line */}
                                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 absolute top-0 animate-scan shadow-[0_0_15px_#53d22d]"></div>
                                        {/* Name Tag (Simulating recognition) */}
                                        <div className="absolute -bottom-16 bg-surface-dark/90 backdrop-blur border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                                            <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                                            <div>
                                                <p className="text-white font-bold leading-none">Elena Masterson</p>
                                                <p className="text-text-secondary text-xs mt-1">ID: 8829-B • Desarrollo</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Instructions */}
                                    <div className="text-center pb-4">
                                        <p className="text-white/80 text-lg font-medium drop-shadow-md">Por favor, mire fijamente a la cámara</p>
                                    </div>
                                </div>
                            </div>
                            {/* Manual Action Buttons (Fallback/Override) */}
                            <div className="grid grid-cols-2 gap-4 h-24">
                                <button className="relative overflow-hidden group bg-surface-dark border border-primary/30 hover:bg-primary/10 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4">
                                    <div className="bg-primary/20 p-3 rounded-full group-hover:bg-primary group-hover:text-black text-primary transition-colors">
                                        <span className="material-symbols-outlined text-3xl">login</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-white font-bold text-lg group-hover:text-primary transition-colors">Registrar Entrada</span>
                                        <span className="block text-text-secondary text-xs">Marcar inicio de jornada</span>
                                    </div>
                                </button>
                                <button className="relative overflow-hidden group bg-surface-dark border border-white/10 hover:bg-white/5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4">
                                    <div className="bg-white/10 p-3 rounded-full group-hover:bg-white group-hover:text-black text-white transition-colors">
                                        <span className="material-symbols-outlined text-3xl">logout</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-white font-bold text-lg">Registrar Salida</span>
                                        <span className="block text-text-secondary text-xs">Finalizar jornada laboral</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Data Zone */}
                        <div className="xl:col-span-4 flex flex-col gap-6">
                            {/* Stats Widgets */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-dark p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-between h-40">
                                    <div className="flex justify-between items-start">
                                        <span className="material-symbols-outlined text-text-secondary text-2xl">schedule</span>
                                        <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded">Hoy</span>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-white">07:42</p>
                                        <p className="text-text-secondary text-xs font-medium mt-1">Horas trabajadas</p>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-primary h-full rounded-full w-[85%]"></div>
                                    </div>
                                </div>
                                <div className="bg-surface-dark p-5 rounded-[1.5rem] border border-white/5 flex flex-col justify-between h-40">
                                    <div className="flex justify-between items-start">
                                        <span className="material-symbols-outlined text-text-secondary text-2xl">calendar_month</span>
                                        <span className="text-orange-400 text-xs font-bold bg-orange-400/10 px-2 py-1 rounded">Semana 34</span>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-white">96%</p>
                                        <p className="text-text-secondary text-xs font-medium mt-1">Puntualidad</p>
                                    </div>
                                    <div className="flex -space-x-2 mt-2">
                                        <div className="w-6 h-6 rounded-full border border-surface-dark bg-primary flex items-center justify-center text-[10px] text-black font-bold">L</div>
                                        <div className="w-6 h-6 rounded-full border border-surface-dark bg-primary flex items-center justify-center text-[10px] text-black font-bold">M</div>
                                        <div className="w-6 h-6 rounded-full border border-surface-dark bg-primary flex items-center justify-center text-[10px] text-black font-bold">M</div>
                                        <div className="w-6 h-6 rounded-full border border-surface-dark bg-white/20 flex items-center justify-center text-[10px] text-white font-bold">J</div>
                                        <div className="w-6 h-6 rounded-full border border-surface-dark bg-white/20 flex items-center justify-center text-[10px] text-white font-bold">V</div>
                                    </div>
                                </div>
                            </div>
                            {/* Recent Activity Log */}
                            <div className="bg-surface-dark flex-1 rounded-[2rem] border border-white/5 p-6 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-white font-bold text-lg">Actividad Reciente</h3>
                                    <button className="text-text-secondary hover:text-white text-sm font-medium transition-colors">Ver todo</button>
                                </div>
                                <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {/* Entry 1 */}
                                    <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-cover bg-center border border-white/10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCs_A5xOhFeY_UhNoR4MtS5QpCestibtYGExu1Aku3wtR7rgkaC4inHGT1kMOHYwrdVJO4zpOLfOJJWCxqIi2xyqANpdch6QaZeciaym9dOlmC1_PNSLYNMvdXVzxJK_fXVqUMyGjmfQ7_RPga2CygLDBaMP1CXtsa5z4NcIgp9WlV8Dplpf4dWVp6deneT2jMmpazZmPKsL_RLPw2yWDZA0hT1cuCO1M93FDZkViSMt0fyN82BOVkbO2hvPQEYUntgE9oG54IDusYJ')"}}></div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-sm">Miguel Ángel</p>
                                            <p className="text-text-secondary text-xs">Diseño UI</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-white font-mono font-medium text-sm">09:12</p>
                                            <span className="text-primary text-[10px] font-bold bg-primary/10 px-1.5 py-0.5 rounded uppercase">Entrada</span>
                                        </div>
                                    </div>
                                    {/* Entry 2 */}
                                    <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-cover bg-center border border-white/10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwo9I-YOs7BjTHcvzItLBVxHXmKMOzAkBtpATLWRTvc8BrQ_PEDUsmGtXezMchhEu3T6j4V4W7KhxPRgSy31pdU_VqnfbCfrdlAfYlR1Xi8UA3vPRDBAMWkqI62ozwFGRqhI0McHi92PueCkP8xPGyxEEmn_IAoX5vtdE5ZHX2czddsp5AFLANCJp-JeGlemonO-Fhn9ggn7F62aTeOp8y-tSYGCoH-pps2-e0_Nq0_JnUVqYuhLPdztYfJS7FgI1Q-Rz1xJ0M0sfU')"}}></div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-sm">Ana Torres</p>
                                            <p className="text-text-secondary text-xs">Marketing</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-white font-mono font-medium text-sm">08:55</p>
                                            <span className="text-primary text-[10px] font-bold bg-primary/10 px-1.5 py-0.5 rounded uppercase">Entrada</span>
                                        </div>
                                    </div>
                                    {/* Entry 3 */}
                                    <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-cover bg-center border border-white/10 grayscale opacity-70" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0Rk_6ENJsykOtkyfkIEe9W-64wFzTaXgeNxFpx9WT26cpIM4kQK1LYhKwonbQURSv9ySYb0U1gLStbqKjAtKiNbPXj5edg2liIw4TDvUXMLDow-YSWEmMAPa5cgphYwSqsI_rOxu337BWd1DFd7aZvBbJo7Q9dDjLrsXWG9D0o5waxOylyKm7qEw0HrL6LIVbOcf76nuiiy5jJPjkQc14x7qQh8EALOUINtRblFtvXaGXMxk313BNKoQEDU-f4Rj8qRrLGoIEpmaJ')"}}></div>
                                        <div className="flex-1">
                                            <p className="text-white/70 font-bold text-sm">Roberto Gil</p>
                                            <p className="text-text-secondary/60 text-xs">Logística</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-white/60 font-mono font-medium text-sm">08:45</p>
                                            <span className="text-text-secondary text-[10px] font-bold bg-white/5 px-1.5 py-0.5 rounded uppercase">Salida</span>
                                        </div>
                                    </div>
                                    {/* Entry 4 */}
                                    <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-cover bg-center border border-white/10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBu3ZMkcbYglGq_frXcIW6I9XqxyOwg7FY_7-Xdlk7QssbrbwSPt9lD1G1ApWBET6SfQ5iy0Ad6jOQGHYl2zubVgIwndE71YIl8A9s2ttz_5pxy-Elj0DutO-TH9BjyVNNrdVbRjubBXLNW-ukvz50xq4sLy2rkNzX10NMHai33xzZJe5rRqAeyVY-W3I8pCWHJr1P-SNTK_YOm2BgO7poYJnX2kxWxRWN2Lc9st0zto-YAcUMLJKGKGjIRmObVzMujmDNZQIH40Lqt')"}}></div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-sm">Sofia M.</p>
                                            <p className="text-text-secondary text-xs">Recursos Humanos</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-white font-mono font-medium text-sm">08:30</p>
                                            <span className="text-primary text-[10px] font-bold bg-primary/10 px-1.5 py-0.5 rounded uppercase">Entrada</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Manual Entry Link */}
                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <button className="w-full flex items-center justify-center gap-2 text-text-secondary hover:text-primary py-2 text-sm font-semibold transition-colors">
                                        <span className="material-symbols-outlined text-lg">edit_square</span>
                                        Registrar Manualmente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScreenAttendance;
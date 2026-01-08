import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ScreenStaff = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Gradient Accent similar to HTML */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0"></div>
                
                <div className="flex-1 overflow-y-auto z-10 p-4 lg:p-8 flex flex-col gap-6">
                    {/* Header Section */}
                    <header className="flex flex-col gap-4">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Link className="text-text-secondary hover:text-primary transition-colors" to="/">Inicio</Link>
                            <span className="text-border-dark">/</span>
                            <span className="text-text-secondary">Admin</span>
                            <span className="text-border-dark">/</span>
                            <span className="text-white">Personal</span>
                        </div>
                        <div className="flex flex-wrap justify-between items-end gap-4">
                            <div className="flex flex-col gap-1 max-w-2xl">
                                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Gestión de Usuarios</h2>
                                <p className="text-slate-500 dark:text-text-secondary text-base lg:text-lg">Control de acceso basado en roles (RBAC) y monitoreo de segregación de funciones.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="h-12 px-6 rounded-full bg-surface-dark border border-border-dark hover:border-primary text-white font-bold text-sm transition-all flex items-center gap-2 group">
                                    <span className="material-symbols-outlined group-hover:text-primary transition-colors">history</span>
                                    <span>Ver Auditoría</span>
                                </button>
                                <Link to="/attendance" className="h-12 px-6 rounded-full bg-primary hover:bg-primary-dark text-background-dark font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(83,210,45,0.3)] hover:shadow-[0_0_30px_rgba(83,210,45,0.5)] flex items-center gap-2">
                                    <span className="material-symbols-outlined filled">person_add</span>
                                    <span>Nuevo Usuario</span>
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-xl bg-surface-dark border border-border-dark flex items-start justify-between">
                            <div>
                                <p className="text-text-secondary text-sm font-medium mb-1">Total Personal</p>
                                <p className="text-3xl font-black text-white">24</p>
                            </div>
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">group</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-dark border border-border-dark flex items-start justify-between">
                            <div>
                                <p className="text-text-secondary text-sm font-medium mb-1">Roles Activos</p>
                                <p className="text-3xl font-black text-white">5</p>
                            </div>
                            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                                <span className="material-symbols-outlined">badge</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-surface-dark border border-border-dark flex items-start justify-between relative overflow-hidden group">
                            <div className="z-10 relative">
                                <p className="text-text-secondary text-sm font-medium mb-1">Alertas de Seguridad</p>
                                <p className="text-3xl font-black text-white">2</p>
                            </div>
                            <div className="p-3 rounded-full bg-orange-500/10 text-orange-400 z-10 relative">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-500/5 group-hover:to-orange-500/10 transition-colors"></div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full min-h-[500px]">
                        {/* Left Column: User List (8 Cols) */}
                        <div className="xl:col-span-8 flex flex-col gap-4">
                            {/* Filters */}
                            <div className="flex flex-wrap gap-3">
                                <div className="flex-1 min-w-[240px] relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                                    <input className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-dark border border-border-dark focus:border-primary focus:ring-0 text-white placeholder-text-secondary text-sm transition-all" placeholder="Buscar por nombre, email o ID..." type="text"/>
                                </div>
                                <div className="w-full sm:w-auto relative">
                                    <select className="h-12 pl-4 pr-10 rounded-full bg-surface-dark border border-border-dark focus:border-primary focus:ring-0 text-white text-sm appearance-none min-w-[160px] cursor-pointer">
                                        <option>Todos los roles</option>
                                        <option>Administrador</option>
                                        <option>Cajero</option>
                                        <option>Supervisor</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">expand_more</span>
                                </div>
                            </div>

                            {/* Table Card */}
                            <div className="flex-1 bg-surface-dark border border-border-dark rounded-xl overflow-hidden flex flex-col shadow-xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-background-dark/50 border-b border-border-dark text-xs uppercase text-text-secondary font-bold tracking-wider">
                                                <th className="p-5">Usuario</th>
                                                <th className="p-5">Rol</th>
                                                <th className="p-5">Estado</th>
                                                <th className="p-5 hidden sm:table-cell">Último Acceso</th>
                                                <th className="p-5 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-border-dark/50">
                                            {/* Row 1 */}
                                            <tr className="group hover:bg-white/5 transition-colors">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCY6DzaahhIbknJU6RlzR3kXoWHh0M8P5-ipn_tt4T4TQsYEFb6Z3wXsawmq8HC89avKHDsx6qQLJ46M5_jyIS3mOOLuTQJKRtF3N4qyhiDyMFrlEIkdnP1-9Vp73HS0kXEbXRSEXlCw4Za00b7pbLEtkEe1XkYHaz6joTO-kB4anKNTnBpRUuMzm9HAUmQ3J5boC-pKrkg3gLeboEpn3lhy5t2cmGv327PBf3eWygo68d8B39zuClsEiNGkEtXong25UQJ2hIWEI0Z')"}}></div>
                                                        <div>
                                                            <p className="font-bold text-white">Ana García</p>
                                                            <p className="text-text-secondary text-xs">ana@santalla.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                                                        Gerente
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold">Activo</span>
                                                </td>
                                                <td className="p-5 hidden sm:table-cell text-text-secondary">Hace 12 min</td>
                                                <td className="p-5 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-2 rounded-full hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Row 2 (Selected) */}
                                            <tr className="group bg-white/5 transition-colors">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRSeljrkAv4oIrNShnS2rOgnvYp-Mq6nX8o65mearSNjJmXdfDpCvoknW1QNjaFwvt8ljNsF-ji_S0fd2zRdAdMfJkppoYoI8dHX1Cvb7UoaBOe6iXRKOTn8QmaKnQZ5Ieqon3Zu8ozpckwxK04tqKMYPWA93BeHYfoN2mWABpMJQ7rD1MTUxjWxDsWNOKF4wB9Xsdlg9x7FRSiBzQokn5ehKhHJ8G5gsRodfq7ThI7dK5oOxjjL_FUbYLXolUGWLT98AIVJrJr8BP')"}}></div>
                                                        <div className="relative">
                                                            <p className="font-bold text-white">Carlos Ruiz</p>
                                                            <p className="text-text-secondary text-xs">carlos@santalla.com</p>
                                                            {/* Selection Indicator */}
                                                            <div className="absolute -left-[54px] top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                                        Cajero
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold">Activo</span>
                                                </td>
                                                <td className="p-5 hidden sm:table-cell text-text-secondary">Hace 2 horas</td>
                                                <td className="p-5 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-100 transition-opacity">
                                                        <button className="p-2 rounded-full bg-white/10 text-white transition-colors">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-2 rounded-full hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Row 3 */}
                                            <tr className="group hover:bg-white/5 transition-colors">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-cover bg-center grayscale opacity-70" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTq71XT9u8Fisds3NwXo3WppHNz6O_uQ5y63yu_zrjinlRCA_cdR2oj6cwa_U24mny46v2L1a2TCzYEnDwfOaEU9eu2AWYSYVkQLbea8I-Xg8V4EA7PRxafMrKcVZGk6sXB-Ep7DrirGvM0N9lC3Wgdq1wH4b8vxs_-bjnhUbXi6-V4x5rbH1dg_WWokVDAT6tKPnVN-KFSkZk5IM7Bq5-es6Ob-soJN46VlzY5NC3QvKybId5SRP5Zn4cN_Hi0O9gdZmZ7iPNN6Wk')"}}></div>
                                                        <div>
                                                            <p className="font-bold text-text-secondary">Elena López</p>
                                                            <p className="text-text-secondary/60 text-xs">elena@santalla.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                                        Cajero
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-border-dark text-text-secondary border border-border-dark text-xs font-bold">Inactivo</span>
                                                </td>
                                                <td className="p-5 hidden sm:table-cell text-text-secondary">Ayer</td>
                                                <td className="p-5 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-2 rounded-full hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Row 4 */}
                                            <tr className="group hover:bg-white/5 transition-colors">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA041p7OaCnjk4PVVUuVyKGD00EAef1ilFxSHIAd1dR2ZHofM4e7WzFbh3XU_hR7tRpCfOux5b5PvtgOWE2MGk7Id3OoODVx6IjlWC0vAFv9Zhl6UeEFzNu9x-RqMDgUngNypeVDiDT5dnPxH9uiDmD07KSKHlQE9EHtuMJnsXd2-CKpupifUvoa6OAp4xoliZk594nGtpHlLqftPj9Qh2w8N2aAjM1sc0F3tsN5k9yeY_7r_aGkVt9bAW62rxawK9LQecUf2xi-EKx')"}}></div>
                                                        <div>
                                                            <p className="font-bold text-white">Miguel Díaz</p>
                                                            <p className="text-text-secondary text-xs">miguel@santalla.com</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                                        Inventario
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold">Activo</span>
                                                </td>
                                                <td className="p-5 hidden sm:table-cell text-text-secondary">Hace 3 horas</td>
                                                <td className="p-5 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors">
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button className="p-2 rounded-full hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Pagination */}
                                <div className="mt-auto border-t border-border-dark p-4 flex justify-between items-center bg-background-dark/30">
                                    <span className="text-xs text-text-secondary">Mostrando 4 de 24 usuarios</span>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-full bg-surface-dark border border-border-dark text-text-secondary hover:text-white disabled:opacity-50">
                                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                                        </button>
                                        <button className="p-2 rounded-full bg-surface-dark border border-border-dark text-text-secondary hover:text-white">
                                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Detail View (4 Cols) */}
                        <div className="xl:col-span-4 flex flex-col gap-4">
                            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col gap-5 h-full relative overflow-hidden shadow-2xl">
                                {/* Header for selected user */}
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Editando Permisos</span>
                                        <h3 className="text-xl font-bold text-white">Carlos Ruiz</h3>
                                        <p className="text-sm text-text-secondary">Rol actual: <span className="text-white">Cajero</span></p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center">
                                        <span className="material-symbols-outlined text-text-secondary">lock_person</span>
                                    </div>
                                </div>
                                {/* SoD Warning */}
                                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-orange-400 shrink-0 text-lg mt-0.5">warning</span>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-orange-200 text-xs font-bold">Conflicto de Segregación (SoD)</p>
                                        <p className="text-orange-200/70 text-[11px] leading-tight">Este usuario tiene permisos de "Cobrar" y "Anular Ticket" simultáneamente. Se recomienda separar estas funciones.</p>
                                    </div>
                                </div>
                                {/* Permissions */}
                                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6 custom-scrollbar">
                                    {/* Category: Ventas */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-xs font-bold text-text-secondary uppercase flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">shopping_bag</span> Ventas
                                        </h4>
                                        <label className="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark hover:border-primary/50 cursor-pointer group transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Procesar Cobros</span>
                                                <span className="text-[10px] text-text-secondary">Acceso a caja y pagos</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked/>
                                                <div className="w-9 h-5 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                            </div>
                                        </label>
                                        <label className="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-orange-500/30 hover:bg-orange-500/5 cursor-pointer group transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white">Anular Ticket</span>
                                                <span className="text-[10px] text-orange-300/80">Riesgo Alto</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked/>
                                                <div className="w-9 h-5 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                                            </div>
                                        </label>
                                    </div>
                                    {/* Category: Inventario */}
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-xs font-bold text-text-secondary uppercase flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">inventory</span> Inventario
                                        </h4>
                                        <label className="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark hover:border-primary/50 cursor-pointer group transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Ver Stock</span>
                                                <span className="text-[10px] text-text-secondary">Solo lectura</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked/>
                                                <div className="w-9 h-5 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                            </div>
                                        </label>
                                        <label className="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark hover:border-primary/50 cursor-pointer group transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">Ajustar Inventario</span>
                                                <span className="text-[10px] text-text-secondary">Modificar cantidades</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer"/>
                                                <div className="w-9 h-5 bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                {/* Action Footer */}
                                <div className="pt-4 border-t border-border-dark flex gap-3">
                                    <button className="flex-1 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors">
                                        Cancelar
                                    </button>
                                    <button className="flex-1 h-10 rounded-full bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm transition-colors shadow-lg shadow-primary/20">
                                        Guardar Cambios
                                    </button>
                                </div>
                                {/* Decorative Glow */}
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                 </div>
            </main>
        </div>
    );
};

export default ScreenStaff;
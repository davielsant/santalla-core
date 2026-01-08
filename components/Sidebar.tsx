
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ className = "" }: { className?: string }) => {
    const location = useLocation();
    const activePath = location.pathname;

    const isActive = (path: string) => {
        if (path === '/' && activePath === '/') return true;
        if (path !== '/' && activePath.startsWith(path)) return true;
        return false;
    };

    const menuItems = [
        { id: 'pos', icon: 'point_of_sale', label: 'Ventas (POS)', path: '/' },
        { id: 'inventory', icon: 'inventory_2', label: 'Inventario', path: '/inventory' },
        { id: 'reports', icon: 'bar_chart', label: 'Reportes', path: '/reports' },
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'staff', icon: 'group', label: 'Personal', path: '/staff' },
        { id: 'ai', icon: 'auto_awesome', label: 'AI Studio', path: '/ai-studio' },
        { id: 'config', icon: 'settings', label: 'Integraciones', path: '/integrations' }
    ];

    return (
        <aside className={`w-20 lg:w-72 shrink-0 flex flex-col justify-between border-r border-border-dark bg-background-dark transition-all duration-300 z-20 ${className}`}>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">eco</span>
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <h1 className="text-white text-base font-bold leading-none tracking-tight">Santalla Core</h1>
                        <p className="text-text-secondary text-xs font-medium mt-1">Gestión PYME</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-2 mt-2">
                    {menuItems.map(item => (
                        <Link 
                            key={item.id}
                            to={item.path}
                            className={`group flex items-center gap-3 px-3 py-3 rounded-full transition-all ${isActive(item.path) ? 'bg-primary text-background-dark font-bold shadow-[0_0_15px_rgba(83,210,45,0.3)]' : 'hover:bg-surface-active text-text-secondary hover:text-white'}`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.path) ? 'filled' : ''}`}>{item.icon}</span>
                            <p className="hidden lg:block text-sm">{item.label}</p>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-border-dark">
                <Link to="/help" className={`group flex items-center gap-3 px-3 py-3 rounded-full transition-colors ${isActive('/help') ? 'bg-surface-active text-white' : 'hover:bg-surface-active text-text-secondary hover:text-white'}`}>
                     <span className="material-symbols-outlined">help</span>
                     <p className="hidden lg:block text-sm font-medium">Centro de Ayuda</p>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;

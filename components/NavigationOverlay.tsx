
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationOverlay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const routes = [
        { path: "/", label: "POS (Caja)", icon: "point_of_sale" },
        { path: "/inventory", label: "Inventario", icon: "inventory_2" },
        { path: "/reports", label: "Reportes", icon: "bar_chart" },
        { path: "/dashboard", label: "Dashboard", icon: "dashboard" },
        { path: "/staff", label: "Personal", icon: "group" },
        { path: "/ai-studio", label: "AI Studio", icon: "auto_awesome" },
        { path: "/integrations", label: "Integraciones", icon: "hub" },
        { path: "/help", label: "Centro de Ayuda", icon: "help" },
    ];

    return (
        <div className="fixed bottom-4 left-4 z-[100] lg:hidden">
            <div className={`flex flex-col gap-2 mb-2 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {routes.map((route) => (
                    <button
                        key={route.path}
                        onClick={() => { navigate(route.path); setIsOpen(false); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border border-border-dark backdrop-blur-md transition-all ${location.pathname === route.path ? 'bg-primary text-background-dark font-bold' : 'bg-surface-dark/90 text-white hover:bg-surface-active'}`}
                    >
                        <span className="material-symbols-outlined text-sm">{route.icon}</span>
                        <span className="text-sm">{route.label}</span>
                    </button>
                ))}
            </div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
            >
                <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
            </button>
        </div>
    );
};

export default NavigationOverlay;

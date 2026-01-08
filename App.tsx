import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ScreenPOS from './screens/ScreenPOS';
import ScreenDashboard from './screens/ScreenDashboard';
import ScreenInventory from './screens/ScreenInventory';
import ScreenNewProduct from './screens/ScreenNewProduct';
import ScreenNewOrder from './screens/ScreenNewOrder';
import ScreenReports from './screens/ScreenReports';
import ScreenStaff from './screens/ScreenStaff';
import ScreenAttendance from './screens/ScreenAttendance';
import ScreenIntegrations from './screens/ScreenIntegrations';
import ScreenHelp from './screens/ScreenHelp';
import ScreenAIStudio from './screens/ScreenAIStudio';

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<ScreenPOS />} />
                <Route path="/dashboard" element={<ScreenDashboard />} />
                <Route path="/inventory" element={<ScreenInventory />} />
                <Route path="/product/new" element={<ScreenNewProduct />} />
                <Route path="/orders/new" element={<ScreenNewOrder />} />
                <Route path="/reports" element={<ScreenReports />} />
                <Route path="/staff" element={<ScreenStaff />} />
                <Route path="/attendance" element={<ScreenAttendance />} />
                <Route path="/integrations" element={<ScreenIntegrations />} />
                <Route path="/help" element={<ScreenHelp />} />
                <Route path="/ai-studio" element={<ScreenAIStudio />} />
            </Routes>
        </HashRouter>
    );
};

export default App;

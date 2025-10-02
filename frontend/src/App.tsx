import { useState } from 'react';
import LoginPage from "./presentation/pages/LoginPage";
import { Toaster } from "sonner";
import MetricsPage from './presentation/pages/MetricsPage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="flex min-h-svh flex-col items-center">
            <Toaster position="top-right" richColors /> 
            {isAuthenticated ? (
                <MetricsPage />
            ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
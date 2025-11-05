import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { ElderlyDashboard } from './components/ElderlyDashboard';
import { CaretakerDashboard } from './components/CaretakerDashboard';

function App() {
  const [userRole, setUserRole] = useState<'login' | 'elderly' | 'caretaker'>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (role: 'elderly' | 'caretaker', user: any) => {
    setUserRole(role);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setUserRole('login');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'login' && <LoginScreen onLogin={handleLogin} />}
      {userRole === 'elderly' && <ElderlyDashboard user={currentUser} onLogout={handleLogout} />}
      {userRole === 'caretaker' && <CaretakerDashboard user={currentUser} onLogout={handleLogout} />}
    </div>
  );
}

export default App;

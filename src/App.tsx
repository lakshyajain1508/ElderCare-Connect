import { useState } from 'react';
import { Home, Phone, Activity, MessageCircle, Settings, Users, Bell, BarChart3 } from 'lucide-react';
import { ElderlyDashboard } from './components/elderly/Dashboard';
import { EmergencyContacts } from './components/elderly/EmergencyContacts';
import { HealthTracking } from './components/elderly/HealthTracking';
import { Communication } from './components/elderly/Communication';
import { ResidentManagement } from './components/caretaker/ResidentManagement';
import { RemindersManagement } from './components/caretaker/RemindersManagement';
import { HealthMonitoring } from './components/caretaker/HealthMonitoring';
import { SettingsScreen } from './components/Settings';

type UserRole = 'elderly' | 'caretaker' | null;
type ElderlyTab = 'home' | 'emergency' | 'health' | 'chat' | 'settings';
type CaretakerTab = 'residents' | 'reminders' | 'monitoring' | 'chat' | 'settings';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [elderlyActiveTab, setElderlyActiveTab] = useState<ElderlyTab>('home');
  const [caretakerActiveTab, setCaretakerActiveTab] = useState<CaretakerTab>('residents');

  // Role selection screen
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-indigo-900 mb-2">CareConnect</h1>
            <p className="text-gray-600">Your Health & Care Companion</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setUserRole('elderly')}
              className="w-full bg-indigo-600 text-white py-6 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Home className="w-8 h-8 mx-auto mb-2" />
              <span className="block">I'm a Resident</span>
            </button>
            
            <button
              onClick={() => setUserRole('caretaker')}
              className="w-full bg-emerald-600 text-white py-6 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Users className="w-8 h-8 mx-auto mb-2" />
              <span className="block">I'm a Caretaker</span>
            </button>
          </div>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Select your role to continue
          </p>
        </div>
      </div>
    );
  }

  // Elderly user interface
  if (userRole === 'elderly') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-4 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white">CareConnect</h1>
              <p className="text-indigo-100 text-sm">Welcome back, Margaret</p>
            </div>
            <button
              onClick={() => setUserRole(null)}
              className="text-white hover:text-indigo-100 text-sm underline"
            >
              Switch User
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {elderlyActiveTab === 'home' && <ElderlyDashboard />}
          {elderlyActiveTab === 'emergency' && <EmergencyContacts />}
          {elderlyActiveTab === 'health' && <HealthTracking />}
          {elderlyActiveTab === 'chat' && <Communication role="elderly" />}
          {elderlyActiveTab === 'settings' && <SettingsScreen role="elderly" />}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center py-2">
            <button
              onClick={() => setElderlyActiveTab('home')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg ${
                elderlyActiveTab === 'home'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600'
              }`}
            >
              <Home className="w-7 h-7 mb-1" />
              <span className="text-xs">Home</span>
            </button>

            <button
              onClick={() => setElderlyActiveTab('emergency')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg ${
                elderlyActiveTab === 'emergency'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-600'
              }`}
            >
              <Phone className="w-7 h-7 mb-1" />
              <span className="text-xs">Emergency</span>
            </button>

            <button
              onClick={() => setElderlyActiveTab('health')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg ${
                elderlyActiveTab === 'health'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600'
              }`}
            >
              <Activity className="w-7 h-7 mb-1" />
              <span className="text-xs">Health</span>
            </button>

            <button
              onClick={() => setElderlyActiveTab('chat')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg ${
                elderlyActiveTab === 'chat'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <MessageCircle className="w-7 h-7 mb-1" />
              <span className="text-xs">Chat</span>
            </button>

            <button
              onClick={() => setElderlyActiveTab('settings')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg ${
                elderlyActiveTab === 'settings'
                  ? 'text-gray-700 bg-gray-100'
                  : 'text-gray-600'
              }`}
            >
              <Settings className="w-7 h-7 mb-1" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Caretaker interface
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-emerald-600 text-white px-4 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Caretaker Dashboard</h1>
            <p className="text-emerald-100 text-sm">Managing 8 residents</p>
          </div>
          <button
            onClick={() => setUserRole(null)}
            className="text-white hover:text-emerald-100 text-sm underline"
          >
            Switch User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {caretakerActiveTab === 'residents' && <ResidentManagement />}
        {caretakerActiveTab === 'reminders' && <RemindersManagement />}
        {caretakerActiveTab === 'monitoring' && <HealthMonitoring />}
        {caretakerActiveTab === 'chat' && <Communication role="caretaker" />}
        {caretakerActiveTab === 'settings' && <SettingsScreen role="caretaker" />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setCaretakerActiveTab('residents')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              caretakerActiveTab === 'residents'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-600'
            }`}
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs">Residents</span>
          </button>

          <button
            onClick={() => setCaretakerActiveTab('reminders')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              caretakerActiveTab === 'reminders'
                ? 'text-amber-600 bg-amber-50'
                : 'text-gray-600'
            }`}
          >
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">Reminders</span>
          </button>

          <button
            onClick={() => setCaretakerActiveTab('monitoring')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              caretakerActiveTab === 'monitoring'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="text-xs">Health</span>
          </button>

          <button
            onClick={() => setCaretakerActiveTab('chat')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              caretakerActiveTab === 'chat'
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-600'
            }`}
          >
            <MessageCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Messages</span>
          </button>

          <button
            onClick={() => setCaretakerActiveTab('settings')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              caretakerActiveTab === 'settings'
                ? 'text-gray-700 bg-gray-100'
                : 'text-gray-600'
            }`}
          >
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

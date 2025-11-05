import { 
  User, Bell, Volume2, Moon, Globe, Shield, Download, 
  Upload, HelpCircle, LogOut, ChevronRight, Smartphone,
  Mail, Phone
} from 'lucide-react';

interface SettingsProps {
  role: 'elderly' | 'caretaker';
}

export function SettingsScreen({ role }: SettingsProps) {
  const handleExportData = () => {
    alert('Exporting data as CSV...');
  };

  const handleInstallPWA = () => {
    alert('To install this app:\n\n1. Tap the share button in your browser\n2. Select "Add to Home Screen"\n3. Tap "Add" to install');
  };

  if (role === 'elderly') {
    return (
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              👵
            </div>
            <div>
              <h2 className="text-white mb-1">Margaret Wilson</h2>
              <p className="text-indigo-100">Room 302A</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-gray-900">Preferences</h3>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Notifications</p>
                  <p className="text-gray-500 text-sm">Manage reminders and alerts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Voice Settings</p>
                  <p className="text-gray-500 text-sm">Adjust voice speed and volume</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Text Size</p>
                  <p className="text-gray-500 text-sm">Large (recommended)</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-gray-900">Emergency Contacts</h3>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-red-600" />
                <p className="text-gray-900">Primary Contact</p>
              </div>
              <p className="text-gray-700">Sarah Johnson (Daughter)</p>
              <p className="text-gray-500 text-sm">(555) 234-5678</p>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <p className="text-gray-900">Email</p>
              </div>
              <p className="text-gray-700">sarah.johnson@email.com</p>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-gray-900">App Settings</h3>
          </div>

          <div className="divide-y divide-gray-100">
            <button 
              onClick={handleInstallPWA}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Install App</p>
                  <p className="text-gray-500 text-sm">Add to home screen</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Help & Support</p>
                  <p className="text-gray-500 text-sm">Get assistance</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Large CTA Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3">
            <Volume2 className="w-6 h-6" />
            <span>Test Voice Reminder</span>
          </button>

          <button className="w-full bg-gray-100 text-gray-700 py-5 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-3">
            <LogOut className="w-6 h-6" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm">
          <p>CareConnect v1.0.0</p>
          <p className="mt-1">PWA-enabled for offline use</p>
        </div>
      </div>
    );
  }

  // Caretaker Settings
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
            👨‍⚕️
          </div>
          <div>
            <h2 className="text-white mb-1">Nurse Jennifer</h2>
            <p className="text-emerald-100">Caretaker • Day Shift</p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-gray-900">Data Management</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <button 
            onClick={handleExportData}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Export Data</p>
                <p className="text-gray-500 text-sm">Download resident records as CSV</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Cloud Sync</p>
                <p className="text-gray-500 text-sm">Last synced: 5 minutes ago</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              Active
            </div>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-gray-900">Notifications</h3>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-gray-900">Reminder Alerts</p>
                <p className="text-gray-500 text-sm">Get notified of upcoming tasks</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-emerald-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-gray-900">Emergency Alerts</p>
                <p className="text-gray-500 text-sm">Critical notifications only</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-emerald-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-900">Message Notifications</p>
                <p className="text-gray-500 text-sm">New chat messages</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-emerald-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-gray-900">Account</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Edit Profile</p>
                <p className="text-gray-500 text-sm">Update your information</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={handleInstallPWA}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Install App</p>
                <p className="text-gray-500 text-sm">Add to home screen</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Help & Support</p>
                <p className="text-gray-500 text-sm">Documentation and FAQs</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* PWA Info */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-gray-900 mb-2">📱 Progressive Web App</h4>
            <p className="text-gray-700 text-sm mb-2">
              This app can be installed on your device and works offline. Install it for the best experience!
            </p>
            <button 
              onClick={handleInstallPWA}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all text-sm"
            >
              Install Now
            </button>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <button className="w-full bg-gray-100 text-gray-700 py-5 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-3">
        <LogOut className="w-6 h-6" />
        <span>Sign Out</span>
      </button>

      {/* App Info */}
      <div className="text-center text-gray-500 text-sm">
        <p>CareConnect v1.0.0</p>
        <p className="mt-1">PWA-enabled • Cloud Synced</p>
      </div>
    </div>
  );
}

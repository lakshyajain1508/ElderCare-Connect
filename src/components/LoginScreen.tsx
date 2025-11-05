import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { User, Shield, Heart } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'elderly' | 'caretaker', user: any) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const handleElderlyLogin = () => {
    onLogin('elderly', { name: 'Margaret Johnson', id: '1', age: 78 });
  };

  const handleCaretakerLogin = () => {
    onLogin('caretaker', { name: 'Dr. Sarah Chen', id: 'c1', role: 'Nurse' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl mb-2 text-indigo-900">ElderCare Connect</h1>
          <p className="text-gray-600">Compassionate care, connected families</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleElderlyLogin}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Resident Access</CardTitle>
              <CardDescription className="text-base">
                For elderly residents and family members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-14 text-lg" size="lg" onClick={handleElderlyLogin}>
                Continue as Resident
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Access your health records, reminders, and communicate with staff
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCaretakerLogin}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-100 rounded-full">
                  <Shield className="w-12 h-12 text-indigo-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Staff Access</CardTitle>
              <CardDescription className="text-base">
                For caretakers and medical staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-14 text-lg" variant="default" size="lg" onClick={handleCaretakerLogin}>
                Continue as Staff
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Manage residents, set reminders, and monitor health updates
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

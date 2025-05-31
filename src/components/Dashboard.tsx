
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Clock, CheckCircle, AlertCircle, MapPin, Fuel } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { title: 'Active Flights', value: '24', icon: Plane, color: 'text-blue-400' },
    { title: 'On Schedule', value: '18', icon: Clock, color: 'text-green-400' },
    { title: 'Completed Checks', value: '156', icon: CheckCircle, color: 'text-emerald-400' },
    { title: 'Alerts', value: '3', icon: AlertCircle, color: 'text-amber-400' },
  ];

  const recentFlights = [
    { id: 'AC001', route: 'JFK → LAX', status: 'En Route', eta: '14:30', progress: 65 },
    { id: 'AC002', route: 'DFW → MIA', status: 'Boarding', eta: '16:45', progress: 10 },
    { id: 'AC003', route: 'SEA → ORD', status: 'Delayed', eta: '18:20', progress: 0 },
    { id: 'AC004', route: 'BOS → SFO', status: 'Departed', eta: '19:15', progress: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Flight Operations Dashboard</h1>
        <div className="text-slate-300">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Flights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Plane className="h-5 w-5" />
              <span>Active Flights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFlights.map((flight) => (
              <div key={flight.id} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400 font-mono">{flight.id}</span>
                    <span className="text-white">{flight.route}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    flight.status === 'En Route' ? 'bg-green-500/20 text-green-400' :
                    flight.status === 'Boarding' ? 'bg-blue-500/20 text-blue-400' :
                    flight.status === 'Delayed' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {flight.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">ETA: {flight.eta}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${flight.progress}%` }}
                      />
                    </div>
                    <span className="text-slate-400">{flight.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Weather Systems</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Operational</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Navigation</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Operational</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Communication</span>
                <span className="text-amber-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>Degraded</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Fuel Systems</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Operational</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

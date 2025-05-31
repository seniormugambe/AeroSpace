
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plane, Search, MapPin, Clock, Fuel, Users } from 'lucide-react';

export const FlightTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const flights = [
    {
      id: 'AC001',
      callsign: 'AERO001',
      aircraft: 'Boeing 737-800',
      origin: 'JFK',
      destination: 'LAX',
      departure: '10:30',
      arrival: '14:30',
      status: 'En Route',
      altitude: '35,000 ft',
      speed: '475 kts',
      position: { lat: 39.8283, lng: -98.5795 },
      fuel: '65%',
      passengers: 142,
      crew: 6
    },
    {
      id: 'AC002',
      callsign: 'AERO002',
      aircraft: 'Airbus A320',
      origin: 'DFW',
      destination: 'MIA',
      departure: '12:15',
      arrival: '16:45',
      status: 'Boarding',
      altitude: 'Ground',
      speed: '0 kts',
      position: { lat: 32.8968, lng: -97.0380 },
      fuel: '100%',
      passengers: 156,
      crew: 5
    },
    {
      id: 'AC003',
      callsign: 'AERO003',
      aircraft: 'Boeing 777-300',
      origin: 'SEA',
      destination: 'ORD',
      departure: '15:00',
      arrival: '18:20',
      status: 'Delayed',
      altitude: 'Ground',
      speed: '0 kts',
      position: { lat: 47.4502, lng: -122.3088 },
      fuel: '95%',
      passengers: 284,
      crew: 12
    }
  ];

  const filteredFlights = flights.filter(flight =>
    flight.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.callsign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Flight Tracking System</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search flights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MapPin className="h-4 w-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredFlights.map((flight) => (
          <Card key={flight.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plane className="h-5 w-5 text-blue-400" />
                  <span>{flight.callsign}</span>
                  <span className="text-slate-400">({flight.id})</span>
                </CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  flight.status === 'En Route' ? 'bg-green-500/20 text-green-400' :
                  flight.status === 'Boarding' ? 'bg-blue-500/20 text-blue-400' :
                  flight.status === 'Delayed' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {flight.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Flight Route */}
                <div className="space-y-2">
                  <h3 className="text-slate-400 text-sm font-medium">Route</h3>
                  <div className="flex items-center space-x-2 text-white">
                    <span className="font-mono text-lg">{flight.origin}</span>
                    <Plane className="h-4 w-4 text-blue-400" />
                    <span className="font-mono text-lg">{flight.destination}</span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    {flight.aircraft}
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <h3 className="text-slate-400 text-sm font-medium">Schedule</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-white">Dep: {flight.departure}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-white">Arr: {flight.arrival}</span>
                    </div>
                  </div>
                </div>

                {/* Flight Data */}
                <div className="space-y-2">
                  <h3 className="text-slate-400 text-sm font-medium">Flight Data</h3>
                  <div className="space-y-1">
                    <div className="text-white">Alt: {flight.altitude}</div>
                    <div className="text-white">Spd: {flight.speed}</div>
                  </div>
                </div>

                {/* Aircraft Status */}
                <div className="space-y-2">
                  <h3 className="text-slate-400 text-sm font-medium">Aircraft Status</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-4 w-4 text-slate-400" />
                      <span className="text-white">{flight.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-white">{flight.passengers + flight.crew} souls</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Track on Map
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Contact Crew
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

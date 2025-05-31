
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, CheckCircle, X, Settings } from 'lucide-react';

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Weather Advisory',
      message: 'Severe turbulence reported on route JFK-LAX FL350-FL370',
      timestamp: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Flight AC002 Status Update',
      message: 'Flight AC002 has completed boarding and is ready for pushback',
      timestamp: '5 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Checklist Completed',
      message: 'Pre-flight inspection for AC001 has been completed successfully',
      timestamp: '10 minutes ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Fuel Level Warning',
      message: 'AC003 fuel levels below minimum threshold for planned route',
      timestamp: '15 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Routine maintenance scheduled for aircraft N12345 tomorrow at 08:00',
      timestamp: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 6,
      type: 'success',
      title: 'Route Optimization',
      message: 'New optimized route calculated for AC001, saving 15 minutes flight time',
      timestamp: '2 hours ago',
      read: true,
      priority: 'low'
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-white">Notification Center</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Mark All Read
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 ${
              !notification.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex space-x-3 flex-1">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-medium ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                        {notification.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(notification.priority)}`}
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className={`text-sm ${!notification.read ? 'text-slate-300' : 'text-slate-400'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500">{notification.timestamp}</p>
                  </div>
                </div>
                <div className="flex space-x-1 ml-4">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissNotification(notification.id)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No notifications</h3>
            <p className="text-slate-500">All caught up! Check back later for updates.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare, Clock, AlertTriangle, Plus } from 'lucide-react';

export const DigitalChecklists = () => {
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      title: 'Pre-Flight Inspection',
      aircraft: 'Boeing 737-800',
      status: 'In Progress',
      progress: 75,
      items: [
        { id: 1, text: 'External visual inspection', completed: true },
        { id: 2, text: 'Check fuel quantity and quality', completed: true },
        { id: 3, text: 'Verify control surface movement', completed: true },
        { id: 4, text: 'Test navigation lights', completed: false },
        { id: 5, text: 'Check tire condition and pressure', completed: false },
        { id: 6, text: 'Verify emergency equipment', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Engine Start Procedure',
      aircraft: 'Airbus A320',
      status: 'Not Started',
      progress: 0,
      items: [
        { id: 1, text: 'Set parking brake', completed: false },
        { id: 2, text: 'Check fuel pumps ON', completed: false },
        { id: 3, text: 'Engine start switch to START', completed: false },
        { id: 4, text: 'Monitor engine parameters', completed: false },
        { id: 5, text: 'Check hydraulic pressure', completed: false },
      ]
    },
    {
      id: 3,
      title: 'Landing Checklist',
      aircraft: 'Boeing 777-300',
      status: 'Completed',
      progress: 100,
      items: [
        { id: 1, text: 'Landing gear DOWN and locked', completed: true },
        { id: 2, text: 'Flaps set for landing', completed: true },
        { id: 3, text: 'Speed brake armed', completed: true },
        { id: 4, text: 'Autobrakes set', completed: true },
      ]
    }
  ]);

  const toggleItem = (checklistId: number, itemId: number) => {
    setChecklists(prev => prev.map(checklist => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map(item => 
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        const completedCount = updatedItems.filter(item => item.completed).length;
        const progress = Math.round((completedCount / updatedItems.length) * 100);
        const status = progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started';
        
        return {
          ...checklist,
          items: updatedItems,
          progress,
          status
        };
      }
      return checklist;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Digital Checklists</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Checklist
        </Button>
      </div>

      <div className="grid gap-6">
        {checklists.map((checklist) => (
          <Card key={checklist.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5 text-blue-400" />
                  <span>{checklist.title}</span>
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-sm">{checklist.aircraft}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    checklist.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    checklist.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {checklist.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      checklist.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${checklist.progress}%` }}
                  />
                </div>
                <span className="text-slate-300 text-sm">{checklist.progress}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <Checkbox
                      id={`${checklist.id}-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(checklist.id, item.id)}
                      className="border-slate-400"
                    />
                    <label
                      htmlFor={`${checklist.id}-${item.id}`}
                      className={`flex-1 cursor-pointer ${
                        item.completed ? 'text-slate-400 line-through' : 'text-white'
                      }`}
                    >
                      {item.text}
                    </label>
                    {!item.completed && checklist.status === 'In Progress' && (
                      <Clock className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Print Checklist
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Export PDF
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Share with Crew
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/components/Dashboard';
import { FlightTracker } from '@/components/FlightTracker';
import { DigitalChecklists } from '@/components/DigitalChecklists';
import { NotificationCenter } from '@/components/NotificationCenter';
import { TodoChecklist } from '@/components/TodoChecklist';

const Index = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'flight-tracker':
        return <FlightTracker />;
      case 'checklists':
        return <DigitalChecklists />;
      case 'notifications':
        return <NotificationCenter />;
      case 'todos':
        return <TodoChecklist />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Index;

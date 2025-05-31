
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ListTodo, Plus, Calendar, Tag, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export const TodoChecklist = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: 'Complete monthly safety briefing',
      completed: false,
      category: 'safety',
      priority: 'high',
      dueDate: '2024-06-01'
    },
    {
      id: 2,
      text: 'Review flight operations manual updates',
      completed: false,
      category: 'training',
      priority: 'medium',
      dueDate: '2024-06-03'
    },
    {
      id: 3,
      text: 'Submit pilot license renewal application',
      completed: true,
      category: 'certification',
      priority: 'high',
      dueDate: '2024-05-28'
    },
    {
      id: 4,
      text: 'Schedule aircraft inspection',
      completed: false,
      category: 'maintenance',
      priority: 'medium'
    },
    {
      id: 5,
      text: 'Update emergency contact information',
      completed: false,
      category: 'personal',
      priority: 'low'
    }
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'safety', label: 'Safety' },
    { value: 'training', label: 'Training' },
    { value: 'certification', label: 'Certification' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'personal', label: 'Personal' }
  ];

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        category: selectedCategory,
        priority: selectedPriority
      };
      setTodos(prev => [todo, ...prev]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      safety: 'bg-red-500/20 text-red-400',
      training: 'bg-blue-500/20 text-blue-400',
      certification: 'bg-green-500/20 text-green-400',
      maintenance: 'bg-amber-500/20 text-amber-400',
      personal: 'bg-purple-500/20 text-purple-400',
      general: 'bg-slate-500/20 text-slate-400'
    };
    return colors[category] || colors.general;
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

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-white">Todo Checklist</h1>
          <Badge className="bg-blue-500/20 text-blue-400">
            {completedCount}/{totalCount} completed
          </Badge>
        </div>
        <div className="text-slate-300">
          Progress: {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
        </div>
      </div>

      {/* Add new todo */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Task</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value} className="text-white">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setSelectedPriority(value)}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="low" className="text-white">Low</SelectItem>
                <SelectItem value="medium" className="text-white">Medium</SelectItem>
                <SelectItem value="high" className="text-white">High</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTodo} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      )}

      {/* Todo list */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-slate-400"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`cursor-pointer block ${
                      todo.completed ? 'text-slate-400 line-through' : 'text-white'
                    }`}
                  >
                    {todo.text}
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getCategoryColor(todo.category)} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {categories.find(c => c.value === todo.category)?.label}
                    </Badge>
                    <Badge className={getPriorityColor(todo.priority)} variant="outline">
                      {todo.priority}
                    </Badge>
                    {todo.dueDate && (
                      <Badge variant="outline" className="bg-slate-500/20 text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {todo.dueDate}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {todos.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8 text-center">
            <ListTodo className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No tasks yet</h3>
            <p className="text-slate-500">Add your first task to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

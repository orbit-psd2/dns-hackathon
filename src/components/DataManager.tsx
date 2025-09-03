import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, Trash2, RefreshCw } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { userDatabase } from '@/data/userDatabase';
import { storageManager } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

const DataManager: React.FC = () => {
  const { transactions } = useTransactions();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const users = userDatabase.getAllUsers();

  const exportData = () => {
    setIsExporting(true);
    try {
      const data = storageManager.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dreamnity-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data exported successfully!",
        description: "Your data has been saved to a JSON file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        storageManager.importData(data);
        
        toast({
          title: "Data imported successfully!",
          description: "Your data has been restored. Please refresh the page.",
        });
        
        // Reload the page to reflect imported data
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid data format. Please check your file.",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      storageManager.clearAllData();
      toast({
        title: "Data cleared",
        description: "All data has been cleared. Please refresh the page.",
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const lastUpdated = storageManager.getLastUpdated();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Data Management</span>
            <Badge variant="outline">
              Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage your application data and export/import functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Data Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Users</h4>
              <p className="text-2xl font-bold text-blue-700">{users.length}</p>
              <p className="text-sm text-blue-600">Registered users</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Transactions</h4>
              <p className="text-2xl font-bold text-green-700">{transactions.length}</p>
              <p className="text-sm text-green-600">Total transactions</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Completed</h4>
              <p className="text-2xl font-bold text-purple-700">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-purple-600">Completed payments</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={exportData} 
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
            
            <Button 
              variant="outline" 
              disabled={isImporting}
              className="flex items-center gap-2"
              onClick={() => document.getElementById('import-file')?.click()}
            >
              <Upload className="h-4 w-4" />
              {isImporting ? 'Importing...' : 'Import Data'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={clearAllData}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All Data
            </Button>
          </div>

          {/* Hidden file input for import */}
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={importData}
            style={{ display: 'none' }}
          />

          {/* Storage Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Storage Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Data is stored in your browser's localStorage</p>
              <p>• Data persists across browser sessions</p>
              <p>• Export your data to backup or transfer to another device</p>
              <p>• Import data to restore from a backup</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManager;

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
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center justify-between text-2xl">
            <span className="flex items-center space-x-2">
              <span>Data Management</span>
              <Badge variant="secondary" className="ml-2">System</Badge>
            </span>
            <Badge variant="outline" className="text-sm">
              Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
            </Badge>
          </CardTitle>
          <CardDescription className="text-base">
            Manage your application data, export/import functionality, and system information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {/* Data Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
              <h4 className="font-semibold text-blue-900 text-lg">Users</h4>
              <p className="text-3xl font-bold text-blue-700 mt-2">{users.length}</p>
              <p className="text-sm text-blue-600 mt-1">Registered users</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
              <h4 className="font-semibold text-green-900 text-lg">Transactions</h4>
              <p className="text-3xl font-bold text-green-700 mt-2">{transactions.length}</p>
              <p className="text-sm text-green-600 mt-1">Total transactions</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-sm">
              <h4 className="font-semibold text-purple-900 text-lg">Completed</h4>
              <p className="text-3xl font-bold text-purple-700 mt-2">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-purple-600 mt-1">Completed payments</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={exportData} 
                disabled={isExporting}
                className="flex items-center gap-2 h-12 text-base"
                size="lg"
              >
                <Download className="h-5 w-5" />
                {isExporting ? 'Exporting...' : 'Export Data'}
              </Button>
              
              <Button 
                variant="outline" 
                disabled={isImporting}
                className="flex items-center gap-2 h-12 text-base"
                size="lg"
                onClick={() => document.getElementById('import-file')?.click()}
              >
                <Upload className="h-5 w-5" />
                {isImporting ? 'Importing...' : 'Import Data'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 h-12 text-base"
                size="lg"
              >
                <RefreshCw className="h-5 w-5" />
                Refresh
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={clearAllData}
                className="flex items-center gap-2 h-12 text-base"
                size="lg"
              >
                <Trash2 className="h-5 w-5" />
                Clear All Data
              </Button>
            </div>
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
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Storage Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Data is stored in your browser's localStorage
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Data persists across browser sessions
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Export your data to backup or transfer to another device
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Import data to restore from a backup
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManager;

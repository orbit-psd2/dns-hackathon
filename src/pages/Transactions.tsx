import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '@/data/mockData';
import { useTransactions } from '@/contexts/TransactionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Copy, ExternalLink, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentReceiptModal from '@/components/PaymentReceiptModal';

const Transactions: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const { toast } = useToast();
  const { transactions, getTransactionsByStatus, updateTransactionStatus } = useTransactions();

  // Simulate dynamic status updates
  useEffect(() => {
    const interval = setInterval(() => {
      transactions.forEach(transaction => {
        if (transaction.status === 'pending' && Math.random() > 0.7) {
          updateTransactionStatus(transaction.id, 'completed');
        }
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [transactions, updateTransactionStatus]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} has been copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon(transaction.status)}
          <div>
            <h3 className="font-semibold text-gray-900">{transaction.clientName}</h3>
            <p className="text-sm text-gray-600">{transaction.description}</p>
          </div>
        </div>
        {getStatusBadge(transaction.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Amount</p>
          <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
          <p className="text-sm text-gray-500">₹{transaction.amountInr.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Date</p>
          <p className="font-medium">{new Date(transaction.createdAt).toLocaleDateString()}</p>
          {transaction.completedAt && (
            <p className="text-sm text-green-600">Completed: {new Date(transaction.completedAt).toLocaleDateString()}</p>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600">Actions</p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(transaction.razorpayLink, 'Payment Link')}
            >
              <Copy className="h-3 w-3 mr-1" />
              Link
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(transaction.razorpayLink, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedTransaction(transaction);
                setIsReceiptModalOpen(true);
              }}
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const pendingTransactions = getTransactionsByStatus('pending');
  const completedTransactions = getTransactionsByStatus('completed');

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
          <p className="text-gray-600">
            Track all your payment transactions and their blockchain records
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Transactions ({transactions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingTransactions.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTransactions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions</h3>
                  <p className="text-gray-600">You haven't created any payment links yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingTransactions.length > 0 ? (
              pendingTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Transactions</h3>
                  <p className="text-gray-600">All your transactions have been completed!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTransactions.length > 0 ? (
              completedTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Completed Transactions</h3>
                  <p className="text-gray-600">Your completed transactions will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Payment Receipt Modal */}
        <PaymentReceiptModal
          transaction={selectedTransaction}
          isOpen={isReceiptModalOpen}
          onClose={() => {
            setIsReceiptModalOpen(false);
            setSelectedTransaction(null);
          }}
        />
      </div>
    </div>
  );
};

export default Transactions;

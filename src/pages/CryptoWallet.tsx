import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockWalletTransactions, WalletTransaction, USDT_TO_INR_RATE } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, ArrowRightLeft, Send, History, CheckCircle, Clock, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CryptoWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [amountUsdt, setAmountUsdt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(mockWalletTransactions);
  const { toast } = useToast();

  const amountInr = parseFloat(amountUsdt) * USDT_TO_INR_RATE || 0;

  const handleSendToInrWallet = async () => {
    if (!walletAddress || !amountUsdt) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Add new transaction
    const newTransaction: WalletTransaction = {
      id: Date.now().toString(),
      walletAddress,
      amountUsdt: parseFloat(amountUsdt),
      amountInr: amountInr,
      status: 'completed',
      transactionHash: generateRandomHash(),
      createdAt: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setIsProcessing(false);

    toast({
      title: "Transaction Successful!",
      description: `Successfully converted ${amountUsdt} USDT to ₹${amountInr.toLocaleString()}`,
    });

    // Reset form
    setWalletAddress('');
    setAmountUsdt('');
  };

  const generateRandomHash = (): string => {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

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
    return status === 'completed' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <Clock className="h-4 w-4 text-orange-500" />
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'completed' ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800 border-orange-200">Pending</Badge>
    );
  };

  const totalUsdt = transactions.reduce((sum, tx) => sum + tx.amountUsdt, 0);
  const totalInr = transactions.reduce((sum, tx) => sum + tx.amountInr, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto Wallet</h1>
          <p className="text-gray-600">
            Manage your cryptocurrency assets and convert USDT to INR
          </p>
        </motion.div>

        {/* Wallet Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total USDT Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalUsdt.toFixed(2)} USDT
              </div>
              <p className="text-sm text-gray-600">
                Current conversion rate: 1 USDT = ₹{USDT_TO_INR_RATE}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total INR Converted
              </CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ₹{totalInr.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                All time conversions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Transactions
              </CardTitle>
              <History className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {transactions.length}
              </div>
              <p className="text-sm text-gray-600">
                Conversion transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="convert" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="convert">Convert to INR</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="convert" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5 text-blue-600" />
                    <span>Send to INR Wallet</span>
                  </CardTitle>
                  <CardDescription>
                    Convert your USDT to INR and send to your bank account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Your Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      placeholder="0x1234567890abcdef..."
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <p className="text-sm text-gray-600">
                      Enter your USDT wallet address
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USDT)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amountUsdt}
                      onChange={(e) => setAmountUsdt(e.target.value)}
                    />
                    {amountUsdt && (
                      <p className="text-sm text-gray-600">
                        ≈ ₹{amountInr.toLocaleString()} (Rate: 1 USDT = ₹{USDT_TO_INR_RATE})
                      </p>
                    )}
                  </div>

                  {amountUsdt && (
                    <Alert>
                      <AlertDescription>
                        <div className="space-y-2">
                          <p className="font-medium">Conversion Summary:</p>
                          <div className="flex justify-between">
                            <span>Amount (USDT):</span>
                            <span className="font-medium">{amountUsdt} USDT</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount (INR):</span>
                            <span className="font-medium">₹{amountInr.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conversion Rate:</span>
                            <span className="font-medium">1 USDT = ₹{USDT_TO_INR_RATE}</span>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleSendToInrWallet}
                    disabled={isProcessing || !walletAddress || !amountUsdt}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Transaction...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send to INR Wallet
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(transaction.status)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                USDT to INR Conversion
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(transaction.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Amount (USDT)</p>
                            <p className="font-semibold">{transaction.amountUsdt} USDT</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Amount (INR)</p>
                            <p className="font-semibold">₹{transaction.amountInr.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Wallet Address</p>
                            <p className="font-mono text-xs text-gray-700">
                              {transaction.walletAddress.slice(0, 10)}...{transaction.walletAddress.slice(-8)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Transaction Hash</p>
                          <div className="flex items-center space-x-2">
                            <code className="text-xs bg-gray-100 p-2 rounded flex-1 font-mono">
                              {transaction.transactionHash}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(transaction.transactionHash, 'Transaction Hash')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`https://etherscan.io/tx/${transaction.transactionHash}`, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions</h3>
                    <p className="text-gray-600">Your conversion history will appear here.</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoWallet;

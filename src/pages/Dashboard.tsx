
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, DollarSign, Clock, Wallet } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { transactions } = useTransactions();

  // Calculate balance cards from actual transactions
  const calculateBalanceCards = () => {
    const pendingTransactions = transactions.filter(t => t.status === 'pending');
    const completedTransactions = transactions.filter(t => t.status === 'completed');
    
    const pendingAmount = pendingTransactions.reduce((sum, t) => sum + t.amount, 0);
    const completedAmount = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate crypto wallet balance (completed payments converted to INR)
    const cryptoWalletBalance = completedTransactions.reduce((sum, t) => sum + t.amountInr, 0);
    
    return [
      {
        title: 'Pending Payments',
        amount: pendingAmount,
        currency: 'USD',
        change: pendingTransactions.length > 0 ? 12.5 : 0,
        changeType: 'increase' as const
      },
      {
        title: 'Completed Payments',
        amount: completedAmount,
        currency: 'USD',
        change: completedTransactions.length > 0 ? 8.2 : 0,
        changeType: 'increase' as const
      },
      {
        title: 'Crypto Wallet Balance',
        amount: cryptoWalletBalance,
        currency: 'INR',
        change: completedTransactions.length > 0 ? -2.1 : 0,
        changeType: 'decrease' as const
      }
    ];
  };

  const balanceCards = calculateBalanceCards();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your freelance payment activity
          </p>
        </motion.div>

        {/* User Profile Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="secondary">
                      Member since {new Date(user?.joinedDate || '').toLocaleDateString()}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Balance Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
                     {balanceCards.map((card, index) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  {card.title === 'Pending Payments' && <Clock className="h-4 w-4 text-orange-500" />}
                  {card.title === 'Completed Payments' && <DollarSign className="h-4 w-4 text-green-500" />}
                  {card.title === 'Crypto Wallet Balance' && <Wallet className="h-4 w-4 text-blue-500" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {card.currency === 'USD' ? '$' : '₹'}{card.amount.toLocaleString()}
                  </div>
                  {card.change && (
                    <div className="flex items-center space-x-1 mt-1">
                      {card.changeType === 'increase' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        card.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {card.change}% from last month
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigate('/create-payment')}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <DollarSign className="h-6 w-6 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create Payment Link</h3>
              <p className="text-sm text-gray-600">Generate a new payment request for clients</p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigate('/transactions')}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Transactions</h3>
              <p className="text-sm text-gray-600">Track all your payment history</p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigate('/wallet')}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Wallet className="h-6 w-6 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Crypto Wallet</h3>
              <p className="text-sm text-gray-600">Manage your crypto assets</p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigate('/settlement')}
          >
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-orange-100 rounded-full w-12 h-12 mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Clock className="h-6 w-6 text-orange-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settlement</h3>
              <p className="text-sm text-gray-600">Configure same-day settlement</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

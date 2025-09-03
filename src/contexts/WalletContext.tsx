import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletTransaction } from '@/data/mockData';

interface WalletContextType {
  // Wallet Settings
  initialUsdtBalance: string;
  conversionRate: string;
  setInitialUsdtBalance: (balance: string) => void;
  setConversionRate: (rate: string) => void;
  
  // Transactions
  transactions: WalletTransaction[];
  addTransaction: (transaction: WalletTransaction) => void;
  clearTransactions: () => void;
  
  // Calculated values
  totalUsdt: number;
  totalInr: number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [initialUsdtBalance, setInitialUsdtBalanceState] = useState<string>('');
  const [conversionRate, setConversionRateState] = useState<string>('83.00');
  const [transactions, setTransactionsState] = useState<WalletTransaction[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('wallet_initial_balance');
    const savedRate = localStorage.getItem('wallet_conversion_rate');
    const savedTransactions = localStorage.getItem('wallet_transactions');

    if (savedBalance) {
      setInitialUsdtBalanceState(savedBalance);
    }
    if (savedRate) {
      setConversionRateState(savedRate);
    }
    if (savedTransactions) {
      try {
        setTransactionsState(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Error parsing saved transactions:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('wallet_initial_balance', initialUsdtBalance);
  }, [initialUsdtBalance]);

  useEffect(() => {
    localStorage.setItem('wallet_conversion_rate', conversionRate);
  }, [conversionRate]);

  useEffect(() => {
    localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const setInitialUsdtBalance = (balance: string) => {
    setInitialUsdtBalanceState(balance);
  };

  const setConversionRate = (rate: string) => {
    setConversionRateState(rate);
  };

  const addTransaction = (transaction: WalletTransaction) => {
    setTransactionsState(prev => [transaction, ...prev]);
  };

  const clearTransactions = () => {
    setTransactionsState([]);
  };

  // Calculated values
  const totalUsdt = parseFloat(initialUsdtBalance) || 0;
  const totalInr = transactions.reduce((sum, tx) => sum + tx.amountInr, 0);

  const value: WalletContextType = {
    initialUsdtBalance,
    conversionRate,
    setInitialUsdtBalance,
    setConversionRate,
    transactions,
    addTransaction,
    clearTransactions,
    totalUsdt,
    totalInr,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

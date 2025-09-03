import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction } from '@/data/mockData';
import { storageManager } from '@/utils/storage';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransactionStatus: (id: string, status: 'pending' | 'completed') => void;
  getTransactionsByStatus: (status: 'pending' | 'completed' | 'all') => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from storage on component mount
  useEffect(() => {
    const savedTransactions = storageManager.loadTransactions();
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setTransactions(prev => {
      const updatedTransactions = [newTransaction, ...prev];
      storageManager.saveTransactions(updatedTransactions);
      return updatedTransactions;
    });
  };

  const updateTransactionStatus = (id: string, status: 'pending' | 'completed') => {
    setTransactions(prev => {
      const updatedTransactions = prev.map(transaction => 
        transaction.id === id 
          ? { 
              ...transaction, 
              status, 
              completedAt: status === 'completed' ? new Date().toISOString() : undefined 
            }
          : transaction
      );
      storageManager.saveTransactions(updatedTransactions);
      return updatedTransactions;
    });
  };

  const getTransactionsByStatus = (status: 'pending' | 'completed' | 'all') => {
    if (status === 'all') return transactions;
    return transactions.filter(transaction => transaction.status === status);
  };

  const value: TransactionContextType = {
    transactions,
    addTransaction,
    updateTransactionStatus,
    getTransactionsByStatus,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

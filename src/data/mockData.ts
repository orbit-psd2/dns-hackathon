// Mock data for Dreamnity platform

export interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  avatar?: string;
}

export interface BalanceCard {
  title: string;
  amount: number;
  currency: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export interface Transaction {
  id: string;
  clientName: string;
  amount: number;
  amountInr: number;
  status: 'pending' | 'completed';
  razorpayLink: string;
  blockchainHash: string;
  ipfsCid: string;
  description: string;
  createdAt: string;
  completedAt?: string;
}

export interface CryptoECard {
  id: string;
  name: string;
  image: string;
  priceUsdt: number;
  priceInr: number;
  category: string;
  description: string;
}

export interface WalletTransaction {
  id: string;
  walletAddress: string;
  amountUsdt: number;
  amountInr: number;
  status: 'pending' | 'completed';
  transactionHash: string;
  createdAt: string;
}

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinedDate: '2024-01-15',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
};

// Mock balance cards
export const mockBalanceCards: BalanceCard[] = [
  {
    title: 'Pending Payments',
    amount: 2450.00,
    currency: 'USD',
    change: 12.5,
    changeType: 'increase'
  },
  {
    title: 'Completed Payments',
    amount: 12850.00,
    currency: 'USD',
    change: 8.2,
    changeType: 'increase'
  },
  {
    title: 'Crypto Wallet Balance',
    amount: 101675.00,
    currency: 'INR',
    change: -2.1,
    changeType: 'decrease'
  }
];

// Mock transactions - Start with empty array, transactions will be added dynamically
export const mockTransactions: Transaction[] = [];

// Mock crypto e-cards
export const mockCryptoECards: CryptoECard[] = [
  {
    id: '1',
    name: 'Amazon Gift Card',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&h=200&fit=crop',
    priceUsdt: 50.00,
    priceInr: 4150.00,
    category: 'Shopping',
    description: 'Perfect for online shopping on Amazon'
  },
  {
    id: '2',
    name: 'Netflix Premium',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=200&fit=crop',
    priceUsdt: 15.99,
    priceInr: 1327.17,
    category: 'Entertainment',
    description: 'One month of Netflix Premium subscription'
  },
  {
    id: '3',
    name: 'Steam Wallet',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=300&h=200&fit=crop',
    priceUsdt: 25.00,
    priceInr: 2075.00,
    category: 'Gaming',
    description: 'Digital wallet for Steam games and software'
  },
  {
    id: '4',
    name: 'Spotify Premium',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
    priceUsdt: 9.99,
    priceInr: 829.17,
    category: 'Music',
    description: 'One month of ad-free music streaming'
  },
  {
    id: '5',
    name: 'Uber Credits',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
    priceUsdt: 30.00,
    priceInr: 2490.00,
    category: 'Transport',
    description: 'Ride credits for Uber services'
  },
  {
    id: '6',
    name: 'Google Play Store',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
    priceUsdt: 20.00,
    priceInr: 1660.00,
    category: 'Apps',
    description: 'Credit for apps and games on Google Play'
  }
];

// Mock wallet transactions
export const mockWalletTransactions: WalletTransaction[] = [
  {
    id: '1',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    amountUsdt: 100.00,
    amountInr: 8300.00,
    status: 'completed',
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
    amountUsdt: 50.00,
    amountInr: 4150.00,
    status: 'pending',
    transactionHash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
    createdAt: '2024-01-22T14:20:00Z'
  }
];

// Mock conversion rate
export const USDT_TO_INR_RATE = 83.00;

// Utility functions
export const generateRandomHash = (): string => {
  const chars = '0123456789abcdef';
  let result = '0x';
  for (let i = 0; i < 64; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const generateRandomIPFSCid = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'Qm';
  for (let i = 0; i < 44; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const generateMockRazorpayLink = (): string => {
  const randomId = Math.random().toString(36).substring(2, 8);
  return `https://rzp.io/i/mock${randomId}`;
};

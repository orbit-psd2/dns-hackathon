// Storage utility for persistent data using localStorage as fallback
// In a real app, this would use a backend API, but for demo purposes we'll use localStorage

export interface StorageData {
  users: Map<string, any>;
  transactions: any[];
  lastUpdated: string;
}

class StorageManager {
  private readonly USERS_KEY = 'dreamnity_users';
  private readonly TRANSACTIONS_KEY = 'dreamnity_transactions';
  private readonly LAST_UPDATED_KEY = 'dreamnity_last_updated';

  // Save users to localStorage
  saveUsers(users: Map<string, any>): void {
    try {
      const usersArray = Array.from(users.entries());
      localStorage.setItem(this.USERS_KEY, JSON.stringify(usersArray));
      this.updateLastUpdated();
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  // Load users from localStorage
  loadUsers(): Map<string, any> {
    try {
      const usersData = localStorage.getItem(this.USERS_KEY);
      if (usersData) {
        const usersArray = JSON.parse(usersData);
        return new Map(usersArray);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
    return new Map();
  }

  // Save transactions to localStorage
  saveTransactions(transactions: any[]): void {
    try {
      localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(transactions));
      this.updateLastUpdated();
    } catch (error) {
      console.error('Failed to save transactions:', error);
    }
  }

  // Load transactions from localStorage
  loadTransactions(): any[] {
    try {
      const transactionsData = localStorage.getItem(this.TRANSACTIONS_KEY);
      if (transactionsData) {
        return JSON.parse(transactionsData);
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
    return [];
  }

  // Get last updated timestamp
  getLastUpdated(): string | null {
    return localStorage.getItem(this.LAST_UPDATED_KEY);
  }

  // Update last updated timestamp
  private updateLastUpdated(): void {
    localStorage.setItem(this.LAST_UPDATED_KEY, new Date().toISOString());
  }

  // Clear all data (for testing/reset)
  clearAllData(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.TRANSACTIONS_KEY);
    localStorage.removeItem(this.LAST_UPDATED_KEY);
  }

  // Export data as JSON (for backup)
  exportData(): StorageData {
    return {
      users: this.loadUsers(),
      transactions: this.loadTransactions(),
      lastUpdated: this.getLastUpdated() || new Date().toISOString()
    };
  }

  // Import data from JSON (for restore)
  importData(data: StorageData): void {
    if (data.users) {
      this.saveUsers(data.users);
    }
    if (data.transactions) {
      this.saveTransactions(data.transactions);
    }
  }
}

export const storageManager = new StorageManager();

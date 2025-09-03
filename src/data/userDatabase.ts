// Local user database for Dreamnity platform

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountNo: string;
  ifscCode: string;
  password: string;
  joinedDate: string;
  avatar?: string;
}

// In-memory database (in a real app, this would be a proper database)
let users: UserDetails[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'demo@dreamnity.com',
    phone: '+91 98765 43210',
    accountNo: '1234567890',
    ifscCode: 'SBIN0001234',
    password: 'password',
    joinedDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
];

// Load users from localStorage on initialization
const loadUsers = (): UserDetails[] => {
  try {
    const stored = localStorage.getItem('dreamnity_users');
    if (stored) {
      users = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
  }
  return users;
};

// Save users to localStorage
const saveUsers = (): void => {
  try {
    localStorage.setItem('dreamnity_users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

// Initialize users from localStorage
loadUsers();

export const userDatabase = {
  // Get all users
  getAllUsers: (): UserDetails[] => {
    return users;
  },

  // Get user by email
  getUserByEmail: (email: string): UserDetails | undefined => {
    return users.find(user => user.email === email);
  },

  // Get user by ID
  getUserById: (id: string): UserDetails | undefined => {
    return users.find(user => user.id === id);
  },

  // Create new user
  createUser: (userData: Omit<UserDetails, 'id' | 'joinedDate'>): UserDetails => {
    const newUser: UserDetails = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split('T')[0],
    };
    
    users.push(newUser);
    saveUsers();
    return newUser;
  },

  // Update user
  updateUser: (id: string, updates: Partial<Omit<UserDetails, 'id' | 'joinedDate'>>): UserDetails | null => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers();
    return users[userIndex];
  },

  // Delete user
  deleteUser: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    saveUsers();
    return true;
  },

  // Authenticate user
  authenticateUser: (email: string, password: string): UserDetails | null => {
    const user = users.find(user => user.email === email && user.password === password);
    return user || null;
  },

  // Check if email exists
  emailExists: (email: string): boolean => {
    return users.some(user => user.email === email);
  }
};

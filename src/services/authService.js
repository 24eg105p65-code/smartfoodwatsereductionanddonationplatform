import { initialUsers } from '../data/mockData';

export const authService = {
  getUsers: () => {
    const users = localStorage.getItem('sfr_users');
    if (!users) {
      localStorage.setItem('sfr_users', JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(users);
  },

  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    const users = authService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('User not found with this email.');
    }
    // In demo mode, any password works for demo accounts
    localStorage.setItem('sfr_current_user', JSON.stringify(user));
    return user;
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const users = authService.getUsers();
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Email is already registered.');
    }
    const newUser = {
      id: 'u_' + Date.now(),
      ...userData,
      status: 'Active'
    };
    users.push(newUser);
    localStorage.setItem('sfr_users', JSON.stringify(users));
    localStorage.setItem('sfr_current_user', JSON.stringify(newUser));
    return newUser;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('sfr_current_user');
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem('sfr_current_user');
  },

  resetDemoUsers: () => {
    localStorage.setItem('sfr_users', JSON.stringify(initialUsers));
  }
};

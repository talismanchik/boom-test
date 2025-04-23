import { create } from 'zustand';
import { User, AuditLog, AppState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const useStore = create<AppState & {
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (userId: string, updates: Partial<User>, oldUser: User) => void;
  deleteUser: (userId: string) => void;
}>((set) => ({
  users: [
    {
      id: '1',
      name: 'Иванов Иван',
      email: 'ivanov@example.com',
      role: 'Администратор' as const,
      accessLevel: 5,
    },
    {
      id: '2',
      name: 'Петров Петр',
      email: 'petrov@example.com',
      role: 'Аналитик' as const,
      accessLevel: 3,
    },
    {
      id: '3',
      name: 'Сидорова Анна',
      email: 'sidorova@example.com',
      role: 'Оператор' as const,
      accessLevel: 2,
    },
  ],
  auditLogs: [],
  auth: {
    isAuthenticated: false,
    user: null,
  },

  login: (email: string, password: string) => {
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Иванов Иван',
        email: 'admin@example.com',
        role: 'Администратор',
        accessLevel: 5,
      };
      set({ auth: { isAuthenticated: true, user: adminUser } });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ auth: { isAuthenticated: false, user: null } });
  },

  updateUser: (userId: string, updates: Partial<User>, oldUser: User) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      );
      const updatedUser = updatedUsers.find((u) => u.id === userId);
      
      if (updatedUser) {
        const newLogs: AuditLog[] = [];
        
        if (updates.role && updates.role !== oldUser.role) {
          newLogs.push({
            id: uuidv4(),
            userId: state.auth.user?.id || 'system',
            action: 'UPDATE_USER_ROLE',
            timestamp: new Date(),
            details: `Роль пользователя ${updatedUser.name} изменена с "${oldUser.role}" на "${updates.role}"`,
          });
        }
        
        if (updates.accessLevel && updates.accessLevel !== oldUser.accessLevel) {
          newLogs.push({
            id: uuidv4(),
            userId: state.auth.user?.id || 'system',
            action: 'UPDATE_USER_ACCESS',
            timestamp: new Date(),
            details: `Уровень доступа пользователя ${updatedUser.name} изменен с ${oldUser.accessLevel} на ${updates.accessLevel}`,
          });
        }
        
        return {
          users: updatedUsers,
          auditLogs: [...state.auditLogs, ...newLogs],
        };
      }
      
      return { users: updatedUsers };
    });
  },

  deleteUser: (userId: string) => {
    set((state) => {
      const userToDelete = state.users.find((u) => u.id === userId);
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      
      if (userToDelete) {
        const log: AuditLog = {
          id: uuidv4(),
          userId: state.auth.user?.id || 'system',
          action: 'DELETE_USER',
          timestamp: new Date(),
          details: `Удален пользователь ${userToDelete.name}`,
        };
        
        return {
          users: updatedUsers,
          auditLogs: [...state.auditLogs, log],
        };
      }
      
      return { users: updatedUsers };
    });
  },
}));

export default useStore; 
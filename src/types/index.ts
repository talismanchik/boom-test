export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Аналитик' | 'Оператор' | 'Администратор';
  accessLevel: 1 | 2 | 3 | 4 | 5;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  details: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AppState {
  users: User[];
  auditLogs: AuditLog[];
  auth: AuthState;
} 
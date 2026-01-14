// =============================================
// 🔐 AUTH SERVICE - Usando Mock API
// =============================================
import mockApi from './mockApi';
import storage from './storage.service';
import { LoginRequest, RegisterRequest, AuthResponse, Usuario } from '../types/auth.types';

export const authService = {
  // Login con Mock API
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await mockApi.login(credentials.email, credentials.password);
    return {
      status: response.status,
      message: 'Login exitoso',
      data: {
        token: response.data.token,
        usuario: {
          ...response.data.usuario,
          rol: 'CLIENTE',
          tipo_usuario: 'CLIENTE'
        } as Usuario
      }
    };
  },

  // Registro con Mock API
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await mockApi.register({
      email: data.usuario.email,
      password: data.usuario.password,
      nombre: data.cliente.nombre1,
      apellido: data.cliente.apellido1
    });
    return {
      status: response.status,
      message: 'Registro exitoso',
      data: {
        token: response.data.token,
        usuario: {
          ...response.data.usuario,
          rol: 'CLIENTE',
          tipo_usuario: 'CLIENTE'
        } as Usuario
      }
    };
  },

  // Verificar sesión
  async verifySession(): Promise<boolean> {
    try {
      const response = await mockApi.verifySession();
      return response.status === 'success';
    } catch (error) {
      this.logout();
      return false;
    }
  },

  // Logout
  logout(): void {
    storage.clearSession();
    localStorage.removeItem('barbox_token');
    localStorage.removeItem('barbox_user');
  },

  // Obtener usuario actual
  getCurrentUser(): Usuario | null {
    const userStr = localStorage.getItem('barbox_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('barbox_token');
  },
};

// =============================================
// ⭐ SERVICIO DE FAVORITOS - Usando Mock API
// =============================================
import mockApi from './mockApi';
import storage from './storage.service';
import { Favorito } from '../types/catalogo.types';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export const favoritosService = {
  /**
   * Obtener favoritos del usuario
   */
  async obtenerFavoritos(usuarioId: number): Promise<Favorito[]> {
    const response = await mockApi.getFavoritos();
    // Convertir productos a formato Favorito
    return (response.data || []).map((producto: any, index: number) => ({
      id_favorito: index + 1,
      id_usuario: usuarioId,
      id_producto: producto.id_producto,
      fecha_creacion: new Date().toISOString(),
      estado: 'activo',
      producto
    }));
  },

  /**
   * Agregar producto a favoritos
   */
  async agregarFavorito(usuarioId: number, productoId: string): Promise<Favorito> {
    await mockApi.addFavorito(productoId);
    return {
      id_favorito: Date.now(),
      id_usuario: usuarioId,
      id_producto: productoId,
      fecha_creacion: new Date().toISOString(),
      estado: 'activo'
    };
  },

  /**
   * Eliminar producto de favoritos por ID de favorito
   */
  async eliminarFavorito(id_favorito: number): Promise<void> {
    // Para mock, necesitamos el id_producto
    // Este método ya no se usa directamente, se usa eliminarPorProducto
  },
  
  /**
   * Eliminar producto de favoritos por ID de producto
   */
  async eliminarPorProducto(productoId: string): Promise<void> {
    await mockApi.removeFavorito(productoId);
  },
  
  /**
   * Toggle favorito
   */
  async toggleFavorito(productoId: string): Promise<boolean> {
    const response = await mockApi.toggleFavorito(productoId);
    return response.data.isFavorito;
  },
  
  /**
   * Verificar si es favorito
   */
  async esFavorito(productoId: string): Promise<boolean> {
    return await storage.isFavorito(productoId);
  }
};

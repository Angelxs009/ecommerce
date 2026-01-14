// =============================================
// 🛒 SERVICIO DE CARRITO - Usando Mock API
// =============================================
import mockApi from './mockApi';
import storage from './storage.service';

export interface CarritoDetalle {
  id_carrito: string;
  id_producto: string;
  cantidad: number;
  precio_referencial: number;
  subtotal: number;
  fecha_agregado: string;
  producto: {
    id_producto: string;
    descripcion: string;
    precio_venta: number;
    imagen_url: string | null;
    saldo_actual: number;
    estado: string;
    marca?: {
      id_marca: number;
      nombre: string;
    };
  };
  disponible?: boolean;
  stock_disponible?: number;
}

export interface Carrito {
  id_carrito: string;
  id_usuario: number;
  id_canal: string;
  estado: string;
  subtotal: number;
  descuento: number;
  total: number;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
  carrito_detalle: CarritoDetalle[];
  usuario?: {
    id_usuario: number;
    email: string;
  };
  canal_venta?: {
    id_canal: string;
    descripcion: string;
  };
  cantidad_items?: number;
  total_productos?: number;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export const carritoService = {
  /**
   * Obtener carrito del usuario
   */
  async obtenerCarrito(usuarioId: number): Promise<Carrito | null> {
    const response = await mockApi.getCarrito(usuarioId);
    const carritoData = response.data;
    
    if (!carritoData || !carritoData.items || carritoData.items.length === 0) {
      return null;
    }
    
    // Convertir formato mock a formato esperado
    return {
      id_carrito: carritoData.id_carrito || 'CART-MOCK',
      id_usuario: usuarioId,
      id_canal: 'WEB',
      estado: 'activo',
      subtotal: carritoData.total || 0,
      descuento: 0,
      total: carritoData.total || 0,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: carritoData.fecha_actualizacion || null,
      carrito_detalle: (carritoData.items || []).map((item: any) => ({
        id_carrito: carritoData.id_carrito,
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_referencial: item.precio_unitario,
        subtotal: item.subtotal,
        fecha_agregado: new Date().toISOString(),
        producto: item.producto
      })),
      cantidad_items: carritoData.cantidad_items || 0,
      total_productos: carritoData.items?.length || 0
    };
  },

  /**
   * Obtener carrito por id
   */
  async obtenerCarritoPorId(id_carrito: string): Promise<Carrito | null> {
    return this.obtenerCarrito(0);
  },

  /**
   * Crear carrito nuevo
   */
  async crearCarrito(usuarioId: number, id_canal: string = 'WEB'): Promise<Carrito> {
    await storage.clearCarrito();
    return {
      id_carrito: `CART-${Date.now()}`,
      id_usuario: usuarioId,
      id_canal,
      estado: 'activo',
      subtotal: 0,
      descuento: 0,
      total: 0,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: null,
      carrito_detalle: [],
      cantidad_items: 0,
      total_productos: 0
    };
  },

  /**
   * Agregar producto al carrito
   */
  async agregarProducto(
    id_carrito: string,
    id_producto: string,
    cantidad: number = 1,
    precio_referencial?: number
  ): Promise<Carrito> {
    const response = await mockApi.addToCarrito(id_producto, cantidad);
    return this.obtenerCarrito(0) as Promise<Carrito>;
  },

  /**
   * Actualizar cantidad de producto
   */
  async actualizarCantidad(
    id_carrito: string,
    id_producto: string,
    cantidad: number
  ): Promise<Carrito> {
    await mockApi.updateCarritoItem(id_producto, cantidad);
    return this.obtenerCarrito(0) as Promise<Carrito>;
  },

  /**
   * Eliminar producto del carrito
   */
  async eliminarProducto(
    id_carrito: string,
    id_producto: string
  ): Promise<Carrito> {
    await mockApi.removeFromCarrito(id_producto);
    return this.obtenerCarrito(0) as Promise<Carrito>;
  },

  /**
   * Vaciar carrito completo
   */
  async vaciarCarrito(id_carrito: string): Promise<Carrito> {
    await mockApi.clearCarrito();
    return this.crearCarrito(0);
  }
};

// =============================================
// 🔌 MOCK API - Simula un backend real
// =============================================

import { 
  MOCK_PRODUCTOS, 
  MOCK_MARCAS, 
  MOCK_CATEGORIAS, 
  MOCK_USUARIOS,
  MOCK_PROMOCIONES,
  getProductoById,
  getProductosByCategoria,
  getProductosByMarca,
  buscarProductos,
  getProductosEnPromocion,
  MockProducto
} from './mockData';
import storage from './storage.service';

// Simulador de delay de red (más realista)
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms + Math.random() * 200));

// Generar IDs únicos
const generateId = (prefix: string = 'ID') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ==================== MOCK API ====================
export const mockApi = {
  // ==================== AUTH ====================
  async login(email: string, password: string) {
    await delay(500);
    
    const user = MOCK_USUARIOS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw { response: { status: 401, data: { message: 'Usuario no encontrado' } } };
    }
    
    if (user.password !== password) {
      throw { response: { status: 401, data: { message: 'Contraseña incorrecta' } } };
    }

    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
    const { password: _, ...userWithoutPassword } = user;
    
    await storage.saveSession(token, userWithoutPassword);
    
    return {
      status: 'success',
      data: {
        token,
        usuario: userWithoutPassword
      }
    };
  },

  async register(data: { email: string; password: string; nombre: string; apellido: string }) {
    await delay(500);
    
    // Verificar si el email ya existe
    const existingUser = MOCK_USUARIOS.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
      throw { response: { status: 400, data: { message: 'El email ya está registrado' } } };
    }

    const newUser = {
      id_usuario: MOCK_USUARIOS.length + 1 + Date.now(),
      email: data.email,
      password: data.password,
      nombre: data.nombre,
      apellido: data.apellido
    };

    // Agregar a usuarios registrados (en storage)
    const registeredUsers = await storage.get<any[]>('registered_users', []) || [];
    registeredUsers.push(newUser);
    await storage.set('registered_users', registeredUsers);

    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
    const { password: _, ...userWithoutPassword } = newUser;
    
    await storage.saveSession(token, userWithoutPassword);

    return {
      status: 'success',
      data: {
        token,
        usuario: userWithoutPassword
      }
    };
  },

  async verifySession() {
    await delay(200);
    const { token, user } = await storage.getSession();
    
    if (token && user) {
      return { status: 'success', data: user };
    }
    
    throw { response: { status: 401 } };
  },

  async logout() {
    await storage.clearSession();
    return { status: 'success' };
  },

  // ==================== PRODUCTOS ====================
  async getProductos(params: {
    busqueda?: string;
    id_categoria?: number;
    id_marca?: number;
    limite?: number;
    pagina?: number;
    orden?: string;
    precioMin?: number;
    precioMax?: number;
  } = {}) {
    await delay();
    
    let productos: MockProducto[] = [...MOCK_PRODUCTOS];
    
    // Filtrar por búsqueda
    if (params.busqueda) {
      productos = buscarProductos(params.busqueda);
    }
    
    // Filtrar por categoría
    if (params.id_categoria) {
      productos = productos.filter(p => p.id_categoria === params.id_categoria);
    }
    
    // Filtrar por marca
    if (params.id_marca) {
      productos = productos.filter(p => p.id_marca === params.id_marca);
    }
    
    // Filtrar por precio
    if (params.precioMin !== undefined) {
      productos = productos.filter(p => p.precio_venta >= params.precioMin!);
    }
    if (params.precioMax !== undefined) {
      productos = productos.filter(p => p.precio_venta <= params.precioMax!);
    }
    
    // Ordenar
    if (params.orden) {
      switch (params.orden) {
        case 'precio_asc':
          productos.sort((a, b) => a.precio_venta - b.precio_venta);
          break;
        case 'precio_desc':
          productos.sort((a, b) => b.precio_venta - a.precio_venta);
          break;
        case 'nombre':
          productos.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
          break;
      }
    }
    
    const total = productos.length;
    
    // Paginación
    const limite = params.limite || 12;
    const pagina = params.pagina || 1;
    const inicio = (pagina - 1) * limite;
    productos = productos.slice(inicio, inicio + limite);
    
    return {
      status: 'success',
      data: {
        productos,
        total,
        pagina,
        totalPaginas: Math.ceil(total / limite)
      }
    };
  },

  async getProductoById(id: string) {
    await delay();
    const producto = getProductoById(id);
    
    if (!producto) {
      throw { response: { status: 404, data: { message: 'Producto no encontrado' } } };
    }
    
    return { status: 'success', data: producto };
  },

  async getProductosDestacados(limite: number = 8) {
    await delay();
    const productos = MOCK_PRODUCTOS.slice(0, limite);
    return { status: 'success', data: productos };
  },

  async getProductosEnPromocion() {
    await delay();
    return { status: 'success', data: getProductosEnPromocion() };
  },

  // ==================== CATEGORÍAS ====================
  async getCategorias() {
    await delay();
    return { status: 'success', data: MOCK_CATEGORIAS };
  },

  async getCategoriaById(id: number) {
    await delay();
    const categoria = MOCK_CATEGORIAS.find(c => c.id_categoria === id);
    return { status: 'success', data: categoria };
  },

  // ==================== MARCAS ====================
  async getMarcas(idCategoria?: number) {
    await delay();
    
    if (idCategoria) {
      // Obtener marcas que tienen productos en esta categoría
      const productosCategoria = getProductosByCategoria(idCategoria);
      const marcaIds = Array.from(new Set(productosCategoria.map(p => p.id_marca)));
      const marcas = MOCK_MARCAS.filter(m => marcaIds.includes(m.id_marca));
      return { status: 'success', data: marcas };
    }
    
    return { status: 'success', data: MOCK_MARCAS };
  },

  // ==================== CARRITO ====================
  async getCarrito(usuarioId?: number) {
    await delay();
    const carrito = await storage.getCarrito();
    return { status: 'success', data: carrito };
  },

  async addToCarrito(idProducto: string, cantidad: number = 1) {
    await delay();
    
    const producto = getProductoById(idProducto);
    if (!producto) {
      throw { response: { status: 404, data: { message: 'Producto no encontrado' } } };
    }
    
    const carrito = await storage.getCarrito();
    const items = carrito.items || [];
    
    const existingIndex = items.findIndex((item: any) => item.id_producto === idProducto);
    
    if (existingIndex >= 0) {
      items[existingIndex].cantidad += cantidad;
      items[existingIndex].subtotal = items[existingIndex].cantidad * producto.precio_venta;
    } else {
      items.push({
        id_producto: idProducto,
        producto,
        cantidad,
        precio_unitario: producto.precio_venta,
        subtotal: cantidad * producto.precio_venta
      });
    }
    
    const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);
    
    const nuevoCarrito = {
      id_carrito: carrito.id_carrito || generateId('CART'),
      items,
      total,
      cantidad_items: items.reduce((sum: number, item: any) => sum + item.cantidad, 0),
      fecha_actualizacion: new Date().toISOString()
    };
    
    await storage.saveCarrito(nuevoCarrito);
    
    return { status: 'success', data: nuevoCarrito };
  },

  async updateCarritoItem(idProducto: string, cantidad: number) {
    await delay();
    
    const carrito = await storage.getCarrito();
    const items = carrito.items || [];
    
    const index = items.findIndex((item: any) => item.id_producto === idProducto);
    
    if (index < 0) {
      throw { response: { status: 404, data: { message: 'Producto no está en el carrito' } } };
    }
    
    if (cantidad <= 0) {
      items.splice(index, 1);
    } else {
      items[index].cantidad = cantidad;
      items[index].subtotal = cantidad * items[index].precio_unitario;
    }
    
    const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);
    
    const nuevoCarrito = {
      ...carrito,
      items,
      total,
      cantidad_items: items.reduce((sum: number, item: any) => sum + item.cantidad, 0),
      fecha_actualizacion: new Date().toISOString()
    };
    
    await storage.saveCarrito(nuevoCarrito);
    
    return { status: 'success', data: nuevoCarrito };
  },

  async removeFromCarrito(idProducto: string) {
    return this.updateCarritoItem(idProducto, 0);
  },

  async clearCarrito() {
    await delay();
    await storage.clearCarrito();
    return { status: 'success', data: { items: [], total: 0 } };
  },

  // ==================== PEDIDOS ====================
  async crearPedido(data: { items: any[]; total: number; direccion?: string; sucursal?: string }) {
    await delay(800);
    
    const { user } = await storage.getSession();
    
    const pedido = {
      id_pedido: generateId('PED'),
      id_usuario: user?.id_usuario || 0,
      usuario: user,
      items: data.items,
      subtotal: data.total,
      impuestos: data.total * 0.12,
      total: data.total * 1.12,
      estado: 'PENDIENTE',
      direccion_entrega: data.direccion || data.sucursal || 'Retiro en tienda',
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString()
    };
    
    await storage.savePedido(pedido);
    await storage.addToHistorial('pedido_creado', pedido);
    
    return { status: 'success', data: pedido };
  },

  async getPedidos() {
    await delay();
    const pedidos = await storage.getPedidos();
    return { status: 'success', data: pedidos };
  },

  async getPedidoById(id: string) {
    await delay();
    const pedido = await storage.getPedidoById(id);
    
    if (!pedido) {
      throw { response: { status: 404, data: { message: 'Pedido no encontrado' } } };
    }
    
    return { status: 'success', data: pedido };
  },

  async actualizarEstadoPedido(id: string, estado: string) {
    await delay();
    
    const pedidos = await storage.getPedidos();
    const index = pedidos.findIndex((p: any) => p.id_pedido === id);
    
    if (index < 0) {
      throw { response: { status: 404, data: { message: 'Pedido no encontrado' } } };
    }
    
    pedidos[index].estado = estado;
    pedidos[index].fecha_actualizacion = new Date().toISOString();
    
    await storage.set('pedidos', pedidos);
    await storage.addToHistorial('pedido_actualizado', { id, estado });
    
    return { status: 'success', data: pedidos[index] };
  },

  // ==================== PAGOS ====================
  async procesarPago(data: { 
    id_pedido: string; 
    metodo: 'PAYPAL' | 'TARJETA'; 
    monto: number;
    detalles?: any;
  }) {
    await delay(1000);
    
    const pago = {
      id_pago: generateId('PAY'),
      id_pedido: data.id_pedido,
      metodo: data.metodo,
      monto: data.monto,
      estado: 'COMPLETADO',
      fecha: new Date().toISOString(),
      referencia: data.metodo === 'PAYPAL' 
        ? `PP-${Date.now()}` 
        : `TC-${Date.now()}`
    };
    
    // Actualizar estado del pedido
    await this.actualizarEstadoPedido(data.id_pedido, 'PAGADO');
    
    // Limpiar carrito
    await storage.clearCarrito();
    
    await storage.addToHistorial('pago_procesado', pago);
    
    return { status: 'success', data: pago };
  },

  // ==================== FAVORITOS ====================
  async getFavoritos() {
    await delay();
    const favoritosIds = await storage.getFavoritos();
    const productos = favoritosIds
      .map(id => getProductoById(id))
      .filter(Boolean);
    
    return { status: 'success', data: productos };
  },

  async addFavorito(idProducto: string) {
    await delay();
    await storage.addFavorito(idProducto);
    return { status: 'success' };
  },

  async removeFavorito(idProducto: string) {
    await delay();
    await storage.removeFavorito(idProducto);
    return { status: 'success' };
  },

  async toggleFavorito(idProducto: string) {
    await delay();
    const isFav = await storage.isFavorito(idProducto);
    
    if (isFav) {
      await storage.removeFavorito(idProducto);
    } else {
      await storage.addFavorito(idProducto);
    }
    
    return { status: 'success', data: { isFavorito: !isFav } };
  },

  // ==================== PROMOCIONES ====================
  async getPromociones() {
    await delay();
    return { status: 'success', data: MOCK_PROMOCIONES };
  },

  // ==================== FACTURAS ====================
  async crearFactura(data: { id_pedido: string; datos_facturacion?: any }) {
    await delay(500);
    
    const pedido = await storage.getPedidoById(data.id_pedido);
    
    const factura = {
      id_factura: generateId('FAC'),
      numero: `001-001-${String(Date.now()).slice(-9)}`,
      id_pedido: data.id_pedido,
      pedido,
      datos_facturacion: data.datos_facturacion || {},
      subtotal: pedido?.subtotal || 0,
      iva: (pedido?.subtotal || 0) * 0.12,
      total: pedido?.total || 0,
      fecha_emision: new Date().toISOString(),
      estado: 'EMITIDA'
    };
    
    await storage.addToHistorial('factura_creada', factura);
    
    return { status: 'success', data: factura };
  }
};

export default mockApi;

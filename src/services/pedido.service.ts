// =============================================
// 📦 SERVICIO DE PEDIDOS - Usando Mock API
// =============================================
import mockApi from './mockApi';
import storage from './storage.service';

interface CrearPedidoPayload {
  carritoId: string;
  canal: 'WEB';
  items?: any[];
  total?: number;
}

export const crearPedido = async (data: CrearPedidoPayload) => {
  // Obtener items del carrito
  const carrito = await storage.getCarrito();
  
  const response = await mockApi.crearPedido({
    items: data.items || carrito.items || [],
    total: data.total || carrito.total || 0
  });
  
  return response;
};

export const obtenerPedidos = async () => {
  const response = await mockApi.getPedidos();
  return response;
};

export const obtenerPedidoPorId = async (id: string) => {
  const response = await mockApi.getPedidoById(id);
  return response;
};

// =============================================
// 🧾 SERVICIO DE FACTURAS - Usando Mock API
// =============================================
import mockApi from './mockApi';
import storage from './storage.service';

interface CrearFacturaPayload {
  clienteId: string;
  canal: 'WEB' | 'POS';
  pedidoId: string;
}

export const crearFactura = async (data: CrearFacturaPayload) => {
  const response = await mockApi.crearFactura({
    id_pedido: data.pedidoId,
    datos_facturacion: { clienteId: data.clienteId, canal: data.canal }
  });
  return response;
};

export const obtenerFactura = async (id: string) => {
  const historial = await storage.getHistorial('factura_creada');
  const factura = historial.find((h: any) => h.data.id_factura === id);
  return { status: 'success', data: factura?.data || null };
};

export const listarFacturas = async () => {
  const historial = await storage.getHistorial('factura_creada');
  return { status: 'success', data: historial.map((h: any) => h.data) };
};

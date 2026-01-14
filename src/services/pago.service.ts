// =============================================
// 💳 SERVICIO DE PAGOS - Usando Mock API
// =============================================
import mockApi from './mockApi';
import storage from './storage.service';

interface CrearPagoPayload {
  pedidoId: string;
  metodo: 'PAYPAL' | 'TRANSFERENCIA';
  monto: number;
  referencia?: string;
}

interface DatosTarjeta {
  numero: string;
  titular: string;
  fechaExpiracion: string;
  cvv: string;
}

interface PagarConTarjetaPayload {
  pedidoId: string;
  datosTarjeta: DatosTarjeta;
}

export const crearPago = async (data: CrearPagoPayload) => {
  const response = await mockApi.procesarPago({
    id_pedido: data.pedidoId,
    metodo: data.metodo === 'PAYPAL' ? 'PAYPAL' : 'TARJETA',
    monto: data.monto,
    detalles: { referencia: data.referencia }
  });
  return response;
};

export const pagarConTarjeta = async (data: PagarConTarjetaPayload) => {
  // Simular validación de tarjeta
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Obtener monto del pedido
  const pedido = await storage.getPedidoById(data.pedidoId);
  
  const response = await mockApi.procesarPago({
    id_pedido: data.pedidoId,
    metodo: 'TARJETA',
    monto: pedido?.total || 0,
    detalles: {
      ultimos4: data.datosTarjeta.numero.slice(-4),
      titular: data.datosTarjeta.titular
    }
  });
  
  return response;
};

export const obtenerPagosPorUsuario = async (usuarioId: number) => {
  const historial = await storage.getHistorial('pago_procesado');
  return { status: 'success', data: historial };
};

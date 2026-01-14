// =============================================
// 🎁 SERVICIO DE PROMOCIONES - Usando Mock API
// =============================================
import mockApi from './mockApi';
import { MOCK_PROMOCIONES, getProductosEnPromocion, MOCK_PRODUCTOS } from './mockData';

export interface CategoriaPromocion {
  id: number;
  nombre: string;
  descripcion?: string;
  orden?: number;
  totalOfertas: number;
  icono?: string;
}

export interface ProductoPromocion {
  id: number;
  cantidad: number;
  es_regalo: boolean;
  producto: {
    id_producto: string;
    descripcion: string;
    imagen_url?: string;
    volumen?: number;
    origen?: string;
  };
}

export interface Promocion {
  id: number;
  nombre: string;
  descripcion?: string;
  descripcion_corta?: string;
  marca?: string;
  precio_original: number;
  precio_promocional: number;
  porcentaje_descuento: number;
  cantidad_vendida?: number;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
  destacado?: boolean;
  envio_gratis?: boolean;
  cantidad_maxima_cliente?: number;
  stock_disponible: number;
  mensaje_regalo?: string;
  categoria_promocion: {
    id: number;
    nombre: string;
  };
  promocion_productos?: ProductoPromocion[];
}

export interface FiltrosPromocion {
  categoria?: string;
  ordenarPor?: 'destacado' | 'mayor-descuento' | 'menor-precio' | 'mas-vendidos' | 'fecha';
  pagina?: number;
  limite?: number;
  soloActivas?: boolean;
  minPrecio?: number;
  maxPrecio?: number;
}

export interface RespuestaPromociones {
  promociones: Promocion[];
  total: number;
  pagina: number;
  totalPaginas: number;
  limite: number;
}

export interface Countdown {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  fechaObjetivo: string;
}

class PromocionesService {
  // Obtener categorías de promoción (ocasiones)
  async getCategorias(): Promise<CategoriaPromocion[]> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { id: 1, nombre: 'Corporativo', descripcion: 'Ofertas empresariales', totalOfertas: 5, icono: 'fa-building' },
      { id: 2, nombre: 'San Valentín', descripcion: 'Regalos especiales', totalOfertas: 8, icono: 'fa-heart' },
      { id: 3, nombre: 'Fiestas', descripcion: 'Celebraciones', totalOfertas: 12, icono: 'fa-gift' },
      { id: 4, nombre: 'Navidad', descripcion: 'Ofertas navideñas', totalOfertas: 10, icono: 'fa-tree' },
    ];
  }

  // Obtener promociones con filtros
  async getPromociones(filtros: FiltrosPromocion = {}): Promise<RespuestaPromociones> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Convertir productos en promoción a formato Promocion
    const productosEnPromo = getProductosEnPromocion();
    
    const promociones: Promocion[] = productosEnPromo.map((p, index) => ({
      id: index + 1,
      nombre: p.descripcion,
      descripcion: `Oferta especial en ${p.descripcion}`,
      precio_original: p.precio_anterior || p.precio_venta,
      precio_promocional: p.precio_venta,
      porcentaje_descuento: p.descuento || 0,
      fecha_inicio: '2025-01-01',
      fecha_fin: '2026-12-31',
      activo: true,
      destacado: true,
      stock_disponible: p.saldo_actual,
      categoria_promocion: { id: 1, nombre: 'General' },
      promocion_productos: [{
        id: 1,
        cantidad: 1,
        es_regalo: false,
        producto: {
          id_producto: p.id_producto,
          descripcion: p.descripcion,
          imagen_url: p.imagen_url
        }
      }]
    }));
    
    return {
      promociones,
      total: promociones.length,
      pagina: filtros.pagina || 1,
      totalPaginas: 1,
      limite: filtros.limite || 12
    };
  }

  // Obtener promociones destacadas
  async getPromocionesDestacadas(limite: number = 6): Promise<Promocion[]> {
    const result = await this.getPromociones({ limite });
    return result.promociones.slice(0, limite);
  }

  // Obtener una promoción por ID
  async getPromocion(id: number): Promise<Promocion> {
    const result = await this.getPromociones();
    const promo = result.promociones.find(p => p.id === id);
    if (!promo) throw new Error('Promoción no encontrada');
    return promo;
  }

  // Obtener countdown de Navidad
  async getCountdownNavidad(): Promise<Countdown> {
    const navidad = new Date(new Date().getFullYear(), 11, 25); // 25 de Diciembre
    const ahora = new Date();
    
    if (ahora > navidad) {
      navidad.setFullYear(navidad.getFullYear() + 1);
    }
    
    const diff = navidad.getTime() - ahora.getTime();
    
    return {
      dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutos: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      segundos: Math.floor((diff % (1000 * 60)) / 1000),
      fechaObjetivo: navidad.toISOString()
    };
  }
}

export default new PromocionesService();

// =============================================
// 🏷️ SERVICIO DE MARCAS - Usando Mock API
// =============================================
import mockApi from './mockApi';
import { MOCK_MARCAS, getMarcaById as getMockMarcaById } from './mockData';
import { Marca } from '../types/catalogo.types';

export interface MarcaResponse {
  status: 'success' | 'error';
  message: string;
  data: Marca[];
  total: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface FiltrosMarca {
  id_categoria?: number;
  nombre?: string;
  estado?: 'ACT' | 'INA' | 'ALL';
  incluirInactivas?: boolean;
  orderBy?: 'nombre' | 'productos';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const marcaService = {
  /**
   * Obtener todas las marcas con filtros opcionales
   */
  async getMarcas(filtros?: FiltrosMarca): Promise<MarcaResponse> {
    const response = await mockApi.getMarcas(filtros?.id_categoria);
    return {
      status: 'success',
      message: 'Marcas obtenidas',
      data: response.data as unknown as Marca[],
      total: response.data.length
    };
  },

  /**
   * Obtener marcas por categoría
   */
  async getMarcasByCategoria(id_categoria: number): Promise<Marca[]> {
    const response = await mockApi.getMarcas(id_categoria);
    return response.data as unknown as Marca[];
  },

  /**
   * Obtener una marca por ID
   */
  async getMarcaById(id: number, incluirProductos: boolean = false): Promise<Marca> {
    const marca = getMockMarcaById(id);
    return marca as unknown as Marca;
  },

  /**
   * Crear una nueva marca (mock - solo agrega a memoria)
   */
  async crearMarca(marca: {
    nombre: string;
    id_categoria: number;
    logo_url?: string;
  }): Promise<Marca> {
    const nuevaMarca = {
      id_marca: Date.now(),
      nombre: marca.nombre,
      logo_url: marca.logo_url
    };
    return nuevaMarca as unknown as Marca;
  },

  /**
   * Actualizar una marca (mock)
   */
  async actualizarMarca(
    id: number,
    datos: {
      nombre?: string;
      id_categoria?: number;
      logo_url?: string;
      estado?: string;
    }
  ): Promise<Marca> {
    const marca = getMockMarcaById(id);
    return { ...marca, ...datos } as unknown as Marca;
  },

  /**
   * Eliminar (desactivar) una marca (mock)
   */
  async eliminarMarca(id: number): Promise<Marca> {
    const marca = getMockMarcaById(id);
    return marca as unknown as Marca;
  }
};

// =============================================
// 📦 CATÁLOGO SERVICE - Usando Mock API
// =============================================
import mockApi from './mockApi';
import { MOCK_CATEGORIAS, MOCK_MARCAS } from './mockData';
import { 
  Categoria, 
  Marca, 
  Producto, 
  FiltrosProducto, 
  ProductosResponse,
  FiltrosDinamicos 
} from '../types/catalogo.types';

export const catalogoService = {
  // ==================== CATEGORÍAS ====================
  async getCategorias(): Promise<Categoria[]> {
    const response = await mockApi.getCategorias();
    return response.data as unknown as Categoria[];
  },

  async getCategoriaById(id: number): Promise<Categoria> {
    const response = await mockApi.getCategoriaById(id);
    return response.data as unknown as Categoria;
  },

  // ==================== MARCAS ====================
  async getMarcas(categoria?: string): Promise<Marca[]> {
    const idCategoria = categoria ? parseInt(categoria) : undefined;
    const response = await mockApi.getMarcas(idCategoria);
    return response.data as unknown as Marca[];
  },

  async getMarcasByCategoria(categoria: string): Promise<Marca[]> {
    const response = await mockApi.getMarcas(parseInt(categoria));
    return response.data as unknown as Marca[];
  },

  // ==================== PRODUCTOS ====================
  async getProductos(filtros?: FiltrosProducto): Promise<ProductosResponse> {
    const response = await mockApi.getProductos({
      id_categoria: filtros?.categoriaId,
      id_marca: filtros?.marcaId,
      busqueda: filtros?.busqueda,
      limite: filtros?.limite,
      pagina: filtros?.pagina,
      orden: filtros?.ordenarPor
    });
    
    return {
      productos: response.data.productos as unknown as Producto[],
      total: response.data.total,
      pagina: response.data.pagina,
      totalPaginas: response.data.totalPaginas
    };
  },

  async getProductoById(id: string): Promise<Producto> {
    const response = await mockApi.getProductoById(id);
    return response.data as unknown as Producto;
  },

  async buscarProductos(query: string): Promise<Producto[]> {
    const response = await mockApi.getProductos({ busqueda: query });
    return response.data.productos as unknown as Producto[];
  },

  // ==================== FILTROS DINÁMICOS ====================
  async getFiltrosDinamicos(categoria?: string, marcaId?: number): Promise<FiltrosDinamicos> {
    // Retornar filtros mock
    return {
      precioRango: { min: 10, max: 200 },
      volumenes: [750, 1000, 375],
      alcoholRango: { min: 5, max: 50 },
      origenes: ['Escocia', 'Cuba', 'Estados Unidos', 'Francia']
    };
  },

  // ==================== PRODUCTOS DESTACADOS ====================
  async getProductosDestacados(limite: number = 8): Promise<Producto[]> {
    const response = await mockApi.getProductosDestacados(limite);
    return response.data as unknown as Producto[];
  },

  async getProductosNuevos(limite: number = 8): Promise<Producto[]> {
    const response = await mockApi.getProductosDestacados(limite);
    return response.data as unknown as Producto[];
  },
};

export default catalogoService;

// =============================================
// 🗄️ MOCK DATA - Datos simulados para el E-commerce
// =============================================

export interface MockProducto {
  id_producto: string;
  descripcion: string;
  precio_venta: number;
  saldo_actual: number;
  estado: string;
  imagen_url: string;
  id_marca: number;
  id_categoria: number;
  precio_anterior?: number;
  descuento?: number;
  es_promocion?: boolean;
  // Nuevos campos de detalle
  procedencia: string;
  grados_alcohol: number;
  volumen_ml: number;
  sabores: string;
}

export interface MockMarca {
  id_marca: number;
  nombre: string;
  logo_url?: string;
}

export interface MockCategoria {
  id_categoria: number;
  id_categoria_producto: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
}

export interface MockUsuario {
  id_usuario: number;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  direccion?: string;
}

export interface MockPromocion {
  id_promocion: number;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  descuento: number;
  fecha_inicio: string;
  fecha_fin: string;
  activa: boolean;
}

// ==================== USUARIOS ====================
export const MOCK_USUARIOS: MockUsuario[] = [
  { 
    id_usuario: 1, 
    email: 'test@test.com', 
    password: 'test123', 
    nombre: 'Juan', 
    apellido: 'Pérez',
    telefono: '+593 98 765 4321',
    direccion: 'Av. Amazonas N34-56, Quito'
  },
  { 
    id_usuario: 2, 
    email: 'maria@example.com', 
    password: 'maria123', 
    nombre: 'María', 
    apellido: 'García',
    telefono: '+593 99 123 4567',
    direccion: 'Malecón 2000, Guayaquil'
  },
  { 
    id_usuario: 3, 
    email: 'demo@barbox.com', 
    password: 'demo123', 
    nombre: 'Demo', 
    apellido: 'Usuario',
    telefono: '+593 97 555 1234',
    direccion: 'Av. Ordóñez Lasso, Cuenca'
  },
];

// ==================== MARCAS ====================
export const MOCK_MARCAS: MockMarca[] = [
  // Vinos
  { id_marca: 1, nombre: 'Concha y Toro', logo_url: 'https://ui-avatars.com/api/?name=CT&background=722F37&color=fff&size=100' },
  { id_marca: 2, nombre: 'Torres', logo_url: 'https://ui-avatars.com/api/?name=TO&background=8B0000&color=fff&size=100' },
  { id_marca: 3, nombre: 'Santa Rita', logo_url: 'https://ui-avatars.com/api/?name=SR&background=4A0E0E&color=fff&size=100' },
  // Rones
  { id_marca: 4, nombre: 'Bacardí', logo_url: 'https://ui-avatars.com/api/?name=BA&background=E31937&color=fff&size=100' },
  { id_marca: 5, nombre: 'Havana Club', logo_url: 'https://ui-avatars.com/api/?name=HC&background=8B4513&color=fff&size=100' },
  { id_marca: 6, nombre: 'Zacapa', logo_url: 'https://ui-avatars.com/api/?name=ZA&background=1A1A1A&color=D4AF37&size=100' },
  // Vodkas
  { id_marca: 7, nombre: 'Smirnoff', logo_url: 'https://ui-avatars.com/api/?name=SM&background=E31937&color=fff&size=100' },
  { id_marca: 8, nombre: 'Absolut', logo_url: 'https://ui-avatars.com/api/?name=AB&background=0033A0&color=fff&size=100' },
  { id_marca: 9, nombre: 'Grey Goose', logo_url: 'https://ui-avatars.com/api/?name=GG&background=0077B6&color=fff&size=100' },
  // Whiskies
  { id_marca: 10, nombre: 'Johnnie Walker', logo_url: 'https://ui-avatars.com/api/?name=JW&background=000&color=D4AF37&size=100' },
  { id_marca: 11, nombre: 'Chivas Regal', logo_url: 'https://ui-avatars.com/api/?name=CR&background=722F37&color=D4AF37&size=100' },
  { id_marca: 12, nombre: "Jack Daniel's", logo_url: 'https://ui-avatars.com/api/?name=JD&background=1A1A1A&color=fff&size=100' },
  // Cervezas
  { id_marca: 13, nombre: 'Heineken', logo_url: 'https://ui-avatars.com/api/?name=HK&background=008200&color=fff&size=100' },
  { id_marca: 14, nombre: 'Corona', logo_url: 'https://ui-avatars.com/api/?name=CO&background=FFD700&color=0033A0&size=100' },
  { id_marca: 15, nombre: 'Budweiser', logo_url: 'https://ui-avatars.com/api/?name=BW&background=C41E3A&color=fff&size=100' },
  // Cocteles
  { id_marca: 16, nombre: 'Smirnoff Ice', logo_url: 'https://ui-avatars.com/api/?name=SI&background=00BFFF&color=fff&size=100' },
  { id_marca: 17, nombre: 'Bacardí Breezer', logo_url: 'https://ui-avatars.com/api/?name=BB&background=FF6B6B&color=fff&size=100' },
  { id_marca: 18, nombre: 'Malibu', logo_url: 'https://ui-avatars.com/api/?name=MA&background=FFD93D&color=000&size=100' },
];

// ==================== CATEGORÍAS ====================
export const MOCK_CATEGORIAS: MockCategoria[] = [
  { id_categoria: 1, id_categoria_producto: 1, nombre: 'Vinos', descripcion: 'Vinos selectos de las mejores bodegas', icono: 'fa-wine-glass' },
  { id_categoria: 2, id_categoria_producto: 2, nombre: 'Rones', descripcion: 'Rones premium de todas las regiones', icono: 'fa-wine-bottle' },
  { id_categoria: 3, id_categoria_producto: 3, nombre: 'Vodkas', descripcion: 'Vodkas de alta calidad', icono: 'fa-martini-glass' },
  { id_categoria: 4, id_categoria_producto: 4, nombre: 'Whiskies', descripcion: 'Los mejores whiskies del mundo', icono: 'fa-whiskey-glass' },
  { id_categoria: 5, id_categoria_producto: 5, nombre: 'Cervezas', descripcion: 'Cervezas nacionales e importadas', icono: 'fa-beer-mug-empty' },
  { id_categoria: 6, id_categoria_producto: 6, nombre: 'Cocteles', descripcion: 'Bebidas listas para tomar', icono: 'fa-champagne-glasses' },
];

// ==================== PRODUCTOS ====================
export const MOCK_PRODUCTOS: MockProducto[] = [
  { id_producto: 'V001', descripcion: 'Concha y Toro Reservado 750ml', precio_venta: 12.99, saldo_actual: 80, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Reservado_xwixpw.webp', id_marca: 1, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 12, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V002', descripcion: 'Concha y Toro Casillero del Diablo 750ml', precio_venta: 18.99, saldo_actual: 65, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Casillero_del_diablo_nbvieb.webp', id_marca: 1, id_categoria: 1, precio_anterior: 22.99, descuento: 17, es_promocion: true, procedencia: 'Chile', grados_alcohol: 13, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V003', descripcion: 'Concha y Toro Marqués de Casa Concha 750ml', precio_venta: 28.99, saldo_actual: 40, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344473/Marques_de_casa_cocha_qaiose.webp', id_marca: 1, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 14, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V004', descripcion: 'Concha y Toro Don Melchor 750ml', precio_venta: 89.99, saldo_actual: 15, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Don_Melchor_uffe8d.webp', id_marca: 1, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 14.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V005', descripcion: 'Concha y Toro Frontera 750ml', precio_venta: 8.99, saldo_actual: 100, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Frontera_vgj7x9.webp', id_marca: 1, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 12.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V006', descripcion: 'Torres Sangre de Toro 750ml', precio_venta: 14.99, saldo_actual: 70, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Sangre_de_toro_wsi9pr.webp', id_marca: 2, id_categoria: 1, procedencia: 'España', grados_alcohol: 13.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V007', descripcion: 'Torres Viña Sol 750ml', precio_venta: 12.99, saldo_actual: 55, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344469/Vi%C3%B1a_sol_x7qhd4.webp', id_marca: 2, id_categoria: 1, precio_anterior: 15.99, descuento: 19, es_promocion: true, procedencia: 'España', grados_alcohol: 12.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V008', descripcion: 'Torres Celeste 750ml', precio_venta: 22.99, saldo_actual: 35, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344469/Celeste_smi5pn.webp', id_marca: 2, id_categoria: 1, procedencia: 'España', grados_alcohol: 14, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V009', descripcion: 'Torres Gran Coronas 750ml', precio_venta: 32.99, saldo_actual: 25, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344469/Gran_coronas_xbzyxr.webp', id_marca: 2, id_categoria: 1, procedencia: 'España', grados_alcohol: 14, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V010', descripcion: 'Torres Mas La Plana 750ml', precio_venta: 75.99, saldo_actual: 12, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344469/mas_la_plana_ibqghy.webp', id_marca: 2, id_categoria: 1, procedencia: 'España', grados_alcohol: 14.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V011', descripcion: 'Santa Rita 120 750ml', precio_venta: 9.99, saldo_actual: 90, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/120_wqg8fh.webp', id_marca: 3, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 13, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V012', descripcion: 'Santa Rita Medalla Real 750ml', precio_venta: 24.99, saldo_actual: 45, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/medalla_real_ctli06.webp', id_marca: 3, id_categoria: 1, precio_anterior: 29.99, descuento: 17, es_promocion: true, procedencia: 'Chile', grados_alcohol: 13.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V013', descripcion: 'Santa Rita Floresta 750ml', precio_venta: 15.99, saldo_actual: 50, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Floresta_bodxvb.webp', id_marca: 3, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 13.5, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V014', descripcion: 'Santa Rita Casa Real 750ml', precio_venta: 65.99, saldo_actual: 18, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/casa_real_edfrwk.webp', id_marca: 3, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 14, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'V015', descripcion: 'Santa Rita Triple C 750ml', precio_venta: 85.99, saldo_actual: 10, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Triple_C_j2iw9u.webp', id_marca: 3, id_categoria: 1, procedencia: 'Chile', grados_alcohol: 14, volumen_ml: 750, sabores: 'Frutos rojos, roble, taninos suaves' },
  { id_producto: 'R001', descripcion: 'Bacardí Carta Blanca 750ml', precio_venta: 16.99, saldo_actual: 100, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/Carta_blanca_xvgjpg.webp', id_marca: 4, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R002', descripcion: 'Bacardí Carta Oro 750ml', precio_venta: 18.99, saldo_actual: 85, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/Carta_Oro_z7a6vy.webp', id_marca: 4, id_categoria: 2, precio_anterior: 22.99, descuento: 17, es_promocion: true, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R003', descripcion: 'Bacardí Carta Negra 750ml', precio_venta: 19.99, saldo_actual: 70, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/Carta_negra_tqctol.webp', id_marca: 4, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R004', descripcion: 'Bacardí Reserva Ocho 750ml', precio_venta: 32.99, saldo_actual: 40, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/Reserva_8_j1pnrd.webp', id_marca: 4, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R005', descripcion: 'Bacardí Gran Reserva Diez 750ml', precio_venta: 45.99, saldo_actual: 25, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346647/Reserva_10_jcpkom.webp', id_marca: 4, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R006', descripcion: 'Havana Club 3 Años 750ml', precio_venta: 18.99, saldo_actual: 90, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346645/3_a%C3%B1os_ooub9i.webp', id_marca: 5, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R007', descripcion: 'Havana Club 7 Años 750ml', precio_venta: 28.99, saldo_actual: 60, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/7_a%C3%B1os_vnniin.webp', id_marca: 5, id_categoria: 2, precio_anterior: 34.99, descuento: 17, es_promocion: true, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R008', descripcion: 'Havana Club Añejo Especial 750ml', precio_venta: 22.99, saldo_actual: 55, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/a%C3%B1ejo_especial_e8djfw.webp', id_marca: 5, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R009', descripcion: 'Havana Club Selección de Maestros 750ml', precio_venta: 55.99, saldo_actual: 20, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/seleccion_de_maestros_tjqnhf.webp', id_marca: 5, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 45, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R010', descripcion: 'Havana Club Unión 750ml', precio_venta: 75.99, saldo_actual: 12, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346645/union_b4imng.webp', id_marca: 5, id_categoria: 2, procedencia: 'Cuba', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R011', descripcion: 'Zacapa 23 750ml', precio_venta: 65.99, saldo_actual: 30, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/23_iyomo6.webp', id_marca: 6, id_categoria: 2, procedencia: 'Guatemala', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R012', descripcion: 'Zacapa XO 750ml', precio_venta: 145.99, saldo_actual: 10, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346647/ZACAPA-XO_wfj1ym.webp', id_marca: 6, id_categoria: 2, precio_anterior: 169.99, descuento: 14, es_promocion: true, procedencia: 'Guatemala', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R013', descripcion: 'Zacapa Edición Negra 750ml', precio_venta: 89.99, saldo_actual: 15, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346645/edicion_negra_vpybzh.jpg', id_marca: 6, id_categoria: 2, procedencia: 'Guatemala', grados_alcohol: 43, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R014', descripcion: 'Zacapa Royal 750ml', precio_venta: 299.99, saldo_actual: 5, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346647/royal_t2dmqr.webp', id_marca: 6, id_categoria: 2, procedencia: 'Guatemala', grados_alcohol: 45, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'R015', descripcion: 'Zacapa La Pasión 750ml', precio_venta: 85.99, saldo_actual: 18, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/La_pasion_qxnvcq.webp', id_marca: 6, id_categoria: 2, procedencia: 'Guatemala', grados_alcohol: 40, volumen_ml: 750, sabores: 'Caramelo, vainilla, especias' },
  { id_producto: 'K001', descripcion: 'Smirnoff Red 750ml', precio_venta: 14.99, saldo_actual: 120, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347922/RED_qgdaml.webp', id_marca: 7, id_categoria: 3, procedencia: 'Rusia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K002', descripcion: 'Smirnoff No. 21 750ml', precio_venta: 16.99, saldo_actual: 95, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347919/NO21_swnchg.jpg', id_marca: 7, id_categoria: 3, precio_anterior: 19.99, descuento: 15, es_promocion: true, procedencia: 'Rusia', grados_alcohol: 37.5, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K003', descripcion: 'Smirnoff Green Apple 750ml', precio_venta: 15.99, saldo_actual: 80, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347918/green_apple_hpt41p.jpg', id_marca: 7, id_categoria: 3, procedencia: 'Rusia', grados_alcohol: 35, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K004', descripcion: 'Smirnoff Vanilla 750ml', precio_venta: 15.99, saldo_actual: 70, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347923/Vanilla_khoeem.jpg', id_marca: 7, id_categoria: 3, procedencia: 'Rusia', grados_alcohol: 35, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K005', descripcion: 'Smirnoff Raspberry 750ml', precio_venta: 15.99, saldo_actual: 75, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347920/Rasperry_q1rf1g.webp', id_marca: 7, id_categoria: 3, procedencia: 'Rusia', grados_alcohol: 35, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K006', descripcion: 'Absolut Original 750ml', precio_venta: 22.99, saldo_actual: 85, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347909/Absolut_ejpfk0.jpg', id_marca: 8, id_categoria: 3, procedencia: 'Suecia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K007', descripcion: 'Absolut Citron 750ml', precio_venta: 24.99, saldo_actual: 60, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347909/citron_vubnq1.jpg', id_marca: 8, id_categoria: 3, precio_anterior: 29.99, descuento: 17, es_promocion: true, procedencia: 'Suecia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K008', descripcion: 'Absolut Mango 750ml', precio_venta: 24.99, saldo_actual: 55, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347909/mango_hbc8bf.jpg', id_marca: 8, id_categoria: 3, procedencia: 'Suecia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K009', descripcion: 'Absolut Raspberri 750ml', precio_venta: 24.99, saldo_actual: 50, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347909/Rasperry_fgymvl.jpg', id_marca: 8, id_categoria: 3, procedencia: 'Suecia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K010', descripcion: 'Absolut Vanilia 750ml', precio_venta: 24.99, saldo_actual: 45, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347909/Vainilla_ieytnp.jpg', id_marca: 8, id_categoria: 3, procedencia: 'Suecia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K011', descripcion: 'Grey Goose Original 750ml', precio_venta: 45.99, saldo_actual: 35, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347914/original_tldc2m.webp', id_marca: 9, id_categoria: 3, procedencia: 'Francia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K012', descripcion: 'Grey Goose Le Citron 750ml', precio_venta: 48.99, saldo_actual: 25, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347912/Le_citrion_nsdf9a.jpg', id_marca: 9, id_categoria: 3, precio_anterior: 55.99, descuento: 13, es_promocion: true, procedencia: 'Francia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K013', descripcion: "Grey Goose L'Orange 750ml", precio_venta: 48.99, saldo_actual: 22, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347913/orange_zrm2el.jpg', id_marca: 9, id_categoria: 3, procedencia: 'Francia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K014', descripcion: 'Grey Goose La Poire 750ml', precio_venta: 48.99, saldo_actual: 20, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347911/La_poire_l45uzh.jpg', id_marca: 9, id_categoria: 3, procedencia: 'Francia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'K015', descripcion: 'Grey Goose Watermelon 750ml', precio_venta: 48.99, saldo_actual: 18, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347916/Watermelom_xv0tay.jpg', id_marca: 9, id_categoria: 3, procedencia: 'Francia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Cítrico, puro, refrescante' },
  { id_producto: 'W001', descripcion: 'Johnnie Walker Red Label 750ml', precio_venta: 28.99, saldo_actual: 90, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349226/red_label_pxciqp.webp', id_marca: 10, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W002', descripcion: 'Johnnie Walker Black Label 750ml', precio_venta: 45.99, saldo_actual: 65, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349220/Black_label_baevjd.jpg', id_marca: 10, id_categoria: 4, precio_anterior: 54.99, descuento: 16, es_promocion: true, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W003', descripcion: 'Johnnie Walker Green Label 750ml', precio_venta: 65.99, saldo_actual: 30, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349224/green_label_lssxrx.jpg', id_marca: 10, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 43, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W004', descripcion: 'Johnnie Walker Gold Label 750ml', precio_venta: 85.99, saldo_actual: 20, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349223/gold_label_qulp9j.jpg', id_marca: 10, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W005', descripcion: 'Johnnie Walker Blue Label 750ml', precio_venta: 189.99, saldo_actual: 8, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349222/blue_label_lqhbc0.jpg', id_marca: 10, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W006', descripcion: 'Chivas Regal 12 Años 750ml', precio_venta: 42.99, saldo_actual: 55, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349212/12_gollcs.jpg', id_marca: 11, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W007', descripcion: 'Chivas Regal 13 Años 750ml', precio_venta: 52.99, saldo_actual: 40, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349212/13_eggg4z.jpg', id_marca: 11, id_categoria: 4, precio_anterior: 62.99, descuento: 16, es_promocion: true, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W008', descripcion: 'Chivas Regal 15 Años 750ml', precio_venta: 68.99, saldo_actual: 28, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349212/15_wawxcm.jpg', id_marca: 11, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W009', descripcion: 'Chivas Regal 18 Años 750ml', precio_venta: 89.99, saldo_actual: 18, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349212/18_sadsky.jpg', id_marca: 11, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W010', descripcion: 'Chivas Regal 25 Años 750ml', precio_venta: 299.99, saldo_actual: 5, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349212/25_bya7gn.webp', id_marca: 11, id_categoria: 4, procedencia: 'Escocia', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W011', descripcion: "Jack Daniel's Old No. 7 750ml", precio_venta: 35.99, saldo_actual: 75, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349217/old_no_07_bemuuc.webp', id_marca: 12, id_categoria: 4, procedencia: 'USA', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W012', descripcion: "Jack Daniel's Gentleman Jack 750ml", precio_venta: 48.99, saldo_actual: 45, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349214/getleman_hyqwgw.webp', id_marca: 12, id_categoria: 4, precio_anterior: 58.99, descuento: 17, es_promocion: true, procedencia: 'USA', grados_alcohol: 40, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W013', descripcion: "Jack Daniel's Single Barrel 750ml", precio_venta: 65.99, saldo_actual: 25, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349219/single_barrel_knjabf.jpg', id_marca: 12, id_categoria: 4, procedencia: 'USA', grados_alcohol: 45, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W014', descripcion: "Jack Daniel's Honey 750ml", precio_venta: 38.99, saldo_actual: 60, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349216/honey_ygndrg.jpg', id_marca: 12, id_categoria: 4, procedencia: 'USA', grados_alcohol: 35, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'W015', descripcion: "Jack Daniel's Fire 750ml", precio_venta: 38.99, saldo_actual: 55, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349212/fire_fvseao.jpg', id_marca: 12, id_categoria: 4, procedencia: 'USA', grados_alcohol: 35, volumen_ml: 750, sabores: 'Ahumado, turba, madera, miel' },
  { id_producto: 'C001', descripcion: 'Heineken Original Six Pack', precio_venta: 10.99, saldo_actual: 150, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350799/original_fvjkdt.jpg', id_marca: 13, id_categoria: 5, procedencia: 'Holanda', grados_alcohol: 5, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C002', descripcion: 'Heineken Silver Six Pack', precio_venta: 11.99, saldo_actual: 120, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350803/silver_oppakd.jpg', id_marca: 13, id_categoria: 5, precio_anterior: 14.99, descuento: 20, es_promocion: true, procedencia: 'Holanda', grados_alcohol: 4, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C003', descripcion: 'Heineken 0.0 Six Pack', precio_venta: 9.99, saldo_actual: 100, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350787/0.0_k33cxq.jpg', id_marca: 13, id_categoria: 5, procedencia: 'Holanda', grados_alcohol: 0, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C004', descripcion: 'Heineken Light Six Pack', precio_venta: 10.49, saldo_actual: 90, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350795/light_owsfcg.jpg', id_marca: 13, id_categoria: 5, procedencia: 'Holanda', grados_alcohol: 3.3, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C005', descripcion: 'Heineken Extra Cold Six Pack', precio_venta: 11.49, saldo_actual: 85, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350792/extra_cold_mwcfev.png', id_marca: 13, id_categoria: 5, procedencia: 'Holanda', grados_alcohol: 5, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C006', descripcion: 'Corona Extra Six Pack', precio_venta: 9.99, saldo_actual: 140, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350772/extra_snuihw.webp', id_marca: 14, id_categoria: 5, procedencia: 'México', grados_alcohol: 4.5, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C007', descripcion: 'Corona Light Six Pack', precio_venta: 9.99, saldo_actual: 100, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350780/light_hhfjny.png', id_marca: 14, id_categoria: 5, precio_anterior: 12.99, descuento: 23, es_promocion: true, procedencia: 'México', grados_alcohol: 3.7, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C008', descripcion: 'Corona Premier Six Pack', precio_venta: 11.99, saldo_actual: 80, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350783/premier_uwxyar.jpg', id_marca: 14, id_categoria: 5, procedencia: 'México', grados_alcohol: 4, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C009', descripcion: 'Corona Familiar 32oz', precio_venta: 4.99, saldo_actual: 200, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350775/Familiar_lj9egy.jpg', id_marca: 14, id_categoria: 5, procedencia: 'México', grados_alcohol: 4.5, volumen_ml: 946, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C010', descripcion: 'Corona Cero Six Pack', precio_venta: 8.99, saldo_actual: 110, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350767/cero_ixw1bo.jpg', id_marca: 14, id_categoria: 5, procedencia: 'México', grados_alcohol: 0, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C011', descripcion: 'Budweiser Six Pack', precio_venta: 8.99, saldo_actual: 130, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350763/images_no2ypa.jpg', id_marca: 15, id_categoria: 5, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C012', descripcion: 'Bud Light Six Pack', precio_venta: 8.99, saldo_actual: 145, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350760/budligjt_zviuso.jpg', id_marca: 15, id_categoria: 5, precio_anterior: 10.99, descuento: 18, es_promocion: true, procedencia: 'USA', grados_alcohol: 4.2, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C013', descripcion: 'Bud Ice Six Pack', precio_venta: 7.99, saldo_actual: 95, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350508/bud_ice_paz4fq.jpg', id_marca: 15, id_categoria: 5, procedencia: 'USA', grados_alcohol: 5.5, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C014', descripcion: 'Bud Select Six Pack', precio_venta: 9.49, saldo_actual: 75, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350756/Bud_select_y1yred.jpg', id_marca: 15, id_categoria: 5, procedencia: 'USA', grados_alcohol: 4.3, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'C015', descripcion: 'Bud Light Platinum Six Pack', precio_venta: 10.99, saldo_actual: 60, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350751/Bud_Light_Platinum_r91mtc.jpg', id_marca: 15, id_categoria: 5, procedencia: 'USA', grados_alcohol: 6, volumen_ml: 2130, sabores: 'Malta, lúpulo, refrescante' },
  { id_producto: 'T001', descripcion: 'Smirnoff Ice Original 355ml', precio_venta: 3.99, saldo_actual: 200, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352744/original_nbbhmb.webp', id_marca: 16, id_categoria: 6, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 355, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T002', descripcion: 'Smirnoff Ice Green Apple 355ml', precio_venta: 3.99, saldo_actual: 180, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352740/green_apple_vh1lhg.webp', id_marca: 16, id_categoria: 6, precio_anterior: 4.99, descuento: 20, es_promocion: true, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 355, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T003', descripcion: 'Smirnoff Ice Black 355ml', precio_venta: 4.29, saldo_actual: 150, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352735/black_oee7a0.jpg', id_marca: 16, id_categoria: 6, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 355, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T004', descripcion: 'Smirnoff Ice Raspberry 355ml', precio_venta: 3.99, saldo_actual: 160, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352750/rasperry_igdnvq.jpg', id_marca: 16, id_categoria: 6, procedencia: 'USA', grados_alcohol: 4.5, volumen_ml: 355, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T005', descripcion: 'Smirnoff Ice Watermelon 355ml', precio_venta: 3.99, saldo_actual: 170, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352753/watermelon_dmknp6.jpg', id_marca: 16, id_categoria: 6, procedencia: 'USA', grados_alcohol: 4.5, volumen_ml: 355, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T006', descripcion: 'Bacardí Breezer Orange 275ml', precio_venta: 3.49, saldo_actual: 140, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352700/orange_vtqvck.jpg', id_marca: 17, id_categoria: 6, procedencia: 'UK', grados_alcohol: 4, volumen_ml: 275, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T007', descripcion: 'Bacardí Breezer Pineapple 275ml', precio_venta: 3.49, saldo_actual: 130, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352700/pineapple_bnfno3.jpg', id_marca: 17, id_categoria: 6, precio_anterior: 4.49, descuento: 22, es_promocion: true, procedencia: 'UK', grados_alcohol: 4, volumen_ml: 275, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T008', descripcion: 'Bacardí Breezer Watermelon 275ml', precio_venta: 3.49, saldo_actual: 120, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352706/watermelon_btq0zb.jpg', id_marca: 17, id_categoria: 6, procedencia: 'UK', grados_alcohol: 4, volumen_ml: 275, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T009', descripcion: 'Bacardí Breezer Lime 275ml', precio_venta: 3.49, saldo_actual: 125, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352700/lime_ywo6z8.jpg', id_marca: 17, id_categoria: 6, procedencia: 'UK', grados_alcohol: 4, volumen_ml: 275, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T010', descripcion: 'Bacardí Breezer Strawberry 275ml', precio_venta: 3.49, saldo_actual: 135, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352700/strawberry_yhyn23.jpg', id_marca: 17, id_categoria: 6, procedencia: 'UK', grados_alcohol: 4, volumen_ml: 275, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T011', descripcion: 'Malibu Original & Cola 250ml', precio_venta: 4.49, saldo_actual: 100, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352710/cola_rvqkgg.jpg', id_marca: 18, id_categoria: 6, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 250, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T012', descripcion: 'Malibu Piña Colada 250ml', precio_venta: 4.49, saldo_actual: 110, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352720/pi%C3%B1a_colada_prr0gp.jpg', id_marca: 18, id_categoria: 6, precio_anterior: 5.49, descuento: 18, es_promocion: true, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 250, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T013', descripcion: 'Malibu Strawberry Splash 250ml', precio_venta: 4.49, saldo_actual: 95, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352725/strawberry_z3aafy.jpg', id_marca: 18, id_categoria: 6, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 250, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T014', descripcion: 'Malibu Watermelon Splash 250ml', precio_venta: 4.49, saldo_actual: 90, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352730/watermelon_uxy7oe.jpg', id_marca: 18, id_categoria: 6, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 250, sabores: 'Frutal, dulce, cítrico' },
  { id_producto: 'T015', descripcion: 'Malibu Lime Splash 250ml', precio_venta: 4.49, saldo_actual: 85, estado: 'activo', imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352715/lime_ylvgw7.jpg', id_marca: 18, id_categoria: 6, procedencia: 'USA', grados_alcohol: 5, volumen_ml: 250, sabores: 'Frutal, dulce, cítrico' }
];

// ==================== PROMOCIONES ====================
export const MOCK_PROMOCIONES: MockPromocion[] = [
  {
    id_promocion: 1,
    titulo: '🍷 Vinos Premium',
    descripcion: 'Hasta 20% OFF en vinos Concha y Toro, Torres y Santa Rita.',
    imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768344468/Casillero_del_diablo_nbvieb.webp',
    descuento: 20,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2026-12-31',
    activa: true
  },
  {
    id_promocion: 2,
    titulo: '🍹 Festival del Ron',
    descripcion: 'Bacardí, Havana Club y Zacapa con descuentos especiales.',
    imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768346646/23_iyomo6.webp',
    descuento: 25,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2026-12-31',
    activa: true
  },
  {
    id_promocion: 3,
    titulo: '🍸 Vodka Week',
    descripcion: 'Grey Goose, Absolut y Smirnoff hasta 30% OFF.',
    imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768347914/original_tldc2m.webp',
    descuento: 30,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2026-12-31',
    activa: true
  },
  {
    id_promocion: 4,
    titulo: '🥃 Whiskies Premium',
    descripcion: 'Johnnie Walker, Chivas Regal y Jack Daniels con ofertas especiales.',
    imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768349222/blue_label_lqhbc0.jpg',
    descuento: 20,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2026-12-31',
    activa: true
  },
  {
    id_promocion: 5,
    titulo: '🍺 Cerveza Fest',
    descripcion: 'Heineken, Corona y Budweiser: 2x1 en six packs seleccionados.',
    imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768350772/extra_snuihw.webp',
    descuento: 50,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2026-12-31',
    activa: true
  },
  {
    id_promocion: 6,
    titulo: '🍹 Cocteles Ready to Drink',
    descripcion: 'Smirnoff Ice, Bacardí Breezer y Malibu desde $2.99.',
    imagen_url: 'https://res.cloudinary.com/dpn1fexqs/image/upload/v1768352744/original_nbbhmb.webp',
    descuento: 25,
    fecha_inicio: '2025-01-01',
    fecha_fin: '2026-12-31',
    activa: true
  },
];

// ==================== HELPER FUNCTIONS ====================
export const getProductoById = (id: string): MockProducto | undefined => {
  return MOCK_PRODUCTOS.find(p => p.id_producto === id);
};

export const getProductosByCategoria = (idCategoria: number): MockProducto[] => {
  return MOCK_PRODUCTOS.filter(p => p.id_categoria === idCategoria);
};

export const getProductosByMarca = (idMarca: number): MockProducto[] => {
  return MOCK_PRODUCTOS.filter(p => p.id_marca === idMarca);
};

export const getProductosEnPromocion = (): MockProducto[] => {
  return MOCK_PRODUCTOS.filter(p => p.es_promocion);
};

export const buscarProductos = (query: string): MockProducto[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTOS.filter(p => 
    p.descripcion.toLowerCase().includes(lowerQuery)
  );
};

export const getMarcaById = (id: number): MockMarca | undefined => {
  return MOCK_MARCAS.find(m => m.id_marca === id);
};

export const getCategoriaById = (id: number): MockCategoria | undefined => {
  return MOCK_CATEGORIAS.find(c => c.id_categoria === id);
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Producto } from '../types/catalogo.types';
import { useCarrito } from '../context/CarritoContext';
import { useFavoritos } from '../context/FavoritosContext';
import { getImagenProductoUrl, PLACEHOLDER_PRODUCTO } from '../config/api.config';
import { catalogoService } from '../services/catalogo.service';
import './ProductoDetalladoPage.css';
import Breadcrumbs from '../components/Common/Breadcrumbs';

const ProductoDetalladoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();
  const { toggleFavorito, esFavorito } = useFavoritos();

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        if (id) {
          const productoData = await catalogoService.getProductoById(id);
          setProducto(productoData);
        }
      } catch (error) {
        console.error('Error cargando producto:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="page-container">
        <div className="error-state">
          <i className="fas fa-exclamation-circle"></i>
          <h2>Producto no encontrado</h2>
          <p>No pudimos encontrar el producto que buscas.</p>
          <button className="btn-primary" onClick={() => navigate('/catalogo')}>
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  const enFavoritos = esFavorito(producto.id_producto);
  const enCarrito = estaEnCarrito(producto.id_producto);
  const tieneDescuento = producto.precio_regular && Number(producto.precio_regular) > Number(producto.precio_venta);
  const descuentoPorcentaje = tieneDescuento 
    ? Math.round(((Number(producto.precio_regular) - Number(producto.precio_venta)) / Number(producto.precio_regular)) * 100)
    : 0;
  const enStock = (producto.saldo_actual || 0) > 0;

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  };

  const handleAgregarCarrito = async () => {
    if (enStock) {
      await agregarAlCarrito(producto, cantidad);
      localStorage.setItem('origenCarrito', `/producto/${producto.id_producto}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/carrito');
    }
  };

  const imagenUrl = getImagenProductoUrl(producto.imagen_url);

  return (
    <div className="page-container producto-detallado-page">
      <Breadcrumbs />
      
      <div className="producto-detallado__header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Atrás
        </button>
      </div>

      <div className="producto-detallado__content">
        {/* Imagen principal */}
        <div className="producto-detallado__imagen-section">
          <div className="producto-detallado__imagen-container">
            <img 
              src={imagenUrl} 
              alt={producto.descripcion}
              className="producto-detallado__imagen"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_PRODUCTO;
              }}
            />
            {tieneDescuento && (
              <span className="producto-detallado__badge">-{descuentoPorcentaje}%</span>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="producto-detallado__info-section">
          {/* Marca */}
          {producto.marca && (
            <span className="producto-detallado__marca">{producto.marca.nombre}</span>
          )}

          {/* Nombre */}
          <h1 className="producto-detallado__nombre">{producto.descripcion}</h1>

          {/* Categoría */}
          {producto.categoria_producto && (
            <span className="producto-detallado__categoria">
              <i className="fas fa-tag"></i> {producto.categoria_producto.nombre}
            </span>
          )}

          {/* Especificaciones Técnicas */}
          <div className="producto-detallado__specs">
            {producto.procedencia && (
              <div className="spec-item">
                <i className="fas fa-globe-americas"></i>
                <div>
                  <strong>Origen</strong>
                  <p>{producto.procedencia}</p>
                </div>
              </div>
            )}
            {producto.grados_alcohol !== undefined && (
              <div className="spec-item">
                <i className="fas fa-percent"></i>
                <div>
                  <strong>Contenido Alcohólico</strong>
                  <p>{producto.grados_alcohol}%</p>
                </div>
              </div>
            )}
            {producto.volumen_ml && (
              <div className="spec-item">
                <i className="fas fa-flask"></i>
                <div>
                  <strong>Volumen</strong>
                  <p>{producto.volumen_ml}ml</p>
                </div>
              </div>
            )}
          </div>

          {/* Sabores / Notas de Cata */}
          {(producto.sabores || producto.notas_cata) && (
            <div className="producto-detallado__notas">
              <h3><i className="fas fa-wine-glass"></i> Perfil de Sabor</h3>
              <p>{producto.sabores || producto.notas_cata}</p>
            </div>
          )}

          {/* Precios */}
          <div className="producto-detallado__precios">
            {tieneDescuento && (
              <span className="producto-detallado__precio-regular">
                {formatearPrecio(Number(producto.precio_regular))}
              </span>
            )}
            <span className="producto-detallado__precio-venta">
              {formatearPrecio(Number(producto.precio_venta))}
            </span>
            {tieneDescuento && (
              <span className="producto-detallado__ahorro">
                Ahorras {formatearPrecio(Number(producto.precio_regular) - Number(producto.precio_venta))}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className={`producto-detallado__stock ${enStock ? 'en-stock' : 'sin-stock'}`}>
            <i className={`fas fa-${enStock ? 'check-circle' : 'times-circle'}`}></i>
            {enStock ? (
              <span>{producto.saldo_actual} unidades disponibles</span>
            ) : (
              <span>Producto agotado</span>
            )}
          </div>

          {/* Acciones */}
          <div className="producto-detallado__acciones">
            {enStock && (
              <div className="producto-detallado__cantidad">
                <button 
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  disabled={cantidad <= 1}
                  className="btn-cantidad"
                  aria-label="Reducir cantidad"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  value={cantidad} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setCantidad(Math.min(Math.max(1, val), producto.saldo_actual || 10));
                  }}
                  min="1"
                  max={producto.saldo_actual || 10}
                  className="cantidad-input"
                />
                <button 
                  onClick={() => setCantidad(Math.min(producto.saldo_actual || 10, cantidad + 1))}
                  disabled={cantidad >= (producto.saldo_actual || 10)}
                  className="btn-cantidad"
                  aria-label="Aumentar cantidad"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            )}

            <button 
              className={`btn-agregar-carrito ${enCarrito ? 'en-carrito' : ''}`}
              onClick={handleAgregarCarrito}
              disabled={!enStock}
              aria-label={enCarrito ? 'Ya está en el carrito' : 'Agregar al carrito'}
            >
              <i className={`fas fa-${enCarrito ? 'check' : 'cart-plus'}`}></i>
              {enCarrito ? 'En el Carrito' : 'Agregar al Carrito'}
            </button>

            <button 
              className={`btn-favorito ${enFavoritos ? 'active' : ''}`}
              onClick={() => toggleFavorito(producto.id_producto)}
              aria-label={enFavoritos ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <i className={`fa${enFavoritos ? 's' : 'r'} fa-heart`}></i>
            </button>
          </div>

          {/* Info adicional */}
          <div className="producto-detallado__extras">
            <div className="extra-item">
              <i className="fas fa-shield-alt"></i>
              <span>Producto 100% original</span>
            </div>
            <div className="extra-item">
              <i className="fas fa-undo"></i>
              <span>Devolución sin costo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalladoPage;

// =============================================
// 💾 STORAGE SERVICE - Persistencia robusta con IndexedDB + localStorage
// =============================================

const DB_NAME = 'barbox_db';
const DB_VERSION = 1;

interface StorageData {
  key: string;
  value: any;
  timestamp: number;
}

// ==================== INDEXEDDB SETUP ====================
class StorageService {
  private db: IDBDatabase | null = null;
  private isReady: boolean = false;
  private readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = this.initDB();
  }

  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Si IndexedDB no está disponible, usar solo localStorage
      if (!window.indexedDB) {
        console.warn('⚠️ IndexedDB no disponible, usando localStorage');
        this.isReady = true;
        resolve();
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.warn('⚠️ Error abriendo IndexedDB, usando localStorage');
        this.isReady = true;
        resolve();
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.isReady = true;
        console.log('✅ IndexedDB inicializada correctamente');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store para datos generales
        if (!db.objectStoreNames.contains('storage')) {
          db.createObjectStore('storage', { keyPath: 'key' });
        }
        
        // Store para pedidos
        if (!db.objectStoreNames.contains('pedidos')) {
          db.createObjectStore('pedidos', { keyPath: 'id_pedido' });
        }
        
        // Store para historial
        if (!db.objectStoreNames.contains('historial')) {
          const historialStore = db.createObjectStore('historial', { keyPath: 'id', autoIncrement: true });
          historialStore.createIndex('fecha', 'fecha', { unique: false });
          historialStore.createIndex('tipo', 'tipo', { unique: false });
        }
      };
    });
  }

  async waitForReady(): Promise<void> {
    await this.readyPromise;
  }

  // ==================== MÉTODOS PRINCIPALES ====================
  
  async set(key: string, value: any): Promise<void> {
    await this.waitForReady();
    
    // Siempre guardar en localStorage como backup
    try {
      localStorage.setItem(`barbox_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('⚠️ Error guardando en localStorage:', e);
    }

    // Intentar guardar en IndexedDB
    if (this.db) {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(['storage'], 'readwrite');
        const store = transaction.objectStore('storage');
        
        const data: StorageData = {
          key,
          value,
          timestamp: Date.now()
        };
        
        const request = store.put(data);
        request.onsuccess = () => resolve();
        request.onerror = () => {
          console.warn('⚠️ Error en IndexedDB, datos en localStorage');
          resolve();
        };
      });
    }
  }

  async get<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
    await this.waitForReady();

    // Intentar obtener de IndexedDB primero
    if (this.db) {
      try {
        const result = await new Promise<T | null>((resolve) => {
          const transaction = this.db!.transaction(['storage'], 'readonly');
          const store = transaction.objectStore('storage');
          const request = store.get(key);
          
          request.onsuccess = () => {
            if (request.result) {
              resolve(request.result.value as T);
            } else {
              resolve(null);
            }
          };
          request.onerror = () => resolve(null);
        });
        
        if (result !== null) return result;
      } catch (e) {
        console.warn('⚠️ Error leyendo IndexedDB:', e);
      }
    }

    // Fallback a localStorage
    try {
      const stored = localStorage.getItem(`barbox_${key}`);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch (e) {
      console.warn('⚠️ Error leyendo localStorage:', e);
    }

    return defaultValue;
  }

  async remove(key: string): Promise<void> {
    await this.waitForReady();

    // Eliminar de localStorage
    localStorage.removeItem(`barbox_${key}`);

    // Eliminar de IndexedDB
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction(['storage'], 'readwrite');
        const store = transaction.objectStore('storage');
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => resolve();
      });
    }
  }

  // ==================== PEDIDOS ====================
  
  async savePedido(pedido: any): Promise<void> {
    await this.waitForReady();

    // Guardar en lista de pedidos en localStorage
    const pedidos = await this.getPedidos();
    const index = pedidos.findIndex((p: any) => p.id_pedido === pedido.id_pedido);
    
    if (index >= 0) {
      pedidos[index] = pedido;
    } else {
      pedidos.push(pedido);
    }
    
    await this.set('pedidos', pedidos);

    // También guardar en IndexedDB store separado
    if (this.db) {
      return new Promise((resolve) => {
        const transaction = this.db!.transaction(['pedidos'], 'readwrite');
        const store = transaction.objectStore('pedidos');
        store.put(pedido);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => resolve();
      });
    }
  }

  async getPedidos(): Promise<any[]> {
    return await this.get<any[]>('pedidos', []) || [];
  }

  async getPedidoById(id: string): Promise<any | null> {
    const pedidos = await this.getPedidos();
    return pedidos.find((p: any) => p.id_pedido === id) || null;
  }

  // ==================== HISTORIAL ====================
  
  async addToHistorial(tipo: string, data: any): Promise<void> {
    await this.waitForReady();

    const entry = {
      tipo,
      data,
      fecha: new Date().toISOString()
    };

    // Guardar en localStorage
    const historial = await this.get<any[]>('historial', []) || [];
    historial.unshift(entry);
    
    // Mantener solo los últimos 100 registros
    if (historial.length > 100) {
      historial.splice(100);
    }
    
    await this.set('historial', historial);

    // También en IndexedDB
    if (this.db) {
      const transaction = this.db.transaction(['historial'], 'readwrite');
      const store = transaction.objectStore('historial');
      store.add(entry);
    }
  }

  async getHistorial(tipo?: string): Promise<any[]> {
    const historial = await this.get<any[]>('historial', []) || [];
    if (tipo) {
      return historial.filter((h: any) => h.tipo === tipo);
    }
    return historial;
  }

  // ==================== CARRITO ====================
  
  async getCarrito(): Promise<any> {
    return await this.get('carrito_data', { items: [], total: 0 });
  }

  async saveCarrito(carrito: any): Promise<void> {
    await this.set('carrito_data', carrito);
  }

  async clearCarrito(): Promise<void> {
    await this.set('carrito_data', { items: [], total: 0 });
  }

  // ==================== FAVORITOS ====================
  
  async getFavoritos(): Promise<string[]> {
    return await this.get<string[]>('favoritos', []) || [];
  }

  async addFavorito(idProducto: string): Promise<void> {
    const favoritos = await this.getFavoritos();
    if (!favoritos.includes(idProducto)) {
      favoritos.push(idProducto);
      await this.set('favoritos', favoritos);
    }
  }

  async removeFavorito(idProducto: string): Promise<void> {
    const favoritos = await this.getFavoritos();
    const index = favoritos.indexOf(idProducto);
    if (index >= 0) {
      favoritos.splice(index, 1);
      await this.set('favoritos', favoritos);
    }
  }

  async isFavorito(idProducto: string): Promise<boolean> {
    const favoritos = await this.getFavoritos();
    return favoritos.includes(idProducto);
  }

  // ==================== SESIÓN ====================
  
  async saveSession(token: string, user: any): Promise<void> {
    await this.set('token', token);
    await this.set('user', user);
  }

  async getSession(): Promise<{ token: string | null; user: any | null }> {
    const token = await this.get<string>('token', null);
    const user = await this.get<any>('user', null);
    return { token, user };
  }

  async clearSession(): Promise<void> {
    await this.remove('token');
    await this.remove('user');
  }

  // ==================== SYNC MULTI-TAB ====================
  
  setupSyncListener(callback: (key: string, value: any) => void): void {
    window.addEventListener('storage', (event) => {
      if (event.key?.startsWith('barbox_') && event.newValue) {
        const key = event.key.replace('barbox_', '');
        try {
          const value = JSON.parse(event.newValue);
          callback(key, value);
        } catch (e) {
          // Ignorar errores de parsing
        }
      }
    });
  }

  // ==================== CLEAR ALL ====================
  
  async clearAll(): Promise<void> {
    await this.waitForReady();

    // Limpiar localStorage
    const keysToRemove = Object.keys(localStorage).filter(k => k.startsWith('barbox_'));
    keysToRemove.forEach(k => localStorage.removeItem(k));

    // Limpiar IndexedDB
    if (this.db) {
      const stores = ['storage', 'pedidos', 'historial'];
      for (const storeName of stores) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.clear();
      }
    }
  }
}

// Exportar instancia única
export const storage = new StorageService();
export default storage;

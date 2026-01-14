// =============================================
// 🎮 DEMO MODE BANNER
// =============================================
import React from 'react';
import './DemoModeBanner.css';

const DemoModeBanner: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isMinimized, setIsMinimized] = React.useState(false);

  if (!isVisible) return null;

  return (
    <div className={`demo-banner ${isMinimized ? 'demo-banner--minimized' : ''}`}>
      {!isMinimized ? (
        <>
          <div className="demo-banner__content">
            <span className="demo-banner__icon">🎮</span>
            <div className="demo-banner__text">
              <strong>Modo Demo</strong>
              <span>Los datos se guardan localmente en tu navegador</span>
            </div>
          </div>
          <div className="demo-banner__actions">
            <button 
              className="demo-banner__btn demo-banner__btn--minimize"
              onClick={() => setIsMinimized(true)}
              title="Minimizar"
            >
              <i className="fas fa-minus"></i>
            </button>
            <button 
              className="demo-banner__btn demo-banner__btn--close"
              onClick={() => setIsVisible(false)}
              title="Cerrar"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </>
      ) : (
        <button 
          className="demo-banner__expand"
          onClick={() => setIsMinimized(false)}
          title="Expandir"
        >
          🎮 Demo
        </button>
      )}
    </div>
  );
};

export default DemoModeBanner;

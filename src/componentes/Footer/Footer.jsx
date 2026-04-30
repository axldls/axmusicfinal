import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

/**
 * Componente Footer
 * 
 * Propósito: Pie de página con información, enlaces y contacto
 * Aparece en la parte inferior de todas las páginas
 * 
 * Secciones:
 * 1. Información sobre AxMusic
 * 2. Enlaces útiles (navegación)
 * 3. Contacto
 * 4. Redes sociales
 * 5. Copyright
 * 
 * No recibe props, es un componente presentacional puro
 */
const Footer = () => {
  return (
    <footer className="footer">
      {/* ========== CONTENEDOR PRINCIPAL DEL FOOTER ========== */}
      <div className="footer-container">
        
        {/* ========== SECCIÓN 1: INFORMACIÓN DE LA TIENDA ========== */}
        {/* Presenta el nombre y descripción de AxMusic */}
        <div className="footer-section">
          <h3>AxMusic</h3>
          <p>Tu tienda de instrumentos musicales de confianza. Ofertas en instrumentos nuevos y usados de alta calidad.</p>
        </div>

        {/* ========== SECCIÓN 2: ENLACES ÚTILES ========== */}
        {/* Menú de navegación rápida a páginas importantes */}
        <div className="footer-section">
          <h4>Enlaces Útiles</h4>
          <ul>
            {/* Link a la página de inicio */}
            <li><Link to="/">Inicio</Link></li>
            
            {/* Link a categoría de instrumentos usados (ID 2) */}
            <li><Link to="/categoria/2">Instrumentos Usados</Link></li>
            
            {/* Link a categoría de instrumentos nuevos (ID 3) */}
            <li><Link to="/categoria/3">Instrumentos Nuevos</Link></li>
          </ul>
        </div>

        {/* ========== SECCIÓN 3: INFORMACIÓN DE CONTACTO ========== */}
        {/* Datos para que los clientes se comuniquen */}
        <div className="footer-section">
          <h4>Contacto</h4>
          {/* Teléfono */}
          <p>📞 +54 (11) 2345-6789</p>
          
          {/* Email */}
          <p>📧 info@axmusic.com</p>
          
          {/* Ubicación */}
          <p>📍 Buenos Aires, Argentina</p>
        </div>

        {/* ========== SECCIÓN 4: REDES SOCIALES ========== */}
        {/* Enlaces a redes sociales de AxMusic */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            {/* Nota: Estos son placeholders (#) que no van a ningún lado */}
            {/* En producción, deberían apuntar a URLs reales de redes sociales */}
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">Twitter</a>
          </div>
        </div>
      </div>

      {/* ========== SECCIÓN 5: COPYRIGHT ========== */}
      {/* Información de derechos de autor */}
      <div className="footer-bottom">
        <p>&copy; 2026 AxMusic. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

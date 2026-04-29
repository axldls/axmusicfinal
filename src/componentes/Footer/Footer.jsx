import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AxMusic</h3>
          <p>Tu tienda de instrumentos musicales de confianza. Ofertas en instrumentos nuevos y usados de alta calidad.</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces Útiles</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categoria/2">Instrumentos Usados</Link></li>
            <li><Link to="/categoria/3">Instrumentos Nuevos</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📞 +54 (11) 2345-6789</p>
          <p>📧 info@axmusic.com</p>
          <p>📍 Buenos Aires, Argentina</p>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" className="social-icon">Facebook</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 AxMusic. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

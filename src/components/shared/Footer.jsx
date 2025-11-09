const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="logo-circle" style={{ display: 'inline-flex', width: '50px', height: '50px' }}>
            IIIT<span>N</span>
          </div>
        </div>
        <div className="footer-info">
          <h3>IIIT Nagpur - Amenities Portal</h3>
          <p>Making campus life easier, one service at a time</p>
        </div>
        <div className="footer-contact">
          <p>
            <i className="fas fa-envelope"></i> amenities@iiitn.ac.in
          </p>
          <p>
            <i className="fas fa-phone"></i> +91-XXX-XXX-XXXX
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 IIIT Nagpur. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

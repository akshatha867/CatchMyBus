// Import CSS
import "./Footer.css";

function Footer() {
  return (

    <footer className="footer">

      <div className="footer-container">

        {/* Website Info */}
        <div className="footer-box">

          <h2>🚌 Catch My Bus</h2>

          <p>
            Find your local bus in seconds.
            <br />
            Travel Smart • Travel Safe
          </p>

        </div>

        {/* Quick Links */}
        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="#home">Home</a></li>

          <li><a href="/#destinations">Destinations</a> </li>
            <li><a href="#about">About</a></li>

            <li><a href="#contact">Contact</a></li>

          </ul>

        </div>

        {/* Developer */}
        <div className="footer-box">

          <h3>Developed By</h3>

          <p>Alva's Education Foundation</p>

          <p>Department of BCA</p>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Catch My Bus | All Rights Reserved

      </div>

    </footer>

  );
}

export default Footer;
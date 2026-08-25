import { Link } from "react-router-dom";
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

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/destinations">Destinations</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

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
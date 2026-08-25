import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Images/alvas-logo.jpg";
import { useState, useEffect } from "react";

function Navbar() {

  // Store current date and time
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Format current date
  const date = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format current time
  const currentTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo-section">
        <img src={logo} alt="ALVA'S Logo" className="logo" />
        <h2>Catch My Bus</h2>
      </div>

      {/* Navigation */}
      <ul className="nav-links">

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

      {/* Date & Time */}
      <div className="date-time">
        <p>{date}</p>
        <h2>{currentTime}</h2>
      </div>

    </nav>
  );
}

export default Navbar;
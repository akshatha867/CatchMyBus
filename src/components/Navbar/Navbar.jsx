// Import CSS
import "./Navbar.css";
// Import Logo
import logo from "../../assets/Images/alvas-logo.jpg";
// Import React Hooks
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
      <a href="#home">Home</a>
    </li>

    <li>
      <a href="#destinations">Destinations</a>
    </li>

    <li>
      <a href="#about">About</a>
    </li>

    <li>
      <a href="#contact">Contact</a>
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
import { useEffect, useState } from "react";
import "./Hero.css";
import SearchBox from "../SearchBox/SearchBox";

// Hero receives the onSearch function from App
function Hero({ onSearch }) {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (lastVisitDate !== today) {
      fetch('http://localhost:5000/visits/increment', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          setVisitCount(data.total_count);
          localStorage.setItem('lastVisitDate', today);
        })
        .catch(err => console.error('Error incrementing visits:', err));
    } else {
      fetch('http://localhost:5000/visits')
        .then(res => res.json())
        .then(data => setVisitCount(data.total_count))
        .catch(err => console.error('Error fetching visits:', err));
    }
  }, []);

  return (
    <section id="home" className="hero">

      <div className="hero-container">

        <div className="hero-left">

          <h1>
  Travel Smarter with
  <br />
  <span>Catch My Bus</span>
</h1>

<p>
 Search local buses from <strong>Belthangady</strong> with
accurate routes and updated departure timings.
Simple, fast, and reliable for everyday travel.
</p>
<div className="hero-features">

  <div className="feature">
    🚌 Local Buses
  </div>

  <div className="feature">
    📍 15+ Destinations
  </div>

  <div className="feature">
    ⏰ Updated Daily
  </div>

</div>
<div className="visitor-count">
  <span className="visitor-icon">👥</span>

  <div>
    <strong>{visitCount}+</strong>
    <p>Visitors have checked Catch My Bus</p>
  </div>
</div>
        </div>

      </div>

      {/* Pass the onSearch function to SearchBox */}
      <SearchBox onSearch={onSearch} />

    </section>
  );
}

export default Hero;
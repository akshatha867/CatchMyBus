import "./Hero.css";
import SearchBox from "../SearchBox/SearchBox";

// Hero receives the onSearch function from App
function Hero({ onSearch }) {
  return (
    <section  id="home" className="hero">

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
    📍 20+ Destinations
  </div>

  <div className="feature">
    ⏰ Updated Daily
  </div>

</div>
<div className="visitor-count">
  <span className="visitor-icon">👥</span>

  <div>
    <strong>1,245+</strong>
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
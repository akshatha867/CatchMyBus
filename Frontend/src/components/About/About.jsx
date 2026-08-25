import "./About.css";
import busImage from "../../assets/Images/Bus2.jpg";

function About() {
  return (
    <section id="about" className="about">

      {/* Top Section */}
      <div className="about-top">

        {/* Left Side */}
        <div className="about-left">

          <img
            src={busImage}
            alt="Catch My Bus"
          />

        </div>

        {/* Right Side */}
        <div className="about-right">

          <span className="about-tag">
            ABOUT US
          </span>

          <h2>
            Your Smart Travel Companion
          </h2>

          <p>
            Catch My Bus helps passengers quickly find local buses
            from Belthangady to their destination with reliable route
            information and departure timings. Our goal is to make
            everyday travel simple, fast, and convenient.
          </p>

        </div>

      </div>

      {/* Feature Cards */}
      <div className="features">

        <div className="feature-card">
          <div className="icon">🚌</div>
          <h3>Reliable Bus Information</h3>
          <p>Find accurate local bus details anytime.</p>
        </div>

        <div className="feature-card">
          <div className="icon">📍</div>
          <h3>Easy Destination Search</h3>
          <p>Search buses to your destination within seconds.</p>
        </div>

        <div className="feature-card">
          <div className="icon">⏰</div>
          <h3>Updated Timings</h3>
          <p>View the latest available departure timings.</p>
        </div>

        <div className="feature-card">
          <div className="icon">💙</div>
          <h3>User Friendly</h3>
          <p>Simple interface designed for everyone.</p>
        </div>

      </div>

    </section>
  );
}

export default About;
// Import CSS
import "./Contact.css";

function Contact() {

  return (

    // Contact Section
    <section id="contact" className="contact">

      {/* Heading */}
      <h2>Transport Information</h2>

      <p className="contact-subtitle">
       For bus timings, routes and transport-related enquiries, please visit or contact the transport office during working hours.
      </p>

<div className="contact-container">

  {/* Office Location */}
  <div className="contact-card">

    <h3>📍 Office Location</h3>

    <p>
      Belthangady Bus Stand<br />
      Belthangady, Karnataka
    </p>

  </div>

  {/* Working Hours */}
  <div className="contact-card">

    <h3>🕒 Office Hours</h3>

    <p>
      Monday – Saturday<br />
      8:00 AM – 6:00 PM
    </p>

  </div>

  {/* Enquiry */}
  <div className="contact-card">

    <h3>🚌 Transport Enquiry</h3>

    <p>
      For bus timings and route information,
      please contact the Belthangady Bus Agent.
    </p>

  </div>

  {/* Notice */}
  <div className="contact-card">

    <h3>📢 Important Notice</h3>

    <p>
      Bus timings and routes are subject to change.
      Please confirm before your journey.
    </p>

  </div>

</div>

    </section>

  );

}

export default Contact;
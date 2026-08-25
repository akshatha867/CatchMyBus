import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import buses from "../../data/buses";

function Destinations() {
  return (
    <>
      <Navbar />

      <section className="bus-table" id="destinations">
        <h2>🚌 Destinations</h2>

        <p className="result-count">
          Available bus routes
        </p>

        <table>
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Via Route</th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.busName}</td>
                <td>{bus.source}</td>
                <td>{bus.destination}</td>
                <td>{bus.viaRoute}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Footer />
    </>
  );
}

export default Destinations;
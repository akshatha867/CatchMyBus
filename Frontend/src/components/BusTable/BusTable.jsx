import "./BusTable.css";

// BusTable receives the filtered buses from App.jsx
function BusTable({ buses }) {

  return (

    <section  id="destinations" className="bus-table">

      {/* Heading */}
      <h2>🚌 Search Results</h2>

      {/* Total buses found */}
      <p className="result-count">
        Showing <strong>{buses.length}</strong> bus{buses.length !== 1 ? "es" : ""}
      </p>

      {/* If buses exist show table */}

      {buses.length > 0 ? (

        <table>

          <thead>

            <tr>

              <th>Bus Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Via Route</th>
              <th>Departure Time</th>

            </tr>

          </thead>

          <tbody>

            {buses.map((bus, index) => (

              <tr key={index}>

                <td>{bus.busName}</td>
                <td>{bus.source}</td>
                <td>{bus.destination}</td>
                <td>{bus.viaRoute}</td>
                <td>
                <span className="time-badge">
                  {bus.departureTime}
                </span>
              </td>

              </tr>

            ))}

          </tbody>

        </table>

      ) : (

        /* If no buses found */

        <div className="no-bus">

          <div className="bus-icon">🚌</div>

          <h3>No buses found</h3>

          <p>Try searching for another destination.</p>

        </div>

      )}

    </section>

  );

}

export default BusTable;
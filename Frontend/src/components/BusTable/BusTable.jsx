import "./BusTable.css";
import NotifyButton from "../Notification/NotifyBus";

// BusTable receives the filtered buses from App.jsx
function BusTable({ buses }) {

  // Converts "13:00:00" -> "1:00 PM"
  const formatTime = (time) => {
    if (!time) return "";

    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minute} ${ampm}`;
  };

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
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Notify</th>

            </tr>

          </thead>

          <tbody>

            {buses.map((bus, index) => (

              <tr key={bus.schedule_id}>

                <td>{bus.bus_name}</td>
                <td>{bus.destination_name}</td>
                <td>
                <span className="time-badge">
                  {formatTime(bus.departure_time)}
                </span>
              </td>
              <td>
                <NotifyButton
                departureTime={bus.departure_time}
                busName={bus.bus_name}
                />
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
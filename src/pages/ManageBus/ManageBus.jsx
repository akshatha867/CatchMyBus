import "./ManageBus.css";
import buses from "../../data/buses";
import { useNavigate } from "react-router-dom";

function ManageBus() {
  const navigate = useNavigate();
  return (
    <div className="managebus-container">

      <h1>Manage Buses</h1>

      <table className="bus-table">

        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Via Route</th>
            <th>Departure Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus, index) => (
            <tr key={index}>
              <td>{bus.busName}</td>
              <td>{bus.source}</td>
              <td>{bus.destination}</td>
              <td>{bus.viaRoute}</td>
              <td>{bus.departureTime}</td>
              <td>
                  <button
                  className="edit-btn"
                  onClick={() => navigate("/admin/editbus")}
                >
                  ✏️ Edit
                </button>

                <button className="delete-btn">
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ManageBus;
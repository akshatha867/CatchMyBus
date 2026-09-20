import "./ManageBus.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageBus() {
  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("http://localhost:5000/admin/buses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setBuses(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (scheduleId) => {
    const token = localStorage.getItem("adminToken");

    try {
      await fetch(`http://localhost:5000/admin/schedules/${scheduleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Bus deleted successfully");
      fetchBuses();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete bus.Please try again")
    }
  };

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

  // Filter buses by destination name (case-insensitive)
  const filteredBuses = buses.filter((bus) =>
    bus.destination_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="managebus-container">

      <h1>Manage Buses</h1>

      <div className="managebus-search">
        <input
          type="text"
          placeholder="Search by destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="bus-table">

        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBuses.map((bus) => (
            <tr key={bus.schedule_id}>
              <td>{bus.bus_name}</td>
              <td>{bus.destination_name}</td>
              <td>{formatTime(bus.departure_time)}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/dashboard/editbus/${bus.schedule_id}`)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(bus.schedule_id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {filteredBuses.length === 0 && (
        <p className="no-results">No buses found for "{searchTerm}"</p>
      )}

    </div>
  );
}

export default ManageBus;
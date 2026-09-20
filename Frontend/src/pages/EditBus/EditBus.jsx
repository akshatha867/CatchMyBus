import "./EditBus.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditBus() {
  const { id } = useParams(); // this is actually the schedule_id
  const navigate = useNavigate();

  const [busId, setBusId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [busName, setBusName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [destinations, setDestinations] = useState([]);

  // Fetch destinations for the dropdown
  useEffect(() => {
    fetch("http://localhost:5000/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch this specific schedule's current data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(`http://localhost:5000/admin/schedules/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBusId(data.bus_id);
        setScheduleId(data.schedule_id);
        setBusName(data.bus_name);
        setServiceType(data.service_type);
        setDestinationId(data.destination_id);
        setDepartureTime(data.departure_time);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      await fetch(`http://localhost:5000/admin/buses/${busId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bus_name: busName,
          service_type: serviceType,
          schedule_id: scheduleId,
          destination_id: destinationId,
          departure_time: departureTime,
        }),
      });

      navigate("/admin/dashboard/managebus");
      toast.success("Bus updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update bus.Please try again");
    }
  };

  return (
    <div className="editbus-container">
      <h1>Edit Bus</h1>

      <form className="editbus-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bus Name</label>
          <input
            type="text"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Service Type</label>
          <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Destination</label>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.destination_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Departure Time</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
}

export default EditBus;
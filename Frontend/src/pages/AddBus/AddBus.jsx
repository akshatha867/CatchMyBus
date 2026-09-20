import "./AddBus.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddBus() {
  const navigate = useNavigate();

  const [busName, setBusName] = useState("");
  const [serviceType, setServiceType] = useState("Private");
  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState("");

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("AM");
  const [timesList,setTimesList]=useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.log(err));
  }, []);

  // Convert 12-hour selection to 24-hour "HH:MM:SS" for the backend
  const buildDepartureTime = () => {
    let h = parseInt(hour, 10);

    if (period === "AM") {
      if (h === 12) h = 0;
    } else {
      if (h !== 12) h += 12;
    }

    const hh = String(h).padStart(2, "0");
    return `${hh}:${minute}:00`;
  };

  const addTimeToList = () => {
  if (!hour || !minute) return;
  setTimesList([...timesList, buildDepartureTime()]);
  setHour("");
  setMinute("");
  setPeriod("AM");
};

const removeTime = (index) => {
  setTimesList(timesList.filter((_, i) => i !== index));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!busName || !destinationId ||timesList.length ===0 ) {
      setError("Please fill in all fields and add atleast one time.");
      return;
    }

    
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("http://localhost:5000/admin/buses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bus_name: busName,
          service_type: serviceType,
          destination_id: destinationId,
          departure_times: timesList,
        }),
      });

      if (!response.ok) {
        setError("Failed to add bus. Please try again.");
        toast.error("Failed to add bus.Please try again.")
        return;
      }

      navigate("/admin/dashboard/managebus");
      toast.success("Bus added successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="addbus-container">

      <h1>Add New Bus</h1>

      <form className="addbus-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Bus Name</label>
          <input
            type="text"
            placeholder="Enter Bus Name"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Source</label>
          <input type="text" value="Belthangady" readOnly />
        </div>

        <div className="form-group">
          <label>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
        </div>

        <div className="form-group">
          <label>Destination</label>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            <option value="">Select destination</option>
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.destination_name}
              </option>
            ))}
          </select>
        </div>

        <div className="time-row">
          <div className="form-group">
            <label>Departure Time</label>
            <div className="time-picker">
              <select value={hour} onChange={(e) => setHour(e.target.value)}>
                <option value="">HH</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>

              <select value={minute} onChange={(e) => setMinute(e.target.value)}>
                <option value="">MM</option>
                {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <button type="button" onClick={addTimeToList}>+Add This Time</button>
            <ul className="times-list">
              {timesList.map((t,i)=>(
                <li key={i}>
                  {t}
                  <button type="button" onClick={()=> removeTime(i)}>x</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Save Bus</button>

      </form>

    </div>
  );
}

export default AddBus;
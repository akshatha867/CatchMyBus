import "./Dashboard.css";
import { useEffect, useState } from "react";

function Dashboard() {
  const [totalBuses, setTotalBuses] = useState(0);
  const [totalRoutes, setTotalRoutes] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [recentBuses, setRecentBuses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // Total buses
    fetch("http://localhost:5000/buses")
      .then(res => res.json())
      .then(data => setTotalBuses(data.length))
      .catch(err => console.error(err));

    // Total routes (destinations)
    fetch("http://localhost:5000/destinations")
      .then(res => res.json())
      .then(data => setTotalRoutes(data.length))
      .catch(err => console.error(err));

    // Visitor count (real, from the visits table)
    fetch("http://localhost:5000/visits")
      .then(res => res.json())
      .then(data => setVisitorCount(data.total_count))
      .catch(err => console.error(err));

    // Recent bus updates (latest schedules, using admin route since it needs auth)
    fetch("http://localhost:5000/admin/buses", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        // Sort by schedule_id descending (highest id = most recently added) and take top 3
        const sorted = [...data].sort((a, b) => b.schedule_id - a.schedule_id);
        setRecentBuses(sorted.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="main-content">

      <div className="dashboard-header">
        <h1>Welcome Admin 👋</h1>
        <p>Manage your bus information and monitor your website from here.</p>
      </div>

      <div className="dashboard-cards">

        <div className="card bus-card">
          <div className="card-title">
            🚌
            <span>Total Buses</span>
          </div>
          <h2>{totalBuses}</h2>
          <p>Available buses</p>
        </div>

        <div className="card route-card">
          <div className="card-title">
            📍
            <span>Total Destinations</span>
          </div>
          <h2>{totalRoutes}</h2>
          <p>Active destinations</p>
        </div>

        <div className="card visitor-card">
          <div className="card-title">
            👥
            <span>Visitors</span>
          </div>
          <h2>{visitorCount}</h2>
          <p>Website visitors</p>
        </div>

        <div className="card update-card">
          <div className="card-title">
            ⏰
            <span>Last Updated</span>
          </div>
          <h2>Today</h2>
          <p>Bus information</p>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-panel">
          <div className="panel-header">
            <div className="panel-icon">📊</div>
            <div>
              <h2>System Overview</h2>
              <p>Current website status</p>
            </div>
          </div>

          <div className="status-list">
            <div className="status-item">
              <span>Website</span>
              <strong className="status-active">● Active</strong>
            </div>
            <div className="status-item">
              <span>Bus Information</span>
              <strong className="status-active">● Available</strong>
            </div>
            <div className="status-item">
              <span>Database</span>
              <strong className="status-active">● Connected</strong>
            </div>
            <div className="status-item">
              <span>Last Update</span>
              <strong>Today</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div className="panel-icon">🚌</div>
            <div>
              <h2>Recent Bus Updates</h2>
              <p>Recently added bus schedules</p>
            </div>
          </div>

          <div className="recent-buses">
            {recentBuses.length === 0 ? (
              <p>No recent updates.</p>
            ) : (
              recentBuses.map((bus) => (
                <div className="recent-bus" key={bus.schedule_id}>
                  <div className="bus-small-icon">🚌</div>
                  <div className="bus-info">
                    <h3>{bus.bus_name}</h3>
                    <p>{bus.destination_name} • {bus.departure_time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <div className="admin-notice">
        <div className="notice-icon">📢</div>
        <div>
          <h2>Admin Notice</h2>
          <p>
            Keep bus routes and departure timings up to date
            to provide accurate information to passengers.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
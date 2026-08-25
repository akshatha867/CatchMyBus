import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="main-content">

      {/* Page Header */}
      <div className="dashboard-header">

        <h1>Welcome Admin 👋</h1>

        <p>
          Manage your bus information and monitor your website from here.
        </p>

      </div>


      {/* =========================
          TOP STAT CARDS
      ========================= */}

      <div className="dashboard-cards">

        <div className="card bus-card">

          <div className="card-title">
            🚌
            <span>Total Buses</span>
          </div>

          <h2>28</h2>

          <p>Available buses</p>

        </div>


        <div className="card route-card">

          <div className="card-title">
            📍
            <span>Total Routes</span>
          </div>

          <h2>15</h2>

          <p>Active destinations</p>

        </div>


        <div className="card visitor-card">

          <div className="card-title">
            👥
            <span>Visitors</span>
          </div>

          <h2>1245</h2>

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


      {/* =========================
          DASHBOARD INFORMATION
      ========================= */}

      <div className="dashboard-grid">


        {/* SYSTEM OVERVIEW */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div className="panel-icon">
              📊
            </div>

            <div>
              <h2>System Overview</h2>

              <p>
                Current website status
              </p>
            </div>

          </div>


          <div className="status-list">

            <div className="status-item">

              <span>Website</span>

              <strong className="status-active">
                ● Active
              </strong>

            </div>


            <div className="status-item">

              <span>Bus Information</span>

              <strong className="status-active">
                ● Available
              </strong>

            </div>


            <div className="status-item">

              <span>Database</span>

              <strong className="status-active">
                ● Connected
              </strong>

            </div>


            <div className="status-item">

              <span>Last Update</span>

              <strong>
                Today
              </strong>

            </div>

          </div>

        </div>



        {/* RECENT BUS UPDATES */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div className="panel-icon">
              🚌
            </div>

            <div>

              <h2>Recent Bus Updates</h2>

              <p>
                Recently updated bus information
              </p>

            </div>

          </div>


          <div className="recent-buses">


            <div className="recent-bus">

              <div className="bus-small-icon">
                🚌
              </div>

              <div className="bus-info">

                <h3>Shree Ganesh</h3>

                <p>
                  Mangalore • 08:30 AM
                </p>

              </div>

            </div>


            <div className="recent-bus">

              <div className="bus-small-icon">
                🚌
              </div>

              <div className="bus-info">

                <h3>Sri Durga</h3>

                <p>
                  Moodbidri • 09:15 AM
                </p>

              </div>

            </div>


            <div className="recent-bus">

              <div className="bus-small-icon">
                🚌
              </div>

              <div className="bus-info">

                <h3>Ganesh Prasad</h3>

                <p>
                  Ujire • 10:00 AM
                </p>

              </div>

            </div>


          </div>

        </div>

      </div>



      {/* =========================
          ADMIN NOTICE
      ========================= */}

      <div className="admin-notice">

        <div className="notice-icon">
          📢
        </div>

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
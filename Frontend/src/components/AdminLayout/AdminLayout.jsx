import "./AdminLayout.css";
import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>🚌 Catch My Bus</h2>

        <ul>

          <li>
            <NavLink to="/admin/dashboard">🏠 Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/addbus">➕ Add Bus</NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/managebus">🚌 Manage Buses</NavLink>
          </li>

          <li>
            <NavLink to="/admin" end >🚪 Logout</NavLink>
          </li>

        </ul>

      </div>

      {/* Page Content */}
      <div className="admin-content">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;
import "./Login.css";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();
  return (
    <div className="admin-login">

      <div className="login-card">

        <h1>🚌 Catch My Bus</h1>

        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button onClick={() => navigate("/admin/dashboard")}>
          Login
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;
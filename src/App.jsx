// Import React Hook
import { useState } from "react";

// React Router
import { Routes, Route } from "react-router-dom";

// User Components
import ChatBot from "./components/Chatbot/Chatbot";
import EditBus from "./pages/EditBus/EditBus";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AddBus from "./pages/AddBus/AddBus";
import ManageBus from "./pages/ManageBus/ManageBus";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import BusTable from "./components/BusTable/BusTable";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// Admin Page
import AdminLogin from "./pages/Login/Login";

// Bus Data
import buses from "./data/buses";
// ---------------- HOME PAGE ----------------

function HomePage() {

  const [filteredBuses, setFilteredBuses] = useState(buses);

  const handleSearch = (destination) => {

    if (destination === "") {
      setFilteredBuses(buses);
      return;
    }

    const result = buses.filter(
      (bus) =>
        bus.destination.toLowerCase() === destination.toLowerCase()
    );

    setFilteredBuses(result);
  };

  return (
    <>
      <Navbar />

      <Hero onSearch={handleSearch} />

      <BusTable buses={filteredBuses} />

      <About />

      <Contact />

      <Footer />
      <ChatBot/>
    </>
  );
}

// ---------------- APP ----------------

function App() {
  return (
<Routes>

  {/* Public Website */}
  <Route path="/" element={<HomePage />} />

  {/* Admin Login */}
  <Route path="/admin" element={<AdminLogin />} />

  {/* Admin Panel */}
  <Route path="/admin" element={<AdminLayout />}>

    <Route path="dashboard" element={<Dashboard />} />

    <Route path="addbus" element={<AddBus />} />

    <Route path="managebus" element={<ManageBus />} />

    <Route path="editbus" element={<EditBus />} />
    <Route path="footer" elemnt={<Footer/>}/>

  </Route>

</Routes>
  );
}

export default App;
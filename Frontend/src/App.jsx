import { useState,useRef,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import BusTable from "./components/BusTable/BusTable";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ChatBot from "./components/Chatbot/Chatbot";



import AdminLogin from "./pages/Login/Login";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddBus from "./pages/AddBus/AddBus";
import ManageBus from "./pages/ManageBus/ManageBus";
import EditBus from "./pages/EditBus/EditBus";

import buses from "./data/buses";
import destinations from "./data/destination";


// ---------------- HOME PAGE ----------------

function HomePage() {

  // Initially there are no search results
  const [filteredBuses, setFilteredBuses] = useState([]);

  // Controls whether the result table is visible
  const [hasSearched, setHasSearched] = useState(false);
   // Tracks which destination button was last clicked
  const [selectedDestination, setSelectedDestination] = useState("");
  const resultsRef = useRef(null);

  useEffect(() => {
    if (hasSearched && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasSearched, filteredBuses]);
 
  // Search function
  const handleSearch = async (destination) => {

    // If nothing is selected
    if (destination === "") {
      setFilteredBuses([]);
      setHasSearched(false);
      return;
    }

    // Remember which destination was clicked/searched
    setSelectedDestination(destination);

    try {
      // Call your backend search route
      const response = await fetch(
        `http://localhost:5000/search?destination=${destination}`
      );
      const result = await response.json();

      // Store results
      setFilteredBuses(result);

      // Show result table
      setHasSearched(true);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Navbar />

      <Hero onSearch={handleSearch} />

      {/* ================= POPULAR DESTINATIONS ================= */}
      <section className="home-destinations">
        <h2>📍 Popular Destinations</h2>
        <p>Select a destination to find available buses</p>

        <div className="destination-list">
          {destinations.map((destination, index) => (
            <button
              key={index}
              className={selectedDestination === destination ? "destination-button selected" : "destination-button"}
              onClick={() => handleSearch(destination)}
            >
              📍 {destination}
            </button>
          ))}
        </div>
      </section>


      

      {/* ================= SEARCH RESULTS ================= */}

      <div ref={resultsRef}>
        {hasSearched && (
          <BusTable buses={filteredBuses} />
        )}
      </div>

      <Footer />

      <ChatBot />

    </>
  );
}


// ---------------- ABOUT PAGE ----------------

function AboutPage() {

  return (
    <>
      <Navbar />

      <About />

      <Footer />
    </>
  );
}


// ---------------- CONTACT PAGE ----------------

function ContactPage() {

  return (
    <>
      <Navbar />

      <Contact />

      <Footer />
    </>
  );
}


// ---------------- APP ----------------

function App() {

  return (
    <>
    <ToastContainer position="top-center" autoClose={2000}/>
  
    <Routes>

      {/* USER PAGES */}

      <Route
        path="/"
        element={<HomePage />}
      />

      

      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route
        path="/contact"
        element={<ContactPage />}
      />


      {/* ADMIN LOGIN */}

      <Route
        path="/admin"
        element={<AdminLogin />}
      />


      {/* ADMIN PANEL */}

      <Route
        path="/admin/dashboard"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="addbus"
          element={<AddBus />}
        />

        <Route
          path="managebus"
          element={<ManageBus />}
        />

        <Route
          path="editbus/:id"
          element={<EditBus />}
        />

      </Route>

    </Routes>
      </>
  );
}

export default App;
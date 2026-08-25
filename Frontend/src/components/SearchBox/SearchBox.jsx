import "./SearchBox.css";
// Import React Hook
import { useState } from "react";
// Import destination list
import destinations from "../../data/destination";
// SearchBox receives the onSearch function from Hero
function SearchBox({ onSearch }) {
  // Stores the selected destination
  const [destination, setDestination] = useState("");
  // Stores matching suggestions
  const [suggestions, setSuggestions] = useState([]);
  // Stores validation message
  const [error, setError] = useState("");
  // Function that runs when searching
  const handleSearch = () => {
    // Validation
    if (destination.trim() === "") {
      setError("Please select a destination.");
      return;
    }
    // Remove error
    setError("");
    // Hide suggestions
    setSuggestions([]);
    // Send destination to App.jsx
    onSearch(destination);
  };
  return (
    // Form automatically supports Enter key
    <form
      className="search-box"
      onSubmit={(e) => {
        // Prevent page refresh
        e.preventDefault();
        // Search
        handleSearch();
      }}
    >
      {/* FROM FIELD */}
      <div className="field">
        <label>From</label>
        <input
          type="text"
          value="Belthangady"
          readOnly
        />
      </div>
      {/* DESTINATION FIELD */}
      <div className="field">
        <label>Destination</label>
        <input
          type="text"
          placeholder="Search destination..."
          value={destination}
          onChange={(e) => {
            const value = e.target.value;
            setDestination(value);
            // Remove suggestions if empty
            if (value === "") {
              setSuggestions([]);
              return;
            }
            // Filter matching places
            const filtered = destinations.filter((place) =>
              place.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filtered);
          }}
        />
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((place, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => {
                // Fill the input with the selected destination
                setDestination(place);
                // Hide the suggestions
                setSuggestions([]);
                // Remove validation message
                setError("");
                // Search immediately
                onSearch(place);
            }}
              >
                📍 {place}
              </div>
            ))}
          </div>
        )}
        {/* Validation */}
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}
      </div>
      {/* SEARCH BUTTON */}
      <button
        className="search-btn"
        type="submit"
      >
        Search Bus
      </button>
    </form>
  );
}
export default SearchBox;
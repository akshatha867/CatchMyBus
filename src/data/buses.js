// This file stores the bus data.
// For now, we're using dummy data.
// Later, this data will come from the backend/database.

const buses = [
  {
    id: 1,
    busName: "Sri Durga Prasad",
    source: "Belthangady",
    destination: "Mangalore",
    viaRoute: "Puttur",
    departureTime: "06:30 AM",
  },

  {
    id: 2,
    busName: "Souparnika",
    source: "Belthangady",
    destination: "Mangalore",
    viaRoute: "Moodbidri",
    departureTime: "08:00 AM",
  },

  {
    id: 3,
    busName: "Vijaya",
    source: "Belthangady",
    destination: "Bangalore",
    viaRoute: "Dharmasthala",
    departureTime: "09:15 AM",
  },

  {
    id: 4,
    busName: "Durgamba",
    source: "Belthangady",
    destination: "Ujire",
    viaRoute: "Puttur",
    departureTime: "10:30 AM",
  },

  {
    id: 5,
    busName: "Kaveri",
    source: "Belthangady",
    destination: "Mysore",
    viaRoute: "Hassan",
    departureTime: "01:00 PM",
  },
];

// Exporting the array so other components can use it.
export default buses;
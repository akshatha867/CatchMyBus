import "./AddBus.css";

function AddBus() {
  return (
    <div className="addbus-container">

      <h1>Add New Bus</h1>

      <form className="addbus-form">

        <div className="form-group">
          <label>Bus Name</label>
          <input
            type="text"
            placeholder="Enter Bus Name"
          />
        </div>

        <div className="form-group">
  <label>Source</label>
  <input
    type="text"
    value="Belthangady"
    readOnly
  />
</div>

        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            placeholder="Enter Destination"
          />
        </div>

        <div className="form-group">
          <label>Via Route</label>
          <input
            type="text"
            placeholder="Enter Via Route"
          />
        </div>

        <div className="time-row">

          <div className="form-group">
            <label>Departure Time</label>
            <input type="time" />
          </div>

        </div>

        <button type="submit">
          Save Bus
        </button>

      </form>

    </div>
  );
}

export default AddBus;
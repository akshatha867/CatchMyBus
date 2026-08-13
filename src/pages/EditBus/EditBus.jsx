import "./EditBus.css";

function EditBus() {
  return (
    <div className="editbus-container">

      <h1>Edit Bus</h1>

      <form className="editbus-form">

        <div className="form-group">
          <label>Bus Name</label>
          <input type="text" defaultValue="Express" />
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
          <input type="text" defaultValue="Mangalore" />
        </div>

        <div className="form-group">
          <label>Via Route</label>
          <input type="text" defaultValue="Ujire" />
        </div>

        <div className="form-group">
          <label>Departure Time</label>
          <input type="time" />
        </div>

        <button type="submit">
          Update Bus
        </button>

      </form>

    </div>
  );
}

export default EditBus;
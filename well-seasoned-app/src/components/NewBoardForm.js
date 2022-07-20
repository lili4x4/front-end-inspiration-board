import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "./NewBoardForm.css";

const kDefaultFormState = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ onBoardDataReady }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errorDisplay = document.getElementById("errorNoTitle");
    if (formData.title.length === 0) {
      errorDisplay.textContent = "Message cannot be empty";
    } else {
      errorDisplay.textContent = "";
      onBoardDataReady(formData);
      setFormData(kDefaultFormState);
    }
  };

  return (
    <div id="new-board-form">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Add a Board</h3>
        <label>Board Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        ></input>
        <label>Owner</label>
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
        ></input>
        <p id="errorNoTitle"></p>
        <input id="submit-button" type="submit" value="Add Board"></input>
      </form>
    </div>
  );
};

export default NewBoardForm;

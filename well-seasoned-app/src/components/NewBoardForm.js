import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "./NewBoardForm.css";
import { useNavigate } from "react-router-dom";

const kDefaultFormState = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ onBoardDataReady }) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  let navigate = useNavigate();

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await onBoardDataReady(formData);
    navigate("/");
    setFormData(kDefaultFormState);
  }

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
        <input id="submit-button" type="submit" value="Add Board"></input>
      </form>
    </div>
  );
};

export default NewBoardForm;

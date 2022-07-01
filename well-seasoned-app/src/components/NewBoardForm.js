import React, { useState } from "react";
import PropTypes from "prop-types";

const kDefaultFormState = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ onBoardDataReady }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    console.log(event.target.value);
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onBoardDataReady(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <div className="NewBoardForm">
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Add Board"></input>
      </form>
    </div>
  );
};

export default NewBoardForm;

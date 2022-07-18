import React from "react";
import PropTypes from "prop-types";
import "./BoardDropdown.css";
import "../App.css";

const BoardDropdown = ({ boardData, chooseBoard }) => {
  const dropdownOptions = boardData.map((board) => {
    return (
      <option
        key={board.board_id}
        id={board.board_id}
        value={JSON.stringify(board)}
      >
        {board.title}
      </option>
    );
  });

  const handleSelection = (event) => {
    const eventValue = JSON.parse(event.target.value);
    chooseBoard(eventValue);
  };

  return (
    <div id="board-dropdown">
      <label id="heading" htmlFor="boardDropdown">
        Select a Board
      </label>
      <select
        name="boardDropdown"
        id="boardDropdown"
        onChange={handleSelection}
      >
        <option disabled selected value>
          ---
        </option>
        {dropdownOptions}
      </select>
    </div>
  );
};

export default BoardDropdown;

import React from "react";
import PropTypes from "prop-types";

const BoardDropdown = ({ boardData, chooseBoard }) => {
  //use map function to get separate list of just board titles? use that for info for dropdown?

  const dropdownOptions = boardData.map((board) => {
    return (
      <option key={board.board_id} id={board.board_id} value={board}>
        {board.title}
      </option>
    );
  });

  const handleSelection = (event) => {
    chooseBoard(event.target.value);
  };

  //chooseBoard function needs a single object of board data to process
  //so whatever function happens on selection of an item from the dropdown menu, we need to pass in
  //the full data object, not just the name from the menu
  return (
    <div>
      <label htmlFor="boardDropdown">Select a Board</label>
      <select
        name="boardDropdown"
        id="boardDropdown"
        onChange={handleSelection}
      >
        <option disabled selected value>
          Blank Test Board
        </option>
        {dropdownOptions}
      </select>
      ;
    </div>
  );
};

export default BoardDropdown;

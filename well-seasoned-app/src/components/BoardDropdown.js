import React from "react";
import PropTypes from "prop-types";

const BoardDropdown = ({ boardData, chooseBoard }) => {
  //use map function to get separate list of just board titles? use that for info for dropdown?

  //chooseBoard function needs a single object of board data to process
  //so whatever function happens on selection of an item from the dropdown menu, we need to pass in
  //the full data object, not just the name from the menu
  return <h3>Board Dropdown Here!</h3>;
};

export default BoardDropdown;

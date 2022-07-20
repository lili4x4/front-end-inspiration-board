import React, { useState } from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import NewCardForm from "./NewCardForm";

const MainContent = ({
  chosenBoardData,
  increaseLikes,
  deleteCardApp,
  handleCardDataReady,
}) => {
  return (
    <div>
      <Board
        chosenBoardData={chosenBoardData}
        increaseLikes={increaseLikes}
        deleteCardApp={deleteCardApp}
      />
      <NewCardForm
        id="new-card-form"
        onHandleCardDataReady={handleCardDataReady}
        chosenBoard={chosenBoardData}
      />
    </div>
  );
};

MainContent.propTypes = {
  chosenBoardData: PropTypes.shape({
    board_id: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
  }).isRequired,
  increaseLikes: PropTypes.func.isRequired,
  deleteCardApp: PropTypes.func.isRequired,
  onHandleCardDataReady: PropTypes.func.isRequired,
};

export default MainContent;

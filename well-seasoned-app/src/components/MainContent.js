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

export default MainContent;

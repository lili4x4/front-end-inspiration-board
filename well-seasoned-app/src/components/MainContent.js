import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import NewCardForm from "./NewCardForm";
import "./MainContent.css";

const MainContent = ({
  chosenBoardData,
  increaseLikes,
  deleteCardApp,
  onHandleCardDataReady,
  deleteBoardApp,
}) => {
  const deleteBoardSafely = () => {
    const protectedBoardIds = [2, 3, 4, 5];
    const errorDisplay = document.getElementById("error-message-board");
    if (protectedBoardIds.includes(chosenBoardData.board_id)) {
      errorDisplay.textContent = "Protected boards cannot be deleted.";
    } else {
      errorDisplay.textContent = "";
      deleteBoardApp(chosenBoardData.board_id);
    }
  };

  return (
    <div id="all-MainContent">
      <NewCardForm
        id="new-card-form"
        onHandleCardDataReady={onHandleCardDataReady}
        chosenBoard={chosenBoardData}
      />
      <Board
        chosenBoardData={chosenBoardData}
        increaseLikes={increaseLikes}
        deleteCardApp={deleteCardApp}
      />
      <div>
        <button className="delete-board" onClick={deleteBoardSafely}>
          Delete Board
        </button>
        <p id="error-message-board"></p>
      </div>
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
  deleteBoardApp: PropTypes.func.isRequired,
};

export default MainContent;

import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

const Board = ({ chosenBoardData /*increaseLikes*/ }) => {
  //shape of chosenBoardData
  //{
  //  board_id: #,
  //  owner: string
  //  title: string
  //  cards: [
  //    {
  //    board_id: #
  //    card_id: #
  //    likes_count: #
  //    message: string
  //  },
  //    ...
  //  ]
  // }

  const boardTitle =
    chosenBoardData !== [] ? chosenBoardData.title : "Placeholder Board Title";

  const messageData = () => {
    if (chosenBoardData === []) {
      return "";
    } else {
      chosenBoardData.cards.map((card) => {
        return (
          <Card
            // increaseLikesCard={increaseLikes}
            key={card.card_id}
            id={card.card_id}
            boardId={card.board_id}
            message={card.message}
            likesCount={card.likes_count}
          />
        );
      });
    }
  };

  const messages = messageData(chosenBoardData);

  return (
    <div>
      <h2>{boardTitle}</h2>
      <ul>{messages}</ul>
    </div>
  );
};

const cardObjectShape = {
  board_id: PropTypes.number,
  card_id: PropTypes.number,
  likes_count: PropTypes.number,
  message: PropTypes.string,
};

Board.propTypes = {
  increaseLikes: PropTypes.func.isRequired,
  chosenBoardData: PropTypes.shape({
    board_id: PropTypes.number,
    owner: PropTypes.string,
    title: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.shape(cardObjectShape)),
  }).isRequired,
};

export default Board;

import React from "react";
import PropTypes from "prop-types";

const Card = ({ cardId, message, likesCount, boardId, increaseLikesCard }) => {
  const updateLikes = () => {
    likesCount += 1;
    const newCard = {
      cardId,
      message,
      likesCount,
      boardId,
    };
    increaseLikesCard(newCard);
  };

  return (
    <li>
      <p>{message}</p>
      <p>{likesCount}</p>
      <button onClick={updateLikes}>increase likes</button>
    </li>
  );
};

export default Card;

import React from "react";
import PropTypes from "prop-types";

const Card = ({ cardId, message, likesCount, boardId, increaseLikesCard }) => {
  const increaseLikes = () => {
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
    <section>
      <p>{message}</p>
      <p>{likesCount}</p>
      <button onClick={increaseLikes}>increase likes</button>
    </section>
  );
};

export default Card;

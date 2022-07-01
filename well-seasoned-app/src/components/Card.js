import React from "react";
import PropTypes from "prop-types";

const Card = ({ cardId, message, likesCount, boardId }) => {
  // const increaseLikes = () => {
  //   likesCount += 1;
  //   const newCard = {
  //     cardId,
  //     message,
  //     likesCount,
  //     boardId,
  //   };
  //   // increaseLikesCard(newCard);
  // };

  return (
    <li>
      <p>{message}</p>
      <p>{likesCount}</p>
      <button /*onClick={increaseLikes}*/>increase likes</button>
    </li>
  );
};

export default Card;

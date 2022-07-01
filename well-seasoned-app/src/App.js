import { useState, useEffect } from "react";
import "./App.css";
import BoardDropdown from "./components/BoardDropdown";
import Board from "./components/Board";
import NewCardForm from "./components/NewCardForm";
import NewBoardForm from "./components/NewBoardForm";
import axios from "axios";

const kBaseUrl = "https://well-seasoned-app.herokuapp.com";

const getBoards = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// messageData:
// {cardID: #
//  boardId: #,
//  likesData: #,
//  message: string}
const patchCard = (messageData) => {
  const patchRequest = {
    card_id: messageData.cardId,
    board_id: messageData.boardId,
    message: messageData.message,
    likes_count: messageData.likesCount,
  };
  return axios
    .patch(`${kBaseUrl}/cards/${messageData.cardId}`, patchRequest)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const blankBoard = {
  board_id: 0,
  owner: "",
  title: "",
  cards: [],
};

function App() {
  const [boardData, setBoardData] = useState([]);
  const [chosenBoard, setChosenBoard] = useState(blankBoard);

  useEffect(() => {
    updateBoards();
  }, []);

  const chooseBoard = (boardInfo) => {
    const filteredData = boardData.filter((data) => {
      return data.board_id === boardInfo.board_id;
    });
    const board = filteredData[0];
    setChosenBoard(board);
  };

  const updateBoards = () => {
    getBoards().then((boards) => {
      setBoardData(boards);
    });
  };

  const increaseLikes = (messageData) => {
    patchCard(messageData).then(updateBoards());
  };

  return (
    <div>
      <header>
        <h1>Well-Seasoned</h1>
        <BoardDropdown boardData={boardData} chooseBoard={chooseBoard} />
      </header>
      <main>
        <NewCardForm />
        <Board chosenBoardData={chosenBoard} increaseLikes={increaseLikes} />
        <NewBoardForm />
      </main>
    </div>
  );
}

export default App;

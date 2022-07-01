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

// incomplete:
// {cardID: #,
//  likesData: #}
// const increaseLikes = (messageData) => {
//   return axios
//     .patch(`${kBaseUrl}/cards/${messageData.cardId}`, {
//       likes_count: messageData.likesCount,
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const blankBoard = {
  board_id: 0,
  owner: "",
  title: "",
  cards: [],
};

// Callback function that makes API call to create new board
const createNewBoardCallback = (boardData) => {
  return axios
    .post(`${kBaseUrl}/boards`, boardData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

function App() {
  const [boardData, setBoardData] = useState([]);
  const [chosenBoard, setChosenBoard] = useState(blankBoard);

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

  useEffect(() => {
    updateBoards();
  }, []);

  const createNewBoard = (boardData) => {
    createNewBoardCallback(boardData).then((newBoard) => {
      setBoardData((oldData) => [...oldData, newBoard]);
    });
  };

  const handleBoardDataReady = (formData) => {
    createNewBoard(formData);
  };

  return (
    <div>
      <header>
        <h1>Well-Seasoned</h1>
        <BoardDropdown boardData={boardData} chooseBoard={chooseBoard} />
      </header>
      <main>
        <NewCardForm />
        <Board chosenBoardData={chosenBoard} />
        <NewBoardForm onBoardDataReady={handleBoardDataReady} />
      </main>
    </div>
  );
}

export default App;

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

const getOneBoard = (boardId) => {
  return axios
    .get(`${kBaseUrl}/boards/${boardId}`)
    .then((response) => {
      console.log({ getOneBoard: response.data });
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

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
      console.log({ patchResponseData: response.data });
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

  //something about the asynchronity is not working here
  //my getOneBoard function is firing before it has the patch response data
  //which means its not getting the board info with the updated likes count
  const increaseLikes = (messageData) => {
    console.log({ cardData: messageData });
    patchCard(messageData)
      .then((patchResponse) => {
        getOneBoard(patchResponse.card.boardId);
      })
      .then((boardResponse) => {
        setChosenBoard(boardResponse.board);
      });
  };

  useEffect(() => {
    updateBoards();
  }, []);

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

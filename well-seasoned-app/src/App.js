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
const increaseLikes = (cardId) => {
  return axios
    .patch(`${kBaseUrl}/cards/${cardId}`, {likesData:})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

function App() {
  const [boardData, setBoardData] = useState([]);
  const updateBoards = () => {
    getBoards().then((boards) => {
      setBoardData(boards);
    });
  };

  useEffect(() => {
    updateBoards();
  }, []);

  return (
    <div>
      <header>
        <h1>Well-Seasoned</h1>
        <BoardDropdown />
      </header>
      <main>
        <NewCardForm />
        <Board />
        <NewBoardForm />
      </main>
    </div>
  );
}

export default App;

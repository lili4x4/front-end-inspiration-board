import { useState, useEffect, useRef } from "react";
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

// Callback function that makes API call to create new board
const createNewBoardCallback = (boardData) => {
  return axios
    .post(`${kBaseUrl}/boards`, boardData)
    .then((response) => {
      return response.data.board;
    })
    .catch((err) => {
      console.log(err);
    });
};

function App() {
  const [boardData, setBoardData] = useState([]);
  const [chosenBoard, setChosenBoard] = useState(blankBoard);
  const ref = useRef(null);

  const chooseBoard = (boardInfo) => {
    const filteredData = boardData.filter((data) => {
      return data.board_id === boardInfo.board_id;
    });
    const board = filteredData[0];
    setTheme(board);
    setChosenBoard(board);
  };

  const setTheme = (board) => {
    const themeHeader = ref.current;
    const themeBody = document.getElementsByTagName("body")[0];
    console.log("ThemeBody is " + themeBody.current);

    console.log("ThemeHeader is " + themeHeader.current);
    console.log("chosenBoard.title=" + chosenBoard.title);
    if (board.title === "Summer") {
      themeHeader.setAttribute("id", "summer-header");
      themeBody.setAttribute("id", "summer-body");
    } else if (board.title === "Spring") {
      themeHeader.setAttribute("id", "spring-header");
      themeBody.setAttribute("id", "spring-body");
    } else if (board.title === "Fall") {
      themeHeader.setAttribute("id", "fall-header");
      themeBody.setAttribute("id", "fall-body");
    } else if (board.title === "Winter") {
      themeHeader.setAttribute("id", "winter-header");
      themeBody.setAttribute("id", "winter-body");
    } else {
      themeHeader.setAttribute("id", "default-header");
      themeBody.setAttribute("id", "default-body");
    }
  };

  const updateBoards = () => {
    getBoards().then((boards) => {
      setBoardData(boards);
    });
  };

  const deleteCard = (cardId) => {
    console.log("Entered deleteCard in App. CardId is " + cardId);
    axios
      .delete(`${kBaseUrl}/cards/${cardId}`)
      .then(() => {
        getOneBoard(chosenBoard.board_id).then((boardResponse) => {
          setChosenBoard(boardResponse.board);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseLikes = (messageData) => {
    patchCard(messageData).then((patchResponse) => {
      getOneBoard(patchResponse.card.board_id).then((boardResponse) => {
        setChosenBoard(boardResponse.board);
      });
    });
  };

  useEffect(() => {
    updateBoards();

    const themeHeader = "ref.current";
    console.log("ThemeHeader is " + themeHeader.current);

    const themeBody = document.getElementsByTagName("body");
    console.log("ThemeBody is " + themeBody.current);
  }, []);

  const createNewBoard = (newBoardData) => {
    createNewBoardCallback(newBoardData).then((newBoard) => {
      setBoardData((oldData) => [...oldData, newBoard]);
    });
  };

  const handleBoardDataReady = (formData) => {
    createNewBoard(formData);
  };

  // const updateTheme = () => {
  //   const themeId =
  // }

  return (
    <div>
      <header id="default-header" ref={ref}>
        <h1>Well-Seasoned</h1>
        <BoardDropdown boardData={boardData} chooseBoard={chooseBoard} />
      </header>
      <main id="default-body">
        <NewCardForm id="new-card-form" />
        <Board
          chosenBoardData={chosenBoard}
          increaseLikes={increaseLikes}
          deleteCardApp={deleteCard}
        />
        <NewBoardForm onBoardDataReady={handleBoardDataReady} />
      </main>
    </div>
  );
}

export default App;

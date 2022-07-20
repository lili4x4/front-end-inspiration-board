import { useState, useEffect, useRef } from "react";
import "./App.css";
import BoardDropdown from "./components/BoardDropdown";
import NewBoardForm from "./components/NewBoardForm";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainContent from "./components/MainContent";

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

// callback function that makes API call to create new card form
const createNewCardCallback = (cardData, boardID) => {
  console.log("in API Call!");

  return axios
    .post(`${kBaseUrl}/boards/${boardID}/cards`, cardData)
    .then((response) => {
      console.log(response.data.board);
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
    setChosenBoard(boardInfo);
  };

  const setTheme = (board) => {
    if (board.board_id !== 0) {
      const themeHeader = ref.current;
      const themeBody = document.getElementsByTagName("body")[0];
      // console.log("ThemeBody is " + themeBody.current);

      console.log("ThemeHeader is " + themeHeader.current);
      console.log("chosenBoard.title=" + chosenBoard.title);
      switch (board.title) {
        case "Summer":
          themeHeader.setAttribute("id", "summer-header");
          themeBody.setAttribute("id", "summer-body");
          break;
        case "Spring":
          themeHeader.setAttribute("id", "spring-header");
          themeBody.setAttribute("id", "spring-body");
          break;
        case "Fall":
          themeHeader.setAttribute("id", "fall-header");
          themeBody.setAttribute("id", "fall-body");
          break;
        case "Winter":
          themeHeader.setAttribute("id", "winter-header");
          themeBody.setAttribute("id", "winter-body");
          break;
        default:
          themeHeader.setAttribute("id", "default-header");
          themeBody.setAttribute("id", "default-body");
      }
    }

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
      // console.log("ThemeHeader is " + themeHeader.current);

      const themeBody = document.getElementsByTagName("body");
      // console.log("ThemeBody is " + themeBody.current);
    }, []);

    const createNewBoard = (newBoardData) => {
      return createNewBoardCallback(newBoardData)
        .then((newBoard) => {
          const newData = [...boardData, newBoard];
          setBoardData(newData);
          return newBoard;
        })
        .then((returnBoard) => {
          chooseBoard(returnBoard);
        });
    };

    const handleBoardDataReady = (formData) => {
      return createNewBoard(formData);
    };

    const createCard = (cardData, boardID) => {
      createNewCardCallback(cardData, boardID)
        .then((boardWithNewCard) => {
          setBoardData((oldData) => {
            return oldData.map((board) => {
              if (board.board_id === boardID) {
                return boardWithNewCard;
              } else {
                return board;
              }
            });
          });
          setChosenBoard(boardWithNewCard);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const handleCardDataReady = (cardData, boardID) => {
      createCard(cardData, boardID);
    };

    setTheme(chosenBoard);

    return (
      <BrowserRouter>
        <header id="default-header" ref={ref}>
          <Link to="/">
            <h1>Well-Seasoned</h1>
          </Link>
          <BoardDropdown boardData={boardData} chooseBoard={chooseBoard} />
          <Link to="/new-board">Add New Board</Link>
        </header>
        <main id="default-body">
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  chosenBoardData={chosenBoard}
                  increaseLikes={increaseLikes}
                  deleteCardApp={deleteCard}
                  onHandleCardDataReady={handleCardDataReady}
                />
              }
            ></Route>
            <Route
              path="/new-board"
              element={<NewBoardForm onBoardDataReady={handleBoardDataReady} />}
            ></Route>
          </Routes>
        </main>
      </BrowserRouter>
    );
  };
}

export default App;

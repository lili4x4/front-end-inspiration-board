import logo from "./logo.svg";
import "./App.css";
import BoardDropdown from "./components/BoardDropdown";
import Board from "./components/Board";
import NewCardForm from "./components/NewCardForm";

function App() {
  return (
    <div>
      <header>
        <h1>Well-Seasoned</h1>
        <BoardDropdown />
      </header>
      <main>
        <NewCardForm />
        <Board />
      </main>
    </div>
  );
}

export default App;

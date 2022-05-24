import { Routes, Route } from "react-router-dom";
import Game from "./routes/Game";
import SignUp from "./routes/SignUp";
import GameLogic from "./context/GameContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GameLogic>
            <Game />
          </GameLogic>
        }
      />

      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;

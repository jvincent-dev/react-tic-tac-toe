import { useState, createContext } from "react";

const isProd = process.env.NODE_ENV === "production";
const API_ENDPOINT = `https://zrp7d8y3q4.execute-api.us-east-2.amazonaws.com/${isProd ? "production" : "dev"}`;
const STARTING_BOARD = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function getWinner(board) {
  const validPieces = ["X", "O"];

  for (let index = 0; index < board.length; index++) {
    if (validPieces.includes(board[index][0]) && board[index][0] === board[index][1] && board[index][1] === board[index][2]) { // col
      return board[index][0];
    }

    if (validPieces.includes(board[0][index]) && board[0][index] === board[1][index] && board[1][index] === board[2][index]) { // row
      return board[0][index];
    }
  }

  if (validPieces.includes(board[0][0]) && board[0][0] === board[1][1] && board[1][1] === board[2][2]) { // left diag
    return board[0][0];
  }

  if (validPieces.includes(board[0][2]) && board[0][2] === board[1][1] && board[1][1] === board[2][0]) { // right diag
    return board[0][2];
  }
}

async function getAIMove(board) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API_ENDPOINT}/engine`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ board })
    });
    const result = await response.json();

    if (response.ok && result.success) {
      return result.board;
    }

    return board;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export const GameContext = createContext();

export default function GameLogic({ children }) {
  const [board, setBoard] = useState(STARTING_BOARD.map((row) => [...row]));
  const [isLoading, setIsLoading] = useState(false);
  const [winner, setWinner] = useState();
  const [playsMade, setPlaysMade] = useState(0);
  const [message, setMessage] = useState();
  const hasWinner = !!winner;
  const isDraw = !hasWinner && playsMade === 9;
  const isGameOver = isDraw || hasWinner;
  const gameOverMessage = isDraw ? "Draw!" : `${winner === "X" ? "You Win" : "AI Wins"}!!!`;

  const resetGame = () => {
    setBoard(STARTING_BOARD.map((row) => [...row]));
    setWinner();
    setPlaysMade(0);
  }

  const playUserMove = (row, col) => {
    if (board[row][col] !== "" || isGameOver) {
      return;
    }

    const temp = board.map((row) => [...row]);

    temp[row][col] = "X";

    const possibleWinner = getWinner(temp);

    setPlaysMade(playsMade + 1);
    setBoard(temp.map((row) => [...row]));
    playAIMove(temp.map((row) => [...row]), playsMade + 1, possibleWinner);
  }

  const playAIMove = async (temp, movesMade, didUserWin) => {
    if (didUserWin) {
      return setWinner("X");
    }

    try {
      if (movesMade !== 9) {
        setIsLoading(true);
        const resultMove = await getAIMove(temp);
        const possibleWinner = getWinner(resultMove);

        if (possibleWinner) {
          setWinner(possibleWinner);
        }

        setIsLoading(false);
        setPlaysMade(movesMade + 1);
        setBoard(resultMove);
      }
    } catch (error) {
      console.log(error.message);
      setMessage("Something went wrong, please try again.");
      setIsLoading(false);
      setBoard(board.map(row => [...row]));
    }
  }

  return (
    <GameContext.Provider
      value={{
        board,
        message,
        playUserMove,
        resetGame,
        isLoading,
        isGameOver,
        gameOverMessage
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
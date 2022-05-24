import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { GameContext } from "../context/GameContext";
import Board from "../components/Board";
import Navbar from "../components/Navbar";

export default function Game() {
  const {
    board = [[]],
    message,
    playUserMove = () => { },
    resetGame = () => { },
    isLoading,
    isGameOver,
    gameOverMessage
  } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("signup");
    }
  }, [navigate])

  return (
    <Container>
      <Navbar />

      <Row className="justify-content-center">
        <Col xs={8}>
          <Board boardMatrix={board} isLoading={isLoading} onClickCell={playUserMove} />

          {!!message && <Alert className="p-1 text-center" variant="danger">{message}</Alert>}

          {
            isGameOver &&
            (
              <>
                <h2 className="text-center">{gameOverMessage}</h2>

                <Button
                  className="w-100"
                  variant="outline-primary"
                  onClick={resetGame}
                >
                  Play Again
                </Button>
              </>
            )
          }
        </Col>
      </Row>
    </Container>
  );
}
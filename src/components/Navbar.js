import StrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    navigate("/signup");
  }

  return (
    <StrapNavbar variant="dark" bg="dark">
      <Container>
        <StrapNavbar.Brand href="/">
          TIC TAC TOE
        </StrapNavbar.Brand>

        <Button
          variant="outline-danger"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Container>
    </StrapNavbar>
  );
}
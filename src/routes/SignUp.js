import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const isProd = process.env.NODE_ENV === "production";
const API_ENDPOINT = `https://zrp7d8y3q4.execute-api.us-east-2.amazonaws.com/${isProd ? "production" : "dev"}`;

async function registerUser(email, password) {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();

    if (response.ok && result.success) {
      return result.token;
    }

    return null;
  } catch (error) {
    throw error;
  }
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^[^@]+@[^@]+\.\w+$/; // simple email check, I'm sure there's a better regex online

    return regex.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { formEmail, formPassword } = event.target.elements;

    if (!validEmail(formEmail.value)) {
      return setMessage("Invalid email, please try again.");
    }

    try {
      setIsLoading(true);
      const token = await registerUser(formEmail.value, formPassword.value);
      
      setIsLoading(false);
      sessionStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Something went wrong, please try again.");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto" className="mt-5 p-4 border border-dark">
          <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <h1 className="mb-4">TIC TAC TOE</h1>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control type="password" autoComplete="off" placeholder="Password" />
            </Form.Group>

            {
              !!message &&
              <Alert className="p-1" variant="danger">
                {message}
              </Alert>
            }

            <Button variant="primary" type="submit">
              {
                isLoading ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                  /> :
                  "Sign Up"
              }
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
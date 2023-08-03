import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 99) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState("Qual número estou pensando?");

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess < secretNumber) {
      setMessage(`Tente um número maior que ${guess}.`);
    } else if (guess > secretNumber) {
      setMessage(`Tente um número menor que ${guess}.`);
    } else {
      setMessage('Parabéns, você acertou!');
      setSecretNumber(Math.floor(Math.random() * 99) + 1);
      setGuess('');
    }
  };

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 className="text-center">Jogo de Adivinhação</h1>
          <p className="text-center">{message}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formGuess">
              <Col sm="3" className="mx-auto">
                <Form.Control
                  type="number"
                  value={guess}
                  onChange={handleGuessChange}
                  placeholder='Digite um número de 1 a 99'
                  min="1"
                  max="99"
                />
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button type="submit" className="mt-3">Enviar</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

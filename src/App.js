import React, { useState } from 'react';
import './App.css';

function App() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 99) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState(null);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess < secretNumber) {
      setMessage(`Tente um número maior que ${guess}.`);
      setGuess('')
    } else if (guess > secretNumber) {
      setMessage(`Tente um número menor que ${guess}.`);
      setGuess('')
    } else {
      setMessage('Parabéns, você acertou!');
      setSecretNumber(Math.floor(Math.random() * 99) + 1);
      setGuess('');
    }
  };

  return (
    <div className="App">
      <h1>Jogo de Adivinhação</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={guess}
          onChange={handleGuessChange}
          min="1"
          max="99"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;

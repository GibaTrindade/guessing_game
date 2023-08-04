import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table  } from 'react-bootstrap';
import './App.css';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSzAS8yssSn4u-eVc-xKVDemg408M56ZY",
  authDomain: "guessing-game-8d46d.firebaseapp.com",
  projectId: "guessing-game-8d46d",
  storageBucket: "guessing-game-8d46d.appspot.com",
  messagingSenderId: "183081110700",
  appId: "1:183081110700:web:4330482c843f17fecce309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

function App() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 1000) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState("Qual número estou pensando?");
  const [ranking, setRanking] = useState([]);
  const [attempts, setAttempts] = useState(1);
  const [loading, setLoading] = useState(false)
  const guessInputRef = useRef(null); // Ref para o input
  

  useEffect(() => {
    guessInputRef.current.focus();
    
    const obterDados = () => {
          setLoading(true)
          const rankingRef = query(collection(db, 'users'), orderBy('score', 'desc'), limit(10))
          const unsubscribe = onSnapshot(rankingRef, async (snapshot) => {
            const novos_dados = await Promise.all(
              snapshot.docs.map( (user) => {
                const user_data = user.data()
                console.log(user_data)
                return {...user_data}
              })
            )
            setLoading(false)
            setRanking(novos_dados)
            console.log(novos_dados)
          })
          return () => {
            unsubscribe()
          }
          
          //const rankingCollection = await getDocs(query(collection(db, 'users'), orderBy('score', 'desc'), limit(10)))
          //const rankingData = rankingCollection.docs.map((doc) => doc.data());
          //setRanking(rankingData);
        } 
        obterDados()
    
    //console.log(ranking)
    //loadRanking(); // Carrega o ranking ao iniciar a aplicação
  }, []);

  useEffect(() => {
    saveRanking(); // Salva o ranking sempre que ele for atualizado
  }, [ranking]);


  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempts((a) => a + 1)
    console.log(attempts)
    if (guess < secretNumber) {
      setMessage(`Tente um número maior que ${guess}.`);
      setGuess('')
      guessInputRef.current.focus();
    } else if (guess > secretNumber) {
      setMessage(`Tente um número menor que ${guess}.`);
      setGuess('')
      guessInputRef.current.focus();
    } else {
      setMessage(`Parabéns, você acertou em ${attempts} tentativas !`);
      setSecretNumber(Math.floor(Math.random() * 1000) + 1);
      setGuess('');
      
      updateRanking(); // Atualiza o ranking com a nova pontuação
      setAttempts(1)

      // Definir foco no input
      guessInputRef.current.focus();
    }
  };



  const saveRanking = () => {
    // Salvar no Firestore não é necessário aqui, pois estamos lendo diretamente do Firestore
  };

  const updateRanking = async () => {
    setMessage("Qual número estou pensando?");
    let playerName = '';
    while(!playerName) {
      playerName = prompt('Digite seu nome:');
      
      if (playerName) {
        const playerRef = query(collection(db, 'users'), where('nome', '==', playerName));
        const playerSnapshot = await getDocs(playerRef);
        if (!playerSnapshot.empty) {
          alert('Esse nome já existe no ranking. Por favor, escolha outro nome.');
          playerName = '';
        } else {
          const pontos = calculateScore(attempts)
          const newScore = { nome: playerName, score: Math.round(pontos), tentativas: attempts };
          await addDoc(collection(db, "users"), newScore);
        }}
      //setRanking([...ranking, newScore]);
      //await firestore.collection('ranking').add(newScore);
    }
  };

  const calculateScore = (num) => {
    // Calcular a pontuação com base na quantidade de tentativas
    // Por exemplo, você pode usar uma fórmula como 1000 / tentativas
    //const attempts = ranking.length + 1;
    return 1000 / num;
  };

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 className="text-center">Jogo da Adivinhação</h1>
          <p className="text-center text-danger fw-bold">{message}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formGuess">
              <Col sm="3" className="mx-auto">
                <Form.Control
                  type="number"
                  value={guess}
                  onChange={handleGuessChange}
                  placeholder='Digite um número de 1 a 1000'
                  min="1"
                  max="1000"
                  ref={guessInputRef}
                />
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button type="submit" className="mt-3">Enviar</Button>
            </div>
          </Form>
          <div className="mt-3">
            {loading ? <h2>Trazendo Ranking...</h2> 
            :
            <>
            <h2>Ranking</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Nome</th>
                  <th>Tentativas</th>
                  <th>Pontuação</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((score, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.nome}</td>
                    <td>{score.tentativas}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          }
            
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

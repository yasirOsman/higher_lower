import React, { useEffect, useState } from "react";
import { cardValue, importAll, createDeck, setResults, getResults } from "./helper";
import Modal from "./Modal";
import "./App.css"
const images = importAll(require.context('./images', false, /\.svg$/));

export default function App() {
  const [score, setScore] = useState(0);
  const [firstDraw, setFirstDraw] = useState(true);
  const [cards, setCards] = useState(createDeck());
  const [drawnCards, setDrawnCards] = useState([]);
  const [guess, setGuess] = useState("");
  const [nextDraw, setNextDraw] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [updateStored, setUpdateStored] = useState(false);
  const cardImages = drawnCards.map((card) => (<img src={images[`${card}.svg`]}/>));
  
  //draws a card from the deck
  const draw = () => {
    setCards((cards) => cards.slice(0, cards.length - 1));
    setDrawnCards((drawnCards) => [...drawnCards, cards[cards.length - 1]]);
    setNextDraw((nextDraw) => nextDraw = true)
  };
  
  useEffect(() => {
  //when the page is first loaded
  if(firstDraw){
    draw();
    setFirstDraw((firstDraw) => firstDraw = false);
  }

  //when a card is drawn
  if(nextDraw){
    if(drawnCards.length < 2){return}
    if(cardValue(drawnCards[drawnCards.length-1]) > cardValue(drawnCards[drawnCards.length-2]) && guess === "higher" ||
       cardValue(drawnCards[drawnCards.length-1]) < cardValue(drawnCards[drawnCards.length-2]) && guess === "lower"){
         setScore((score) => score + 1);
         setNextDraw((nextDraw) => nextDraw = false)
         return
    }
    console.log("original: " + cardValue(drawnCards[drawnCards.length-2]) + " new: " + cardValue(drawnCards[drawnCards.length-1]))
    setGameOver((gameOver) => gameOver = true)
  }

  //if the game is won
  if(score === 5 && updateStored === false){
    setResults("wins");
    setModalText((modalText) => modalText = "won");
    setShowModal((showModal) => showModal = true);
    setUpdateStored((updateStored) => updateStored = true);
  }

  //if the player lost
  if(gameOver && updateStored === false){
    setResults("losses");
    setModalText((modalText) => modalText = "lost");
    setShowModal((showModal) => showModal = true);
    setUpdateStored((updateStored) => updateStored = true);
  }
  }, [drawnCards, guess, cards, score, firstDraw, gameOver,showModal, updateStored]);
  
  return (
    <div className="App">
      <h1>Higher or Lower</h1>
      <button class="higherButton" onClick={() => {setGuess("higher"); draw()}}>higher</button>
      <button class="lowerButton" onClick={() => {setGuess("lower"); draw()}}>lower</button>
      <h3 class="stats" >score: {score}, wins: {getResults("wins")}, losses: {getResults("losses")}</h3>
      <h3 class="cardTitle">Drawn cards</h3>
      <div id="drawnCards">
        
        <div class="cardImage">{cardImages}</div>
        
      </div>
      {showModal && <Modal result={modalText}/>}
    </div>
  );
}
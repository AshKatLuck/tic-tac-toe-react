import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import WINNINGCOMBO from "./components/WINNINGCOMBO";
import GameOver from "./components/GameOver";
const INITIALGAMEBOARD=[
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
const PLAYERS={
  'X':'PLAYER 1',
  'O':'PLAYER 2',
}

function deriveWinner(gameBoard,playersName){
   let winner=null;
  
  for(let combination of WINNINGCOMBO){
    const firstSquare=gameBoard[combination[0].row][combination[0].column];
    const secondSquare=gameBoard[combination[1].row][combination[1].column];
    const thirdSquare=gameBoard[combination[2].row][combination[2].column];
    if(firstSquare && firstSquare===secondSquare && firstSquare===thirdSquare){
      winner=playersName[firstSquare];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
   const gameBoard=[...INITIALGAMEBOARD.map(array=>[...array])];
    if(gameTurns.length!==0){
        for( let t of gameTurns){   
        gameBoard[t.square.row][t.square.column]=t.player;
    }
    }
    return gameBoard;
}

function deriveActivePlayer(turns){
    let currentPlayer='X';
      if(turns[0] && turns[0].player==='X'){
        currentPlayer='O';
      }
      return currentPlayer;
  }


function App() {  
  // const [activePlayer, setactivePlayer]=useState('X');
  const [gameTurns, setGameTurns]=useState([])// we expect this to be an array of objects with lastest value as 
  // 1st one(with player and row, column details of where they clicked)
  const [playersName, setPlayersName]=useState(PLAYERS)


  
  function handlePlayerNameChange(symbol,newName){
    setPlayersName((prevPlayersName)=>{
      return{
        ...prevPlayersName,
        [symbol]:newName,
      }
    })
  }

  const activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,playersName);
  const isDraw=(!winner && gameTurns.length==9);

  
  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurn)=>{
      let updatedTurns;
      let currentPlayer=deriveActivePlayer(prevTurn);
      if(prevTurn.length!==0){
        updatedTurns=[
        {
          square:{
            row:rowIndex,
            column:colIndex,
          },
          player:currentPlayer,
        },
        ...prevTurn
      ]
      }else{
        updatedTurns=[
        {
          square:{
            row:rowIndex,
            column:colIndex,
          },
          player:currentPlayer,
        }]
      }
      return updatedTurns;
    })
  }
  function handleRematch(){
    setGameTurns([]);
  }
  return (
    <main>
      
      <div id="game-container">
        {(winner||isDraw)?<GameOver winner={winner} onRematch={handleRematch}/>:""}
        <ol id="players" className="highlight-player">          
         <Player initialName={PLAYERS.X} symbol="X" isActivePlayer={activePlayer==='X'} onSaveName={handlePlayerNameChange}/>
         <Player initialName={PLAYERS.O} symbol="O" isActivePlayer={activePlayer==='O'} onSaveName={handlePlayerNameChange}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} onSaveName={handlePlayerNameChange}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
} 

export default App;

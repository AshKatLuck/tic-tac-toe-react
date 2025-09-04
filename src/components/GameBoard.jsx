import { useState } from "react";

export default function GameBoard({onSelectSquare, board}){
   
    return (
        <ol id="game-board">
            {
                board.map((row, rowIndex)=>{
                    return(
                        <li key={rowIndex}>
                        <ol>
                            {row.map((col, colIndex)=>{
                                return(<li key={colIndex}><button disabled={col!==null} onClick={()=>{onSelectSquare(rowIndex,colIndex)}}>{col}</button></li>);                                
                            })}
                        </ol>
                    </li>
                    )
                    
                })
            }
        </ol>
    )  
}
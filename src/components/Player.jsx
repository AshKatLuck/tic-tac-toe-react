import { useState } from "react"

export default function Player({initialName, symbol,isActivePlayer,onSaveName}){
    const [isEditing,setIsEditing]=useState(false);
    const [playerName, setPlayerName]=useState(initialName);

    function editClickHandler(){
        setIsEditing(editting=>!editting);
        if(isEditing){
            onSaveName(symbol,playerName);
        }        

    }

    function onChangeInput(event){
        setPlayerName(event.target.value)
    }

    return(<li className={isActivePlayer?"active":undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input value={playerName} required onChange={onChangeInput}/>}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editClickHandler}>{isEditing?'Save':'Edit'}</button>
          </li>)
}
import { useState } from "react";

/**
 * Player component represents a player in the tic-tac-toe game.
 * @param {Object} props - The component props.
 * @param {string} props.initName - The initial name of the player.
 * @param {string} props.symbol - The symbol representing the player.
 * @param {boolean} props.isActive - Indicates whether the player is active or not.
 * @returns {JSX.Element} The rendered Player component.
 */
export default function Player({ initName, symbol, isActive, handleSavePlayer }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initName);
    
    function handleEdit() {
        setIsEditing(isEditing => !isEditing);
        if (isEditing) {
            handleSavePlayer(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player" >
                {isEditing ? <input type="text" defaultValue={playerName} required onChange={handleChange} /> : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
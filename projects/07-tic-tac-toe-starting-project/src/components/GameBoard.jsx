/**
 * Represents the Tic Tac Toe game board.
 * @param {Object} props - The component props.
 * @param {Function} props.handleSelectSquare - The function to handle square selection.
 * @param {Array} props.turns - The array of turns taken in the game.
 * @returns {JSX.Element} The rendered Tic Tac Toe game board.
 */
export default function GameBoard({ handleSelectSquare, board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <button key={colIndex} onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onClose}, ref){

    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formatedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(ref, () => ({
        open()  {
            dialog.current.showModal();
        }
    }));

    return createPortal(<dialog ref={dialog} className = "result-modal" onClose={onClose}>
        {userLost && <h2>You lost</h2>}
        {(!userLost && remainingTime == 0) && <h2>You win!</h2>}
        {(!userLost && remainingTime != 0) && <h2>Your soure: {score}</h2>}
        <p>
            The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}</strong>
        </p>
        <p>
            You stopped the timer with <strong> {formatedRemainingTime} seconds left</strong> 
        </p>
        <form action="dialog">
            <button>Close</button>
        </form>
    </dialog>, document.getElementById('modal'));
});

export default ResultModal;
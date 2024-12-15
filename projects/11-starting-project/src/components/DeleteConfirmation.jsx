import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  const TIME = 3000;

  useEffect(() => {
    // would auto confirm to remove places after 3 seconds
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);
    // executed when the component is unmounted or useEffect is called again
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar max={TIME} />
    </div>
  );
}

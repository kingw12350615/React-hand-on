import {useEffect, useState} from 'react';

export default function ProgressBar({ max }) {

    const [remainingTime, setRemainingTime] = useState(max);

    // set interval to update the progress bar
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(pre => pre - 10);
        }, 10);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return <progress value={remainingTime} max={max}></progress>;
}
import { useRef } from 'react';

const useTimeMeasure = () => {
    const timeStart = useRef(null);

    const start = () => {
        timeStart.current = performance.now();
    };

    const stop = () => {
        const timeEnd = performance.now();
        const calculatedTime = timeEnd - timeStart.current;
        return calculatedTime;
    };

    return [start, stop];
};

export default useTimeMeasure;

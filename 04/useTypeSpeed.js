import { useEffect, useRef, useState } from 'react';
import useTimeMeasure from './useTimeMeasure';

const useTypeSpeed = (onSuccess, onEnd) => {
    const [testCounter, setTestCounter] = useState(0);
    const [speed, setSpeed] = useState(null);
    const charCounter = useRef(0);
    const [testQuantity, setTestQuantity] = useState(9999);
    const [startStoper, stopStoper] = useTimeMeasure();

    const calculateSpeed = (time, charQty) => {
        const seconds = time / 1000;
        return charQty / seconds;
    };

    const checkValue = (word, typed) => {
        if (word === typed && testCounter < testQuantity) {
            charCounter.current += word.length;
            setTestCounter((state) => state + 1);
            onSuccess();
        }
    };

    const startTest = (testQty) => {
        setTestQuantity(testQty);
        setTestCounter(0);
        charCounter.current = 0;
        startStoper();
    };

    useEffect(() => {
        if (testCounter >= testQuantity) {
            const time = stopStoper();
            const newSpeed = calculateSpeed(time, charCounter.current);
            setSpeed(newSpeed);
            onEnd();
        }
    }, [onEnd, stopStoper, testCounter, testQuantity]);

    return [speed, checkValue, startTest];
};

export default useTypeSpeed;

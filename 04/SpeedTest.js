import React, { useEffect, useRef, useState } from 'react';
import useRandomItem from './hook';
import useTypeSpeed from './useTypeSpeed';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [testFinnished, setTestFinnished] = useState(false);
    const textRef = useRef();
    const numberRef = useRef();

    const correctWordHandler = () => {
        regenerateWord();
        textRef.current.value = '';
    };

    const onTestEnd = () => {
        setTestFinnished(true);
        textRef.current.blur();
    };

    const [speed, checkValue, startTest] = useTypeSpeed(correctWordHandler, onTestEnd);

    const focusHandler = () => {
        setTestFinnished(false);
        startTest(numberRef.current.value);
    };

    const changeHandler = (e) => {
        checkValue(word, e.target.value);
    };

    useEffect(() => {
        regenerateWord();
    }, [regenerateWord]);

    return (
        <div>
            <h1>{word}</h1>
            <label htmlFor="text">
                Tu wpisz tekst:
                <input
                    type="text"
                    id="text"
                    onFocus={focusHandler}
                    onChange={changeHandler}
                    ref={textRef}
                />
            </label>
            <br />
            <label htmlFor="number">
                Ilość słów podczas testu:
                <input type="number" ref={numberRef} defaultValue={2} />
            </label>
            <p>
                {testFinnished &&
                    `TEST ZAKOŃCZONY - Prędkość pisania: ${speed} kliknięć na sekundę`}
            </p>
        </div>
    );
}

export default SpeedTest;

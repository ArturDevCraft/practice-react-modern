// ./src/components/App.js
import React from 'react';
import Box from './Box';
import Div from './Div';
import { TextContext } from '../context';

function App() {
    // const { Provider: ColorProvider } = ColorContext;
    const { Provider: TextProvider } = TextContext;
    return (
        <section>
            <Box />
            <TextProvider value="sibling">
                <Div />
            </TextProvider>
        </section>
    );
}

export default App;

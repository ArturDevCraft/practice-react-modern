// ./src/components/App.js
import React from 'react';
import Box from './Box';
import TextContext from '../context';

class App extends React.Component {
    state = {
        text: 'React HelloWorld Modern!',
    };

    render() {
        const { Provider } = TextContext;
        const { text } = this.state;

        return (
            <Provider value={text}>
                <Box />;
            </Provider>
        );
    }
}

export default App;

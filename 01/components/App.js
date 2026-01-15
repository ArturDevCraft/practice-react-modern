import React from 'react';

import Clock from './Clock';

class App extends React.Component {
    state = {
        date: new Date(),
    };

    componentDidMount() {
        this.intervalId = setInterval(() => {
            const date = new Date();
            this.setState({ date });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        const { date } = this.state;

        return date ? <Clock date={date} /> : null;
    }
}

export default App;

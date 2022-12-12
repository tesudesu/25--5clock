import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let beepSound = './beep.wav';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            minutesDisplay: 25,
            secondsDisplay: '00',
            timerLabel: 'Session',
            interval: '',
            startOrStop: false,
            timeInSeconds: 1499,
        }
        this.breakDecrement = this.breakDecrement.bind(this);
        this.breakIncrement = this.breakIncrement.bind(this);
        this.sessionDecrement = this.sessionDecrement.bind(this);
        this.sessionIncrement = this.sessionIncrement.bind(this);
        this.reset = this.reset.bind(this);
        this.countdown = this.countdown.bind(this);
        this.startStop = this.startStop.bind(this);
    }

    breakDecrement() {
        if (this.state.startOrStop) {
            return;
        }
        if (this.state.breakLength > 1 && this.state.timerLabel === 'Break') {
            this.setState({
                breakLength: this.state.breakLength - 1,
                minutesDisplay: this.state.breakLength < 11 ? '0' + (this.state.breakLength - 1) : this.state.breakLength - 1,
                secondsDisplay: '00',
                timeInSeconds: (this.state.breakLength - 1) * 60 - 1,
            });
        } else if (this.state.breakLength > 1 && this.state.timerLabel === 'Session') {
            this.setState({
                breakLength: this.state.breakLength - 1,
            });
        } else {
            this.setState({
                breakLength: this.state.breakLength,
            });
        }
    };

    breakIncrement() {
        if (this.state.startOrStop) {
            return;
        }
        if (this.state.breakLength < 60 && this.state.timerLabel === 'Break') {
            this.setState({
                breakLength: this.state.breakLength + 1,
                minutesDisplay: this.state.breakLength < 9 ? '0' + (this.state.breakLength + 1) : this.state.breakLength + 1,
                secondsDisplay: '00',
                timeInSeconds: (this.state.breakLength + 1) * 60 - 1,
            });
        } else if (this.state.breakLength < 60 && this.state.timerLabel === 'Session') {
            this.setState({
                breakLength: this.state.breakLength + 1,
            });
        } else {
            this.setState({
                breakLength: this.state.breakLength,
            });
        }
    };

    sessionDecrement() {
        if (this.state.startOrStop) {
            return;
        }
        if (this.state.sessionLength > 1 && this.state.timerLabel === 'Session') {
            this.setState({
                sessionLength: this.state.sessionLength - 1,
                minutesDisplay: this.state.sessionLength < 11 ? '0' + (this.state.sessionLength - 1) : this.state.sessionLength - 1,
                secondsDisplay: '00',
                timeInSeconds: (this.state.sessionLength - 1) * 60 - 1,
            });
        } else if (this.state.sessionLength > 1 && this.state.timerLabel === 'Break') {
            this.setState({
                sessionLength: this.state.sessionLength - 1,
            });
        } else {
            this.setState({
                sessionLength: this.state.sessionLength,
            });
        }
    };

    sessionIncrement() {
        if (this.state.startOrStop) {
            return;
        }
        if (this.state.sessionLength < 60 && this.state.timerLabel === 'Session') {
            this.setState({
                sessionLength: this.state.sessionLength + 1,
                minutesDisplay: this.state.sessionLength < 9 ? '0' + (this.state.sessionLength + 1) : this.state.sessionLength + 1,
                secondsDisplay: '00',
                timeInSeconds: (this.state.sessionLength + 1) * 60 - 1,
            });
        } else if (this.state.sessionLength < 60 && this.state.timerLabel === 'Break') {
            this.setState({
                sessionLength: this.state.sessionLength + 1,
            });
        } else {
            this.setState({
                sessionLength: this.state.sessionLength,
            });
        }
    };

    reset() {
        clearInterval(this.state.interval);
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            minutesDisplay: '25',
            secondsDisplay: '00',
            interval: '',
            startOrStop: false,
            timeInSeconds: 1499,
        });

    };

    countdown() {
        if (this.state.timeInSeconds < 0 && this.state.timerLabel == 'Session') {
            this.setState({
                timeInSeconds: this.state.breakLength * 60 - 1,
                timerLabel: 'Break',
                minutesDisplay: this.state.breakLength < 10 ? '0' + this.state.breakLength : this.state.breakLength,
                secondsDisplay: '00',
            });
        } else if (this.state.timeInSeconds < 0 && this.state.timerLabel == 'Break') {
            this.setState({
                timeInSeconds: this.state.sessionLength * 60 - 1,
                timerLabel: 'Session',
                minutesDisplay: this.state.sessionLength < 10 ? '0' + this.state.sessionLength : this.state.sessionLength,
                secondsDisplay: '00',
            });
        } else {
            let minutes = Math.floor(this.state.timeInSeconds / 60);
            let seconds = this.state.timeInSeconds - (minutes * 60);
            this.setState({
                minutesDisplay: minutes < 10 ? '0' + minutes : minutes,
                secondsDisplay: seconds < 10 ? '0' + seconds : seconds,
            });
            this.state.timeInSeconds--;            
        }
    };

    startStop() {
        this.state.startOrStop = !this.state.startOrStop;
        if (!this.state.startOrStop) {
            clearInterval(this.state.interval);
        } else {
            this.setState({
                interval: setInterval(this.countdown, 1000)
            });
        }
    };

    render() {
        let fontColor = {
            color: '#252E2C'
        };
        if (this.state.timeInSeconds < 59) {
            fontColor.color = '#AD7A03';
        }
        if (this.state.timeInSeconds < 0) {
            document.getElementById('beep').play();
        }
        return (
            <div>
                <p id='title'>25 + 5 Clock</p>
                <div id='timer-part'>
                    <button id='reset' onClick={this.reset}>RESET</button>
                    <div id='timer-label'>{this.state.timerLabel}</div>
                    <div id='time-left' style={fontColor}>{this.state.minutesDisplay}:{this.state.secondsDisplay}</div>
                    <button id='start-stop' onClick={this.startStop}>START/PAUSE</button>
                </div>    
                <div id='controls-container'>
                    <div id='break-part'>
                        <p id='break-label'>Break Length</p>
                        <div id='break-controls'>
                            <button id='break-decrement' onClick={this.breakDecrement}>&lt;</button>
                            <div id='break-length'>{this.state.breakLength}</div>
                            <button id='break-increment' onClick={this.breakIncrement}>&gt;</button>
                        </div>
                    </div>
                    <div id='session-part'>
                        <p id='session-label'>Session Length</p>
                        <div id='session-controls'>
                            <button id='session-decrement' onClick={this.sessionDecrement}>&lt;</button>
                            <div id='session-length'>{this.state.sessionLength}</div>
                            <button id='session-increment' onClick={this.sessionIncrement}>&gt;</button>
                        </div>
                    </div>
                </div>
                <audio src={beepSound} id='beep'></audio>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
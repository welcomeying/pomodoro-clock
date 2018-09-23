var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.initialize = function () {
            clearInterval(_this.timer);
            _this.setState({
                breakLength: 5,
                sessionLength: 25,
                sessionTime: 1500,
                breakTime: 300,
                timer: 0,
                isRunning: false,
                startOrStop: "Start",
                mode: "Session"
            });
            _this.audioBeep.pause();
            _this.audioBeep.currentTime = 0;
        };
        _this.breakIncrement = function () {
            if (_this.state.breakLength === 60) {
                return;
            }
            _this.setState({
                breakLength: _this.state.breakLength + 1,
                breakTime: _this.state.breakTime + 60
            });
        };
        _this.breakDecrement = function () {
            if (_this.state.breakLength === 1) {
                return;
            }
            _this.setState({
                breakLength: _this.state.breakLength - 1,
                breakTime: _this.state.breakTime - 60
            });
        };
        _this.sessionIncrement = function () {
            if (_this.state.sessionLength === 60) {
                return;
            }
            _this.setState({
                sessionLength: _this.state.sessionLength + 1,
                sessionTime: _this.state.sessionTime + 60
            });
        };
        _this.sessionDecrement = function () {
            if (_this.state.sessionLength === 1) {
                return;
            }
            _this.setState({
                sessionLength: _this.state.sessionLength - 1,
                sessionTime: _this.state.sessionTime - 60
            });
        };
        _this.countDown = function () {
            if (_this.state.mode === "Session") {
                _this.setState({
                    sessionTime: _this.state.sessionTime - 1
                });
                if (_this.state.sessionTime === -1) {
                    _this.audioBeep.play();
                    clearInterval(_this.timer);
                    _this.setState({
                        mode: "Break",
                        breakTime: _this.state.breakLength * 60,
                        isRunning: false
                    });
                    _this.startStop();
                }
            }
            else if (_this.state.mode === "Break") {
                _this.setState({
                    breakTime: _this.state.breakTime - 1
                });
                if (_this.state.breakTime === -1) {
                    clearInterval(_this.timer);
                    _this.setState({
                        mode: "Session",
                        sessionTime: _this.state.sessionLength * 60,
                        isRunning: false
                    });
                    _this.startStop();
                }
            }
        };
        _this.startStop = function () {
            if (_this.state.isRunning) {
                _this.setState({
                    isRunning: false,
                    startOrStop: "Start"
                });
                clearInterval(_this.timer);
            }
            else {
                _this.setState({
                    isRunning: true,
                    startOrStop: "Stop"
                });
                _this.timer = setInterval(_this.countDown, 1000);
            }
        };
        _this.state = {
            breakLength: 5,
            sessionLength: 25,
            sessionTime: 1500,
            breakTime: 300,
            isRunning: false,
            startOrStop: "Start",
            mode: "Session"
        };
        _this.timer = 0;
        return _this;
    }
    App.prototype.timeFormat = function () {
        if (this.state.mode === "Session") {
            var minutes = Math.floor(this.state.sessionTime / 60);
            var seconds = this.state.sessionTime - minutes * 60;
        }
        else if (this.state.mode === "Break") {
            var minutes = Math.floor(this.state.breakTime / 60);
            var seconds = this.state.breakTime - minutes * 60;
        }
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    };
    App.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("h1", null, "Pomodoro Clock"),
            React.createElement("div", { id: "control" },
                React.createElement("div", { id: "break" },
                    React.createElement("div", { id: "break-label" }, "Break Length"),
                    React.createElement("button", { id: "break-decrement", onClick: this.breakDecrement }, "-"),
                    React.createElement("span", { id: "break-length" }, this.state.breakLength),
                    React.createElement("button", { id: "break-increment", onClick: this.breakIncrement }, "+")),
                React.createElement("div", { id: "session" },
                    React.createElement("div", { id: "session-label" }, "Session Length"),
                    React.createElement("button", { id: "session-decrement", onClick: this.sessionDecrement }, "-"),
                    React.createElement("span", { id: "session-length" }, this.state.sessionLength),
                    React.createElement("button", { id: "session-increment", onClick: this.sessionIncrement }, "+"))),
            React.createElement("div", { id: "timer" },
                React.createElement("div", { id: "timer-label" }, this.state.mode),
                React.createElement("div", { id: "time-left" }, this.timeFormat())),
            React.createElement("button", { id: "start_stop", className: "btn", onClick: this.startStop }, this.state.startOrStop),
            React.createElement("button", { id: "reset", className: "btn", onClick: this.initialize }, "Reset"),
            React.createElement("audio", { id: "beep", preload: "auto", src: "https://goo.gl/65cBl1", ref: function (audio) { _this.audioBeep = audio; } })));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
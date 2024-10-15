export default function Coundown() {

    return (
        <div className="section">
        <h1 className="main-title">Countdown</h1>
        <div className="clock">
            <div className="clock__container">
                <div className="clock__hours">00</div>
                <div className="clock__separator">:</div>
                <div className="clock__min">00</div>
                <div className="clock__separator">:</div>
                <div className="clock__sec">00</div>
            </div>
        </div>

        <div className="set-timer">
            <form className="set-timer__form" method="get">
                <label className="set-timer__label" htmlFor="timeInput"
                    >Enter hours:</label
                >
                <input
                    className="set-timer__input"
                    max="24"
                    type="number"
                    id="hours-timer-input"
                    name="timeInput"
                    placeholder="Hours"
                    required
                />
                <label className="set-timer__label" htmlFor="timeInput"
                    >Enter minutes:</label
                >
                <input
                    className="set-timer__input"
                    max="60"
                    type="number"
                    id="min-timer-input"
                    name="timeInput"
                    placeholder="Minutes"
                    required
                />
                <label className="set-timer__label" htmlFor="timeInput"
                    >Enter seconds:</label
                >
                <input
                    className="set-timer__input"
                    type="number"
                    id="sec-timer-input"
                    name="timeInput"
                    placeholder="Seconds"
                    required
                />
            </form>
        </div>

        <div className="buttons__container">
            <button className="button button__play-pause">Start</button>

            <button className="button button__reset">Reset</button>
        </div>
        <div className="message__container">
            <p className="message__text" id="message"></p>
        </div>
        </div>
    );
}

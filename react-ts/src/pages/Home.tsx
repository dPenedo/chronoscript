export default function Home() {
    return (
        <div className="section">
            <div>
                <h1 className="section__title">Start</h1>
            </div>
        <h1 className="main-title">CHRONOMETER</h1>
        <div className="clock">
            <div className="clock__container">
                <div className="clock__hours">00</div>
                <div className="clock__separator">:</div>
                <div className="clock__min">00</div>
                <div className="clock__separator">:</div>
                <div className="clock__sec">00</div>
                <div className="clock__separator">:</div>
                <div className="clock__centisec">00</div>
            </div>
        </div>

        <div className="buttons__container">
            <button className="button button__play-pause">Start</button>

            <button className="button button__reset">Reset</button>
        </div>
        </div>
    );
}

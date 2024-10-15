
export default function Ip() {

    return (
        <div className="section">
            <h1 className="main-title">World Times</h1>
            <div className="clock">
                <h1 className="clock__title">Your City's Time</h1>
                <div className="clock__container">
                    <div className="clock__hours clock__hours-main">00</div>
                    <div className="clock__separator">:</div>
                    <div className="clock__min clock__min-main">00</div>
                    <div className="clock__separator">:</div>
                    <div className="clock__sec clock__sec-main">00</div>
                </div>
            </div>
            <div className="clock second-clock">
                <h1 className="clock__title" id="selected-city-name">
                    Selected City's Time
                </h1>
                <div className="clock__container">
                    <div className="clock__hours second-clock__hours">00</div>
                    <div className="clock__separator">:</div>
                    <div className="clock__min second-clock__min">00</div>
                    <div className="clock__separator">:</div>
                    <div className="clock__sec second-clock__sec">00</div>
                </div>
            </div>
            <div className="cities">
                <button className="cities__button">Select a city ⬇</button>
                <div className="cities__content">
                    <form className="cities__form" method="get">
                        <select className="cities__select" name="cities" id="cities" size={8}></select>
                    </form>
                </div>
            </div>
        </div>
    );
}

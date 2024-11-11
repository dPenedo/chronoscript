# ChronoScript

ChronoScript is a web application made two times:

1. The **Vanilla JavaScript, HTML, and CSS**. It only has external libraries for testing: `Jest`.
2. The **React + TypeScript** built with **vite**. it also has external libraries such as `React-router-dom` and `Jest` for testing.

Both of them include three sections:

1. **Stopwatch**
2. **Countdown**
3. **World-times**

## Stopwatch Usage

Using the stopwatch is straightforward:

-   The "Start" button has three modes:
    1. "Start" to begin the stopwatch
    2. "Stop" to halt the stopwatch
    3. "Pause" to temporarily pause the stopwatch
-   The "Reset" button resets the stopwatch to zero.

## Countdown Timer Usage

Using the countdown timer is similar:

-   The "Start" button has three modes:
    1. "Start" to begin the countdown
    2. "Stop" to halt the countdown
    3. "Pause" to temporarily pause the countdown
-   The "Reset" button resets the countdown to zero.

## World Clock Usage

The world clock automatically detects your city’s timezone. You can select any city from the `Select a city` dropdown menu to view the current time in that location.

The API used is [TimeApi.io](https://timeapi.io/).

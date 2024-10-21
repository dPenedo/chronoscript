import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Countdown from './pages/Countdown';
import WorldTimes from './pages/WorldTimes';
import './App.css';

export default function App() {
    return (
            <>
            <Header />
            <main className="main-content">

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countdown" element={<Countdown />} />
                <Route path="/world-times" element={<WorldTimes />} />
            </Routes>
            </main>
            <Footer />
            </>
    );
}

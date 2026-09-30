import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const [signedIn, setSignedIn] = useState(() => Boolean(localStorage.getItem('token')));
  const timer = useRef();
  const showAlert = useCallback((msg, type) => {
    clearTimeout(timer.current);
    setAlert({ msg, type });
    timer.current = setTimeout(() => setAlert(null), 5000);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const authenticate = () => setSignedIn(true);
  const logout = () => { localStorage.removeItem('token'); setSignedIn(false); };
  return (
    <BrowserRouter>
      <NoteState key={String(signedIn)}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Navbar signedIn={signedIn} onLogout={logout} />
        <Alert alert={alert} />
        <main id="main" className="page-shell">
          <Routes>
            <Route path="/" element={signedIn ? <Home showAlert={showAlert} /> : <Navigate to="/login" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={signedIn ? <Navigate to="/" replace /> : <Login showAlert={showAlert} onAuthenticated={authenticate} />} />
            <Route path="/signup" element={signedIn ? <Navigate to="/" replace /> : <Signup showAlert={showAlert} onAuthenticated={authenticate} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="site-footer"><span>iNoteBook</span><span>A little space for your next big idea.</span></footer>
      </NoteState>
    </BrowserRouter>
  );
}
export default App;

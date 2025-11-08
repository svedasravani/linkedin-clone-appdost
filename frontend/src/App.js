import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [view, setView] = useState('feed'); // 'login' | 'register' | 'feed'

  useEffect(() => {
    if (!token) {
      setView('login');
    } else {
      setView('feed');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setView('login');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>LinkedIn Clone</h2>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 10 }}>Hi, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setView('login')} style={{ marginRight: 8 }}>Login</button>
              <button onClick={() => setView('register')}>Register</button>
            </>
          )}
        </div>
      </header>

      <main style={{ marginTop: 20 }}>
        {view === 'login' && <Login onAuth={(t,u) => { setToken(t); setUser(u); localStorage.setItem('token', t); localStorage.setItem('user', JSON.stringify(u)); }} api={API} />}
        {view === 'register' && <Register onAuth={(t,u) => { setToken(t); setUser(u); localStorage.setItem('token', t); localStorage.setItem('user', JSON.stringify(u)); }} api={API} />}
        {view === 'feed' && <Feed api={API} token={token} user={user} />}
      </main>
    </div>
  );
}

export default App;

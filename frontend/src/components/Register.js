import React, { useState } from 'react';

export default function Register({ onAuth, api }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(api + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Register failed');
      onAuth(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: '20px auto' }}>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div style={{ marginTop: 8 }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

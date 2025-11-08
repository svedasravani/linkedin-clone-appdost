import React, { useEffect, useState } from 'react';

export default function Feed({ api, token, user }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch(api + '/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const createPost = async (e) => {
    e.preventDefault();
    if (!token) return setError('Please login to post');
    try {
      const res = await fetch(api + '/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not create post');
      setText('');
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleLike = async (id) => {
    if (!token) return setError('Login to like');
    try {
      await fetch(api + '/api/posts/' + id + '/like', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const deletePost = async (id) => {
    if (!token) return setError('Login to delete');
    try {
      const res = await fetch(api + '/api/posts/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Delete failed');
      }
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="card">
        <h3>Create Post</h3>
        <form onSubmit={createPost}>
          <textarea value={text} onChange={e => setText(e.target.value)} rows="3" placeholder="What's on your mind?" />
          <div style={{ marginTop: 8 }}>
            <button type="submit">Post</button>
          </div>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
      </div>

      <div style={{ marginTop: 12 }}>
        {posts.map(p => (
          <div key={p._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>{p.user?.name || 'Unknown'}</strong><div style={{ fontSize: 12, color: '#666' }}>{new Date(p.createdAt).toLocaleString()}</div></div>
              <div>
                <button onClick={() => toggleLike(p._id)} style={{ marginRight: 8 }}>{p.likes?.length || 0} 👍</button>
                {user && p.user && user.id === p.user._id && <button onClick={() => deletePost(p._id)}>Delete</button>}
              </div>
            </div>
            <div style={{ marginTop: 8 }}>{p.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

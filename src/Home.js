import React from 'react';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    background: 'linear-gradient(to right, #f8fafc, #dbeafe)',
    color: '#1e3a8a',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '15px',
  };

  const paraStyle = {
    fontSize: '1.2rem',
    color: '#334155',
    maxWidth: '600px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>💖 For My Jaan 💖</h1>
      <p style={paraStyle}>
       The moments pass, the clocks all keep their chime, But in your presence, I transcend all time. You are the breath that fills my daily plea, The silent strength, the light that sets me free.

My heart's a garden where your smile takes root, And gives my searching soul its sweetest fruit. The world may turn in chaos, storm, and stress, But I have found my home in your caress.

I love you, Jaan, more than words convey, My constant sun, my dawn of every day.
      </p>
    </div>
  );
};

export default Home;

/**
 * Simple App Component for debugging
 */

import React from 'react';

const SimpleApp: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React App is Working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Debug Information:</h2>
        <ul>
          <li>Current URL: {window.location.href}</li>
          <li>Time: {new Date().toLocaleTimeString()}</li>
          <li>User Agent: {navigator.userAgent}</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleApp;
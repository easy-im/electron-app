import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';

const App = () => {
  return (
    <div>
      <h1 className='blue-font'>Hello Easy Im</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const App = () => {
  return (
    <div className='draggable'>
      <h1 className='blue-font'>这是更新页面</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { ipcRenderer } from "electron";
import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import { Channels } from "../../../share/channels.ts";
import "./styles.css";
import './index.less'


const App = () => {
  const openUpdater = () => {
    ipcRenderer.send(Channels.WINDOW.OPEN, {
      name: "Updater",
    });
  };
  return (
    <div className='wrapper'>
      <h1 className="blue-font">Hello Easy Im</h1>
      <button
        onClick={() => {
          openUpdater();
        }}
        className='name'
      >
        打开更新页面
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

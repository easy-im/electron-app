import { ipcRenderer } from "electron";
import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import { Channels } from "../../../share/channels.ts";
import "./styles.css";

const App = () => {
  const openUpdater = () => {
    ipcRenderer.send(Channels.WINDOW.OPEN, {
      name: "Updater",
    });
  };
  return (
    <div className="draggable">
      <h1 className="green-font">Hello Easy Im</h1>
      <button
        onClick={() => {
          openUpdater();
        }}
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

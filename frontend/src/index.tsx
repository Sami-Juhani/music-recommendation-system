import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MusicGetAllContextProvider } from "./context/MusicGetAllContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MusicGetAllContextProvider>
      <App />
    </MusicGetAllContextProvider>
  </React.StrictMode>
);

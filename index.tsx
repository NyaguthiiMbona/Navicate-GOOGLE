import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
@@ -13,9 +12,6 @@ const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/Navicate-GOOGLE">
      <App />
    </BrowserRouter>
    <App />
  </React.StrictMode>
);

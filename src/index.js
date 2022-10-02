import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import "./index.css"
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { createStore } from './app/store/createStore';
import { BrowserRouter } from 'react-router-dom';

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();

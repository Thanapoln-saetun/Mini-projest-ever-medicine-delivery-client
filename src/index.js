import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
// Redux
import { Provider } from "react-redux";// ติดตั้ง redux ในโปรเจค
import { legacy_createStore as createStore} from 'redux'// สร้าง store ในโปรเจค
import { composeWithDevTools } from "redux-devtools-extension";// ติดตั้ง redux devtools ในโปรเจค
import rootReducer from "./components/reducers/index";// รวบรวม state ทั้งหมด

// Route
import { BrowserRouter } from "react-router-dom";
// Antd
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';

const store = createStore(rootReducer, composeWithDevTools());//สร้าง store ในโปรเจค
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  //ครอบเพื่อให้ทุก component สามารถเข้าถึง state ได้
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,

);

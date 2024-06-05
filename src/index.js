import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'rc-texty/assets/index.css';
import App from '@/router/MainRouter';
import reportWebVitals from './reportWebVitals';
import en_GB from 'antd/locale/en_GB';
import { ConfigProvider } from 'antd'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={en_GB}>
    <App />
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

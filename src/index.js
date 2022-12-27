import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import TestDB from './component/TestDB';
import Login from './component/Login';
import SignUp from './component/SignUp';
import AddGoods from './component/AddGoods';
import { BrowserRouter, Route, Routes } from "react-router-dom";


// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>   
        <Route path={"/"}  element={<App />} />         {/* 메인페이지 */}
        <Route path={"/Login"} element={<Login />} />   {/* 로그인페이지 */}
        <Route path={"/SignUp"} element={<SignUp />} /> {/* 회원가입페이지 */}
        <Route path={"/AddGoods"} element={<AddGoods />} /> {/* 회원가입페이지 */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


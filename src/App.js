import React from 'react';
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join'
import Detail from './pages/Detail';
import Setprofile from './pages/Setprofile';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import PostProduct from './pages/PostProduct';
import PostPosting from './pages/PostPosting';

function App() {
  return (
    <BrowserRouter>
      <Link to="/login"></Link>
      <GlobalStyle />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/join" element={<Join />} />
        <Route path="/setprofile" element={<Setprofile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/postproduct" element={<PostProduct />} />
        <Route path="/postposting" element={<PostPosting />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;

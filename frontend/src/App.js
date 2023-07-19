import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/test/MainPage';
import PostPage from './pages/test/PostPage';
import GetPage from './pages/test/GetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/get" element={<GetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

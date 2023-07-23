import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/test/MainPage';
import PostPage from './pages/test/PostPage';
import GetPage from './pages/test/GetPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/get" element={<GetPage />} />
      </Routes>
    </Router>
  );
}

export default App;

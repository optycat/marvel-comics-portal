import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../Components/Header/Header';
import { MainPage, ComicsPage, Page404, ComicBookPage } from '../Components/Pages';

import './app.scss';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="comics" element={<ComicsPage />} />
          <Route path="comics/:comicId" element={<ComicBookPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
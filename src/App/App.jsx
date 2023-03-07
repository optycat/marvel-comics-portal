import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../Components/Header/Header';
import Spinner from '../Components/Spinner/Spinner';

import './app.scss';

const Page404 = lazy(() => import('../Pages/404'));
const MainPage = lazy(() => import('../Pages/MainPage'));
const ComicsPage = lazy(() => import('../Pages/ComicsPage'));
const ComicBookPage = lazy(() => import('../Pages/ComicBookPage'));


function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="comics" element={<ComicsPage />} />
            <Route path="comics/:comicId" element={<ComicBookPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
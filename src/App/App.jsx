import Header from '../Components/Header/Header';
import RandomChar from '../Components/RandomChar/RandomChar';
import CharContent from '../Components/CharContent/CharContent';
import BGDecoration from '../Components/BGDecoration/BGDecoration';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';

import './app.scss';

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
          <CharContent />
      </main>
      <BGDecoration />
    </div>
  );
}

export default App;
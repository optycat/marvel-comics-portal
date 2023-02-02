import Header from '../Header/Header';
import RandomChar from '../RandomChar/RandomChar';
import CharContent from '../CharContent/CharContent';
import BGDecoration from '../BGDecoration/BGDecoration';

import './app.scss';

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
            <RandomChar />
            <CharContent />
      </main>
      <BGDecoration />
    </div>
  );
}

export default App;
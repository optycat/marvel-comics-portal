import RandomChar from './RandomChar/RandomChar';
import CharContent from './CharContent/CharContent';
import BGDecoration from './BGDecoration/BGDecoration';

import './main.scss';

const Main = () => {
    return (
        <main>
            <RandomChar />
            <CharContent />
            <BGDecoration />
        </main>
    );
}

export default Main;
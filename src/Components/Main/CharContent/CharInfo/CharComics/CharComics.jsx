import CharComicsList from './CharComicsList/CharComicsList';

import './charComics.scss';

const CharComics = () => {
    return (
        <>
            <div className="char__comics">Comics:</div>
            <CharComicsList />
        </>
    );
}

export default CharComics;
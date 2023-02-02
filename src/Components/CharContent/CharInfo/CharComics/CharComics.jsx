import CharComicsList from './CharComicsList/CharComicsList';

import './charComics.scss';

const CharComics = ({comics}) => {
    return (
        <>
            <div className="char__comics">Comics:</div>
            <CharComicsList comics={comics} />
        </>
    );
}

export default CharComics;
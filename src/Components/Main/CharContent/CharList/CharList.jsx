import CharGrid from './CharGrid/CharGrid';

const CharList = () => {
    return ( 
        <div className="char__list">
            <CharGrid />
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default CharList;
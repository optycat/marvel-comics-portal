import './charComicsList.scss';

const CharComicsList = ({ comics }) => {
    let randKey = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
    return (
        <ul className="char__comics-list">
            {
                comics.length === 0 ? <li key={randKey()} className="char__comics-item">Not available</li>
                : comics.slice(0, 10).map((item) => {
                    return (
                        <li className="char__comics-item">
                            <a href={item.resourceURI}
                                key={randKey()}>{item.name}</a>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default CharComicsList;
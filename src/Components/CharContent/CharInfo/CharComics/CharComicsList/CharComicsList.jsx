import './charComicsList.scss';

const CharComicsList = ({ comics }) => {
    return (
        <ul className="char__comics-list">
            {
                comics.length === 0 ? <li key={0} className="char__comics-item">Not available</li>
                : comics.slice(0, 10).map((item, i) => {
                    return (
                        <li className="char__comics-item">
                            <a href={item.resourceURI}
                                key={i}>{item.name}</a>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default CharComicsList;
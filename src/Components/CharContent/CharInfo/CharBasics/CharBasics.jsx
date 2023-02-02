import './charBasics.scss';

const charBasics = ({ char, imgNone }) => {
    const { name, wiki, thumbnail, homepage, description } = char;
    return (
        <div className="char__basics">
            <img src={thumbnail} alt={name} />
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
            <div className="char__descr">{description}</div>
        </div>
    );
}

export default charBasics;
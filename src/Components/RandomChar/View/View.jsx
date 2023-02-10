
const View = ({ char, imgNone }) => {
    const { name, description, homepage, wiki, thumbnail } = char;
    const imgStyle = imgNone ? { objectFit: 'contain' } : { objectFit: 'cover' };

    const onCharDataEmpty = (charData, charDataType) => {
        switch (charDataType) {
            case 'name':
                return !charData ? 'Name' : charData;
            case 'thumbnail':
                return !charData ? 'Beautifule picture of a character' : charData;
            case 'description':
                const res = !charData ? 'Some tipical description of a character'
                    : charData.length > 40
                        ? charData.split('').slice(0, 79).join('') + '...'
                        : charData;
                return res;
            case 'homepage':
                return !charData ? '#' : charData;
            case 'wiki':
                return !charData ? '#' : charData;
            default:
                return '#';
        }
    }

    return (
        <div className="randomchar__block">
            <img style={imgStyle}
                src={onCharDataEmpty(thumbnail, 'thumbnail')}
                alt="Random character"
                className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{onCharDataEmpty(name, 'name')}</p>
                <p className="randomchar__descr">{onCharDataEmpty(description, 'description')}</p>
                <div className="randomchar__btns">
                    <a href={onCharDataEmpty(homepage, 'homepage')} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={onCharDataEmpty(wiki, 'wiki')} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default View;
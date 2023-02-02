import './charBasicsItem.scss';

const charBasicsItem = () => {
    return (
        <div>
            <div className="char__info-name">thor</div>
            <div className="char__btns">
                <a href="#" className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href="#" className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div> 
        </div>
    );
}

export default charBasicsItem;
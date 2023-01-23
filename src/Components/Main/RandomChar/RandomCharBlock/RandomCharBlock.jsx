
import './randomCharBlock.scss';

const RandomCharBlock = () => {
    return (
        <div className="randomchar__block">
            <img src="img/thor.jpeg" alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">Thor</p>
                <p className="randomchar__descr">
                    As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
                </p>
                <div className="randomchar__btns">
                    <a href="#" class="button button__main">
                        <div class="inner">homepage</div>
                    </a>
                    <a href="#" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomCharBlock;
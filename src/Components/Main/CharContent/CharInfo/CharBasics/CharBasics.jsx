import CharBasicsItem from './CharBasicsItem/CharBasicsItem';

import './charBasics.scss';

const charBasics = () => {
    return (
        <div className="char__basics">
            <img src="img/thor.jpeg" alt="abyss" />
            <CharBasicsItem />
        </div>
    ); 
}

export default charBasics;
import CharList from './CharList/CharList';
import CharInfo from './CharInfo/CharInfo';

import './charContent.scss';

const CharContent = () => {
    return (
        <div className="char__content">
            <CharList/>
            <CharInfo/>
        </div>
    );
}

export default CharContent;
import CharList from './CharList/CharList';

import './charContent.scss';

const CharContent = () => {
    return (
        <div className="char__content">
            <CharList/>
            {/* <CharInfo/> */}
        </div>
    );
}

export default CharContent;
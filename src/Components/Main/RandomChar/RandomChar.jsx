import RandomCharBlock from './RandomCharBlock/RandomCharBlock';
import RandomCharStatic from './RandomCharStatic/RandomCharStatic';

import './randomChar.scss';

const RandomChar = () => {
    return (
        <div className='randomchar'>
            <RandomCharBlock/>
            <RandomCharStatic/>
        </div>
    );
}

export default RandomChar;
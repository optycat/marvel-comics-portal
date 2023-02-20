import avengers from '../../../image/Avengers.png';
import avengersLogo from '../../../image/Avengers_logo.png';

import './comicsListStatic.scss'

const ComicsListStatic = () => {
    return (
        <div className="comicslist">
            <img src={avengers} alt="Avengers" className="" />
            <h3 className="comicslist__title">New comics every week! <br />Stay tuned!</h3>
            <img src={avengersLogo} alt="Avengers" className="comicslist__decoration" />
        </div>
    );
}

export default ComicsListStatic;
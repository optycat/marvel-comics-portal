import CharBasics from './CharBasics/CharBasics';
import CharComics from './CharComics/CharComics';
import Sceleton from './Sceleton/Sceleton';

import './charInfo.scss';

const CharInfo = () => {
    return (
        <div className="char__info">
            <CharBasics />
            <div className="char__descr">
                In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
            </div>
            <CharComics />
            <p className="char__select">Please select a character to see information</p>
            <Sceleton />
        </div>
    );
}

export default CharInfo;
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import useMarvelServise from '../../../servises/MarvelServise';
import CharBasics from './CharBasics/CharBasics';
import CharComics from './CharComics/CharComics';
import Skeleton from './Skeleton/Skeleton';
import Spinner from '../../Spinner/Spinner';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);

    const { loading, error, getChar, clearError } = useMarvelServise();

    useEffect(() => updateChar(charId), [charId]);

    const updateChar = (charId) => {
        clearError();
        if (!charId) return;
        getChar(charId).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char)
        ? <>
            <CharBasics char={char} />
            <div className="char__descr">{char.description}</div>
            <CharComics comics={char.comics} />
        </>
        : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    );

}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
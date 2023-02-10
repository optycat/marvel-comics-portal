import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import MarvelServise from '../../../servises/MarvelServise';
import CharBasics from './CharBasics/CharBasics';
import CharComics from './CharComics/CharComics';
import Skeleton from './Skeleton/Skeleton';
import Spinner from '../../Spinner/Spinner';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [imgNone, setImgNone] = useState(false);

    const marvelServise = new MarvelServise();

    useEffect(() => updateChar(charId), [charId]);

    const updateChar = (charId) => {
        if (!charId) return;
        onLoading();
        marvelServise
            .getChar(charId)
            .then(onCharLoaded)
            .catch(onErrorOcupeted);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(loading => false);
        setError(error => false);
        setImgNone(imgNone => onCharImgNone(char.thumbnail));
    }

    const onErrorOcupeted = () => {
        setLoading(loading => false);
        setError(error => true);
    }

    const onCharImgNone = (thumbnail) => {
        const imgStatus = thumbnail.split('/');
        return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    }

    const onLoading = () => setLoading(loading => true);

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char)
        ? <>
            <CharBasics char={char} imgNone={imgNone} />
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
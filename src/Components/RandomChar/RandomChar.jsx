import { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import ErrorMassage from '../ErrorMassage/ErrorMassage';
import useMarvelServise from '../../servises/MarvelServise';

import View from './View/View';

import './randomChar.scss';

import mjolnir from '../../image/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    // const [imgNone, setImgNone] = useState(false);

    const { loading, error, getChar, clearError } = useMarvelServise();

    useEffect(() => updateChar(), []);

    const onCharLoaded = (char) => {
        setChar(char);
        // setLoading(loading => false);
        // setError(error => false);
        // setImgNone(imgNone => onCharImgNone(char.thumbnail));
    }

    // const onErrorOcupeted = () => {
    //     setLoading(loading => false);
    //     setError(error => true);
    // }

    // const onCharImgNone = (thumbnail) => {
    //     const imgStatus = thumbnail.split('/');
    //     return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    // }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // setLoading(loading => true);
        getChar(id).then(onCharLoaded);
        // .catch(onErrorOcupeted);
    }

    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className='randomchar'>
            {errorMassage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir"
                    className="randomchar__decoration" />
            </div>
        </div>
    );
}

export default RandomChar;
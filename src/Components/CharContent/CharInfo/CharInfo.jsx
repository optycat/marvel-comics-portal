import { useState, useEffect, useRef } from 'react';
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
    // state = {
    //     char: null,
    //     loading: false,
    //     error: false,
    //     imgNone: false
    // }

    const marvelServise = new MarvelServise();

    // const prevCharId = useRef(0);

    // useEffect(() => prevCharId.current = charId, [charId]);

    useEffect(() => updateChar(charId), [charId]);
    // componentDidMount() {
    //     this.updateChar();
    // }

    // useEffect(() => {
    //     if (charId !== prevCharId.current) updateChar();
    // }, [charId]);

    // componentDidUpdate(prevProps) {
    //     if (this.props.charId !== prevProps.charId) this.updateChar();
    // }

    const updateChar = (charId) => {
        // const { charId } = this.props;
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
        // this.setState({ char, loading: false, error: false, imgNone: this.onCharImgNone(char.thumbnail) });
    }

    const onErrorOcupeted = () => {
        setLoading(loading => false);
        setError(error => true);
        // this.setState({ error: true, loading: false });
    }

    const onCharImgNone = (thumbnail) => {
        const imgStatus = thumbnail.split('/');
        return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    }

    const onLoading = () => setLoading(loading => true);

    // onLoading = () => {        
    //     this.setState({ loading: true });
    // }


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
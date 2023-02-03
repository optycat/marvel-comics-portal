import { Component } from 'react';

import MarvelServise from '../../../servises/MarvelServise';
import CharBasics from './CharBasics/CharBasics';
import CharComics from './CharComics/CharComics';
import Skeleton from './Skeleton/Skeleton';
import Spinner from '../../Spinner/Spinner';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
        imgNone: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) this.updateChar();
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) return;
        this.onLoading();
        this.marvelServise
            .getChar(charId)
            .then(this.onCharLoaded)
            .catch(this.onErrorOcupeted);
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false, imgNone: this.onCharImgNone(char.thumbnail) });
    }

    onErrorOcupeted = () => {
        this.setState({ error: true, loading: false });
    }

    onCharImgNone = (thumbnail) => {
        const imgStatus = thumbnail.split('/');
        return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    }

    onLoading = () => {
        this.setState({ loading: true });
    }

    render() {
        const { char, loading, error, imgNone } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMassage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) 
            ? <>
                <CharBasics char={char} imgNone={imgNone}/>
                <div className="char__descr">{char.description}</div>
                <CharComics comics={char.comics}/>
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
}

export default CharInfo;
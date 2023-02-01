import { Component } from 'react';
import Spinner from '../../Spinner/Spinner';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';
import MarvelServise from '../../../Servises/MarvelServise';

// import RandomCharBlock from './RandomCharBlock/RandomCharBlock';
// import RandomCharStatic from './RandomCharStatic/RandomCharStatic';

import './randomChar.scss';
import './RandomCharBlock/randomCharBlock.scss';
import './RandomCharStatic/randomCharStatic.scss';

import mjolnir from '../../../image/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
        imgNone: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChar();
    }

    // componentDidUpdate() {
    //     const { char } = this.state;
    //     const imgStatus = char.thumbnail.split('/');
    //     return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    // }

    // componentWillUnmount() {

    // }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false, imgNone: this.onCharImgNone(char.thumbnail)});
        // this.onCharImgNone();
    }

    onErrorOcupeted = () => {
        this.setState({ error: true, loading: false });
    }

    onCharImgNone = (thumbnail) => {
        const imgStatus = thumbnail.split('/');
        return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelServise
            .getChar(id)
            .then(this.onCharLoaded)
            .catch(this.onErrorOcupeted);
    }

    render() {
        const { char, loading, error, imgNone } = this.state;

        const errorMassage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} imgNone={imgNone} /> : null;

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
                        onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir"
                        className="randomchar__decoration" />
                </div>
            </div>
        );
    }
}

const View = ({ char, imgNone}) => {
    const { name, description, homepage, wiki, thumbnail } = char;
    const imgStyle = imgNone ? { objectFit: 'contain' } : { objectFit: 'cover' };

    const onCharDataEmpty = (charData, charDataType) => {
        switch (charDataType) {
            case 'name':
                return !charData ? 'Name' : charData;
            case 'thumbnail':
                return !charData ? 'Beautifule picture of a character' : charData;
            case 'description':
                const res = !charData ? 'Some tipical description of a character'
                    : charData.length > 40
                        ? charData.split('').slice(0, 79).join('') + '...'
                        : charData;
                return res;
            case 'homepage':
                return !charData ? '#' : charData;
            case 'wiki':
                return !charData ? '#' : charData;
        }
    }

    return (
        <div className="randomchar__block">
            <img style={imgStyle}
                src={onCharDataEmpty(thumbnail, 'thumbnail')} 
                alt="Random character" 
                className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{onCharDataEmpty(name, 'name')}</p>
                <p className="randomchar__descr">{onCharDataEmpty(description, 'description')}</p>
                <div className="randomchar__btns">
                    <a href={onCharDataEmpty(homepage, 'homepage')} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={onCharDataEmpty(wiki, 'wiki')} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;
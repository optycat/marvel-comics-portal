import { Component } from 'react';
import Spinner from '../../Spinner/Spinner';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';
import MarvelServise from '../../../Servises/MarvelServise';

// import RandomCharBlock from './RandomCharBlock/RandomCharBlock';
import RandomCharStatic from './RandomCharStatic/RandomCharStatic';

import './randomChar.scss';
import './RandomCharBlock/randomCharBlock.scss';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelServise = new MarvelServise();

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, error: false });
    }

    onErrorOcupeted = () => {
        this.setState({ error: true, loading: false });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelServise
            .getChar(id)
            .then(this.onCharLoaded)
            .catch(this.onErrorOcupeted);
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMassage = error ? <ErrorMassage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className='randomchar'>
                {errorMassage}
                {spinner}
                {content}
                {/* {loading ? <Spinner /> : <View char={char} />} */}
                <RandomCharStatic />
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, description, homepage, wiki, thumbnail } = char;

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
            <img src={onCharDataEmpty(thumbnail, 'thumbnail')} alt="Random character" className="randomchar__img" />
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
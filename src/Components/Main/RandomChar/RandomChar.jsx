import { Component } from 'react';
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
        char: {}
    }

    marvelServise = new MarvelServise();

    onCharLoaded = (char) => {
        this.setState({ char });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelServise
            .getChar(id)
            .then(this.onCharLoaded);
    }

    onCharDataEmpty = (charData, charDataType) => {
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

    render() {
        const { name, thumbnail, description, homepage, wiki } = this.state.char;
        return (
            <div className='randomchar'>
                <div className="randomchar__block">
                    <img src={this.onCharDataEmpty(thumbnail, 'thumbnail')} alt="Random character" className="randomchar__img" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{this.onCharDataEmpty(name, 'name')}</p>
                        <p className="randomchar__descr">{this.onCharDataEmpty(description, 'description')}</p>
                        <div className="randomchar__btns">
                            <a href={this.onCharDataEmpty(homepage, 'homepage')} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={this.onCharDataEmpty(wiki, 'wiki')} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <RandomCharBlock data={data} /> */}
                <RandomCharStatic />
            </div>
        );
    }
}

export default RandomChar;
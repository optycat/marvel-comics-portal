import { Component } from 'react';
import MarvelServise from '../../../Servises/MarvelServise';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';
import Spinner from '../../Spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    constructor(props){
        super(props);
    }
    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateGrid();
    }

    updateGrid = () => {
        this.marvelServise
            .getAllChars()
            .then(this.onCharsLoaded)
            .catch(this.onErrorOcupeted);
    }

    onCharsLoaded = (chars) => {
        // const newChars = chars.map((item => item = { imgNone: this.onCharImgNone(item), ...item }));
        // console.log(newChars);
        this.setState({ chars, loading: false, error: false });
    }

    onErrorOcupeted = () => {
        this.setState({ error: true, loading: false });
    }

    onCharImgNone = (char) => {
        let imgStatus = char.thumbnail.split('/');
        return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    }

    render() {
        if (this.state.error === true) return <ErrorMassage />
        if (this.state.loading === true) return <Spinner />
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <CharItem chars={this.state.chars} onCharSelected={this.props.onCharSelected} />
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

const CharItem = ({ chars, onCharSelected}) => {
    // const onActive = () => {
    //     return 0
    // }
    return chars.map((char) => {
        const { name, thumbnail, id } = char;
        // const imgStyle = imgNone ? { objectFit: 'contain' } : { objectFit: 'cover' };
        return (
            <li className="char__item"
                key={id}
                onClick={() => onCharSelected(id)}>
                <img src={thumbnail} alt={name} />
                <div className="char__name">{name}</div>
            </li>
        );
    });
}

export default CharList;
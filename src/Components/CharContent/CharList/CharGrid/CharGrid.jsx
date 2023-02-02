import { Component } from 'react';
import MarvelServise from '../../../../Servises/MarvelServise';
import ErrorMassage from '../../../ErrorMassage/ErrorMassage';
import Spinner from '../../../Spinner/Spinner';

import './charGrid.scss';

class CharGrid extends Component {
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
            <ul className="char__grid">
                <CharItem chars={this.state.chars} />
            </ul>
        );
    }
}

const CharItem = ({ chars }) => {
    // const onActive = () => {
    //     return 0
    // }
    return chars.map((char) => {
        const { name, thumbnail, id } = char;
        // const imgStyle = imgNone ? { objectFit: 'contain' } : { objectFit: 'cover' };
        return (
            <li className="char__item"
                key={id}>
                <img src={thumbnail} alt={name} />
                <div className="char__name">{name}</div>
            </li>
        );
    });
}

export default CharGrid;